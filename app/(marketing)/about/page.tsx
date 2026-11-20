import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import Differentiators from "@/components/sections/differentiators";
import CtaBlock from "@/components/sections/cta-block";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "About Chromapages",
  description:
    "Meet Chromapages, a digital design and development studio founded and operated by Eric Black.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Chromapages"
        title="Your business deserves to be understood online."
        description="Chromapages is a digital design and development studio for service businesses whose websites no longer reflect the quality of their work."
        primaryAction={{ label: "Send an inquiry", href: "/contact" }}
        secondaryAction={{ label: "View services", href: "/services", variant: "secondary" }}
      />
      <section className="cp-section bg-surface-lowest">
        <div className="cp-container cp-grid gap-y-10">
          <article className="col-span-full border-t border-outline pt-6 lg:col-span-6">
            <SectionHeading
              eyebrow="Our point of view"
              title="Help people understand the business."
            />
            <p className="mt-4 max-w-prose text-muted">
              Your website should explain what you offer, help visitors judge whether it fits their needs, and make the next step clear. Design, performance, and launch readiness all matter to that experience.
            </p>
          </article>
          <article className="col-span-full border-t border-outline pt-6 lg:col-span-6">
            <SectionHeading
              eyebrow="Behind the studio"
              title="Founded and operated by Eric Black."
            />
            <p className="mt-4 max-w-prose text-muted">
              Eric Black is the founder and operator of Chromapages. The studio combines design and development with attention to the message, the visitor&apos;s next step, and launch readiness.
            </p>
          </article>
        </div>
      </section>
      <Differentiators />
      <CtaBlock
        title="Tell us where your website falls short."
        description="Start with what your business needs visitors to understand."
        primaryLabel="Send an inquiry"
        primaryHref="/contact"
      />
    </>
  );
}
