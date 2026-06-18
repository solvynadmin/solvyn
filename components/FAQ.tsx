"use client";

import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";

const faqs = [
  {
    question: "Placeholder question one?",
    answer: "Placeholder answer one.",
  },
  {
    question: "Placeholder question two?",
    answer: "Placeholder answer two.",
  },
  {
    question: "Placeholder question three?",
    answer: "Placeholder answer three.",
  },
  {
    question: "Placeholder question four?",
    answer: "Placeholder answer four.",
  },
  {
    question: "Placeholder question five?",
    answer: "Placeholder answer five.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <FadeIn>
          <h2
            className="text-3xl md:text-4xl font-medium text-zinc-900 dark:text-zinc-50 mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Common questions
          </h2>
        </FadeIn>

        <div className="max-w-3xl divide-y divide-zinc-200 dark:divide-zinc-800">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div>
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className="text-base font-medium text-zinc-900 dark:text-zinc-50"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 text-teal-700 dark:text-teal-400 transition-transform duration-200 ${
                      openIndex === i ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                {openIndex === i && (
                  <p
                    className="pb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {faq.answer}
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
