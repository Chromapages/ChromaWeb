import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import Differentiators from "@/components/sections/differentiators";
import CtaBlock from "@/components/sections/cta-block";
import SectionHeading from "@/components/ui/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Chromapages approaches design, development, and the customer experience behind the site.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About"
        title="A studio built to make the web feel clearer and more useful."
        description={`${site.name} exists to help businesses present themselves with more confidence, more clarity, and a site that does a better job of supporting growth.`}
        primaryAction={{ label: "Book A Call", href: "/contact" }}
        secondaryAction={{ label: "View Work", href: "/work", variant: "secondary" }}
        panelLabel="Studio point of view"
        panelTitle="Good web work should make the business easier to trust."
        panelItems={[
          "Design should support the decision, not distract from it",
          "The first screen should make the next step obvious",
          "Launches should feel organized, not fragile",
        ]}
      />
      <section className="bg-surface-container-low">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-16 md:px-8 md:py-24 lg:grid-cols-2">
          <article className="rounded-structural bg-surface-lowest p-7 shadow-ambient">
            <SectionHeading
              eyebrow="What we value"
              title="Clarity, taste, and a calm process."
            />
            <p className="mt-5 text-body-lg text-on-surface/72">
              The goal is not to make the site feel loud. It is to make the business feel
              more certain, more credible, and easier to choose.
            </p>
          </article>
          <article className="rounded-structural bg-surface-lowest p-7 shadow-ambient">
            <SectionHeading
              eyebrow="How we work"
              title="Structured enough to stay on track, flexible enough to fit the project."
            />
            <p className="mt-5 text-body-lg text-on-surface/72">
              Every engagement should leave the client with a stronger site and a clearer
              understanding of what comes next.
            </p>
          </article>
        </div>
      </section>
      <Differentiators />
      <CtaBlock
        title="If you want the site to feel more premium and work harder, let’s talk."
        description="We can review the current presence and figure out how to make the next version more useful for the business."
        primaryLabel="Book A Call"
        primaryHref="/contact"
      />
    </>
  );
}
