import { FadeIn } from "@/components/FadeIn";

export function Problem() {
  return (
    <section className="bg-zinc-100 dark:bg-zinc-800 py-20 md:py-28 border-y border-zinc-200 dark:border-zinc-700">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="max-w-2xl">
          <FadeIn>
            <p
              className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Most businesses reach a point where the tools stop working
              together. You have software for this, a different service for
              that, and a third thing you signed up for because it promised to
              fix the gap between the first two. Each one has a vendor
              relationship, a learning curve, and a renewal date. None of them
              fully understand your business.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              That&apos;s the situation Solvyn is built to change. We start by
              learning how your business actually operates — where things are
              working and where they&apos;re not, and what you&apos;d fix first if you had
              the bandwidth. Then we scope a solution, build it, and stay
              involved past launch. One firm, one relationship, no hand-offs.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
