"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";

function LayersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
      <polyline points="2 15.5 12 22 22 15.5" />
      <polyline points="2 12 12 18.5 22 12" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

const services = [
  {
    title: "Website and App Development",
    description:
      "From a clean marketing site to a custom internal tool or customer-facing app, we design and build what your business needs. After launch, we maintain what we build. No hand-off to a third party once the project is done.",
    icon: LayersIcon,
  },
  {
    title: "AI Implementation",
    description:
      "If you've got a process that runs on copy-paste, or data sitting in tools that don't talk to each other, AI can probably help. We figure out what's actually realistic for your business, build it, and connect it to the software you already use.",
    icon: SparkleIcon,
  },
  {
    title: "Systems and Integrations",
    description:
      "We handle the tools your business runs on, from initial setup through day-to-day management. If something in your current stack isn't doing its job, we'll tell you and help find a better path, whether that means a different tool or a smarter configuration.",
    icon: LinkIcon,
  },
];

export function Services() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <FadeIn>
          <h2
            className="text-sm font-medium text-teal-700 dark:text-teal-400 uppercase tracking-wide mb-6"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            How we implement
          </h2>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h3
            className="text-3xl md:text-4xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            What we build
          </h3>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p
            className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12 max-w-2xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            When you bring us in to implement, this is the work. Every one of
            these starts from a recommendation we can defend.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={prefersReducedMotion ? undefined : { once: true, margin: "-60px" }}
              transition={prefersReducedMotion ? { duration: 0 } : {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.08,
              }}
              className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-8"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-[9px] bg-teal-700/10 dark:bg-teal-400/10 text-teal-700 dark:text-teal-400">
                <service.icon />
              </div>
              <h3
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {service.title}
              </h3>
              <p
                className="text-zinc-600 dark:text-zinc-400 leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <FadeIn>
          <div className="mt-14 pt-10 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p
              className="text-zinc-500 dark:text-zinc-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Not sure which service fits your situation?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Start with a conversation <span aria-hidden="true">→</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
