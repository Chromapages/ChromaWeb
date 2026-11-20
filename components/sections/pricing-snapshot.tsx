import Button from "@/components/ui/button";
import SectionHeading from "@/components/ui/section-heading";

import type { PricingOffer } from "@/types/sanity";

type PricingSnapshotProps = {
  offers?: PricingOffer[];
};

export default function PricingSnapshot({ offers }: PricingSnapshotProps) {
  return (
    <section className="cp-section bg-surface-lowest">
      <div className="cp-container">
        <SectionHeading
          eyebrow="Your project"
          title="What does your website need next?"
          description="A new website, a redesign, or ongoing updates involve different work. Tell us what you have and what you want to change."
        />
        {offers?.length ? (
          <div className="cp-grid mt-10 gap-y-8">
            {offers.map((offer, index) => {
              const title = offer.title || offer.label;
              const features = offer.features?.length ? offer.features : offer.includes;
              const ctaLabel = offer.ctaText || offer.ctaLabel || "Discuss project";

              return (
                <article
                  key={offer._id || title || index}
                  className="col-span-full flex flex-col border-t border-outline pt-6 sm:col-span-4"
                >
                  <p className="text-xs font-semibold tracking-wide text-primary uppercase">Offer</p>
                  {title ? (
                    <h3 className="mt-3 text-xl leading-tight font-bold tracking-tight text-ink">
                      {title}
                    </h3>
                  ) : null}
                  <p className="mt-4 text-muted">{offer.summary}</p>
                  {offer.fit ? <p className="mt-4 text-sm text-muted">{offer.fit}</p> : null}
                  {features?.length ? (
                    <ul className="mt-5 list-disc space-y-2 ps-5 text-sm text-muted">
                      {features.map((item, idx) => (
                        <li key={`${item}-${idx}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {offer.framing ? (
                    <p className="mt-5 text-sm font-medium text-ink">{offer.framing}</p>
                  ) : null}
                  <div className="mt-auto pt-6">
                    <Button
                      href={offer.ctaLink || "/contact"}
                      variant="secondary"
                      analyticsLabel={ctaLabel}
                      analyticsLocation="pricing-snapshot"
                    >
                      {ctaLabel}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
