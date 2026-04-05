import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import TrustBar from "@/components/sections/trust-bar";
import ProofStrip from "@/components/sections/proof-strip";
import ServicesGrid from "@/components/sections/services-grid";
import FeaturedWork from "@/components/sections/featured-work";
import ProcessSteps from "@/components/sections/process-steps";
import Differentiators from "@/components/sections/differentiators";
import PricingSnapshot from "@/components/sections/pricing-snapshot";
import FAQAccordion from "@/components/sections/faq-accordion";
import CtaBlock from "@/components/sections/cta-block";
import { faqItems, site } from "@/lib/site";
import { getHomePageData, getServices, getProcessSteps, getPricingServices, getPartners } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Digital Design Elevated | Chromapages",
  description:
    "Chromapages builds websites and web apps that help businesses get more customers.",
};
export default async function HomePage() {
  const [data, services, processSteps, pricingServices, partners] = await Promise.all([
    getHomePageData(),
    getServices(),
    getProcessSteps(),
    getPricingServices(),
    getPartners(),
  ]);

  const hero = data?.hero || {
    headline: "Websites that help you get more customers.",
    subheadline: site.description,
    ctaText: site.bookingLabel,
    ctaLink: site.bookingHref,
  };

  return (
    <>
      <Hero
        eyebrow={site.tagline}
        title={hero.headline}
        description={hero.subheadline}
        primaryAction={{ label: hero.ctaText, href: hero.ctaLink }}
        secondaryAction={{ label: "View Work", href: "/work", variant: "secondary" }}
        highlights={["Built to convert", "Mobile-first performance", "Ready for launch"]}
        isHome={true}
      />
      <TrustBar partners={partners} />
      <ProofStrip
        items={[
          "Conversion-first structure",
          "Mobile-first performance",
          "Clear service offerings",
          "Tracking-ready foundation",
        ]}
      />
      <ServicesGrid items={services} />
      <FeaturedWork projects={data?.featuredProjects} />
      <ProcessSteps steps={processSteps} />
      <Differentiators />
      <PricingSnapshot offers={pricingServices} />
      <FAQAccordion
        items={faqItems}
        title="Questions people usually want answered before they reach out."
        description="The goal is to remove hesitation early and make the next step feel easy."
      />
      <CtaBlock
        title="If the site needs to do more work, we should talk."
        description="Bring the project, the rough idea, or the current site that is not pulling its weight. We will help you figure out the cleanest next move."
        primaryLabel={site.bookingLabel}
        primaryHref={site.bookingHref}
        secondaryLabel="View services"
        secondaryHref="/services"
      />
    </>
  );
}
