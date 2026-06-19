"use client";

import { useState, useTransition } from "react";
import { sendLeadEmail, discardLead, updateLeadDraft, updateLeadEmail } from "../actions";

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

const categoryLabel: Record<string, string> = {
  hvac_plumbing_roofing: "HVAC / Plumbing / Roofing",
  restaurant: "Restaurant",
};

export function LeadCard({ lead, selected, onSelect }: { lead: Lead; selected?: boolean; onSelect?: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [subject, setSubject] = useState(lead.subject);
  const [findings, setFindings] = useState(lead.audit_findings.join("\n"));
  const [bodyParas, setBodyParas] = useState(lead.body_paragraphs.join("\n\n"));
  const [closing, setClosing] = useState(lead.closing_paragraph);
  const [emailInput, setEmailInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSaveEmail() {
    if (!emailInput.trim()) return;
    startTransition(async () => {
      await updateLeadEmail(lead.id, emailInput.trim());
      lead.recipient_email = emailInput.trim().toLowerCase();
    });
  }

  function handleSend() {
    startTransition(async () => {
      const res = await sendLeadEmail(lead.id);
      setResult(res.ok ? "sent" : "unsubscribed");
    });
  }

  function handleDiscard() {
    startTransition(async () => {
      await discardLead(lead.id);
    });
  }

  function handleSaveEdit() {
    startTransition(async () => {
      await updateLeadDraft(lead.id, {
        subject,
        body_paragraphs: bodyParas.split("\n\n").map((p) => p.trim()).filter(Boolean),
        audit_findings: findings.split("\n").map((f) => f.trim()).filter(Boolean),
        closing_paragraph: closing,
      });
      setEditing(false);
    });
  }

  const date = new Date(lead.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const displayName =
    lead.first_name && lead.first_name !== "there" && lead.first_name.trim() !== ""
      ? lead.first_name
      : null;

  if (result === "sent") {
    return (
      <div className="rounded-[10px] border border-teal-200 dark:border-teal-900 bg-teal-50 dark:bg-teal-950/30 px-5 py-4 flex items-center gap-3">
        <span className="text-teal-700 dark:text-teal-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
          Sent to {displayName ? `${displayName} at ` : ""}{lead.company_name}.
        </span>
      </div>
    );
  }

  if (result === "unsubscribed") {
    return (
      <div className="rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-5 py-4">
        <span className="text-zinc-500 dark:text-zinc-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
          {lead.company_name} is unsubscribed. Lead discarded.
        </span>
      </div>
    );
  }

  return (
    <div className={`rounded-[10px] border bg-white dark:bg-zinc-900 overflow-hidden transition-colors ${
      selected
        ? "border-teal-300 dark:border-teal-700"
        : "border-zinc-200 dark:border-zinc-800"
    }`}>
      {/* Header */}
      <div
        className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer select-none"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-start gap-3 min-w-0">
          {onSelect && (
            <input
              type="checkbox"
              checked={!!selected}
              onChange={(e) => { e.stopPropagation(); onSelect(); }}
              onClick={(e) => e.stopPropagation()}
              className="mt-1 w-3.5 h-3.5 rounded border-zinc-300 dark:border-zinc-600 accent-teal-700 dark:accent-teal-400 cursor-pointer shrink-0"
            />
          )}
          <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-base font-medium text-zinc-900 dark:text-zinc-50"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {lead.company_name}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-900/60" style={{ fontFamily: "var(--font-inter)" }}>
              {categoryLabel[lead.category] ?? lead.category}
            </span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
            {displayName ?? <span className="text-zinc-400 dark:text-zinc-500 italic">no name</span>}
            {lead.recipient_email ? ` · ${lead.recipient_email}` : (
              <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">no email</span>
            )}
            {lead.phone ? ` · ${lead.phone}` : ""}
            {lead.website_url ? (
              <>
                {" · "}
                <a
                  href={lead.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 dark:text-teal-400 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {lead.website_url.replace(/^https?:\/\//, "")}
                </a>
              </>
            ) : null}
          </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-zinc-400 dark:text-zinc-600" style={{ fontFamily: "var(--font-inter)" }}>{date}</span>
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            className={`text-zinc-400 transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
          >
            <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-zinc-100 dark:border-zinc-800 px-5 py-5 space-y-5">

          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>Subject</label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-[7px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-400"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>Body paragraphs (separate with blank line)</label>
                <textarea
                  value={bodyParas}
                  onChange={(e) => setBodyParas(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 text-sm rounded-[7px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-400 resize-y"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>Audit findings (one per line)</label>
                <textarea
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 text-sm rounded-[7px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-400 resize-y"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>Closing paragraph</label>
                <textarea
                  value={closing}
                  onChange={(e) => setClosing(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-[7px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-400 resize-y"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Subject</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300" style={{ fontFamily: "var(--font-inter)" }}>{lead.subject}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-2" style={{ fontFamily: "var(--font-inter)" }}>What's costing them leads</p>
                <ul className="space-y-1.5">
                  {lead.audit_findings.map((f, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-sm text-zinc-600 dark:text-zinc-400" style={{ fontFamily: "var(--font-inter)" }}>
                      <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-teal-600 dark:bg-teal-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>Email body</p>
                <div className="space-y-2">
                  {lead.body_paragraphs.map((p, i) => (
                    <p key={i} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{p}</p>
                  ))}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{lead.closing_paragraph}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-1">
            {!lead.recipient_email && (
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Add email address to send"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleSaveEmail(); }}}
                  className="flex-1 px-3 py-2 text-sm rounded-[7px] border border-amber-200 dark:border-amber-800 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
                <button
                  onClick={handleSaveEmail}
                  disabled={isPending || !emailInput.trim()}
                  className="px-3 py-2 rounded-[7px] border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Save
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <button
                    onClick={handleSaveEdit}
                    disabled={isPending}
                    className="px-4 py-2 rounded-[7px] bg-teal-700 dark:bg-teal-400 text-white dark:text-zinc-900 text-sm font-medium hover:bg-teal-800 dark:hover:bg-teal-300 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {isPending ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    disabled={isPending}
                    className="px-4 py-2 rounded-[7px] border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSend}
                    disabled={isPending || !lead.recipient_email}
                    title={!lead.recipient_email ? "Add an email address first" : undefined}
                    className="px-4 py-2 rounded-[7px] bg-teal-700 dark:bg-teal-400 text-white dark:text-zinc-900 text-sm font-medium hover:bg-teal-800 dark:hover:bg-teal-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {isPending ? "Sending..." : "Send"}
                  </button>
                  <a
                    href={`/admin/preview/${lead.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-[7px] border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Preview
                  </a>
                  <button
                    onClick={() => setEditing(true)}
                    disabled={isPending}
                    className="px-4 py-2 rounded-[7px] border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDiscard}
                    disabled={isPending}
                    className="px-4 py-2 rounded-[7px] text-sm text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Discard
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
