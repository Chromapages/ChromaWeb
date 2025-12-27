import { Navbar, Footer } from "@/components/global";
import {
  HeroSection,
  FeaturesGrid,
  ServicesPreview,
  ProcessSteps,
  CTABanner
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen pt-20">
        {/* Background Atmosphere */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[var(--brand-primary)]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[var(--brand-accent)]/10 rounded-full blur-[100px]" />
        </div>

        <HeroSection
          headline="Websites That Perform."
          subheadline="We merge premium aesthetics with engineering-grade performance. Digital Design Elevated."
          primaryCta={{ label: "Start Building", href: "/contact" }}
          secondaryCta={{ label: "View Our Work", href: "/work" }}
        />

        <FeaturesGrid />
        <ServicesPreview />
        <ProcessSteps />
        <CTABanner />
      </main>

      <Footer />
    </>
  );
}
