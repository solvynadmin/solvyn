"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Image from "next/image";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
      setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const contactHref = pathname === "/" ? "#contact" : "/contact";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        scrolled || menuOpen
          ? "bg-zinc-50/90 dark:bg-zinc-900/90 backdrop-blur-sm border-zinc-200 dark:border-zinc-800"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <a href="/" aria-label="Solvyn home">
          <Image
            src="/solvyn-wordmark-light-bg.svg"
            alt="Solvyn"
            width={120}
            height={28}
            className="dark:hidden"
            priority
          />
          <Image
            src="/solvyn-wordmark-dark-bg.svg"
            alt="Solvyn"
            width={120}
            height={28}
            className="hidden dark:block"
            priority
          />
        </a>

        <div className="flex items-center gap-3">
          <a
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            className={`hidden sm:block px-3 py-2 text-sm transition-colors ${
              pathname === "/about"
                ? "text-zinc-900 dark:text-zinc-50 font-medium"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            About
          </a>

          <button
            onClick={toggleTheme}
            aria-label={mounted && resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-[7px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {mounted && resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <a
            href={contactHref}
            className="hidden sm:inline-block px-4 py-2 rounded-[7px] bg-teal-700 dark:bg-teal-400 text-white dark:text-zinc-900 text-sm font-medium hover:bg-teal-800 dark:hover:bg-teal-300 transition-colors whitespace-nowrap"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Get in touch
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden p-2 rounded-[7px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-zinc-200 dark:border-zinc-800 px-6 py-4 space-y-1" style={{ fontFamily: "var(--font-inter)" }}>
          <a
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-[7px] text-sm transition-colors ${
              pathname === "/about"
                ? "text-zinc-900 dark:text-zinc-50 font-medium bg-zinc-100 dark:bg-zinc-800"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            About
          </a>
          <a
            href={contactHref}
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2.5 rounded-[7px] text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Get in touch
          </a>
        </div>
      )}
    </header>
  );
}
