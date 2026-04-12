"use client";

import GlassServiceCard, { homepageServices } from "@/components/cards/glass-service-card";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function ServicesGrid({ items = homepageServices }: { items?: any[] }) {
  return (
    <section id="services" className="bg-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal className="max-w-3xl">
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-accent">Capabilities</p>
          <h2 className="mb-8 font-display text-section font-extrabold text-primary">
            Focused systems for the parts of the site that need to do real work.
          </h2>
          <p className="mb-16 text-lg font-medium leading-relaxed text-primary/65">
            We don't do generalist marketing. We build high-conviction digital products designed to increase conversion velocity and build authority in high-value cohorts.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(items || homepageServices).map((service, index) => (
            <ScrollReveal key={service.title} stagger={index * 120}>
              <GlassServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
