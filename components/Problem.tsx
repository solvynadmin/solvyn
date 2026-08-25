import { FadeIn } from "@/components/FadeIn";

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.29l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

const scatteredTools = [
  { Icon: ChatIcon, left: "6%", top: "6%", size: 68, rotate: -8 },
  { Icon: CalendarIcon, left: "58%", top: "2%", size: 60, rotate: 11 },
  { Icon: MailIcon, left: "22%", top: "34%", size: 78, rotate: 5 },
  { Icon: DocIcon, left: "64%", top: "32%", size: 64, rotate: -7 },
  { Icon: GearIcon, left: "10%", top: "66%", size: 58, rotate: 13 },
  { Icon: ChartIcon, left: "56%", top: "64%", size: 72, rotate: -4 },
];

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

        {/* Decorative panel — a pile of mismatched, unconnected tools */}
        <FadeIn direction="none" delay={0.1} className="hidden lg:block relative aspect-square">
          <div aria-hidden="true" className="absolute inset-0">
            {scatteredTools.map(({ Icon, left, top, size, rotate }, i) => (
              <div
                key={i}
                className="absolute flex items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 shadow-lg"
                style={{
                  left,
                  top,
                  width: size,
                  height: size,
                  transform: `rotate(${rotate}deg)`,
                }}
              >
                <Icon />
              </div>
            ))}
          </div>
        </FadeIn>
        </div>
      </div>
    </section>
  );
}
