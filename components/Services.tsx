"use client";

import { motion } from "framer-motion";
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
      "Whatever form AI takes in your business, whether that's an agent handling repetitive work, a customer-facing chatbot, or automated workflows between your existing tools, we scope what's realistic and build it to actually work in your environment.",
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
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.08,
              }}
              whileHover={{ y: -3 }}
              className="group relative bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-8 transition-colors duration-200 hover:border-teal-600/50 dark:hover:border-teal-400/50 cursor-default"
            >
              {/* Top accent line — reveals on hover */}
              <span
                className="absolute top-0 left-8 right-8 h-px bg-teal-600 dark:bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                aria-hidden="true"
              />
              <h3
                className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {service.title}
              </h3>
              <p
                className="text-zinc-500 dark:text-zinc-400 leading-relaxed"
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
