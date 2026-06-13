"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
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

      {/* Large watermark icon — right side */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none select-none"
        aria-hidden="true"
      >
        <Image
          src="/solvyn-icon-light-bg.svg"
          alt=""
          width={520}
          height={520}
          className="opacity-[0.04] dark:hidden"
          priority
        />
        <Image
          src="/solvyn-icon-dark-bg.svg"
          alt=""
          width={520}
          height={520}
          className="hidden dark:block opacity-[0.06]"
          priority
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 py-28 md:py-36">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mb-6"
          >
            <span
              className="inline-block h-px w-8 bg-teal-600 dark:bg-teal-400"
              aria-hidden="true"
            />
            <span
              className="text-sm font-medium text-teal-600 dark:text-teal-400 tracking-wide uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Technology &amp; AI Consulting
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="text-5xl md:text-[62px] font-bold text-zinc-900 dark:text-zinc-50 leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Your business, running the way you intended.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10 max-w-2xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Most small business owners are managing their technology instead of
            using it. Solvyn takes you from scope to deployment and stays
            involved after launch, so you&apos;re not stuck stitching together tools
            that don&apos;t talk to each other.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
            className="flex items-center gap-4"
          >
            <a
              href="#contact"
              className="inline-block px-6 py-3 rounded-[7px] bg-teal-600 dark:bg-teal-400 text-white dark:text-zinc-900 font-medium text-base hover:bg-teal-700 dark:hover:bg-teal-300 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Let&apos;s talk
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              See what we do →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
