import type { Metadata } from "next";
import { getSupabase } from "@/lib/supabase";
import { getRecentRuns } from "@/lib/pipeline-runs";
import { RunPipelineButton } from "./_components/RunPipelineButton";
import { PendingLeadsSection } from "./_components/PendingLeadsSection";
import { PipelineHistory } from "./_components/PipelineHistory";

export const metadata: Metadata = { title: "Lead Queue" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const sb = getSupabase();

  const [{ data: pending }, { data: sent, count: sentTotal }, { data: discarded }, runs] = await Promise.all([
    sb.from("outreach_leads").select("*").eq("status", "pending").order("created_at", { ascending: false }),
    sb.from("outreach_leads").select("id, first_name, company_name, recipient_email, sent_at", { count: "exact" }).eq("status", "sent").order("sent_at", { ascending: false }).limit(20),
    sb.from("outreach_leads").select("id", { count: "exact", head: true }).eq("status", "discarded"),
    getRecentRuns(10),
  ]);

  const pendingCount = pending?.length ?? 0;
  const sentCount = sentTotal ?? 0;
  const discardedCount = (discarded as unknown as { count: number } | null)?.count ?? 0;
  const lastRun = runs[0] ?? null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Pending", count: pendingCount },
            { label: "Sent", count: sentCount },
            { label: "Discarded", count: discardedCount },
          ].map(({ label, count }) => {
            const urgent = label === "Pending" && count > 0;
            return (
              <div
                key={label}
                className={`rounded-[10px] border px-5 py-4 transition-colors ${
                  urgent
                    ? "border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/30"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                }`}
              >
                <p className={`text-xs mb-1 ${urgent ? "text-teal-700 dark:text-teal-400" : "text-zinc-400 dark:text-zinc-500"}`} style={{ fontFamily: "var(--font-inter)" }}>{label}</p>
                <p className={`text-2xl font-medium ${urgent ? "text-teal-700 dark:text-teal-300" : "text-zinc-900 dark:text-zinc-50"}`} style={{ fontFamily: "var(--font-space-grotesk)" }}>{count}</p>
              </div>
            );
          })}
        </div>

        {/* Run pipeline */}
        <RunPipelineButton lastRun={lastRun} />

        {/* Pending queue */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h1 className="text-lg font-medium text-zinc-900 dark:text-zinc-50" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Pending review
            </h1>
            {pendingCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                {pendingCount}
              </span>
            )}
          </div>
          <PendingLeadsSection leads={pending ?? []} />
        </section>

        {/* Sent log */}
        <section>
          <div className="flex items-baseline gap-3 mb-5">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Sent
            </h2>
            {sentCount > 20 && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500" style={{ fontFamily: "var(--font-inter)" }}>
                showing last 20 of {sentCount}
              </span>
            )}
          </div>
          {sentCount === 0 ? (
            <div className="rounded-[10px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-10 text-center">
              <p className="text-sm text-zinc-400 dark:text-zinc-600" style={{ fontFamily: "var(--font-inter)" }}>
                No emails sent yet. Approve a lead above to send your first outreach.
              </p>
            </div>
          ) : (
            <div className="rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-800 overflow-hidden">
              {sent!.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between px-5 py-3.5 gap-4">
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
          )}
        </section>

        {/* Pipeline history */}
        <PipelineHistory runs={runs} />

      </main>
  );
}
