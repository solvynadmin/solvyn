"use client";

import { useState, useTransition } from "react";
import { sendTestEmailAction } from "../actions";

export function SendTestEmailButton() {
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [result, setResult] = useState<"sent" | "error" | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSend() {
    if (!to.trim()) return;
    startTransition(async () => {
      try {
        await sendTestEmailAction(to.trim());
        setResult("sent");
        setTimeout(() => { setResult(null); setOpen(false); }, 3000);
      } catch {
        setResult("error");
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Send test email
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="email"
        placeholder="your@email.com"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") handleSend(); if (e.key === "Escape") setOpen(false); }}
        autoFocus
        className="px-3 py-1.5 text-sm rounded-[7px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-400 w-52"
        style={{ fontFamily: "var(--font-inter)" }}
      />
      <button
        onClick={handleSend}
        disabled={isPending || !to.trim()}
        className="px-3 py-1.5 rounded-[7px] bg-teal-700 dark:bg-teal-400 text-white dark:text-zinc-900 text-sm font-medium hover:bg-teal-800 dark:hover:bg-teal-300 transition-colors disabled:opacity-40"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {isPending ? "Sending..." : result === "sent" ? "Sent" : "Send"}
      </button>
      <button
        onClick={() => { setOpen(false); setResult(null); }}
        className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Cancel
      </button>
      {result === "error" && (
        <span className="text-xs text-red-500" style={{ fontFamily: "var(--font-inter)" }}>Failed to send.</span>
      )}
    </div>
  );
}
