import Anthropic from "@anthropic-ai/sdk";
import { getSupabase } from "./supabase";
import { getPipelineSettings } from "./pipeline-settings";

type RawLead = {
  company_name: string;
  website_url: string | null;
  first_name: string;
  recipient_email: string | null;
  phone: string | null;
};

type LeadDraft = RawLead & {
  subject: string;
  body_paragraphs: string[];
  audit_findings: string[];
  closing_paragraph: string;
  category: string;
};

export type PipelineResult =
  | { skipped: true; message: string }
  | { added: number; message?: string }
  | { added: number; industry: string; location: string; companies: string[] };

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function runClaude(client: Anthropic, prompt: string, useWebSearch = false, forceSearch = false): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tools: any[] = useWebSearch ? [{ type: "web_search_20250305", name: "web_search" }] : [];
  const messages: Anthropic.MessageParam[] = [{ role: "user", content: prompt }];
  let firstCall = true;

  for (let round = 0; round < 10; round++) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createParams: any = {
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      tools: tools.length ? tools : undefined,
      messages,
    };
    // Force the first call to use web search so Claude doesn't answer from training data
    if (forceSearch && firstCall && tools.length) {
      createParams.tool_choice = { type: "any" };
    }
    firstCall = false;
    const response = await client.messages.create(createParams);

    if (response.stop_reason === "end_turn") {
      const textBlock = response.content.find((b) => b.type === "text");
      return textBlock ? (textBlock as Anthropic.TextBlock).text : "";
    }

    if (response.stop_reason === "tool_use") {
      const toolUseBlocks = response.content.filter((b) => b.type === "tool_use") as Anthropic.ToolUseBlock[];
      messages.push({ role: "assistant", content: response.content });
      const toolResults: Anthropic.ToolResultBlockParam[] = toolUseBlocks.map((tu) => ({
        type: "tool_result",
        tool_use_id: tu.id,
        content: "Search completed.",
      }));
      messages.push({ role: "user", content: toolResults });
    }
  }

  const last = messages[messages.length - 1];
  if (last.role === "assistant" && Array.isArray(last.content)) {
    const textBlock = last.content.find((b) => (b as Anthropic.ContentBlock).type === "text");
    return textBlock ? (textBlock as Anthropic.TextBlock).text : "";
  }
  return "";
}

function extractJson<T>(text: string): T | null {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/) ?? text.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
  if (!match) return null;
  try {
    return JSON.parse(match[1] ?? match[0]) as T;
  } catch {
    return null;
  }
}

