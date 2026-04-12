import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import TrustBar from "@/components/sections/trust-bar";
import ServicesGrid from "@/components/sections/services-grid";
import FeaturedWork from "@/components/sections/featured-work";
import ProcessSteps from "@/components/sections/process-steps";
import CtaBlock from "@/components/sections/cta-block";

export const metadata: Metadata = {
  title: "High-Performance Digital Systems | Chromapages",
  description:
    "We build conversion-engineered websites and web apps that turn high-value traffic into booked discovery calls. No fluff, just performance.",
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
