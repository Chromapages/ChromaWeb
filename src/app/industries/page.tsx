import type {Metadata} from "next";
import Link from "next/link";

import {IndustryDirectory} from "@/components/content/IndustryDirectory";
import {PageHero} from "@/components/content/PagePrimitives";
import {buildMetadata} from "@/lib/seo";
import {getIndustryDirectory} from "@/sanity/lib/contentPages";

export const metadata: Metadata = buildMetadata({
  title: "Industry Verticals",
  description: "Specialized digital upgrade solutions tailored to the operational and buyer journeys of specific service sectors.",
  path: "/industries",
});

export default async function IndustriesHubPage() {
  const directory = await getIndustryDirectory();
  return (
    <main id="main-content" tabIndex={-1}>
      {/* Unified Concept 1 Split Hero Section */}
      <PageHero
        asideCard={{
          eyebrow: "Sector Coverage",
          title: "Targeted Industry Architectures",
          items: [
            {label: "Priority Sectors", value: "Accounting, Hospitality, Advisory"},
            {label: "Conversion Focus", value: "High-Intent Client Funnels"},
            {label: "Information Schema", value: "Taxonomy by Buyer Intent"},
            {label: "Platform Standard", value: "Institutional Trust & Speed"},
          ],
        }}
        body="Every vertical experiences the Digital Mismatch differently. We tailor information architecture, conversion triggers, and proof systems to your sector's commercial reality."
        eyebrow="Vertical Relevance"
        numeral="02"
        title="Digital upgrades engineered for how your customers actually decide."
      />

      <IndustryDirectory industries={directory.data} />

      {/* Closing CTA */}
      <section className="bg-ink text-canvas">
        <div className="mx-auto flex w-full max-w-main flex-col items-start justify-between gap-8 px-6 py-16 lg:flex-row lg:items-end lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">Industry Fit</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Have a specialized service model?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-canvas/75">
              Let&apos;s examine how your current digital experience represents your capabilities and where customer friction can be removed.
            </p>
          </div>
          <Link
            className="inline-flex rounded-lg bg-teal px-6 py-3.5 text-sm font-semibold text-canvas transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
            href="/contact"
          >
            Plan Your Digital Upgrade →
          </Link>
        </div>
      </section>
    </main>
  );
}
