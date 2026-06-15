import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Solvyn approaches technology and AI consulting for small businesses. One firm, end to end, from strategy through launch and ongoing support.",
  alternates: { canonical: "https://solvynconsulting.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-32 pb-20 md:pb-28">

          {/* Page header */}
          <div className="max-w-2xl mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-10">
            <p
              className="text-sm font-medium text-teal-700 dark:text-teal-400 uppercase tracking-wide mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              About Us
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              About Solvyn
            </h1>
          </div>

          {/* Body sections */}
          <div
            className="max-w-2xl space-y-14"
            style={{ fontFamily: "var(--font-inter)" }}
          >

            <FadeIn>
            <section aria-labelledby="about-problem">
              <h2
                id="about-problem"
                className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-5"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                The problem we kept seeing
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  Most small business owners don&apos;t have a technology problem. They have a fragmentation problem.
                </p>
                <p>
                  They&apos;ve accumulated tools that each do one thing reasonably well and nothing else particularly well. Their website lives with one vendor. Their automations live somewhere else. The AI pilot they ran last year is disconnected from any of it. When something breaks or needs to change, they&apos;re calling three different people, none of whom talk to each other, and none of whom have a complete picture of how the business actually runs.
                </p>
                <p>
                  The result is that the business is always partially working. The owner is always partially informed. And when technology is supposed to be an asset, it starts to feel like just another thing to manage.
                </p>
              </div>
            </section>
            </FadeIn>

            <FadeIn delay={0.05}>
            <section aria-labelledby="about-why">
              <h2
                id="about-why"
                className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-5"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Why we built Solvyn
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  Working in AI implementation inside a regulated financial services environment, I spent years watching well-intentioned technology initiatives fail not because the technology was wrong, but because no one owned the full picture. Working cross-functionally across operations teams, I saw how the gap between strategy and execution compounds quietly until it becomes expensive.
                </p>
                <p>
                  Along the way, I worked with small businesses in various capacities, understanding what they actually needed versus what vendors were selling them. The pattern was consistent: good intentions, fragmented execution, and an owner left holding the pieces. At some point the decision became clear. The place where this work matters most is with the businesses that can&apos;t afford to have it go wrong, and that&apos;s where Solvyn is built to operate.
                </p>
                <p>
                  Solvyn was built on a straightforward premise: the best outcome for a business happens when one firm understands the full scope, builds toward a clear goal, and stays involved long enough to know whether it&apos;s actually working.
                </p>
                <p>
                  That means no hand-offs. No translation layer between strategy and execution. When we scope a project, we build it. When we build it, we support it. The accountability doesn&apos;t shift.
                </p>
              </div>
            </section>
            </FadeIn>

            <FadeIn delay={0.05}>
            <section aria-labelledby="about-who">
              <h2
                id="about-who"
                className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-5"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Who we are
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  Solvyn is led by Cameron, a technologist with extensive experience in operations technology and the fintech space. His background spans AI implementation, cross-functional operations work, and building technology products in compliance-sensitive environments. Outside of that, he has independently designed and shipped software products, including a consumer iOS app built using AI-assisted development tools.
                </p>
                <p>
                  Solvyn is currently operating as a focused solo consultancy. As the client base grows and the right opportunities develop, we&apos;ll expand accordingly.
                </p>
              </div>
            </section>
            </FadeIn>

            <FadeIn delay={0.05}>
            <section aria-labelledby="about-name">
              <h2
                id="about-name"
                className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-5"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                The name
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  Solvyn comes from &ldquo;solve.&rdquo; Not in the sense of a quick fix, but in the sense of working through something completely, from the first conversation to the outcome on the other side.
                </p>
                <p>
                  We think the best consulting relationships start with honesty about what the problem actually is, not what&apos;s easiest to sell. That&apos;s the intention behind the name, and it shapes how we work.
                </p>
              </div>
            </section>
            </FadeIn>

            <FadeIn delay={0.05}>
            <section aria-labelledby="about-beliefs">
              <h2
                id="about-beliefs"
                className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                What we believe
              </h2>
              <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <div>
                  <p className="font-medium text-zinc-800 dark:text-zinc-200 mb-1">
                    Scope before we build.
                  </p>
                  <p>
                    We ask questions that most vendors skip because the answers might complicate the sale. We&apos;d rather spend more time at the start than rebuild something six months in.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-zinc-800 dark:text-zinc-200 mb-1">
                    One relationship, not a relay.
                  </p>
                  <p>
                    A lot of firms are good at strategy or good at execution. We stay involved through both, which means the context doesn&apos;t get lost between phases.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-zinc-800 dark:text-zinc-200 mb-1">
                    Technology serves the business, not the other way around.
                  </p>
                  <p>
                    If a simpler solution solves the problem, we&apos;ll tell you. We&apos;re not trying to add complexity. We&apos;re trying to remove it.
                  </p>
                </div>
              </div>
            </section>
            </FadeIn>

            {/* CTA */}
            <FadeIn delay={0.05}>
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <p
                className="text-lg text-zinc-700 dark:text-zinc-300 mb-6"
              >
                Ready to talk through what you&apos;re working on?
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 rounded-[7px] bg-teal-700 dark:bg-teal-400 text-white dark:text-zinc-900 text-sm font-medium hover:bg-teal-800 dark:hover:bg-teal-300 transition-colors"
              >
                Contact us
              </a>
            </div>
            </FadeIn>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
