import Link from "next/link";
import {ChromaEdge} from "@/components/ui/ChromaEdge";

type HomeSolutionData = {
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
};

const traditionalRedesignFlaws = [
  {
    title: "Fragmented Hand-Offs",
    detail: "Designers pass static mockups to third-party freelancers, losing nuance, interaction fidelity, and intent in translation.",
  },
  {
    title: "Bloated Builder Infrastructure",
    detail: "Heavy theme templates and dozens of fragile plugins resulting in sluggish load speeds, poor Core Web Vitals, and vulnerability risks.",
  },
  {
    title: "Content System Friction",
    detail: "Rigid or convoluted backends that make simple text or image updates frustrating without paying ongoing developer retainers.",
  },
  {
    title: "Unpredictable Go-Live & Drift",
    detail: "Rushed launch days with unverified QA, broken redirects, missed analytics tracking, and immediate post-launch vendor disappearance.",
  },
];

const chromapagesUpgradeStrengths = [
  {
    title: "Single Integrated Practice",
    detail: "Strategy, bespoke visual design, Next.js engineering, and conversion architecture executed by one synchronized partner team.",
  },
  {
    title: "Engineered Speed & Precision",
    detail: "Clean, bespoke Next.js App Router code achieving sub-second load times and exceptional Core Web Vitals that respect visitor time.",
  },
  {
    title: "Content Autonomy",
    detail: "Tailored structured content models giving your team full visual and editorial control without risking layout breakage.",
  },
  {
    title: "Launch-Safe Protocol",
    detail: "Controlled milestone approvals, strict pre-flight accessibility (WCAG AA) audits, verified analytics tagging, and zero-chaos deployment.",
  },
];

export function HomeSolution({section}: {section?: HomeSolutionData | null}) {
  const headline =
    section?.title ?? "Bring the digital experience up to the level of the business.";
  const bodyText =
    section?.body ??
    "Chromapages combines strategy, premium design, modern engineering, conversion architecture, launch QA, and measurement into one dependable, launch-safe engagement.";

  return (
    <section className="bg-ink text-canvas py-20 lg:py-28 relative overflow-hidden">
      <div className="mx-auto w-full max-w-content-wide px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              02 / Dependable Solution
            </span>
            <span className="h-px w-8 bg-teal/40" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl text-canvas">
            {headline}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-canvas/75 sm:text-lg">
            {bodyText}
          </p>
        </div>

        {/* Comparative Split Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2 items-stretch">
          {/* Left Column: Traditional Agency Redesign */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="border-b border-white/10 pb-5">
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-red-400/90 uppercase">
                  The Typical Pitfall
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-canvas/90">
                  The Traditional Agency Redesign
                </h3>
                <p className="mt-2 text-xs text-canvas/60">
                  Fragmented handoffs, bloated templates, and vendor drift.
                </p>
              </div>

              <ul className="mt-8 space-y-6">
                {traditionalRedesignFlaws.map((flaw) => (
                  <li key={flaw.title} className="flex items-start gap-4">
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-400">
                      ✕
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-canvas/90">{flaw.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-canvas/60">{flaw.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-white/10 pt-4 text-[11px] text-canvas/50">
              Outcome: Rebuilding every 2–3 years due to accumulated technical debt and frustration.
            </div>
          </div>

          {/* Right Column: The Chromapages Upgrade (Highlighted) */}
          <div className="relative rounded-xl border border-teal/40 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 sm:p-10 shadow-[0_12px_32px_rgba(35,105,140,0.12)] flex flex-col justify-between">
            <ChromaEdge dark />
            <div>
              <div className="border-b border-teal/30 pb-5">
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                  The Chromapages Approach
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-canvas">
                  A Controlled Digital Upgrade
                </h3>
                <p className="mt-2 text-xs text-teal-300/80">
                  Single-team execution, sub-second speed, and launch safety.
                </p>
              </div>

              <ul className="mt-8 space-y-6">
                {chromapagesUpgradeStrengths.map((strength) => (
                  <li key={strength.title} className="flex items-start gap-4">
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal/20 text-xs font-bold text-teal">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-canvas">{strength.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-canvas/75">{strength.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-canvas/70">
                Single synchronized partner team from strategy to launch.
              </span>
              <Link
                href="/process"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal"
              >
                Explore Delivery Process →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
