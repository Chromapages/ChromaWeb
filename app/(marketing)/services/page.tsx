import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import ServicesGrid from "@/components/sections/services-grid";
import CtaBlock from "@/components/sections/cta-block";
import SectionHeading from "@/components/ui/section-heading";
import { getServices } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Website services",
  description:
    "Explore Chromapages website builds, landing pages, ecommerce, web apps, and ongoing improvements. Send an inquiry about what needs to change.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Hero
        eyebrow="Services"
        title="Find the right help for your website."
        description="Bring your website in line with the business you have built. Explore website builds, landing pages, web apps, ecommerce, and ongoing improvements."
        primaryAction={{ label: "Send an inquiry", href: "/contact" }}
        secondaryAction={{ label: "View pricing", href: "/pricing", variant: "secondary" }}
      />
      <ServicesGrid items={services} />
      <section className="cp-section border-t border-outline bg-bg">
        <div className="cp-container cp-grid items-start gap-y-8">
          <SectionHeading
            eyebrow="Who this is for"
            title="Your business has moved forward. Your website needs to catch up."
            description="For service-business owners who want their website to reflect their work and make the next step clear."
            className="col-span-full lg:col-span-8"
          />
          <ul role="list" className="col-span-full list-none divide-y divide-outline border-y border-outline lg:col-span-4">
            {[
              "Your website no longer reflects the quality of your business.",
              "Your services are difficult to understand online.",
              "Visitors struggle to find the next step.",
              "You want clarity about the work before you begin.",
            ].map((item) => (
              <li key={item} className="py-4 text-muted">{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBlock
        title="Not sure which service fits?"
        description="Tell us what is not working on your website and what you want it to do better."
        primaryLabel="Send an inquiry"
        primaryHref="/contact"
      />
    </>
  );
}
