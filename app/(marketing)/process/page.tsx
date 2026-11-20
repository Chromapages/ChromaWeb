import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import ProcessSteps from "@/components/sections/process-steps";
import CtaBlock from "@/components/sections/cta-block";
import { getProcessSteps } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Website project process",
  description:
    "Learn about Chromapages launch standards and the questions to clarify about your website before work begins.",
  alternates: { canonical: "/process" },
};

export default async function ProcessPage() {
  const steps = await getProcessSteps();

  return (
    <>
      <Hero
        eyebrow="Process"
        title="A considered website. A considered launch."
        description="Launch readiness is part of our standard, with quality assurance, a staging preview, and launch checks. Start by getting clear about the website's purpose and the work it needs."
        primaryAction={{ label: "Send an inquiry", href: "/contact" }}
        secondaryAction={{ label: "View pricing", href: "/pricing", variant: "secondary" }}
      />
      <ProcessSteps steps={steps} />
      <CtaBlock
        title="What do you need to know before starting?"
        description="Include your questions about scope, reviews, or launch in your inquiry."
        primaryLabel="Send an inquiry"
        primaryHref="/contact"
      />
    </>
  );
}
