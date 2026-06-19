import type { Metadata } from "next";
import { logoutAction } from "../login/actions";
import { getPipelineSettings } from "@/lib/pipeline-settings";
import { SettingsForm } from "./_components/SettingsForm";

export const metadata: Metadata = { title: "Pipeline Settings" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getPipelineSettings();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-5">
          <span
            className="text-base font-medium text-zinc-900 dark:text-zinc-50 flex items-center gap-[5px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Solvyn
            <span className="inline-block w-[5px] h-[5px] rounded-full bg-teal-700 dark:bg-teal-400 mb-[1px]" />
            <span className="ml-1 text-zinc-400 dark:text-zinc-600 font-normal">Admin</span>
          </span>
          <nav className="flex items-center gap-1" style={{ fontFamily: "var(--font-inter)" }}>
            <a
              href="/admin"
              className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 px-2 py-1 rounded-md transition-colors"
            >
              Leads
            </a>
            <a
              href="/admin/settings"
              className="text-sm text-zinc-900 dark:text-zinc-50 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800"
            >
              Settings
            </a>
          </nav>
        </div>
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
    </div>
  );
}
