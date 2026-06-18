"use client";

import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";

const faqs = [
  {
    question: "What does Solvyn do?",
    answer:
      "Solvyn is a technology and AI consulting firm for small and medium businesses. We scope, build, and implement solutions ourselves: websites, apps, AI tools, workflow automation, and system integrations. The difference is that you work with one firm from start to finish rather than managing a chain of vendors who each own one piece of the picture.",
  },
  {
    question: "Who do you work with?",
    answer:
      "Primarily small to medium businesses, though size is a loose measure. A company with five employees and a thousand customers has different needs than one with fifty employees and two dozen clients. We work with business owners who have a real problem to solve and are ready to invest in solving it properly. Industry does not matter much. The underlying technology challenges tend to overlap more than people expect.",
  },
  {
    question: "How is this different from hiring an agency or a freelancer?",
    answer:
      "A typical agency scopes your project, then hands off design to one person, development to another, and calls it done when the deliverable ships. A freelancer often covers one discipline well but refers out anything outside it. Solvyn handles the full picture, from understanding what you actually need through building it to making sure it works in your business after the fact. No handoffs, no gaps between vendors, one person who stays accountable throughout.",
  },
  {
    question: "What does working with Solvyn look like from the start?",
    answer:
      "It starts with a conversation about your business, not a form to fill out. We want to understand how your business actually operates: what is working, what is not, and where the friction is, before recommending anything. From there we scope clearly in writing: what we will build, what it will cost, and what you should realistically expect. No vague proposals that balloon once work starts.",
  },
  {
    question: "What does AI implementation actually mean for a small business?",
    answer:
      "For most small businesses, it means automating work that currently eats time without adding value: drafting routine communications, triaging incoming requests, processing documents, routing information between systems. It is not about replacing your team. It is about giving your team (or you) time back to focus on what actually moves the business forward. We start with where the friction is, not with the technology, and work backward from there.",
  },
  {
    question: "Can you work with the tools and systems we already have?",
    answer:
      "Usually, yes. Most businesses have a mix of tools that partially work, and the goal is rarely to start from scratch. Before recommending anything new, we look at what you already have and whether it can be extended or better connected. Sometimes the answer is to add something. Often it is to properly integrate what already exists.",
  },
  {
    question: "Who owns what gets built?",
    answer:
      "You do. Client-facing accounts, including hosting, domain, code repositories, and third-party platforms, are set up in your name from day one, with Solvyn added as a collaborator. When the engagement ends, everything is yours. We do not hold your systems hostage or make ourselves a dependency you cannot remove.",
  },
  {
    question: "Do you offer ongoing support after a project wraps?",
    answer:
      "It depends on what you need. Some projects are discrete: we build something, hand it over, and that is the engagement. Others benefit from continued involvement: maintenance, updates, monitoring, or iterating as your business changes. That can be structured as a retainer or on an as-needed basis. We talk through this during scoping so there are no surprises either way.",
  },
  {
    question: "How much does this cost?",
    answer:
      "It varies by scope, and we will not quote a number before understanding what you actually need. That would be guessing. What we can say is that work is priced based on what it takes to do it properly, not on what we think the market will bear. We scope clearly, price clearly, and do not add line items mid-project without a conversation first. If budget is a real constraint, say so upfront. It helps us scope something workable rather than presenting something you cannot afford.",
  },
  {
    question: "Our business has nothing to do with technology. Is Solvyn still a fit?",
    answer:
      "Yes, and that describes most of our clients. The businesses that benefit most are the ones where technology is not the core product, but its absence or dysfunction is getting in the way. You do not need to understand the technical side. That is what we are here for.",
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
