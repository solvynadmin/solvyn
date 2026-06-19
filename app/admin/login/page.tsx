import type { Metadata } from "next";
import { loginAction } from "./actions";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <span
            className="text-xl font-medium text-zinc-900 dark:text-zinc-50"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Solvyn
            <span className="inline-block w-[5px] h-[5px] rounded-full bg-teal-700 dark:bg-teal-400 ml-[5px] mb-[2px] align-middle" />
          </span>
          <p
            className="mt-2 text-sm text-zinc-500 dark:text-zinc-400"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Admin access
          </p>
        </div>

        <form action={loginAction} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full px-3 py-2.5 rounded-[7px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 text-sm outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-400 focus:border-transparent transition-shadow"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {error && (
            <p
              className="text-sm text-red-600 dark:text-red-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Incorrect password.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-[7px] bg-teal-700 dark:bg-teal-400 text-white dark:text-zinc-900 text-sm font-medium hover:bg-teal-800 dark:hover:bg-teal-300 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
