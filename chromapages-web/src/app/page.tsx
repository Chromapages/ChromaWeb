import { Navbar, Footer } from "@/components/global";
import {
  NewHero,
  LogoCloud,
  FeaturesGrid,
  ServicesOffer,
  CaseStudyHighlight
} from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-base">
      <Navbar />
      <NewHero />
      <LogoCloud />
      <FeaturesGrid />
      <ServicesOffer />
      <CaseStudyHighlight />
      <Footer />
    </div>
  );
}