export async function runPipeline({ force = false }: { force?: boolean } = {}): Promise<PipelineResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const client = new Anthropic({ apiKey });
  const sb = getSupabase();
  const settings = await getPipelineSettings();

  if (!settings.enabled) {
    return { skipped: true, message: "Pipeline is disabled in settings" };
  }

  if (!force) {
    const day = new Date().getUTCDay();
    const shouldRun =
      settings.frequency === "daily" ||
      (settings.frequency === "weekly" && day === 1) ||
      (settings.frequency === "twice_weekly" && (day === 1 || day === 4)) ||
      (settings.frequency === "weekdays" && day >= 1 && day <= 5);

    if (!shouldRun) {
      return { skipped: true, message: `Frequency is "${settings.frequency}" — not scheduled to run today` };
    }
  }

  const activeIndustries = settings.industries.filter((i) => i.enabled);
  if (!activeIndustries.length) {
    return { skipped: true, message: "No industries enabled" };
  }

  const industry = pickRandom(activeIndustries);
  const location = pickRandom(settings.locations);
  const maxLeads = settings.max_leads_per_run;
  const emailTone = settings.email_tone;

  const discoverPrompt = `
Use web search right now to find ${maxLeads + 2} small, independently-owned ${industry.label} in ${location}.

Search for something like: "${industry.label} ${location} site:yelp.com OR site:google.com/maps" or browse local directories to find businesses you would not know from training data — small operators, not well-known chains or franchises.

For each business found via search:
1. Visit their website (if they have one) and check the homepage, contact page, about page, and footer for an email address.
2. Check their Google Business profile for a contact email.
3. Note the owner or manager's first name if visible anywhere.

Return ONLY a JSON array — no explanation, no markdown outside the array:
[
  {
    "company_name": "Example Plumbing Co",
    "website_url": "https://exampleplumbing.com",
    "first_name": "Mike",
    "recipient_email": "mike@exampleplumbing.com",
    "phone": "602-555-1234"
  }
]

Rules:
- Only include real businesses you found via search — do not use training data.
- If no email found after checking website + Google listing: set recipient_email to null. Never guess.
- If no first name found: use "there".
- No national chains, franchises, or businesses with 10+ locations.
`.trim();

  const discoverText = await runClaude(client, discoverPrompt, true, true);
  const rawLeads: RawLead[] = extractJson<RawLead[]>(discoverText) ?? [];

  const validLeads = rawLeads.filter((l) => l.company_name);
  if (!validLeads.length) {
    return { added: 0, message: "No businesses found" };
  }

  // Dedup by email (when present) and by website/company name
  const emailsToCheck = validLeads.filter((l) => l.recipient_email).map((l) => l.recipient_email!.toLowerCase());
  const urlsToCheck = validLeads.filter((l) => l.website_url).map((l) => l.website_url!.toLowerCase());
  const namesToCheck = validLeads.map((l) => l.company_name.toLowerCase());

  const [{ data: existingByEmail }, { data: existingByUrl }, { data: existingByName }, { data: unsubscribed }] =
    await Promise.all([
      emailsToCheck.length
        ? sb.from("outreach_leads").select("recipient_email").in("recipient_email", emailsToCheck)
        : Promise.resolve({ data: [] }),
      urlsToCheck.length
        ? sb.from("outreach_leads").select("website_url").in("website_url", urlsToCheck)
        : Promise.resolve({ data: [] }),
      sb.from("outreach_leads").select("company_name").in("company_name", namesToCheck),
      emailsToCheck.length
        ? sb.from("outreach_unsubscribes").select("email").in("email", emailsToCheck)
        : Promise.resolve({ data: [] }),
    ]);

  const seenEmails = new Set([
    ...(existingByEmail ?? []).map((r) => r.recipient_email?.toLowerCase()).filter(Boolean),
    ...(unsubscribed ?? []).map((r) => r.email.toLowerCase()),
  ]);
  const seenUrls = new Set((existingByUrl ?? []).map((r) => r.website_url?.toLowerCase()).filter(Boolean));
  const seenNames = new Set((existingByName ?? []).map((r) => r.company_name.toLowerCase()));

  const newLeads = validLeads
    .filter((l) => {
      if (l.recipient_email && seenEmails.has(l.recipient_email.toLowerCase())) return false;
      if (l.website_url && seenUrls.has(l.website_url.toLowerCase())) return false;
      if (seenNames.has(l.company_name.toLowerCase())) return false;
      return true;
    })
    .slice(0, maxLeads);

  if (!newLeads.length) {
    return { added: 0, message: "All discovered leads already in queue or unsubscribed" };
  }

  const drafted: LeadDraft[] = [];

  for (const lead of newLeads) {
    const auditPrompt = `
You are helping draft a cold outreach email for Solvyn, a Phoenix-based technology and AI consulting firm.

Business to reach: ${lead.company_name}
Website: ${lead.website_url ?? "unknown"}
Contact: ${lead.first_name}
Industry: ${industry.label}

${lead.website_url
  ? "Use web search to visit their website and identify 3-4 specific issues that are costing them leads or customers. Focus on things a small business owner would immediately recognize as a problem: slow load time, no way to book online, missing reviews section, no clear phone number visible, outdated design, no response to Google reviews, etc."
  : `Without a website URL, identify 3 common gaps for ${industry.label} in Phoenix that likely apply to this business.`}

${emailTone}

Return ONLY a JSON object with this exact shape:
{
  "subject": "one compelling subject line (under 60 chars)",
  "audit_findings": [
    "Finding 1 — framed as what it costs them",
    "Finding 2 — framed as what it costs them",
    "Finding 3 — framed as what it costs them"
  ],
  "body_paragraphs": [
    "Opening sentence addressing ${lead.first_name} and the specific thing you noticed.",
    "Second paragraph explaining how these issues are losing them business.",
    "Third paragraph: what Solvyn would do and the outcome."
  ],
  "closing_paragraph": "Soft CTA — asking if they have 15 minutes, not a hard sell."
}
`.trim();

    try {
      const draftText = await runClaude(client, auditPrompt, !!lead.website_url);
      const draft = extractJson<{
        subject: string;
        audit_findings: string[];
        body_paragraphs: string[];
        closing_paragraph: string;
      }>(draftText);
      if (draft) drafted.push({ ...lead, ...draft, category: industry.slug });
    } catch (err) {
      console.error(`[pipeline] draft error for ${lead.company_name}`, err);
    }
  }

  if (!drafted.length) {
    return { added: 0, message: "Drafting failed for all leads" };
  }

  const rows = drafted.map((d) => ({
    first_name: d.first_name,
    company_name: d.company_name,
    website_url: d.website_url,
    category: d.category,
    recipient_email: d.recipient_email ?? null,
    phone: d.phone,
    subject: d.subject,
    body_paragraphs: d.body_paragraphs,
    audit_findings: d.audit_findings,
    closing_paragraph: d.closing_paragraph,
    status: "pending",
  }));

  const { error: insertError } = await sb.from("outreach_leads").insert(rows);
  if (insertError) throw new Error(insertError.message);

  return { added: rows.length, industry: industry.label, location, companies: rows.map((r) => r.company_name) };
}
