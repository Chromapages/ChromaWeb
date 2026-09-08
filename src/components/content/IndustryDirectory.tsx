import {IndustryExploreLink} from "@/components/content/IndustryExploreLink";
import {fallbackIndustryDirectory, mapIndustryDirectory, type IndustryDirectoryRecord, type IndustryVertical} from "@/components/content/industryVerticals";

function IndustryCard({industry}: {industry: IndustryVertical}) {
  if (industry.isComingSoon) {
    return (
      <article className="industry-card industry-card--coming-soon">
        <p className="industry-card__eyebrow text-xs font-semibold tracking-[0.2em] uppercase">{industry.categoryLabel}</p>
        <h3 className="industry-card__title font-display text-2xl tracking-[-0.03em] sm:text-3xl">{industry.title}</h3>
        {industry.description ? <p className="industry-card__description text-base leading-relaxed text-ink/75">{industry.description}</p> : null}
      </article>
    );
  }

  return (
    <article className="industry-card">
      <p className="industry-card__eyebrow text-xs font-semibold tracking-[0.2em] uppercase">{industry.categoryLabel}</p>
      <h3 className="industry-card__title font-display text-2xl tracking-[-0.03em] sm:text-3xl">{industry.title}</h3>
      {industry.hookQuote ? <p className="industry-card__quote font-display text-lg font-medium italic text-ink/70">&ldquo;{industry.hookQuote}&rdquo;</p> : <div className="industry-card__quote" aria-hidden="true" />}
      {industry.description ? <p className="industry-card__description text-base leading-relaxed text-ink/75">{industry.description}</p> : <div className="industry-card__description" aria-hidden="true" />}
      {industry.conversionActions.length ? (
        <div className="industry-card__goals">
          <p id={`conversion-actions-${industry.id}`} className="text-xs font-semibold tracking-[0.14em] text-ink/70 uppercase">Core Conversion Actions:</p>
          <ul aria-labelledby={`conversion-actions-${industry.id}`} className="mt-3 flex flex-wrap gap-2">
            {industry.conversionActions.map((action) => <li key={action} className="rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1.5 text-xs text-ink/70">{action}</li>)}
          </ul>
        </div>
      ) : null}
      {industry.exploreLink ? (
        <div className="industry-card__footer">
          <IndustryExploreLink href={industry.exploreLink} position={industry.order} title={industry.title} verticalId={industry.id} />
        </div>
      ) : null}
    </article>
  );
}

export function IndustryDirectory({industries}: {industries: IndustryDirectoryRecord[] | null}) {
  const directoryItems = mapIndustryDirectory(industries?.length ? industries : fallbackIndustryDirectory);
  const featured = directoryItems.filter((industry) => industry.isPriority).slice(0, 2);
  const remaining = directoryItems.filter((industry) => !industry.isPriority);

  return (
    <>
      {featured.length ? (
        <section className="bg-canvas py-16 lg:py-24" aria-labelledby="priority-verticals-title">
          <div className="mx-auto w-full max-w-main px-6 lg:px-10">
            <div className="border-b border-ink/15 pb-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">Tier 1 focus</p>
              <h2 id="priority-verticals-title" className="mt-2 font-display text-3xl tracking-[-0.03em] sm:text-4xl">Active Industry Solutions</h2>
            </div>
            <div className="industry-card-grid mt-12">{featured.map((industry) => <IndustryCard key={industry.id} industry={industry} />)}</div>
          </div>
        </section>
      ) : null}
      {remaining.length ? (
        <section className="border-t border-ink/10 bg-paper py-16 lg:py-24" aria-labelledby="industry-directory-title">
          <div className="mx-auto w-full max-w-main px-6 lg:px-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-indigo uppercase">Industry directory</p>
              <h2 id="industry-directory-title" className="mt-2 font-display text-2xl tracking-[-0.03em] sm:text-3xl">More industry architectures</h2>
            </div>
            <div className="industry-card-grid mt-10">{remaining.map((industry) => <IndustryCard key={industry.id} industry={industry} />)}</div>
          </div>
        </section>
      ) : null}
    </>
  );
}
