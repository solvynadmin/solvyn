"use server";

import { revalidatePath } from "next/cache";
import { render } from "@react-email/components";
import { getSupabase } from "@/lib/supabase";
import { getResend } from "@/lib/resend";
import { buildUnsubscribeUrl } from "@/lib/unsubscribe";
import OutreachEmail from "@/emails/OutreachEmail";

export async function sendLeadEmail(id: string) {
  const sb = getSupabase();

  const { data: lead, error: fetchError } = await sb
    .from("outreach_leads")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !lead) throw new Error("Lead not found");
  if (lead.status !== "pending") throw new Error("Lead already actioned");

  const { data: unsub } = await sb
    .from("outreach_unsubscribes")
    .select("email")
    .eq("email", lead.recipient_email.toLowerCase())
    .maybeSingle();

  if (unsub) {
    await sb.from("outreach_leads").update({ status: "discarded", notes: "Unsubscribed" }).eq("id", id);
    revalidatePath("/admin");
    return { ok: false, reason: "unsubscribed" };
  }

  const unsubscribeUrl = buildUnsubscribeUrl(lead.recipient_email);

  const html = await render(
    OutreachEmail({
      firstName: lead.first_name,
      companyName: lead.company_name,
      bodyParagraphs: lead.body_paragraphs,
      auditFindings: lead.audit_findings,
      closingParagraph: lead.closing_paragraph,
      unsubscribeUrl,
    })
  );

  const from = process.env.CONTACT_FROM_EMAIL;
  if (!from) throw new Error("CONTACT_FROM_EMAIL not set");

  const { error: sendError } = await getResend().emails.send({
    from,
    to: lead.recipient_email,
    subject: lead.subject,
    html,
  });

  if (sendError) throw new Error(sendError.message);

  await sb
    .from("outreach_leads")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/admin");
  return { ok: true };
}

export async function discardLead(id: string) {
  await getSupabase()
    .from("outreach_leads")
    .update({ status: "discarded" })
    .eq("id", id);
  revalidatePath("/admin");
}

export async function updateLeadDraft(
  id: string,
  patch: {
    subject?: string;
    body_paragraphs?: string[];
    audit_findings?: string[];
    closing_paragraph?: string;
  }
) {
  await getSupabase()
    .from("outreach_leads")
    .update(patch)
    .eq("id", id);
  revalidatePath("/admin");
}
