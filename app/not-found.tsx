import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-40 pb-28 md:pb-36">
          <p
            className="text-sm font-medium text-teal-700 dark:text-teal-400 uppercase tracking-wide mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            404
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-5"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Page not found.
          </h1>
          <p
            className="text-lg text-zinc-500 dark:text-zinc-400 mb-10 max-w-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            That URL doesn&apos;t match anything here. Try heading back to the
            homepage.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-[7px] bg-teal-700 dark:bg-teal-400 text-white dark:text-zinc-900 font-medium text-base hover:bg-teal-800 dark:hover:bg-teal-300 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
