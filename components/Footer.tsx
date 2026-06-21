import Image from "next/image";
import { CurrentYear } from "@/components/CurrentYear";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10">
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {/* Logo */}
        <Image
          src="/solvyn-wordmark-light-bg.svg"
          alt="Solvyn"
          width={96}
          height={22}
          className="dark:hidden shrink-0"
        />
        <Image
          src="/solvyn-wordmark-dark-bg.svg"
          alt="Solvyn"
          width={96}
          height={22}
          className="hidden dark:block shrink-0"
        />

        {/* Nav links */}
        <nav className="flex items-center gap-5" aria-label="Footer navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Legal + social */}
        <div className="flex items-center gap-5">
          <p className="text-sm text-zinc-400 dark:text-zinc-600">
            &copy; <CurrentYear /> Solvyn LLC
          </p>
          <a
            href="/privacy"
            className="text-sm text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="text-sm text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            Terms
          </a>
          <a
            href="https://www.linkedin.com/company/solvynconsulting/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solvyn on LinkedIn"
            className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="4" ry="4" />
              <line x1="8" y1="11" x2="8" y2="16" />
              <line x1="8" y1="8" x2="8" y2="8.01" />
              <line x1="12" y1="16" x2="12" y2="11" />
              <path d="M16 16v-3a2 2 0 0 0-4 0" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/solvynconsulting/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solvyn on Instagram"
            className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
