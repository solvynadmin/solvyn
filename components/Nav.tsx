"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-zinc-50/90 dark:bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800"
          : "bg-transparent"
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

        <a
          href="#contact"
          className="px-4 py-2 rounded-[7px] bg-teal-600 dark:bg-teal-400 text-white dark:text-zinc-900 text-sm font-medium hover:bg-teal-700 dark:hover:bg-teal-300 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
