import { FadeIn } from "@/components/FadeIn";

const nodes = [
  { num: "01", left: "6%", top: "8%" },
  { num: "02", left: "40%", top: "30%" },
  { num: "03", left: "26%", top: "60%" },
  { num: "04", left: "62%", top: "80%" },
];

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

        {/* Decorative panel — a workflow with a broken link in the middle */}
        <FadeIn direction="none" delay={0.1} className="hidden lg:block relative aspect-square">
          <div aria-hidden="true" className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
              {/* 01 -> 02: connected */}
              <line x1="14" y1="16" x2="48" y2="38" stroke="currentColor" className="text-teal-600 dark:text-teal-400" strokeWidth="0.8" />
              {/* 02 -> 03: broken, two stubs with a gap */}
              <line x1="48" y1="38" x2="44.1" y2="46.8" stroke="currentColor" className="text-zinc-400 dark:text-zinc-500" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="34" y1="68" x2="37.9" y2="59.2" stroke="currentColor" className="text-zinc-400 dark:text-zinc-500" strokeWidth="1" strokeDasharray="3 2" />
              <circle cx="44.1" cy="46.8" r="2" fill="none" stroke="currentColor" className="text-zinc-400 dark:text-zinc-500" strokeWidth="1" />
              <circle cx="37.9" cy="59.2" r="2" fill="none" stroke="currentColor" className="text-zinc-400 dark:text-zinc-500" strokeWidth="1" />
              {/* 03 -> 04: connected */}
              <line x1="34" y1="68" x2="70" y2="88" stroke="currentColor" className="text-teal-600 dark:text-teal-400" strokeWidth="0.8" />
            </svg>

            {nodes.map(({ num, left, top }) => (
              <div
                key={num}
                className="absolute flex h-[76px] w-[76px] items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900"
                style={{ left, top }}
              >
                <span
                  className="text-2xl font-bold text-teal-600 dark:text-teal-400 tabular-nums"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {num}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
        </div>
      </div>
    </section>
  );
}
