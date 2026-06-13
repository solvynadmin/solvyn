import { FadeIn } from "@/components/FadeIn";

const steps = [
  {
    num: "01",
    heading: "Understand before proposing",
    body: "We don't start by pitching a solution. Before any proposal, we spend time understanding how your business operates — where the friction is, what you've already tried, and what a realistic fix actually looks like. That conversation shapes the scope, the budget, and what gets cut.",
  },
  {
    num: "02",
    heading: "Build it under one roof",
    body: "From there, we build it. Solvyn handles the full build under one roof, from design through deployment. You're not coordinating between a designer and a separate developer and a vendor for each tool. You have one point of contact throughout.",
  },
  {
    num: "03",
    heading: "Stay involved after launch",
    body: "After launch, we stay involved. Most technology problems surface after go-live, not before. We offer ongoing support for what we build, so when something changes or breaks, you have someone accountable — not a helpdesk ticket with a five-day response window.",
  },
];

export function HowWeWork() {
  return (
    <section className="bg-zinc-100 dark:bg-zinc-800 py-20 md:py-28 border-y border-zinc-200 dark:border-zinc-700">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <FadeIn>
          <h2
            className="text-3xl md:text-4xl font-medium text-zinc-900 dark:text-zinc-50 mb-16"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            How we work
          </h2>
        </FadeIn>

        <div className="space-y-12 max-w-3xl">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.1}>
              <div className="flex gap-8 md:gap-12">
                {/* Step number */}
                <div className="shrink-0 pt-1">
                  <span
                    className="text-3xl font-bold text-teal-600 dark:text-teal-400 tabular-nums"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                    aria-hidden="true"
                  >
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-5 flex-1">
                  <h3
                    className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-3"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {step.heading}
                  </h3>
                  <p
                    className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
