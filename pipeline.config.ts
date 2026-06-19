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
OPENING
The first sentence must reference one specific, verifiable finding from the audit — a page name, broken element, or missing setup. No generic openers like "I noticed your website could use some work." If the audit found nothing specific enough to name, do not generate the email.

SUBJECT LINE
Name the specific finding, not the category. "Your contact form isn't reaching you" beats "Website audit for [Business Name]." No "Quick question" or "Following up" openers — those are recognized spam triggers.

BODY
Write in a direct, plain-spoken voice. No buzzwords, no corporate fluff.
Lead with the specific finding, then connect it to what it actually costs: missed leads, lost calls, a customer choosing a competitor instead. The cost framing only works when it follows a concrete, named detail. Without that anchor it reads as a generic threat and gets deleted.
Avoid stacking more than one cost claim. One real finding, clearly explained, is more credible than three vague ones.
Target 100-125 words total across both body paragraphs. If it is pushing past that, cut detail, not voice.
No bullet-point lists in body paragraphs. No em dashes, anywhere.

CLOSE
End with a single, specific ask. Examples: "Want me to send the full audit?" or "Worth a 10-minute call to walk through it?" One ask only. Do not stack a reply request and a calendar link in the same email.

SIGN-OFF
The email comes from Cameron, a named person, not "The Solvyn Team."

AUDIT_FINDINGS FIELD
This is where the full structured list of issues lives, used as the source the body draws its one citable detail from. Keep these factual and specific (e.g. "Contact form has no backend connected" not "lead capture issues").

GUARDRAILS
No fear-mongering or alarmist language. State the finding and its cost plainly; do not dramatize it.
No social proof, client names, or "businesses like yours" framing.
Treat plain text as the goal. No links beyond a single one if the ask requires it (e.g. booking link).
`.trim();
