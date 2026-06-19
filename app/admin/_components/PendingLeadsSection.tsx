"use client";

import { useState, useTransition } from "react";
import { LeadCard } from "./LeadCard";
import { batchDiscardLeads } from "../actions";

type Lead = {
  id: string;
  first_name: string;
  company_name: string;
  website_url: string | null;
  category: string;
  recipient_email: string | null;
  phone: string | null;
  subject: string;
  body_paragraphs: string[];
  audit_findings: string[];
  closing_paragraph: string;
  status: string;
  created_at: string;
};

export function PendingLeadsSection({ leads }: { leads: Lead[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) =>
      prev.size === leads.length ? new Set() : new Set(leads.map((l) => l.id))
    );
  }

  function handleBatchDiscard() {
    const ids = [...selected];
    startTransition(async () => {
      await batchDiscardLeads(ids);
      setSelected(new Set());
    });
  }

  if (!leads.length) {
    return (
      <div className="rounded-[10px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-10 text-center">
        <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500 mb-1" style={{ fontFamily: "var(--font-inter)" }}>
          Queue is empty
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-600" style={{ fontFamily: "var(--font-inter)" }}>
          Hit <strong className="text-zinc-500 dark:text-zinc-500">Run now</strong> above to find leads, or check your{" "}
          <a href="/admin/settings" className="text-teal-700 dark:text-teal-400 hover:underline">
            pipeline settings
          </a>
          .
        </p>
      </div>
    );
  }

  const allSelected = selected.size === leads.length;
  const anySelected = selected.size > 0;

  return (
    <div className="space-y-3">
      {/* Batch toolbar */}
      <div className="flex items-center gap-3 px-1">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(el) => { if (el) el.indeterminate = anySelected && !allSelected; }}
            onChange={toggleAll}
            className="w-3.5 h-3.5 rounded border-zinc-300 dark:border-zinc-600 accent-teal-700 dark:accent-teal-400 cursor-pointer"
          />
          <span className="text-xs text-zinc-400 dark:text-zinc-500" style={{ fontFamily: "var(--font-inter)" }}>
            {anySelected ? `${selected.size} selected` : "Select all"}
          </span>
        </label>

        {anySelected && (
          <button
            type="button"
            onClick={handleBatchDiscard}
            disabled={isPending}
            className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isPending ? "Discarding..." : `Discard ${selected.size}`}
          </button>
        )}
      </div>

      {leads.map((lead) => (
        <LeadCard
          key={lead.id}
          lead={lead}
          selected={selected.has(lead.id)}
          onSelect={() => toggle(lead.id)}
        />
      ))}
    </div>
  );
}
