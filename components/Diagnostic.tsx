"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";

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
  },
  {
    title: "An automation",
    body: "Connecting the systems you already have so work moves between them on its own, instead of someone rekeying the same information into a second screen.",
  },
  {
    title: "A custom build",
    body: "When nothing off the shelf fits how you actually operate, we scope and build it. This is the last option we reach for, not the first.",
  },
];

const paths = [
  {
    title: "Take it and run",
    body: "You keep the full recommendation, including tool names, configuration notes, and the reasoning behind each call. Hand it to your own team or a developer you already work with. No obligation to come back to us.",
  },
  {
    title: "Have us implement it",
    body: "We build what we recommended and stay involved after it's live. One firm from the first conversation through ongoing support, with nobody to hand you off to.",
  },
];

export function Diagnostic() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="diagnostic" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <FadeIn>
          <h2
            className="text-sm font-medium text-teal-700 dark:text-teal-400 uppercase tracking-wide mb-6"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Where we start
          </h2>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h3
            className="text-3xl md:text-4xl font-medium text-zinc-900 dark:text-zinc-50 mb-8 max-w-3xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            We find the bottleneck before anyone talks about building.
          </h3>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-3xl space-y-6 mb-14">
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
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-8 mb-16 max-w-3xl">
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
