"use client";

import { useState, useTransition } from "react";
import { triggerPipelineAction } from "../actions";
import type { PipelineResult } from "@/lib/pipeline-runner";

type Status =
  | { type: "idle" }
  | { type: "running" }
  | { type: "done"; result: PipelineResult }
  | { type: "error"; message: string };

function resultMessage(result: PipelineResult): { text: string; ok: boolean } {
  if ("skipped" in result && result.skipped) {
    return { text: result.message, ok: false };
  }
  if ("added" in result && result.added === 0 && !("companies" in result)) {
    return { text: (result as { added: number; message?: string }).message ?? "No new leads found.", ok: false };
  }
  if ("companies" in result) {
    return {
      text: `Added ${result.added} lead${result.added === 1 ? "" : "s"} — ${result.industry} in ${result.location}: ${result.companies.join(", ")}.`,
      ok: true,
    };
  }
  return { text: "Run complete.", ok: true };
}

export function RunPipelineButton({ lastRun }: { lastRun?: { ran_at: string; leads_added: number; skipped: boolean } | null }) {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [isPending, startTransition] = useTransition();

  function handleRun() {
    setStatus({ type: "running" });
    startTransition(async () => {
      try {
        const result = await triggerPipelineAction();
        setStatus({ type: "done", result });
      } catch (err) {
        setStatus({ type: "error", message: String(err) });
      }
    });
  }

  const running = isPending || status.type === "running";

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleRun}
        disabled={running}
        className="flex items-center gap-2 px-3 py-1.5 rounded-[7px] border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {running ? (
          <>
            <svg className="animate-spin w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Running...
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 2L11 6.5L2.5 11V2Z" fill="currentColor" />
            </svg>
            Run now
          </>
        )}
      </button>

      {status.type === "done" && (() => {
        const { text, ok } = resultMessage(status.result);
        return (
          <span
            className={`text-xs ${ok ? "text-teal-700 dark:text-teal-400" : "text-zinc-400 dark:text-zinc-500"}`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {text}
          </span>
        );
      })()}

      {status.type === "idle" && lastRun && (
        <span className="text-xs text-zinc-400 dark:text-zinc-500" style={{ fontFamily: "var(--font-inter)" }}>
          Last run {new Date(lastRun.ran_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
          {" · "}
          {lastRun.skipped ? "skipped" : `${lastRun.leads_added} lead${lastRun.leads_added === 1 ? "" : "s"} added`}
        </span>
      )}

      {status.type === "error" && (
        <span className="text-xs text-red-500 dark:text-red-400" style={{ fontFamily: "var(--font-inter)" }}>
          {status.message}
        </span>
      )}
    </div>
  );
}
