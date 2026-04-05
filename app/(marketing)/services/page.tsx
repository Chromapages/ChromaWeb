import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import ServicesGrid from "@/components/sections/services-grid";
import CtaBlock from "@/components/sections/cta-block";
import SectionHeading from "@/components/ui/section-heading";
import { getServices } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Chromapages services for marketing websites, landing pages, ecommerce, web apps, and ongoing support.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Hero
        eyebrow="Services"
        title="Offer paths designed around the way projects actually come in."
        description="The service stack stays focused so buyers can understand the difference between a full website, a fast landing page, and ongoing support without reading a wall of jargon."
        primaryAction={{ label: "Book A Call", href: "/contact" }}
        secondaryAction={{ label: "View Work", href: "/work", variant: "secondary" }}
        panelLabel="Best fit"
        panelTitle="If you want clarity, not complexity."
        panelItems={[
          "Businesses ready for a stronger website",
          "Campaigns that need a dedicated conversion page",
          "Teams that want support after launch",
        ]}
      />
      <ServicesGrid items={services} />
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
          <SectionHeading
            eyebrow="Who this is for"
            title="The site works best when the business already knows it needs a stronger web presence."
            description="The ideal fit is a growth-minded team that wants a cleaner presentation, better conversion paths, and a partner who can keep the work organized."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              "Businesses that want more qualified inquiries",
              "Founders launching a new offer or brand",
              "Teams replacing an outdated site",
              "Marketing leads who need landing pages that convert",
            ].map((item) => (
              <div key={item} className="rounded-structural bg-surface-lowest p-7 shadow-ambient">
                <p className="text-body-lg text-on-surface">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBlock
        title="Need help choosing the right offer path?"
        description="If you are not sure whether the project needs a full site, a landing page, or ongoing support, we can sort that out in one conversation."
        primaryLabel="Book A Call"
        primaryHref="/contact"
      />
    </>
  );
}
