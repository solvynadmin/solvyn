"use client";

import { usePathname } from "next/navigation";
import { logoutAction } from "../login/actions";
import { SendTestEmailButton } from "./SendTestEmailButton";

export function AdminHeader() {
  const pathname = usePathname();

  return (
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
            aria-current={pathname === "/admin" ? "page" : undefined}
            className={`text-sm px-2 py-1 rounded-md ${
              pathname === "/admin"
                ? "text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800"
                : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            }`}
          >
            Leads
          </a>
          <a
            href="/admin/settings"
            aria-current={pathname === "/admin/settings" ? "page" : undefined}
            className={`text-sm px-2 py-1 rounded-md ${
              pathname === "/admin/settings"
                ? "text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800"
                : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            }`}
          >
            Settings
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-5">
        <SendTestEmailButton />
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
