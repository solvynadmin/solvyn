import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import { getSupabase } from "@/lib/supabase";
import { getResend } from "@/lib/resend";
import LeadConfirmation from "@/emails/LeadConfirmation";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, email, company, phone, budget, message } = body;

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const { error } = await getSupabase().from("leads").insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    company: company?.trim() || null,
    phone: phone?.trim() || null,
    budget: budget || null,
    message: message?.trim() || null,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (from && to) {
    try {
      const resend = getResend();
      const trimmedName = name.trim();
      const trimmedEmail = email.trim().toLowerCase();

      const [confirmResult, notifyResult] = await Promise.all([
        resend.emails.send({
          from,
          to: trimmedEmail,
          subject: `We got your message, ${trimmedName}`,
          html: await render(LeadConfirmation({ name: trimmedName })),
          text: [
            `Hi ${trimmedName},`,
            "",
            "Thanks for reaching out. We received your message and will follow up within one business day.",
            "",
            "If anything changes or you want to add more context before we connect, just reply to this email.",
            "",
            "Cameron",
            "Solvyn",
          ].join("\n"),
        }),
        resend.emails.send({
          from,
          to,
          subject: `New lead: ${trimmedName}${company?.trim() ? ` — ${company.trim()}` : ""}`,
          text: [
            `Name: ${trimmedName}`,
            `Email: ${trimmedEmail}`,
            company?.trim() ? `Company: ${company.trim()}` : null,
            phone?.trim() ? `Phone: ${phone.trim()}` : null,
            budget ? `Budget: ${budget}` : null,
            message?.trim() ? `\nMessage:\n${message.trim()}` : null,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      ]);

      if (confirmResult.error) console.error("Resend confirmation error:", confirmResult.error);
      if (notifyResult.error) console.error("Resend notification error:", notifyResult.error);
    } catch (emailErr) {
      console.error("Resend error:", emailErr);
    }
  } else {
    console.log("Skipping email — env vars not set");
  }

  return NextResponse.json({ success: true });
}
