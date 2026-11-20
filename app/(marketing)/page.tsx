import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import TrustBar from "@/components/sections/trust-bar";
import ServicesGrid from "@/components/sections/services-grid";
import FeaturedWork from "@/components/sections/featured-work";
import ProcessSteps from "@/components/sections/process-steps";
import CtaBlock from "@/components/sections/cta-block";
import { getCaseStudies } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Websites for service businesses",
  description:
    "Chromapages designs and builds websites for service businesses ready for an online presence that reflects the quality of their work.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const projects = await getCaseStudies();
  return (
    <>
      <Hero isHome projects={projects.slice(0, 3)} />
      <TrustBar />
      <ServicesGrid />
      <FeaturedWork projects={projects.slice(0, 3)} />
      <ProcessSteps />
      <CtaBlock />
    </>
  );
}
