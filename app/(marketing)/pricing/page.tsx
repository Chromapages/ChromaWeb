import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import PricingSnapshot from "@/components/sections/pricing-snapshot";
import FAQAccordion from "@/components/sections/faq-accordion";
import CtaBlock from "@/components/sections/cta-block";

const pricingFaq = [
  {
    question: "What should I include in a pricing inquiry?",
    answer:
      "Tell us what you need to change, share your website address if you have one, and include any budget or deadline you are working with.",
  },
  {
    question: "Do I need to choose a service before contacting you?",
    answer:
      "You can send an inquiry without choosing a service. Describe the problem you want to solve.",
  },
  {
    question: "How do I send a pricing question?",
    answer:
      "Use the inquiry form on the contact page. You can select Question if you do not have a project brief to submit.",
  },
];

export const metadata: Metadata = {
  title: "Website pricing inquiries",
  description:
    "Send Chromapages your questions about website scope and pricing. Share what needs to change and any budget or deadline context.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  return (
    <>
      <Hero
        eyebrow="Pricing"
        title="Start with the scope of your website."
        description="Tell us what needs to change and include any questions about scope or pricing in your inquiry."
        primaryAction={{ label: "Send an inquiry", href: "/contact" }}
        secondaryAction={{ label: "View services", href: "/services", variant: "secondary" }}
      />
      <PricingSnapshot offers={[]} />
      <FAQAccordion
        items={pricingFaq}
        eyebrow="Before you inquire"
        title="A few useful starting points."
        description="Start with your website and the problem you want to solve."
      />
      <CtaBlock
        title="Have a question about scope or pricing?"
        description="Share your website address, what needs to change, and any budget or deadline you are working with."
        primaryLabel="Send an inquiry"
        primaryHref="/contact"
      />
    </>
  );
}
