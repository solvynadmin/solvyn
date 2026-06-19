/**
 * Prospecting pipeline configuration.
 *
 * Edit this file to change:
 *   - Industries targeted
 *   - Phoenix-area locations
 *   - How many leads to find per run
 *   - Email tone / style instructions for the AI
 *   - Cron schedule (also update vercel.json to match)
 */

export type Industry = {
  slug: string;
  label: string;
};

export const INDUSTRIES: Industry[] = [
  { slug: "hvac_plumbing_roofing", label: "HVAC, plumbing, and roofing contractors" },
  { slug: "restaurant", label: "local restaurants and cafes" },
  { slug: "auto_repair", label: "auto repair and mechanic shops" },
  { slug: "dental_chiropractic", label: "dental offices and chiropractic clinics" },
  { slug: "landscaping", label: "landscaping and lawn care businesses" },
];

export const LOCATIONS: string[] = [
  "Phoenix, AZ",
  "Scottsdale, AZ",
  "Tempe, AZ",
  "Chandler, AZ",
  "Gilbert, AZ",
  "Mesa, AZ",
];

/** How many new leads to add per pipeline run. */
export const MAX_LEADS_PER_RUN = 5;

/**
 * Cron schedule — runs every Monday at 9 AM UTC (2 AM Phoenix time).
 * To change frequency, update this AND the schedule in vercel.json.
 *
 * Examples:
 *   Daily at 9 AM UTC:    "0 9 * * *"
 *   Twice a week (Mon/Thu): "0 9 * * 1,4"
 *   Every weekday:        "0 9 * * 1-5"
 */
export const CRON_SCHEDULE = "0 9 * * 1";

/**
 * Email tone instructions passed to Claude.
 * Change this to shift how emails are written — more casual, more formal, shorter, etc.
 */
export const EMAIL_TONE = `
VOICE
Direct and plain-spoken. No buzzwords, no corporate fluff. Write like one person emailing another, not like a company sending a campaign. The specificity of the finding should carry the persuasive weight — not adjectives, not dramatizing language, not stacked claims.

URGENCY
Urgency comes from cost-of-inaction stated as fact. It is fine to let the reader feel that the problem is costing them something every day it goes unfixed, because that is true and verifiable. It is not fine to manufacture artificial deadlines, limited-slot claims, or "before your competitor finds out" framing. A generated draft that includes a fake deadline or scarcity claim is a hard fail, not a style note.

GUARDRAILS
- No fear-mongering or alarmist language ("this is a serious problem," "you're losing thousands"). State the finding and its cost plainly.
- No social proof, client names, testimonials, or "businesses like yours" framing beyond the category-specific founder intro line. Solvyn does not have case studies yet.
- No em dashes anywhere in subject, body, or findings. No bullet lists outside the designated findings box.
- No links beyond a single one if the CTA requires it. Image-heavy or link-heavy first-touch emails hurt deliverability and read as automated.
- Do not stack more than one cost claim in the body. One real finding, clearly explained, is more credible than three vague ones.
`.trim();
