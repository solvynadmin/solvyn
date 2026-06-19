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
Write in a direct, plain-spoken voice. No buzzwords, no corporate fluff.
Frame every finding around what it costs the business — lost leads, missed calls,
customers choosing a competitor — not technical jargon.
Keep the opening one sentence. Total email should feel like a 60-second read.
Never use em dashes. No bullet-point lists in the body paragraphs (those go in audit_findings only).
`.trim();
