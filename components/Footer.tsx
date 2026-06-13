import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Image
          src="/solvyn-wordmark-light-bg.svg"
          alt="Solvyn"
          width={96}
          height={22}
          className="dark:hidden"
        />
        <Image
          src="/solvyn-wordmark-dark-bg.svg"
          alt="Solvyn"
          width={96}
          height={22}
          className="hidden dark:block"
        />
        <div className="flex items-center gap-6">
          <p
            className="text-sm text-zinc-500 dark:text-zinc-400"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            &copy; {new Date().getFullYear()} Solvyn LLC
          </p>
          <a
            href="https://www.instagram.com/solvynconsulting/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solvyn on Instagram"
            className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
