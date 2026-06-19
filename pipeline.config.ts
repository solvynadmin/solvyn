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
Consultative and curious, not declarative. Write like someone who looked at their site and has a genuine question, not like a scanner that found problems and is listing them. The tone is warm and direct — a person reaching out to another, not a company sending a campaign.

OBSERVATIONS VS VERDICTS
Frame findings as things noticed and worth asking about, not problems being declared. "I noticed X. Curious whether that's intentional" lands differently than "X is costing you Y." Both are specific; only one invites a conversation. Avoid "costing you," "losing you," or "hurting your" anywhere in the body or findings.

GUARDRAILS
- No fake urgency, manufactured scarcity, or invented deadlines. Hard fail.
- No social proof, client names, testimonials, or "businesses like yours" framing beyond the category reference in the intro. Solvyn does not have case studies yet.
- No em dashes anywhere in subject, body, or findings.
- No bullet lists outside the designated findings box.
- No links beyond what is in the signature. No calendar link.
- Do not use "free" in the subject line.
`.trim();
