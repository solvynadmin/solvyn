import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";

export function Problem() {
  return (
    <section className="relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 py-20 md:py-28 border-y border-zinc-200 dark:border-zinc-700">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(113,113,122,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div className="max-w-2xl">
          <FadeIn>
            <h2
              className="text-sm font-medium text-teal-700 dark:text-teal-400 uppercase tracking-wide mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              The situation
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
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
          <FadeIn delay={0.15}>
            <p
              className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              That&apos;s the situation Solvyn is built to change. We start by
              learning how your business actually operates: where things are
              working and where they&apos;re not, and what you&apos;d fix first if you had
              the bandwidth. Then we scope a solution, build it, and stay
              involved past launch. One firm, one relationship, no hand-offs.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p
              className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed mt-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              The hard part is rarely fixing the problem. It&apos;s knowing which
              problem to fix first, and whether the fix is worth what it
              costs. That&apos;s where every engagement starts.
            </p>
          </FadeIn>
        </div>

        {/* Decorative panel — gradient glow with the brand mark */}
        <FadeIn direction="none" delay={0.1} className="hidden lg:block relative aspect-square">
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            {/* Soft gradient glow */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-60 dark:opacity-40"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(15,118,110,0.22), transparent 65%)",
              }}
            />

            {/* Concentric rings */}
            <div className="absolute h-[88%] w-[88%] rounded-full border border-zinc-300/70 dark:border-zinc-600/50" />
            <div className="absolute h-[62%] w-[62%] rounded-full border border-zinc-300/70 dark:border-zinc-600/50" />

            {/* Brand mark */}
            <Image
              src="/solvyn-icon-light-bg.svg"
              alt=""
              width={140}
              height={140}
              className="relative opacity-30 dark:hidden"
            />
            <Image
              src="/solvyn-icon-dark-bg.svg"
              alt=""
              width={140}
              height={140}
              className="relative hidden dark:block opacity-40"
            />
          </div>
        </FadeIn>
        </div>
      </div>
    </section>
  );
}
