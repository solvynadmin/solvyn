import { FadeIn } from "@/components/FadeIn";

export function Problem() {
  return (
    <section className="bg-zinc-100 dark:bg-zinc-800 py-20 md:py-28 border-y border-zinc-200 dark:border-zinc-700">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
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

        {/* Decorative panel — scattered, disconnected tools */}
        <FadeIn direction="none" delay={0.1} className="hidden lg:block relative aspect-square">
          <div aria-hidden="true" className="absolute inset-0">
            {/* Dashed stubs that don't connect, plus open ends */}
            <svg className="absolute inset-0 w-full h-full text-zinc-400/50 dark:text-zinc-600/60" viewBox="0 0 100 100" fill="none">
              <path d="M30 26 L30 12" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
              <path d="M62 30 L78 24" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
              <path d="M34 62 L18 70" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
              <path d="M70 66 L70 82" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            </svg>
            <span className="absolute left-[28%] top-[10%] h-2 w-2 rounded-full border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800" />
            <span className="absolute left-[76%] top-[22%] h-2 w-2 rounded-full border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800" />
            <span className="absolute left-[16%] top-[71%] h-2 w-2 rounded-full border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800" />
            <span className="absolute left-[68%] top-[83%] h-2 w-2 rounded-full border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800" />

            {/* Card: top-left */}
            <div className="absolute left-[4%] top-[26%] w-[46%] rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 shadow-lg p-4 -rotate-6">
              <div className="h-1.5 w-1/2 rounded-full bg-zinc-300 dark:bg-zinc-600 mb-3" />
              <div className="space-y-2">
                <div className="h-2 w-4/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-2 w-3/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>

            {/* Card: middle-right */}
            <div className="absolute right-[2%] top-[36%] w-[48%] rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 shadow-lg p-4 rotate-3">
              <div className="h-1.5 w-2/5 rounded-full bg-zinc-300 dark:bg-zinc-600 mb-3" />
              <div className="grid grid-cols-3 gap-1.5">
                <div className="h-7 rounded-[5px] bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-7 rounded-[5px] bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-7 rounded-[5px] bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>

            {/* Card: bottom-left */}
            <div className="absolute left-[12%] bottom-[6%] w-[44%] rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 shadow-lg p-4 rotate-2">
              <div className="h-1.5 w-1/3 rounded-full bg-zinc-300 dark:bg-zinc-600 mb-3" />
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-2 w-2/3 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          </div>
        </FadeIn>
        </div>
      </div>
    </section>
  );
}
