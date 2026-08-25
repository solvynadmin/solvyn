"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";

function BoxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 0 1-15.3 6.4M3 12a9 9 0 0 1 15.3-6.4" />
      <path d="M21 3v6h-6M3 21v-6h6" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2Z" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z" />
      <line x1="4" y1="22" x2="4" y2="3" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const takeaways = [
  "A clear map of how work moves through your business today",
  "The bottlenecks ranked by what they're costing you",
  "A specific recommendation for each one, with the reasoning behind it",
  "An honest estimate of effort and cost, whether or not we're the ones doing the work",
];

const answerTypes = [
  {
    title: "Something that already exists",
    body: "Often the fix is software that's already on the market, or a tool you're already paying for and using at a fraction of what it does. We'll tell you when that's the case, even though there's nothing in it for us.",
    icon: BoxIcon,
    color: "bg-sky-500 dark:bg-sky-400",
  },
  {
    title: "An automation",
    body: "Connecting the systems you already have so work moves between them on its own, instead of someone rekeying the same information into a second screen.",
    icon: RefreshIcon,
    color: "bg-violet-500 dark:bg-violet-400",
  },
  {
    title: "A custom build",
    body: "When nothing off the shelf fits how you actually operate, we scope and build it. This is the last option we reach for, not the first.",
    icon: WrenchIcon,
    color: "bg-amber-500 dark:bg-amber-400",
  },
];

const paths = [
  {
    title: "Take it and run",
    body: "You keep the full recommendation, including tool names, configuration notes, and the reasoning behind each call. Hand it to your own team or a developer you already work with. No obligation to come back to us.",
    icon: FlagIcon,
    color: "bg-indigo-500 dark:bg-indigo-400",
  },
  {
    title: "Have us implement it",
    body: "We build what we recommended and stay involved after it's live. One firm from the first conversation through ongoing support, with nobody to hand you off to.",
    icon: UsersIcon,
    color: "bg-teal-600 dark:bg-teal-400",
  },
];

export function Diagnostic() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="diagnostic" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <FadeIn>
          <h2
            className="text-sm font-medium text-teal-700 dark:text-teal-400 uppercase tracking-wide mb-6 text-center"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Where we start
          </h2>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h3
            className="text-3xl md:text-4xl font-medium text-zinc-900 dark:text-zinc-50 mb-8 max-w-3xl mx-auto text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            We find the bottleneck before anyone talks about building.
          </h3>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-14">
            <p
              className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              A diagnostic is a short, fixed-fee engagement. We learn how your
              business actually runs, follow the work through the tools you
              already use, and find where time and money are leaking out.
              Then we tell you what fixes it and what that fix realistically
              costs.
            </p>
            <p
              className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              The recommendation is specific. Not &quot;you should look into
              automation,&quot; but the actual tool, the actual workflow, and
              what changes for your team the week after it goes live.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-8 mb-16 max-w-3xl mx-auto">
            <h4
              className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              What you walk away with
            </h4>
            <ul className="space-y-3">
              {takeaways.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 rounded-full bg-teal-700 dark:bg-teal-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h4
            className="text-sm font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wide mb-6"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            The three kinds of answer
          </h4>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {answerTypes.map((item, i) => (
            <motion.div
              key={item.title}
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
              <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-[9px] text-white dark:text-zinc-900 ${item.color}`}>
                <item.icon />
              </div>
              <h5
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {item.title}
              </h5>
              <p
                className="text-zinc-600 dark:text-zinc-400 leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        <FadeIn>
          <h3
            className="text-2xl md:text-3xl font-medium text-zinc-900 dark:text-zinc-50 mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Then you decide who implements it.
          </h3>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p
            className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 max-w-3xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            The recommendation is yours either way. You own it whether or not
            you hire us for the next part.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {paths.map((item, i) => (
            <motion.div
              key={item.title}
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
              <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-[9px] text-white dark:text-zinc-900 ${item.color}`}>
                <item.icon />
              </div>
              <h5
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {item.title}
              </h5>
              <p
                className="text-zinc-600 dark:text-zinc-400 leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        <FadeIn>
          <a
            href="#contact"
            className="inline-block px-6 py-3 rounded-[7px] bg-teal-700 dark:bg-teal-400 text-white dark:text-zinc-900 font-medium text-base hover:bg-teal-800 dark:hover:bg-teal-300 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Book a diagnostic <span aria-hidden="true">→</span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
