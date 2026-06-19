import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getSupabase } from "@/lib/supabase";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

type Status = "success" | "invalid" | "missing" | "error";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { e, t } = await searchParams;
  const email = typeof e === "string" ? e.trim().toLowerCase() : null;
  const token = typeof t === "string" ? t : null;

  let status: Status = "missing";

  if (email && token) {
    if (!verifyUnsubscribeToken(email, token)) {
      status = "invalid";
    } else {
      try {
        const { error } = await getSupabase()
          .from("outreach_unsubscribes")
          .upsert({ email }, { onConflict: "email" });
        status = error ? "error" : "success";
      } catch {
        status = "error";
      }
    }
  }

  const messages: Record<Status, { heading: string; body: string }> = {
    success: {
      heading: "You've been unsubscribed.",
      body: "Your email address has been removed from our outreach list. You won't receive any further messages from us.",
    },
    invalid: {
      heading: "This link isn't valid.",
      body: "The unsubscribe link may have expired or been modified. If you'd like to be removed from our list, reply directly to the email you received and we'll take care of it immediately.",
    },
    missing: {
      heading: "Missing information.",
      body: "This page requires a valid unsubscribe link. Please use the link from the email you received.",
    },
    error: {
      heading: "Something went wrong.",
      body: "We weren't able to process your request right now. Please reply directly to the email you received and we'll remove you manually.",
    },
  };

  const { heading, body } = messages[status];

  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-[70vh] flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-28">
          <div className="max-w-lg">
            <span
              className="inline-block h-px w-8 bg-teal-700 dark:bg-teal-400 mb-6"
              aria-hidden="true"
            />
            <h1
              className="text-3xl md:text-4xl font-medium text-zinc-900 dark:text-zinc-50 mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {heading}
            </h1>
            <p
              className="text-zinc-500 dark:text-zinc-400 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {body}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
