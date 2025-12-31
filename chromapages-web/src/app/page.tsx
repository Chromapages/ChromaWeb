import { Navbar, Footer } from "@/components/global";
import {
  NewHero,
  LogoCloud,
  FeaturesGrid,
  ServicesOffer,
  CaseStudyHighlight
} from "@/components/sections";
import { client } from "@/lib/sanity/client";
import { homePageQuery } from "@/lib/sanity/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const data = await client.fetch(homePageQuery);

  return (
    <div className="min-h-screen bg-surface-base">
      <Navbar />
      <NewHero
        headline={data?.heroHeadline}
        subheadline={data?.heroSubheadline}
        cta={data?.heroCta}
        secondaryCta={data?.heroSecondaryCta}
      />
      <LogoCloud />
      <FeaturesGrid />
      <ServicesOffer services={data?.featuredServices} />
      <CaseStudyHighlight caseStudies={data?.featuredCaseStudies} />
      <Footer />
    </div>
  );
}
