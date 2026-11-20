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
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
          <SectionHeading
            eyebrow="Who this is for"
            title="Your business has moved forward. Your website needs to catch up."
            description="For service-business owners who want their website to reflect their work and make the next step clear."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              "Your website no longer reflects the quality of your business.",
              "Your services are difficult to understand online.",
              "Visitors struggle to find the next step.",
              "You want clarity about the work before you begin.",
            ].map((item) => (
              <div key={item} className="rounded-structural bg-surface-lowest p-7 shadow-ambient">
                <p className="text-body-lg text-on-surface">{item}</p>
              </div>
            ))}
          </div>
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
