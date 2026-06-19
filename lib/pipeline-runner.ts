import Anthropic from "@anthropic-ai/sdk";
import { getSupabase } from "./supabase";
import { getPipelineSettings } from "./pipeline-settings";
import { recordPipelineRun } from "./pipeline-runs";
import { searchWeb } from "./search";

export type PipelineResult =
  | { skipped: true; message: string }
  | { added: number; message?: string; debug?: string }
  | { added: number; industry: string; location: string; companies: string[] };

type Business = {
  company_name: string;
  website_url: string | null;
  first_name: string;
  recipient_email: string | null;
  phone: string | null;
};

type LeadDraft = Business & {
  subject: string;
  body_paragraphs: string[];
  audit_findings: string[];
  closing_paragraph: string;
  category: string;
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function extractJson<T>(text: string): T | null {
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  // match first [ or { through to its pair using a broad grab then let JSON.parse validate
  const raw = text.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
  const src = fence?.[1] ?? raw?.[1];
  if (!src) return null;
  try { return JSON.parse(src) as T; } catch { return null; }
}

// Single cheap Claude call — no tools, no loops
async function callClaude(
  client: Anthropic,
  prompt: string,
  model: "haiku" | "sonnet" = "haiku",
): Promise<string> {
  const modelId =
    model === "haiku" ? "claude-haiku-4-5-20251001" : "claude-sonnet-4-6";

  const res = await client.messages.create({
    model: modelId,
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const block = res.content.find((b) => b.type === "text");
  return block ? (block as Anthropic.TextBlock).text : "";
}

// Step 1 — Serper finds businesses (free, no Claude)
async function discoverBusinesses(
  industryLabel: string,
  location: string,
): Promise<string> {
  // Extract the city name only (e.g. "Phoenix, AZ" → "Phoenix")
  const city = location.split(",")[0].trim();
  const results = await searchWeb(
    `${industryLabel} ${city} AZ independent small business`,
  );
  return results;
}

// Step 2 — Haiku extracts structured list from search results (1 cheap call)
async function extractBusinessList(
  client: Anthropic,
  searchResults: string,
  industryLabel: string,
  location: string,
  count: number,
): Promise<Business[]> {
  const prompt = `
You are parsing web search results to extract real small business listings.

Search results:
${searchResults}

Extract up to ${count} independently-owned ${industryLabel} businesses in ${location} from the results above.
Skip directories, national chains, franchises, and any result that is not a specific local business.

For each business, extract from the search snippet what you can:
- company_name: the business name
- website_url: their website URL (from the search result link, not a directory page)
- first_name: owner or contact first name if mentioned, otherwise "there"
- recipient_email: email address if visible in the snippet, otherwise null
- phone: phone number if visible in the snippet, otherwise null

Return ONLY a JSON array, no other text:
[{"company_name":"...","website_url":"...","first_name":"...","recipient_email":null,"phone":null}]
`.trim();

  const text = await callClaude(client, prompt, "haiku");
  return extractJson<Business[]>(text) ?? [];
}

// Step 3 — Serper looks up contact info for each business (free, no Claude)
async function fetchContactData(businesses: Business[]): Promise<(Business & { contactSnippets: string })[]> {
  return Promise.all(
    businesses.map(async (b) => {
      try {
        const query = b.website_url
          ? `site:${b.website_url.replace(/^https?:\/\//, "").split("/")[0]} email contact`
          : `"${b.company_name}" ${b.phone ?? ""} email contact`;
        const snippets = await searchWeb(query);
        return { ...b, contactSnippets: snippets };
      } catch {
        return { ...b, contactSnippets: "" };
      }
    }),
  );
}

// Step 4 — Haiku pulls emails/names from contact snippets (1 cheap call)
async function enrichContactInfo(
  client: Anthropic,
  businesses: (Business & { contactSnippets: string })[],
): Promise<Business[]> {
  const prompt = `
Extract contact information from the search snippets below. For each business, find an email address and owner/manager first name if present.

${businesses
  .map(
    (b, i) => `[${i}] ${b.company_name}
Snippets: ${b.contactSnippets.slice(0, 400)}`,
  )
  .join("\n\n")}

Return a JSON array in the same order, updating email and first_name where found:
[{"company_name":"...","website_url":"...","first_name":"...","recipient_email":"...or null","phone":"...or null"}]

Rules:
- Only include emails that appear literally in the snippets — do not guess.
- If no email found, set recipient_email to null.
- If no first name found, keep "there".

Return ONLY the JSON array.
`.trim();

  const text = await callClaude(client, prompt, "haiku");
  const enriched = extractJson<Business[]>(text);
  if (!enriched) return businesses;

  // Merge: keep original data for anything the enrichment didn't find
  return businesses.map((b, i) => ({
    ...b,
    first_name: enriched[i]?.first_name || b.first_name,
    recipient_email: enriched[i]?.recipient_email || b.recipient_email,
    phone: enriched[i]?.phone || b.phone,
  }));
}

// Step 5 — Sonnet drafts ALL emails in one call
async function draftAllEmails(
  client: Anthropic,
  leads: Business[],
  industryLabel: string,
  emailTone: string,
): Promise<LeadDraft[]> {
  const prompt = `
You are drafting cold outreach emails for Solvyn, a Phoenix-based technology and AI consulting firm.

${emailTone}

Draft emails for each of these ${industryLabel} businesses. For each, identify 3 specific website or digital marketing issues that are costing them leads — framed as business impact, not technical terms. Then write the email.

Businesses:
${leads.map((l, i) => `[${i}] ${l.company_name} | website: ${l.website_url ?? "none"} | contact: ${l.first_name}`).join("\n")}

Return ONLY a JSON array in the same order:
[
  {
    "subject": "under 60 chars",
    "audit_findings": ["finding 1","finding 2","finding 3"],
    "body_paragraphs": ["opening sentence","problem paragraph","what Solvyn does"],
    "closing_paragraph": "soft CTA asking for 15 minutes"
  }
]
`.trim();

  const text = await callClaude(client, prompt, "sonnet");
  const drafts = extractJson<{
    subject: string;
    audit_findings: string[];
    body_paragraphs: string[];
    closing_paragraph: string;
  }[]>(text);

  if (!drafts) return [];

  return leads.map((lead, i) => ({
    ...lead,
    ...(drafts[i] ?? { subject: "", audit_findings: [], body_paragraphs: [], closing_paragraph: "" }),
    category: "",
  }));
}

// ─── Main entry point ────────────────────────────────────────────────────────

export async function runPipeline({ force = false }: { force?: boolean } = {}): Promise<PipelineResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const client = new Anthropic({ apiKey });
  const sb = getSupabase();
  const settings = await getPipelineSettings();

  if (!settings.enabled) {
    const r: PipelineResult = { skipped: true, message: "Pipeline is disabled in settings" };
    await recordPipelineRun(r);
    return r;
  }

  if (!force) {
    const day = new Date().getUTCDay();
    const shouldRun =
      settings.frequency === "daily" ||
      (settings.frequency === "weekly" && day === 1) ||
      (settings.frequency === "twice_weekly" && (day === 1 || day === 4)) ||
      (settings.frequency === "weekdays" && day >= 1 && day <= 5);

    if (!shouldRun) {
      const r: PipelineResult = { skipped: true, message: `Not scheduled to run today (${settings.frequency})` };
      await recordPipelineRun(r);
      return r;
    }
  }

  const activeIndustries = settings.industries.filter((i) => i.enabled);
  if (!activeIndustries.length) {
    const r: PipelineResult = { skipped: true, message: "No industries enabled" };
    await recordPipelineRun(r);
    return r;
  }

  const industry = pickRandom(activeIndustries);
  const location = pickRandom(settings.locations);
  const maxLeads = settings.max_leads_per_run;

  // ── Step 1: Serper discovery (free) ─────────────────────────────────────
  const searchResults = await discoverBusinesses(industry.label, location);

  // ── Step 2: Haiku extracts business list (1 cheap call) ─────────────────
  const rawBusinesses = await extractBusinessList(
    client, searchResults, industry.label, location, maxLeads + 2,
  );

  if (!rawBusinesses.length) {
    const r: PipelineResult = {
      added: 0,
      message: "No businesses found in search results",
      debug: `Serper returned ${searchResults.length} chars. Haiku returned no parseable JSON array.`,
    };
    await recordPipelineRun(r);
    return r;
  }

  // ── Dedup BEFORE spending more credits ───────────────────────────────────
  const urlsToCheck = rawBusinesses.filter((b) => b.website_url).map((b) => b.website_url!.toLowerCase());
  const namesToCheck = rawBusinesses.map((b) => b.company_name.toLowerCase());

  const [{ data: byUrl }, { data: byName }] = await Promise.all([
    urlsToCheck.length
      ? sb.from("outreach_leads").select("website_url").in("website_url", urlsToCheck)
      : Promise.resolve({ data: [] }),
    sb.from("outreach_leads").select("company_name").in("company_name", namesToCheck),
  ]);

  const seenUrls = new Set((byUrl ?? []).map((r) => r.website_url?.toLowerCase()).filter(Boolean));
  const seenNames = new Set((byName ?? []).map((r) => r.company_name.toLowerCase()));

  const newBusinesses = rawBusinesses
    .filter((b) => {
      if (b.website_url && seenUrls.has(b.website_url.toLowerCase())) return false;
      if (seenNames.has(b.company_name.toLowerCase())) return false;
      return true;
    })
    .slice(0, maxLeads);

  if (!newBusinesses.length) {
    const r: PipelineResult = { added: 0, message: "All discovered businesses already in queue" };
    await recordPipelineRun(r);
    return r;
  }

  // ── Step 3: Serper contact lookup (free, parallel) ───────────────────────
  const withContactData = await fetchContactData(newBusinesses);

  // ── Step 4: Haiku enriches contact info (1 cheap call) ──────────────────
  const enrichedLeads = await enrichContactInfo(client, withContactData);

  // ── Dedup unsubscribes by email ──────────────────────────────────────────
  const emails = enrichedLeads.filter((l) => l.recipient_email).map((l) => l.recipient_email!.toLowerCase());
  let unsubEmails = new Set<string>();
  if (emails.length) {
    const { data: unsubscribed } = await sb.from("outreach_unsubscribes").select("email").in("email", emails);
    unsubEmails = new Set((unsubscribed ?? []).map((r: { email: string }) => r.email.toLowerCase()));
  }
  const finalLeads = enrichedLeads.filter(
    (l) => !l.recipient_email || !unsubEmails.has(l.recipient_email.toLowerCase()),
  );

  if (!finalLeads.length) {
    const r: PipelineResult = { added: 0, message: "All leads unsubscribed" };
    await recordPipelineRun(r);
    return r;
  }

  // ── Step 5: Sonnet drafts all emails in one call ──────────────────────────
  const drafts = await draftAllEmails(client, finalLeads, industry.label, settings.email_tone);

  if (!drafts.length) {
    const r: PipelineResult = { added: 0, message: "Email drafting failed" };
    await recordPipelineRun(r);
    return r;
  }

  // ── Step 6: Insert ───────────────────────────────────────────────────────
  const rows = drafts.map((d) => ({
    first_name: d.first_name,
    company_name: d.company_name,
    website_url: d.website_url,
    category: industry.slug,
    recipient_email: d.recipient_email ?? null,
    phone: d.phone,
    subject: d.subject,
    body_paragraphs: d.body_paragraphs,
    audit_findings: d.audit_findings,
    closing_paragraph: d.closing_paragraph,
    status: "pending",
  }));

  const { error } = await sb.from("outreach_leads").insert(rows);
  if (error) throw new Error(error.message);

  const result: PipelineResult = {
    added: rows.length,
    industry: industry.label,
    location,
    companies: rows.map((r) => r.company_name),
  };
  await recordPipelineRun(result);
  return result;
}
