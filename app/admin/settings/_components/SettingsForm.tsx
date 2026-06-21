"use client";

import { useState, useTransition } from "react";
import { saveSettingsAction } from "../actions";
import type { PipelineSettings, IndustryConfig, Frequency } from "@/lib/pipeline-settings";
import { EMAIL_TONE } from "@/pipeline.config";

const FREQUENCY_OPTIONS: { value: Frequency; label: string; detail: string }[] = [
  { value: "daily",        label: "Daily",        detail: "Every day · 9 AM UTC / 2 AM AZ" },
  { value: "twice_weekly", label: "Twice a week", detail: "Mon & Thu · 9 AM UTC / 2 AM AZ" },
  { value: "weekly",       label: "Weekly",       detail: "Every Monday · 9 AM UTC / 2 AM AZ" },
  { value: "weekdays",     label: "Weekdays",     detail: "Mon–Fri · 9 AM UTC / 2 AM AZ" },
];

export function SettingsForm({ settings }: { settings: PipelineSettings }) {
  const [enabled, setEnabled] = useState(settings.enabled);
  const [industries, setIndustries] = useState<IndustryConfig[]>(settings.industries);
  const [locations, setLocations] = useState(settings.locations.join("\n"));
  const [maxLeads, setMaxLeads] = useState(settings.max_leads_per_run);
  const [emailTone, setEmailTone] = useState(settings.email_tone);
  const [frequency, setFrequency] = useState<Frequency>(settings.frequency);
  const [newIndustryLabel, setNewIndustryLabel] = useState("");
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [isPending, startTransition] = useTransition();

  function markDirty() { setSaved(false); setDirty(true); }

  function toggleIndustry(slug: string) {
    setIndustries((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, enabled: !i.enabled } : i))
    );
    markDirty();
  }

  function removeIndustry(slug: string) {
    setIndustries((prev) => prev.filter((i) => i.slug !== slug));
    markDirty();
  }

  function addIndustry() {
    const label = newIndustryLabel.trim();
    if (!label) return;
    const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    setIndustries((prev) => [...prev, { slug, label, enabled: true }]);
    setNewIndustryLabel("");
    markDirty();
  }

  function handleSave() {
    const formData = new FormData();
    formData.set("enabled", String(enabled));
    formData.set("industries", JSON.stringify(industries));
    formData.set("locations", locations);
    formData.set("max_leads_per_run", String(maxLeads));
    formData.set("frequency", frequency);
    formData.set("email_tone", emailTone);

    startTransition(async () => {
      await saveSettingsAction(formData);
      setSaved(true);
      setDirty(false);
    });
  }

  const label = (text: string) => (
    <p
      className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {text}
    </p>
  );

  const card = "rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-5 space-y-4";

  return (
    <div className="space-y-5">

      {/* Enable / disable */}
      <div className={card}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50" style={{ fontFamily: "var(--font-inter)" }}>
              Pipeline enabled
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
              When off, scheduled and manual runs are skipped.
            </p>
          </div>
          <button
            type="button"
            onClick={() => { setEnabled((v) => !v); markDirty(); }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              enabled ? "bg-teal-700 dark:bg-teal-400" : "bg-zinc-200 dark:bg-zinc-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Industries */}
      <div className={card}>
        {label("Industries")}
        <div className="space-y-2">
          {industries.map((industry) => (
            <div key={industry.slug} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleIndustry(industry.slug)}
                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none ${
                  industry.enabled ? "bg-teal-700 dark:bg-teal-400" : "bg-zinc-200 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                    industry.enabled ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm flex-1 ${
                  industry.enabled
                    ? "text-zinc-700 dark:text-zinc-300"
                    : "text-zinc-400 dark:text-zinc-600 line-through"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {industry.label}
              </span>
              <button
                type="button"
                onClick={() => removeIndustry(industry.slug)}
                className="text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors text-xs"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <input
            type="text"
            placeholder="Add industry (e.g. Law firms)"
            value={newIndustryLabel}
            onChange={(e) => setNewIndustryLabel(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addIndustry(); }}}
            className="flex-1 px-3 py-2 text-sm rounded-[7px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-400"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <button
            type="button"
            onClick={addIndustry}
            className="px-3 py-2 rounded-[7px] border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Locations */}
      <div className={card}>
        {label("Locations (one per line)")}
        <textarea
          value={locations}
          onChange={(e) => { setLocations(e.target.value); markDirty(); }}
          rows={6}
          className="w-full px-3 py-2 text-sm rounded-[7px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-400 resize-y"
          style={{ fontFamily: "var(--font-inter)" }}
        />
        <p className="text-xs text-zinc-400 dark:text-zinc-500" style={{ fontFamily: "var(--font-inter)" }}>
          Each run picks one location at random. Use specific city names (e.g. Scottsdale, AZ).
        </p>
      </div>

      {/* Max leads */}
      <div className={card}>
        {label("Max leads per run")}
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={20}
            value={maxLeads}
            onChange={(e) => { setMaxLeads(Number(e.target.value)); markDirty(); }}
            className="flex-1 accent-teal-700 dark:accent-teal-400"
          />
          <span
            className="text-sm font-medium text-zinc-900 dark:text-zinc-50 w-6 text-right"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {maxLeads}
          </span>
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-500" style={{ fontFamily: "var(--font-inter)" }}>
          How many new leads to find and draft emails for per run.
        </p>
      </div>

      {/* Frequency */}
      <div className={card}>
        {label("Run frequency")}
        <div className="grid grid-cols-2 gap-2">
          {FREQUENCY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { setFrequency(opt.value); markDirty(); }}
              className={`text-left px-4 py-3 rounded-[7px] border transition-colors ${
                frequency === opt.value
                  ? "border-teal-700 dark:border-teal-400 bg-teal-50 dark:bg-teal-950/30"
                  : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
              }`}
            >
              <p
                className={`text-sm font-medium ${frequency === opt.value ? "text-teal-700 dark:text-teal-400" : "text-zinc-700 dark:text-zinc-300"}`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {opt.label}
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                {opt.detail}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Email tone */}
      <div className={card}>
        <div className="flex items-center justify-between mb-2">
          <p
            className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Email tone instructions
          </p>
          {emailTone !== EMAIL_TONE && (
            <button
              type="button"
              onClick={() => { setEmailTone(EMAIL_TONE); markDirty(); }}
              className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Reset to default
            </button>
          )}
        </div>
        <textarea
          value={emailTone}
          onChange={(e) => { setEmailTone(e.target.value); markDirty(); }}
          rows={6}
          className="w-full px-3 py-2 text-sm rounded-[7px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-400 resize-y"
          style={{ fontFamily: "var(--font-inter)" }}
        />
        <p className="text-xs text-zinc-400 dark:text-zinc-500" style={{ fontFamily: "var(--font-inter)" }}>
          These instructions are passed directly to Claude when drafting each email. Be specific about tone, length, and what to avoid.
        </p>
      </div>

      {/* Save */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="px-5 py-2.5 rounded-[7px] bg-teal-700 dark:bg-teal-400 text-white dark:text-zinc-900 text-sm font-medium hover:bg-teal-800 dark:hover:bg-teal-300 transition-colors disabled:opacity-50"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {isPending ? "Saving..." : "Save settings"}
        </button>
        {saved && !dirty && (
          <span className="text-sm text-teal-700 dark:text-teal-400" style={{ fontFamily: "var(--font-inter)" }}>
            Saved.
          </span>
        )}
        {dirty && !isPending && (
          <span className="text-sm text-zinc-400 dark:text-zinc-500" style={{ fontFamily: "var(--font-inter)" }}>
            Unsaved changes
          </span>
        )}
      </div>

    </div>
  );
}
