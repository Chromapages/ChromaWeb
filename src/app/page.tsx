import { Navigation } from "../components/sections/Navigation";
import { Hero } from "../components/sections/Hero";
import { ClientLogos } from "../components/sections/ClientLogos";
import { FeaturedWork } from "../components/sections/FeaturedWork";
import { ServicesGrid } from "../components/sections/ServicesGrid";
import { Testimonials } from "../components/sections/Testimonials";
import { Metrics } from "../components/sections/Metrics";
import { Process } from "../components/sections/Process";
import { CtaStrip } from "../components/sections/CtaStrip";
import { Footer } from "../components/sections/Footer";
import { Reveal } from "../components/ui/Reveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Reveal><Hero /></Reveal>
      <Reveal delay={100}><ClientLogos /></Reveal>
      <Reveal delay={100}><FeaturedWork /></Reveal>
      <Reveal delay={100}><ServicesGrid /></Reveal>
      <Reveal delay={100}><Testimonials /></Reveal>
      <Reveal delay={100}><Metrics /></Reveal>
      <Reveal delay={100}><Process /></Reveal>
      <Reveal delay={100}><CtaStrip /></Reveal>
      <Footer />
    </main>
  );
}
