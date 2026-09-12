import {ChromaEdge} from "@/components/ui/ChromaEdge";

import {resolveHomeMismatchContent, type HomeMismatchData} from "./homeMismatchData";

const desktopPillars = [
  {
    number: "01",
    label: "Perception Friction",
    headline: "Credibility Gap",
    description:
      "When the visual and technical experience underrepresents the business, a capable firm can appear smaller, more generic, or less established than it really is.",
    evidence: "First impressions weaken the authority the business has already earned.",
  },
  {
    number: "02",
    label: "Clarity Friction",
    headline: "Offer Clarity Gap",
    description:
      "As services evolve, legacy messaging and page structure can make specialized, higher-value offerings harder for prospective customers to understand.",
    evidence: "Qualified buyers compare on price when the real difference in capability is unclear.",
  },
  {
    number: "03",
    label: "Action Friction",
    headline: "Action Friction",
    description:
      "Unclear consultation paths, overloaded forms, and poor mobile experiences introduce hesitation precisely when a high-intent prospect is ready to move.",
    evidence: "Valuable customer intent is lost between interest and commercial engagement.",
  },
];

const desktopTriggers = [
  "Advisory repositioning",
  "Higher pricing tiers",
  "New service rollouts",
  "Multi-location expansion",
  "Paid traffic & campaigns",
  "Leadership transition",
];

export function HomeMismatchDesktop({section}: {section?: HomeMismatchData | null}) {
  const {headline} = resolveHomeMismatchContent(section);

  return (
    <section
      aria-labelledby="desktop-mismatch-title"
      className="hidden border-t border-ink/10 bg-canvas py-11 text-ink lg:block"
      data-home-mismatch-view="desktop"
    >
      <div className="mx-auto w-full max-w-[96rem] px-[3.25rem]">
        <header className="max-w-[59rem] pl-4">
          <div className="flex items-center gap-4">
            <span className="font-display text-[13px] leading-none font-semibold tracking-[0.2em] text-teal uppercase">
              01 / Digital Mismatch
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-teal/45" />
          </div>
          <h2
            className="mt-6 max-w-[53rem] text-balance font-display text-[clamp(3rem,3.7vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.045em] text-ink"
            id="desktop-mismatch-title"
          >
            {headline}
          </h2>
          <p className="mt-5 max-w-[51rem] text-[1.25rem] leading-[1.45] text-ink/70">
            When the website trails the business, prospects question credibility, struggle to
            understand the offer, and hesitate at the next step.
          </p>
        </header>

        <div className="relative mt-11 grid min-h-[28.5rem] grid-cols-3 overflow-hidden rounded-xl border border-ink/15 bg-paper shadow-[0_2px_8px_rgba(15,17,21,0.025)]">
          <ChromaEdge className="size-24!" />
          {desktopPillars.map((pillar, index) => (
            <article
              key={pillar.number}
              className={`flex min-w-0 flex-col px-12 py-8 ${index > 0 ? "border-l border-ink/15" : ""}`}
            >
              <div className="border-b border-ink/15 pb-5">
                <p className="font-display text-[2.75rem] leading-none font-semibold tracking-[-0.04em] text-indigo/45">
                  {pillar.number}
                </p>
                <p className="mt-3 font-display text-[13px] leading-none font-semibold tracking-[0.19em] text-indigo uppercase">
                  {pillar.label}
                </p>
              </div>

              <h3 className="mt-5 font-display text-[1.85rem] leading-tight font-bold tracking-[-0.035em] text-ink">
                {pillar.headline}
              </h3>
              <p className="mt-4 max-w-[22rem] text-[1rem] leading-[1.55] text-ink/70">
                {pillar.description}
              </p>

              <div className="mt-auto pt-8">
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="h-0.5 w-11 bg-teal" />
                  <p className="font-display text-[11px] leading-none font-semibold tracking-[0.2em] text-indigo uppercase">
                    Business Impact
                  </p>
                </div>
                <p className="mt-3 max-w-[22rem] text-[1rem] leading-[1.5] text-ink/75">
                  {pillar.evidence}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 grid min-h-[11.25rem] grid-cols-[23rem_1fr] overflow-hidden rounded-xl border border-ink/15 bg-paper py-8 shadow-[0_1px_5px_rgba(15,17,21,0.025)]">
          <div className="border-r border-ink/15 px-12">
            <p className="font-display text-[13px] leading-none font-semibold tracking-[0.19em] text-indigo uppercase">
              Inflection Triggers
            </p>
            <span aria-hidden="true" className="mt-5 block h-0.5 w-11 bg-teal" />
            <p className="mt-4 max-w-[15rem] text-[15px] leading-[1.45] text-ink/65">
              Common signals that it&apos;s time for a digital upgrade.
            </p>
          </div>

          <ol className="grid grid-cols-3 grid-rows-2">
            {desktopTriggers.map((trigger, index) => (
              <li
                key={trigger}
                className={`flex min-w-0 items-center gap-7 px-12 ${
                  index % 3 !== 0 ? "border-l border-ink/15" : ""
                } ${index < 3 ? "border-b border-ink/15" : ""}`}
              >
                <span className="font-display text-[1.4rem] leading-none font-semibold text-indigo">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-snug text-ink/80">{trigger}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
