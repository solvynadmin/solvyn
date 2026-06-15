"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";

const services = [
  {
    title: "Website and App Development",
    description:
      "From a clean marketing site to a custom internal tool or customer-facing app, we design and build what your business needs. After launch, we maintain what we build. No hand-off to a third party once the project is done.",
  },
  {
    title: "AI Implementation",
    description:
      "If you've got a process that runs on copy-paste, or data sitting in tools that don't talk to each other, AI can probably help. We figure out what's actually realistic for your business, build it, and connect it to the software you already use.",
  },
  {
    title: "Systems and Integrations",
    description:
      "We handle the tools your business runs on, from initial setup through day-to-day management. If something in your current stack isn't doing its job, we'll tell you and help find a better path, whether that means a different tool or a smarter configuration.",
  },
  {
    title: "Strategic Consulting",
    description:
      "If you're not sure where to start, start here. We ask the right questions, map what you have, and give you a clear picture of what to build and why. No jargon, no overselling. Just an honest assessment and a realistic plan.",
  },
];

export function Services() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <FadeIn>
          <h2
            className="text-3xl md:text-4xl font-medium text-zinc-900 dark:text-zinc-50 mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            What we do
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </section>
  );
}
