import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import { getSupabase } from "@/lib/supabase";
import { buildUnsubscribeUrl } from "@/lib/unsubscribe";
import OutreachEmail from "@/emails/OutreachEmail";

function authOk(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  const token = process.env.ADMIN_SESSION_TOKEN;
  return token && session === token;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authOk(req)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const { data: lead, error } = await getSupabase()
    .from("outreach_leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !lead) {
    return new NextResponse("Lead not found", { status: 404 });
  }

  const unsubscribeUrl = lead.recipient_email
    ? buildUnsubscribeUrl(lead.recipient_email)
    : "https://www.solvynconsulting.com/unsubscribe?e=preview&t=preview";

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

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
