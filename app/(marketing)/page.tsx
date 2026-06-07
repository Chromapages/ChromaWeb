import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import TrustBar from "@/components/sections/trust-bar";
import ServicesGrid from "@/components/sections/services-grid";
import FeaturedWork from "@/components/sections/featured-work";
import ProcessSteps from "@/components/sections/process-steps";
import CtaBlock from "@/components/sections/cta-block";

export const metadata: Metadata = {
  title: "Digital Design Elevated.",
  description:
    "We design and build modern websites and web apps that load fast, look premium, and drive more leads.",
};

export default function HomePage() {
  return (
    <>
      <Hero isHome />
      <TrustBar />
      <ServicesGrid />
      <FeaturedWork />
      <ProcessSteps />
      <CtaBlock />
    </>
  );
}
