import Button from "@/components/ui/button";
import SectionHeading from "@/components/ui/section-heading";
import { pricingOffers as staticOffers } from "@/lib/site";

import type { PricingOffer } from "@/types/sanity";

type PricingSnapshotProps = {
  offers?: PricingOffer[];
};

export default function PricingSnapshot({ offers }: PricingSnapshotProps) {
  const displayOffers = (offers && offers.length > 0 ? offers : staticOffers) as PricingOffer[];

  return (
    <section className="bg-surface-container-low">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple offer paths with enough structure to keep fit obvious."
          description="The goal is not to hide pricing behind a wall of vague language. It is to show the kinds of engagements Chromapages handles well."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {displayOffers.map((offer, index) => (
            <article
              key={offer._id || offer.title || index}
              className="flex h-full flex-col rounded-structural bg-surface-lowest p-7 shadow-ambient"
            >
              <p className="text-label-md uppercase text-primary-container">Offer</p>
              <h3 className="mt-4 font-display text-2xl text-on-surface">{offer.title}</h3>
              <p className="mt-4 text-body-lg text-on-surface/72">{offer.summary}</p>
              <p className="mt-5 text-sm text-on-surface/60">{offer.fit}</p>
              <ul className="mt-6 space-y-3 text-sm text-on-surface/72">
                {offer.features && offer.features.length > 0
                  ? offer.features.map((item: string, idx: number) => (
                      <li key={`${item}-${idx}`} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))
                  : offer.includes?.map((item: string, idx: number) => (
                      <li key={`${item}-${idx}`} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
              </ul>
              <p className="mt-6 text-sm font-medium text-on-surface">{offer.framing}</p>
              <div className="mt-auto pt-8">
                <Button
                  href={offer.ctaLink || "/contact"}
                  variant="secondary"
                  analyticsLabel={offer.ctaText || offer.ctaLabel || "Discuss project"}
                  analyticsLocation="pricing-snapshot"
                >
                  {offer.ctaText || offer.ctaLabel || "Discuss project"}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
