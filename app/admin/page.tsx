import type { Metadata } from "next";
import { getSupabase } from "@/lib/supabase";
import { logoutAction } from "./login/actions";
import { LeadCard } from "./_components/LeadCard";

export const metadata: Metadata = { title: "Lead Queue" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const sb = getSupabase();

  const [{ data: pending }, { data: sent }, { data: discarded }] = await Promise.all([
    sb.from("outreach_leads").select("*").eq("status", "pending").order("created_at", { ascending: false }),
    sb.from("outreach_leads").select("id, first_name, company_name, recipient_email, sent_at").eq("status", "sent").order("sent_at", { ascending: false }).limit(20),
    sb.from("outreach_leads").select("id", { count: "exact", head: true }).eq("status", "discarded"),
  ]);

  const pendingCount = pending?.length ?? 0;
  const sentCount = sent?.length ?? 0;
  const discardedCount = (discarded as unknown as { count: number } | null)?.count ?? 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">

      {/* Top bar */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
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

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1" style={{ fontFamily: "var(--font-inter)" }}>Pending</p>
            <p className="text-2xl font-medium text-zinc-900 dark:text-zinc-50" style={{ fontFamily: "var(--font-space-grotesk)" }}>{pendingCount}</p>
          </div>
          <div className="rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1" style={{ fontFamily: "var(--font-inter)" }}>Sent</p>
            <p className="text-2xl font-medium text-zinc-900 dark:text-zinc-50" style={{ fontFamily: "var(--font-space-grotesk)" }}>{sentCount}</p>
          </div>
          <div className="rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1" style={{ fontFamily: "var(--font-inter)" }}>Discarded</p>
            <p className="text-2xl font-medium text-zinc-900 dark:text-zinc-50" style={{ fontFamily: "var(--font-space-grotesk)" }}>{discardedCount}</p>
          </div>
        </div>

        {/* Pending queue */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h1
              className="text-lg font-medium text-zinc-900 dark:text-zinc-50"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Pending review
            </h1>
            {pendingCount > 0 && (
              <span
                className="text-xs px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 font-medium"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {pendingCount}
              </span>
            )}
          </div>

          {pendingCount === 0 ? (
            <div className="rounded-[10px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-10 text-center">
              <p
                className="text-sm font-medium text-zinc-400 dark:text-zinc-500 mb-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Queue is empty
              </p>
              <p
                className="text-sm text-zinc-400 dark:text-zinc-600"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                The pipeline will populate leads here automatically on its schedule,
                or you can trigger a run manually from the config.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pending!.map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          )}
        </section>

        {/* Sent log */}
        <section>
          <h2
            className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-5"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Sent
          </h2>

          {sentCount === 0 ? (
            <div className="rounded-[10px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-10 text-center">
              <p
                className="text-sm text-zinc-400 dark:text-zinc-600"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                No emails sent yet. Approve a lead above to send your first outreach.
              </p>
            </div>
          ) : (
            <div className="rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-800 overflow-hidden">
              {sent!.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between px-5 py-3.5 gap-4">
                  <div className="min-w-0">
                    <span
                      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {lead.company_name}
                    </span>
                    <span
                      className="text-sm text-zinc-400 dark:text-zinc-600 ml-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {lead.first_name} &middot; {lead.recipient_email}
                    </span>
                  </div>
                  <span
                    className="text-xs text-zinc-400 dark:text-zinc-600 shrink-0"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {new Date(lead.sent_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
