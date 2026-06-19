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

// Fetch real page HTML so Claude audits the actual site, not its assumptions
async function fetchPageContent(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html",
      },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return "";
    const html = await res.text();
    // Strip scripts, styles, comments — keep meaningful structure
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .slice(0, 8000);
  } catch {
    return "";
  }
}

function scrubEmDashes(text: string): string {
  // Split at em dash boundaries, capitalize each continuation, join with ". "
  const parts = text.split(/\s*—\s*/);
  return parts
    .map((part, i) => {
      const trimmed = part.trim();
      if (i === 0 || !trimmed) return trimmed;
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    })
    .filter(Boolean)
    .join(". ");
}

function scrubDraft(draft: {
  subject: string;
  audit_findings: string[];
  body_paragraphs: string[];
  closing_paragraph: string;
}) {
  return {
    subject: scrubEmDashes(draft.subject),
    audit_findings: draft.audit_findings.map(scrubEmDashes),
    body_paragraphs: draft.body_paragraphs.map(scrubEmDashes),
    closing_paragraph: scrubEmDashes(draft.closing_paragraph),
  };
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
- first_name: owner or contact first name if mentioned, otherwise ""
- recipient_email: email address if visible in the snippet, otherwise null
- phone: phone number if visible in the snippet, otherwise null

Return ONLY a JSON array, no other text:
[{"company_name":"...","website_url":"...","first_name":"","recipient_email":null,"phone":null}]
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
- If no first name found, set first_name to "".

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
  leads: (Business & { pageHtml: string })[],
  industryLabel: string,
  emailTone: string,
): Promise<LeadDraft[]> {
  const prompt = `
You are drafting cold outreach emails for Cameron Cons, founder of Solvyn, a Phoenix-based technology and AI consulting firm.

${emailTone}

For each business below you are given the actual HTML of their homepage. Use it to identify real, verifiable observations — do not speculate about anything you cannot confirm from the HTML. If the HTML is empty or too sparse, note that and base findings on what is provably absent rather than guessing what is present.

Businesses:
${leads.map((l, i) => `[${i}] ${l.company_name} | website: ${l.website_url ?? "none"} | category: ${industryLabel}
HOMEPAGE HTML:
${l.pageHtml || "No HTML retrieved — website may block crawlers or be unreachable. Only report on what is verifiably absent (e.g. no Google Business schema could be verified, no structured data found)."}`).join("\n\n---\n\n")}

AUDIT SCOPE — examine the actual HTML for each business across these areas:

GOOGLE DISCOVERABILITY
- Title tag: is it present and descriptive, or just the brand name / domain?
- Meta description: present and meaningful?
- LocalBusiness or other schema.org structured data in the HTML?
- Open Graph tags for social sharing?

SEO
- Is there an <h1>? Is the heading hierarchy logical (h1 → h2 → h3)?
- Do <img> tags have descriptive alt attributes, or are they empty/missing?
- Viewport meta tag present (mobile-ready signal)?
- Canonical tag present?

WEBSITE FLOW & LEAD GENERATION
- Is a phone number, email, or contact form visible in the <nav> or above-the-fold content — check the actual HTML before reporting it as missing.
- Is there a clear call-to-action button or link in the hero/header area?
- Is there a booking, scheduling, or inquiry form anywhere on the page?
- Is there a live chat widget or chatbot integration?

WCAG / ACCESSIBILITY
- Do images have alt text?
- Do form inputs have associated <label> elements?
- Is the <html> tag missing a lang attribute?

AUTOMATION & AI OPPORTUNITIES (based on business type and what is absent)
- Online scheduling or appointment booking integration (Calendly, Acuity, etc.)
- Lead capture chatbot or AI assistant
- Automated follow-up or email capture
- Industry-specific gaps: restaurants (online ordering, reservations), HVAC/plumbing (service scheduling, maintenance reminders), dental (patient intake, appointment reminders), auto repair (service history, online booking), landscaping (quote requests, recurring schedule)
- Any indication they are manually handling processes that could be automated

REQUIRED OUTPUT STRUCTURE (return a JSON array, same order as input):
[
  {
    "subject": "Under 60 chars. Name the specific page or element noticed, phrased neutrally. Example: 'Your contact page on [Business]' or 'A note on [Business]s search setup.' No cost claims. No 'free.' No 'Quick question' or 'Following up.'",
    "audit_findings": [
      "Bullet 1 — most immediately visible or impactful finding from the HTML. State what is there or not there, plainly. No 'costing you' framing. 15-25 words. Must be verifiable from the HTML provided.",
      "Bullet 2 — a second distinct finding from a different audit area (SEO, accessibility, automation gap, or lead gen). Same plain observation style. 15-25 words. Must be verifiable from the HTML or its absence."
    ],
    "body_paragraphs": [
      "INTRO — Exactly 2 sentences. Sentence 1: 'I'm Cameron, I run Solvyn, a Phoenix-based technology and AI consulting firm.' Sentence 2: 'We work with [category label, e.g. local restaurants / HVAC contractors / dental offices] to take a closer look at how their business shows up online and where technology can do more of the work.'",
      "OBSERVATION — 2 sentences. Sentence 1: 'Taking a look at [specific page or element confirmed in the HTML], I noticed [concrete finding from the HTML].' Sentence 2: 'Curious whether that's intentional or something that's been on your list.' Must reference something real and specific from the HTML. No guessing.",
      "CONSULTATION OFFER — Keep core language but adapt the scope list to what the audit actually surfaced: 'We offer a free initial consultation, no cost and no commitment, where I'll walk through how [company name] shows up across Google search, your site's SEO and accessibility, whether visitors have a clear next step, and where automation or AI tools could take work off your plate.'",
      "GENUINE QUESTION — One open question inviting their perspective: 'What feels like it's working well right now, and is there anything on the digital side you've been meaning to get to?' Must read as a real question, not a rhetorical setup."
    ],
    "closing_paragraph": "Worth 15 minutes this week to talk through it? Reply and I'll send over a few times that work. No pressure if it's not a priority right now."
  }
]

CALIBRATION EXAMPLE — Little Mesa Cafe (category: local restaurants, website: ourlittlemesacafe.com):
subject: "Your contact page on Little Mesa Cafe"
audit_findings[0]: "The contact form has no <label> elements on its fields and no visible confirmation state in the HTML."
audit_findings[1]: "No schema.org LocalBusiness or Restaurant markup found, which limits how Google displays the business in local search results."
body_paragraphs[0]: "I'm Cameron, I run Solvyn, a Phoenix-based technology and AI consulting firm. We work with local restaurants to take a closer look at how their business shows up online and where technology can do more of the work."
body_paragraphs[1]: "Taking a look at your Contact page, I noticed the form fields have no labels attached in the HTML. Curious whether that's intentional or something that's been on your list."
body_paragraphs[2]: "We offer a free initial consultation, no cost and no commitment, where I'll walk through how Little Mesa Cafe shows up across Google search, your site's SEO and accessibility, whether visitors have a clear next step, and where automation or AI tools could take work off your plate."
body_paragraphs[3]: "What feels like it's working well right now, and is there anything on the digital side you've been meaning to get to?"
closing_paragraph: "Worth 15 minutes this week to talk through it? Reply and I'll send over a few times that work. No pressure if it's not a priority right now."

HARD RULES:
- Only report findings you can verify from the HTML provided. If a phone number appears in the <nav> HTML, do not say it is missing.
- If images are present in the HTML (img src attributes exist), do not claim images are not loading — you cannot verify rendering.
- No em dashes anywhere. Use a period or rephrase.
- No bullet lists inside body_paragraphs.
- body_paragraphs must be exactly 4 items in the order above.
- audit_findings must be exactly 2 items. Do NOT repeat the observation already used in body_paragraphs[1].
- No cost-verdict language ("costing you," "losing you," "hurting your").
- closing_paragraph must match the calibration example exactly.
- Return ONLY the JSON array, no other text.
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
    ...scrubDraft(drafts[i] ?? { subject: "", audit_findings: [], body_paragraphs: [], closing_paragraph: "" }),
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

  // ── Step 5: Fetch real page HTML (parallel, no Claude) ───────────────────
  const leadsWithHtml = await Promise.all(
    finalLeads.map(async (lead) => ({
      ...lead,
      pageHtml: lead.website_url ? await fetchPageContent(lead.website_url) : "",
    }))
  );

  // ── Step 6: Sonnet drafts all emails in one call ──────────────────────────
  const drafts = await draftAllEmails(client, leadsWithHtml, industry.label, settings.email_tone);

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
