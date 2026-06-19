import type { Metadata } from "next";
import { getSupabase } from "@/lib/supabase";
import { logoutAction } from "./login/actions";
import { LeadCard } from "./_components/LeadCard";

export const metadata: Metadata = { title: "Lead Queue" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const sb = getSupabase();

  const [{ data: pending }, { data: sent }] = await Promise.all([
    sb
      .from("outreach_leads")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false }),
    sb
      .from("outreach_leads")
      .select("id, first_name, company_name, recipient_email, sent_at")
      .eq("status", "sent")
      .order("sent_at", { ascending: false })
      .limit(20),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Top bar */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4 flex items-center justify-between">
        <span
          className="text-base font-medium text-zinc-900 dark:text-zinc-50 flex items-center gap-[5px]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Solvyn
          <span className="inline-block w-[5px] h-[5px] rounded-full bg-teal-700 dark:bg-teal-400 mb-[1px]" />
          <span className="ml-1 text-zinc-400 dark:text-zinc-600 font-normal">Admin</span>
        </span>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Sign out
          </button>
        </form>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-12">

        {/* Pending queue */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h1
              className="text-xl font-medium text-zinc-900 dark:text-zinc-50"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Pending
            </h1>
            {pending?.length ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                {pending.length}
              </span>
            ) : null}
          </div>

          {!pending?.length ? (
            <p className="text-sm text-zinc-400 dark:text-zinc-600" style={{ fontFamily: "var(--font-inter)" }}>
              No leads in the queue. Run the prospecting pipeline to populate this.
            </p>
          ) : (
            <div className="space-y-3">
              {pending.map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          )}
        </section>

        {/* Sent log */}
        {sent?.length ? (
          <section>
            <h2
              className="text-base font-medium text-zinc-900 dark:text-zinc-50 mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Sent
            </h2>
            <div className="rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-800 overflow-hidden">
              {sent.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between px-5 py-3 gap-4">
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300" style={{ fontFamily: "var(--font-inter)" }}>
                      {lead.company_name}
                    </span>
                    <span className="text-sm text-zinc-400 dark:text-zinc-600 ml-2" style={{ fontFamily: "var(--font-inter)" }}>
                      {lead.first_name} &middot; {lead.recipient_email}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-600 shrink-0" style={{ fontFamily: "var(--font-inter)" }}>
                    {new Date(lead.sent_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

      </main>
    </div>
  );
}
