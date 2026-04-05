import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import PricingSnapshot from "@/components/sections/pricing-snapshot";
import FAQAccordion from "@/components/sections/faq-accordion";
import CtaBlock from "@/components/sections/cta-block";
import { getPricingServices } from "@/lib/sanity/fetch";

const pricingFaq = [
  {
    question: "Do you publish fixed pricing for every project?",
    answer:
      "The page is meant to show the typical engagement types and the kind of fit each one serves. Final scope and investment depend on the specific project.",
  },
  {
    question: "What if we only need one page?",
    answer:
      "That is exactly what the landing page path is for. If the project is narrow, we keep the scope narrow.",
  },
  {
    question: "Can pricing be updated later?",
    answer:
      "Yes. The offer blocks are structured so they can evolve without forcing a redesign of the page.",
  },
];

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore the types of Chromapages engagements and the kind of fit each one is designed for.",
};

export default async function PricingPage() {
  const pricingServices = await getPricingServices();

  return (
    <>
      <Hero
        eyebrow="Pricing"
        title="Transparent enough to be useful, flexible enough to fit the project."
        description="The pricing page is designed to help visitors understand the engagement shape before they reach out, so the conversation starts with better context."
        primaryAction={{ label: "Book A Call", href: "/contact" }}
        secondaryAction={{ label: "View Services", href: "/services", variant: "secondary" }}
        panelLabel="How to read this"
        panelTitle="Think in terms of fit, scope, and the next best step."
        panelItems={[
          "Full website projects",
          "Fast landing page engagements",
          "Support after launch",
        ]}
      />
      <PricingSnapshot offers={pricingServices} />
      <FAQAccordion
        items={pricingFaq}
        eyebrow="Pricing FAQ"
        title="A few common pricing questions."
        description="These answers are meant to reduce confusion before the first call."
      />
      <CtaBlock
        title="If you want the scope to be right, not just fast, let’s talk."
        description="We can help decide which engagement type fits the project and what it should include."
        primaryLabel="Book A Call"
        primaryHref="/contact"
      />
    </>
  );
}
