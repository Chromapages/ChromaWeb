import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import FeaturedWork from "@/components/sections/featured-work";
import ServicesGrid from "@/components/sections/services-grid";
import ProcessSteps from "@/components/sections/process-steps";
import CtaBlock from "@/components/sections/cta-block";
import { getCaseStudies } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import type { CaseStudy } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Websites for service businesses",
  description:
    "Chromapages designs and builds websites for service businesses ready for an online presence that reflects the quality of their work.",
  alternates: { canonical: "/" },
};

function projectImage({ mainImage }: CaseStudy) {
  const alt = typeof mainImage?.alt === "string" ? mainImage.alt.trim() : "";
  if (!mainImage?.asset?._ref || !alt) return;

  try {
    return {
      src: urlFor({
        asset: mainImage.asset,
        crop: mainImage.crop ?? undefined,
        hotspot: mainImage.hotspot ?? undefined,
      }).width(1920).height(1080).url(),
      alt,
    };
  } catch {
    // A malformed media reference should not suppress verified project context.
    return undefined;
  }
}

export default async function HomePage() {
  const projects = (await getCaseStudies()).slice(0, 3).map((project) => ({
    slug: project.slug,
    title: project.title || project.label,
    excerpt: project.excerpt || project.summary,
    proofClassification: project.proofClassification,
    image: projectImage(project),
  }));
  return (
    <>
      <Hero isHome />
      <FeaturedWork projects={projects} />
      <ServicesGrid />
      <ProcessSteps />
      <CtaBlock />
    </>
  );
}
