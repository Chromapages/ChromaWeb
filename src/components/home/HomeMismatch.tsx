import {ChromaEdge} from "@/components/ui/ChromaEdge";

type HomeMismatchData = {
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
};

const consequencePillars = [
  {
    number: "01",
    label: "Perception Friction",
    headline: "Authority & Credibility Gap",
    description:
      "When the visual and technical experience underrepresents real-world capabilities, the firm can appear less established, generic, or interchangeable with lower-tier competitors.",
    evidence: "First impressions fail to reflect true market standing and partner depth.",
  },
  {
    number: "02",
    label: "Clarity Friction",
    headline: "Evolved Offer Confusion",
    description:
      "As offerings mature toward advisory, specialized solutions, and higher-value packages, legacy site copy and cluttered structure obscure what actually makes you valuable.",
    evidence: "Qualified buyers default to comparing on price rather than specialized capability.",
  },
  {
    number: "03",
    label: "Action Friction",
    headline: "Obstacles in the Path to Action",
    description:
      "Unclear consultation pathways, cluttered intake forms, and mobile friction introduce doubt precisely when high-intent prospects are ready to take the next step.",
    evidence: "Valuable customer intent is lost between initial interest and commercial engagement.",
  },
];

const recognitionTriggers = [
  "Advisory repositioning",
  "Higher pricing tiers",
  "New service rollouts",
  "Multi-location expansion",
  "Paid traffic & campaigns",
  "Leadership frustration",
];

export function HomeMismatch({section}: {section?: HomeMismatchData | null}) {
  const headline =
    section?.title ?? "The website may still be introducing the company you used to be.";
  const bodyText =
    section?.body ??
    "Service businesses evolve rapidly—refining their positioning, raising rates, expanding client value, and building hard-earned reputations. When the digital presence fails to keep pace, it creates friction before the first conversation even begins.";

  return (
    <section className="border-t border-ink/10 bg-canvas text-ink pt-20 pb-12 lg:pt-28 lg:pb-16">
      <div className="mx-auto w-full max-w-main px-6 lg:px-10">
        {/* Top Section Header */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              01 / Digital Mismatch
            </span>
            <span className="h-px w-8 bg-teal/40" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl text-ink text-balance">
            {headline}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-ink/75 sm:text-lg">
            {bodyText}
          </p>
        </div>

        {/* 3-Pillar Consequence Diagnostic Matrix */}
        <div className="mt-12 lg:mt-16 grid gap-6 md:grid-cols-3">
          {consequencePillars.map((pillar) => (
            <div
              key={pillar.number}
              className="relative flex flex-col justify-between rounded-xl border border-ink/15 bg-paper p-8 shadow-[0_2px_8px_rgba(15,17,21,0.03)] transition-all hover:border-indigo/40 hover:shadow-md"
            >
              <ChromaEdge />
              <div>
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <span className="font-display text-xs font-semibold tracking-[0.2em] text-indigo uppercase">
                    {pillar.number} / {pillar.label}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold leading-snug text-ink">
                  {pillar.headline}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 rounded-lg bg-ink/[0.03] p-3.5 border-l-2 border-teal">
                <p className="text-[11px] font-semibold text-ink uppercase tracking-wide">
                  Business Impact
                </p>
                <p className="mt-1 text-xs text-ink/75 leading-relaxed">
                  {pillar.evidence}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full-Width Upgrade Triggers Banner with Infinite Carousel */}
        <div className="mt-12 lg:mt-14 overflow-hidden rounded-xl border border-ink/15 bg-paper p-6 sm:p-8 shadow-[0_1px_4px_rgba(15,17,21,0.02)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="shrink-0 lg:max-w-xs">
              <p className="font-display text-xs font-semibold tracking-[0.18em] text-indigo uppercase">
                Inflection Triggers
              </p>
              <p className="mt-1 text-xs text-ink/60">
                Common signals indicating it&apos;s time for a digital upgrade:
              </p>
            </div>

            {/* Marquee Track Container with Gradient Edge Masks */}
            <div className="relative min-w-0 flex-1 overflow-hidden py-1">
              {/* Left & Right Fade Masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-paper to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-paper to-transparent" />

              {/* Marquee Elements Track */}
              <div className="animate-marquee flex items-center gap-3">
                {[...recognitionTriggers, ...recognitionTriggers, ...recognitionTriggers].map((trigger, index) => (
                  <span
                    key={`${trigger}-${index}`}
                    className="shrink-0 whitespace-nowrap rounded-lg border border-ink/15 bg-canvas px-4 py-2 text-xs font-medium text-ink/80 transition-colors hover:border-teal hover:text-teal"
                  >
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
