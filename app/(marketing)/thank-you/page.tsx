import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import CtaBlock from "@/components/sections/cta-block";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your inquiry was received. Here is what happens next.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <>
      <Hero
        eyebrow="Thank you"
        title="Your inquiry is in."
        description="We will review the details and follow up with the next step. If the project is a good fit, we will make the path forward simple."
        primaryAction={{ label: "Back to Home", href: "/" }}
        secondaryAction={{ label: "View Work", href: "/work", variant: "secondary" }}
        panelLabel="What happens next"
        panelTitle="A quick review, then a thoughtful response."
        panelItems={[
          "We review the project details",
          "We confirm fit and next steps",
          "We decide whether a call or email reply is best",
        ]}
      />
      <CtaBlock
        title="If you still want to see more, the work page is a good next stop."
        primaryLabel="View Work"
        primaryHref="/work"
        secondaryLabel="Contact again"
        secondaryHref="/contact"
      />
    </>
  );
}
