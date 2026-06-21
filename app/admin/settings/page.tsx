import type { Metadata } from "next";
import { getPipelineSettings } from "@/lib/pipeline-settings";
import { SettingsForm } from "./_components/SettingsForm";

export const metadata: Metadata = { title: "Pipeline Settings" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getPipelineSettings();

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1
            className="text-lg font-medium text-zinc-900 dark:text-zinc-50"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Pipeline settings
          </h1>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
            Changes take effect on the next run.
          </p>
        </div>

        <SettingsForm settings={settings} />
      </main>
  );
}
