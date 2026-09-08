import type {Metadata} from "next";
import {notFound} from "next/navigation";

import {IndustryPage, type IndustryPageData} from "@/components/content/IndustryPage";
import {buildMetadata} from "@/lib/seo";
import {getIndustryPage, getIndustrySlugs} from "@/sanity/lib/contentPages";

const fallbackIndustries: Record<string, IndustryPageData> = {
  "accounting-advisory": {
    title: "Tax, Accounting & Advisory",
    slug: "accounting-advisory",
    positioning: "Turn professional expertise into a digital experience that feels credible, understandable, and easier to act on.",
    buyerProblems: "Your firm has moved beyond basic tax preparation toward advisory, fractional CFO, and higher-value client work. But the website still looks interchangeable with local compliance shops, creating friction around higher fees and partner credibility.",
    content: "When expertise matures, the digital presentation must reflect partner depth, clear service architecture, and frictionless consultation pathways.",
    cta: {
      label: "Evaluate the Digital Gap →",
      href: "/contact",
    },
    services: [
      {title: "Signature Website", slug: "signature-website", summary: "Complete firm positioning and digital transformation."},
      {title: "Digital Elevation Audit", slug: "digital-elevation-audit", summary: "Diagnostic review of positioning, trust signals, and consultation paths."},
    ],
  },
  "restaurant-qsr": {
    title: "Restaurant & QSR Growth Brands",
    slug: "restaurant-qsr",
    positioning: "Translate the quality and energy of the real brand into a fast, product-accurate digital experience built around how customers actually choose.",
    buyerProblems: "The food creates appetite and desire, but the mobile experience introduces friction between desire and action across menus, online ordering, catering, and multi-location discovery.",
    content: "Our Product Truth doctrine ensures food is photographed and presented with integrity—no fake steam, no impossible ingredients, and mobile journeys engineered for instant conversion.",
    cta: {
      label: "Plan Your Digital Upgrade →",
      href: "/contact",
    },
    services: [
      {title: "Signature Website", slug: "signature-website", summary: "Multi-location discovery and appetite-driven brand experiences."},
      {title: "Landing Page Sprint", slug: "landing-page-sprint", summary: "High-conversion catering and new location launch destinations."},
    ],
  },
};

export async function generateStaticParams() {
  const industries = await getIndustrySlugs();
  const cmsSlugs = industries.data?.flatMap((industry) => industry.slug ? [{slug: industry.slug}] : []) ?? [];
  const staticSlugs = Object.keys(fallbackIndustries).map((slug) => ({slug}));
  const merged = [...cmsSlugs, ...staticSlugs];
  const unique = Array.from(new Set(merged.map((item) => item.slug))).map((slug) => ({slug}));
  return unique;
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const industry = await getIndustryPage(slug);
  const data = industry.data ?? fallbackIndustries[slug];

  return buildMetadata({title: data?.title ?? "Industry", description: data?.positioning, path: `/industries/${slug}`, seo: data?.seo});
}

export default async function IndustryRoute({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const industry = await getIndustryPage(slug);
  const data = industry.data ?? fallbackIndustries[slug];

  if (!data) notFound();
  return <IndustryPage data={data} />;
}
