import {ChromaEdge} from "@/components/ui/ChromaEdge";

import {
  consequencePillars,
  recognitionTriggers,
  resolveHomeMismatchContent,
  type HomeMismatchData,
} from "./homeMismatchData";

export function HomeMismatchMobile({section}: {section?: HomeMismatchData | null}) {
  const {headline, bodyText} = resolveHomeMismatchContent(section);

  return (
    <section
      className="border-t border-ink/10 bg-canvas pt-20 pb-12 text-ink lg:hidden"
      data-home-mismatch-view="mobile"
    >
      <div className="mx-auto w-full max-w-content-wide px-6">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              01 / Digital Mismatch
            </span>
            <span className="h-px w-8 bg-teal/40" />
          </div>
          <h2 className="mt-4 text-balance font-display text-3xl leading-tight font-bold tracking-[-0.035em] text-ink sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-ink/75 sm:text-lg">{bodyText}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
                <h3 className="mt-5 font-display text-xl leading-snug font-bold text-ink">
                  {pillar.headline}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">{pillar.description}</p>
              </div>

              <div className="mt-6 rounded-lg border-l-2 border-teal bg-ink/[0.03] p-3.5">
                <p className="text-[11px] font-semibold tracking-wide text-ink uppercase">
                  Business Impact
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink/75">{pillar.evidence}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-ink/15 bg-paper p-6 shadow-[0_1px_4px_rgba(15,17,21,0.02)] sm:p-8">
          <div className="flex flex-col gap-6">
            <div className="shrink-0">
              <p className="font-display text-xs font-semibold tracking-[0.18em] text-indigo uppercase">
                Inflection Triggers
              </p>
              <p className="mt-1 text-xs text-ink/60">
                Common signals indicating it&apos;s time for a digital upgrade:
              </p>
            </div>

            <div className="relative min-w-0 flex-1 overflow-hidden py-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-paper to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-paper to-transparent" />
              <div className="animate-marquee flex items-center gap-3">
                {[...recognitionTriggers, ...recognitionTriggers, ...recognitionTriggers].map(
                  (trigger, index) => (
                    <span
                      key={`${trigger}-${index}`}
                      className="shrink-0 whitespace-nowrap rounded-lg border border-ink/15 bg-canvas px-4 py-2 text-xs font-medium text-ink/80 transition-colors hover:border-teal hover:text-teal"
                    >
                      {trigger}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
