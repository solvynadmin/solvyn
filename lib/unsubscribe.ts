import { createHmac, timingSafeEqual } from "crypto";

function secret(): string {
  const s = process.env.UNSUBSCRIBE_SECRET;
  if (!s) throw new Error("UNSUBSCRIBE_SECRET is not set");
  return s;
}

export function generateUnsubscribeToken(email: string): string {
  return createHmac("sha256", secret())
    .update(email.trim().toLowerCase())
    .digest("hex");
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = generateUnsubscribeToken(email);
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(token));
  } catch {
    return false;
  }
}

export function buildUnsubscribeUrl(email: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.solvynconsulting.com";
  const token = generateUnsubscribeToken(email);
  return `${base}/unsubscribe?e=${encodeURIComponent(email)}&t=${token}`;
}
