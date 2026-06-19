"use server";

import { revalidatePath } from "next/cache";
import { render } from "@react-email/components";
import { runPipeline, type PipelineResult } from "@/lib/pipeline-runner";

export async function triggerPipelineAction(): Promise<PipelineResult> {
  const result = await runPipeline({ force: true });
  revalidatePath("/admin");
  return result;
}
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

  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (!fromEmail) throw new Error("CONTACT_FROM_EMAIL not set");

  const { error: sendError } = await getResend().emails.send({
    from: `Cameron from Solvyn <${fromEmail}>`,
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

export async function batchDiscardLeads(ids: string[]) {
  if (!ids.length) return;
  await getSupabase()
    .from("outreach_leads")
    .update({ status: "discarded" })
    .in("id", ids);
  revalidatePath("/admin");
}

export async function updateLeadEmail(id: string, email: string) {
  await getSupabase()
    .from("outreach_leads")
    .update({ recipient_email: email.trim().toLowerCase() })
    .eq("id", id);
  revalidatePath("/admin");
}

export async function sendTestEmailAction(to: string) {
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (!fromEmail) throw new Error("CONTACT_FROM_EMAIL not set");

  const html = await render(
    OutreachEmail({
      firstName: "Jim",
      companyName: "Canyon State Roofing",
      bodyParagraphs: [
        "Your website photos aren't loading, so the first thing most visitors see is blank boxes where your work should be.",
        "I'm Cameron, I run Solvyn, a Phoenix-based consulting firm. I fix exactly this kind of thing for local contractors, no retainer required.",
      ],
      auditFindings: [
        "Homepage photos aren't loading, so visitors see blank boxes instead of your work before they decide to call.",
        "Your estimate form asks 8 questions before someone can submit, and most people drop off after 3.",
        "Your ratings and years in business aren't surfacing in Google results, costing you clicks to competitors with weaker reputations.",
      ],
      closingParagraph: "Want me to send the full audit?",
      unsubscribeUrl: "https://www.solvynconsulting.com/unsubscribe?e=test&t=preview",
    })
  );

  const { error } = await getResend().emails.send({
    from: `Cameron from Solvyn <${fromEmail}>`,
    to,
    subject: "[Test] Solvyn outreach email preview",
    html,
  });

  if (error) throw new Error(error.message);
  return { ok: true };
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
