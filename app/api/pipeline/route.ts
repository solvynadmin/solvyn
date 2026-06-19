import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSupabase } from "@/lib/supabase";
import { getPipelineSettings } from "@/lib/pipeline-settings";

export const maxDuration = 300;

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

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function authOk(req: NextRequest): boolean {
  const secret = process.env.PIPELINE_SECRET;
  if (!secret) return false;
  const header = req.headers.get("authorization") ?? "";
  return header === `Bearer ${secret}`;
}

async function runClaude(
  client: Anthropic,
  prompt: string,
  useWebSearch = false,
): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tools: any[] = useWebSearch
    ? [{ type: "web_search_20250305", name: "web_search" }]
    : [];

  const messages: Anthropic.MessageParam[] = [{ role: "user", content: prompt }];

  for (let round = 0; round < 8; round++) {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      tools: tools.length ? tools : undefined,
      messages,
    });

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
  if (last.role === "assistant") {
    const content = last.content;
    if (Array.isArray(content)) {
      const textBlock = content.find((b) => (b as Anthropic.ContentBlock).type === "text");
      return textBlock ? (textBlock as Anthropic.TextBlock).text : "";
    }
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

export async function GET(req: NextRequest) {
  if (!authOk(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 });
  }

  const client = new Anthropic({ apiKey });
  const sb = getSupabase();

  const settings = await getPipelineSettings();

  if (!settings.enabled) {
    return NextResponse.json({ skipped: true, message: "Pipeline is disabled in settings" });
  }

  // Check frequency against today (UTC day: 0=Sun,1=Mon,...,6=Sat)
  const day = new Date().getUTCDay();
  const shouldRun =
    settings.frequency === "daily" ||
    (settings.frequency === "weekly" && day === 1) ||
    (settings.frequency === "twice_weekly" && (day === 1 || day === 4)) ||
    (settings.frequency === "weekdays" && day >= 1 && day <= 5);

  if (!shouldRun) {
    return NextResponse.json({ skipped: true, message: `Frequency is "${settings.frequency}" — not scheduled to run today` });
  }

  const activeIndustries = settings.industries.filter((i) => i.enabled);
  if (!activeIndustries.length) {
    return NextResponse.json({ skipped: true, message: "No industries enabled" });
  }

  const industry = pickRandom(activeIndustries);
  const location = pickRandom(settings.locations);
  const maxLeads = settings.max_leads_per_run;
  const emailTone = settings.email_tone;

  // Step 1: find leads via web search
  const discoverPrompt = `
You are a business development assistant helping find ${industry.label} in ${location} that might benefit from website and digital marketing improvements.

Use web search to find ${maxLeads + 2} real, specific local businesses — not directories, not chains.
For each business find: company name, website URL, owner or manager first name (if findable), email address (from their website contact page), phone number.

Return ONLY a JSON array like this (no other text):
[
  {
    "company_name": "Example Plumbing Co",
    "website_url": "https://exampleplumbing.com",
    "first_name": "Mike",
    "recipient_email": "mike@exampleplumbing.com",
    "phone": "602-555-1234"
  }
]

If you cannot find an email, set recipient_email to null. If you cannot find a first name, use "there".
`.trim();

  let rawLeads: RawLead[] = [];
  try {
    const discoverText = await runClaude(client, discoverPrompt, true);
    rawLeads = extractJson<RawLead[]>(discoverText) ?? [];
  } catch (err) {
    console.error("[pipeline] lead discovery error", err);
    return NextResponse.json({ error: "Lead discovery failed" }, { status: 500 });
  }

  // Filter out nulls and leads already in DB
  const leadsWithEmail = rawLeads.filter((l) => l.recipient_email);
  if (!leadsWithEmail.length) {
    return NextResponse.json({ added: 0, message: "No leads with emails found" });
  }

  const emails = leadsWithEmail.map((l) => l.recipient_email!.toLowerCase());
  const [{ data: existingLeads }, { data: unsubscribed }] = await Promise.all([
    sb.from("outreach_leads").select("recipient_email").in("recipient_email", emails),
    sb.from("outreach_unsubscribes").select("email").in("email", emails),
  ]);

  const seen = new Set([
    ...(existingLeads ?? []).map((r) => r.recipient_email.toLowerCase()),
    ...(unsubscribed ?? []).map((r) => r.email.toLowerCase()),
  ]);

  const newLeads = leadsWithEmail.filter((l) => !seen.has(l.recipient_email!.toLowerCase())).slice(0, maxLeads);

  if (!newLeads.length) {
    return NextResponse.json({ added: 0, message: "All discovered leads already in queue or unsubscribed" });
  }

  // Step 2: audit + draft email for each lead
  const drafted: LeadDraft[] = [];

  for (const lead of newLeads) {
    const auditPrompt = `
You are helping draft a cold outreach email for Solvyn, a Phoenix-based technology and AI consulting firm.

Business to reach: ${lead.company_name}
Website: ${lead.website_url ?? "unknown"}
Contact: ${lead.first_name}
Industry: ${industry.label}

${lead.website_url ? `Use web search to visit their website and identify 3-4 specific issues that are costing them leads or customers. Focus on things a small business owner would immediately recognize as a problem: slow load time, no way to book online, missing reviews section, no clear phone number visible, outdated design, no response to Google reviews, etc.` : `Without a website URL, identify 3 common gaps for ${industry.label} in Phoenix that likely apply to this business.`}

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

      if (draft) {
        drafted.push({ ...lead, ...draft, category: industry.slug });
      }
    } catch (err) {
      console.error(`[pipeline] draft error for ${lead.company_name}`, err);
    }
  }

  if (!drafted.length) {
    return NextResponse.json({ added: 0, message: "Drafting failed for all leads" });
  }

  // Step 3: insert into Supabase
  const rows = drafted.map((d) => ({
    first_name: d.first_name,
    company_name: d.company_name,
    website_url: d.website_url,
    category: d.category,
    recipient_email: d.recipient_email!,
    phone: d.phone,
    subject: d.subject,
    body_paragraphs: d.body_paragraphs,
    audit_findings: d.audit_findings,
    closing_paragraph: d.closing_paragraph,
    status: "pending",
  }));

  const { error: insertError } = await sb.from("outreach_leads").insert(rows);
  if (insertError) {
    console.error("[pipeline] insert error", insertError);
    return NextResponse.json({ error: "DB insert failed", detail: insertError.message }, { status: 500 });
  }

  return NextResponse.json({
    added: rows.length,
    industry: industry.label,
    location,
    companies: rows.map((r) => r.company_name),
  });
}
