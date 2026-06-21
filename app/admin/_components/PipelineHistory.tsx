import type { PipelineRun } from "@/lib/pipeline-runs";

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });
}

export function PipelineHistory({ runs }: { runs: PipelineRun[] }) {
  if (!runs.length) {
    return (
      <section>
        <h2
          className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wide"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Pipeline history
        </h2>
        <div className="rounded-[10px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-10 text-center">
          <p className="text-sm text-zinc-400 dark:text-zinc-600" style={{ fontFamily: "var(--font-inter)" }}>
            No runs yet. Hit <strong className="text-zinc-500 dark:text-zinc-500">Run now</strong> above to start the pipeline.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2
        className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wide"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Pipeline history
      </h2>
      <div className="rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-800 overflow-hidden">
        {runs.map((run) => (
          <div key={run.id} className="flex items-center justify-between px-5 py-3 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {run.error ? (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              ) : run.skipped ? (
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0" />
              ) : run.leads_added > 0 ? (
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0" />
              )}
              <span
                className="text-sm text-zinc-600 dark:text-zinc-400 truncate"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {run.error
                  ? `Error: ${run.error}`
                  : run.skipped
                  ? (run.skip_reason ?? "Skipped")
                  : run.leads_added > 0
                  ? `${run.leads_added} lead${run.leads_added === 1 ? "" : "s"} added${run.industry ? ` · ${run.industry}` : ""}${run.location ? ` in ${run.location}` : ""}`
                  : "Ran — no new leads found"}
              </span>
            </div>
            <span
              className="text-xs text-zinc-400 dark:text-zinc-600 shrink-0"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {fmt(run.ran_at)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
