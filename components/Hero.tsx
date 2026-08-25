"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[85vh] flex items-center pt-16 overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(113,113,122,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 py-28 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mb-6"
          >
            <span
              className="inline-block h-px w-8 bg-teal-700 dark:bg-teal-400"
              aria-hidden="true"
            />
            <span
              className="text-sm font-medium text-teal-700 dark:text-teal-400 tracking-wide uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Technology &amp; AI Consulting
            </span>
          </motion.div>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="text-5xl md:text-[62px] font-bold text-zinc-900 dark:text-zinc-50 leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Your business, running the way you intended.
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10 max-w-2xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Most small business owners are managing their technology instead of
            using it. Solvyn takes you from scope to deployment and stays
            involved after launch, so you&apos;re not stuck stitching together tools
            that don&apos;t talk to each other.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
            className="flex items-center gap-4"
          >
            <a
              href="#contact"
              className="inline-block px-6 py-3 rounded-[7px] bg-teal-700 dark:bg-teal-400 text-white dark:text-zinc-900 font-medium text-base hover:bg-teal-800 dark:hover:bg-teal-300 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Let&apos;s talk
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              See what we do <span aria-hidden="true">→</span>
            </a>
          </motion.div>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: 0.38 }}
            className="mt-6 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Free initial consultation — no commitment required.
          </motion.p>
        </div>

        {/* Decorative panel — connected systems illustration */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="hidden lg:block relative aspect-square"
          aria-hidden="true"
        >
          {/* Watermark icon, anchored inside this panel */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none select-none">
            <Image
              src="/solvyn-icon-light-bg.svg"
              alt=""
              width={420}
              height={420}
              className="opacity-[0.05] dark:hidden"
              priority
            />
            <Image
              src="/solvyn-icon-dark-bg.svg"
              alt=""
              width={420}
              height={420}
              className="hidden dark:block opacity-[0.07]"
              priority
            />
          </div>

          {/* Soft gradient glow */}
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-40 dark:opacity-30"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(15,118,110,0.25), transparent 65%)",
            }}
          />

          {/* Connector lines between cards */}
          <svg
            className="absolute inset-0 w-full h-full text-teal-700/30 dark:text-teal-400/30"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path d="M28 30 L72 24" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <path d="M28 30 L30 70" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <path d="M30 70 L74 66" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <path d="M72 24 L74 66" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
          </svg>

          {/* Card: top-left */}
          <div className="absolute left-[6%] top-[14%] w-[52%] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 shadow-lg p-4 -rotate-3">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-4/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-2 w-3/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-6 w-1/2 mt-3 rounded-[5px] bg-teal-700/80 dark:bg-teal-400/80" />
            </div>
          </div>

          {/* Card: bottom-right */}
          <div className="absolute right-[4%] bottom-[16%] w-[54%] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 shadow-lg p-4 rotate-2">
            <div className="flex items-center justify-between mb-3">
              <span className="h-2 w-1/3 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <span className="h-4 w-4 rounded-full bg-teal-700 dark:bg-teal-400 flex items-center justify-center">
                <svg width="7" height="6" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="h-8 rounded-[5px] bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-8 rounded-[5px] bg-teal-700/20 dark:bg-teal-400/20" />
              <div className="h-8 rounded-[5px] bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </div>

          {/* Node dots at connector endpoints */}
          <span className="absolute left-[26%] top-[28%] h-2.5 w-2.5 rounded-full bg-teal-700 dark:bg-teal-400 ring-4 ring-zinc-50 dark:ring-zinc-900" />
          <span className="absolute left-[68%] top-[22%] h-2.5 w-2.5 rounded-full bg-teal-700 dark:bg-teal-400 ring-4 ring-zinc-50 dark:ring-zinc-900" />
          <span className="absolute left-[28%] top-[68%] h-2.5 w-2.5 rounded-full bg-teal-700 dark:bg-teal-400 ring-4 ring-zinc-50 dark:ring-zinc-900" />
          <span className="absolute left-[72%] top-[64%] h-2.5 w-2.5 rounded-full bg-teal-700 dark:bg-teal-400 ring-4 ring-zinc-50 dark:ring-zinc-900" />
        </motion.div>
        </div>
      </div>
    </section>
  );
}
