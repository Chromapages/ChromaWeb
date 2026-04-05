import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import ProcessSteps from "@/components/sections/process-steps";
import CtaBlock from "@/components/sections/cta-block";
import { getProcessSteps } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Process",
  description:
    "See how Chromapages turns a rough idea into a clear, launch-ready marketing site.",
};

export default async function ProcessPage() {
  const steps = await getProcessSteps();

  return (
    <>
      <Hero
        eyebrow="Process"
        title="A simple sequence that keeps the work moving and the scope under control."
        description="The process is built to reduce back-and-forth and help the project stay clear for both sides."
        primaryAction={{ label: "Book A Call", href: "/contact" }}
        secondaryAction={{ label: "View Pricing", href: "/pricing", variant: "secondary" }}
        panelLabel="What this protects"
        panelTitle="Less uncertainty, fewer surprises, better launches."
        panelItems={[
          "A shared understanding of the goal",
          "More useful feedback at each step",
          "A cleaner handoff from design to build",
        ]}
      />
      <ProcessSteps steps={steps} />
      <CtaBlock
        title="If the process matters as much as the final site, we will get along."
        description="We keep the work organized so you always know what is happening, what is next, and what the site needs to prove before launch."
        primaryLabel="Book A Call"
        primaryHref="/contact"
      />
    </>
  );
}
