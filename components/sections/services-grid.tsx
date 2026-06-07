"use client";

import GlassServiceCard, { homepageServices } from "@/components/cards/glass-service-card";
import ScrollReveal from "@/components/ui/scroll-reveal";
import type { Service as SanityService } from "@/types/sanity";
import type { ServiceItem } from "@/lib/site";

type HomepageService = (typeof homepageServices)[number];

type ServiceRowProps = {
  service: ServiceItem | SanityService;
};

function ServiceRow({ service }: ServiceRowProps) {
  const heading =
    ("label" in service && service.label) ||
    ("title" in service && service.title) ||
    service.slug;
  return (
    <article className="flex flex-col items-start rounded-structural border border-primary/5 bg-surface-2 p-8 transition-colors hover:bg-surface-3 lg:p-10">
      <h3 className="mb-4 font-display text-2xl font-bold text-primary lg:text-3xl">
        {heading}
      </h3>
      <p className="text-base font-medium leading-relaxed text-primary/65">
        {service.summary}
      </p>
    </article>
  );
}

export default function ServicesGrid({
  items = homepageServices,
}: {
  items?: HomepageService[] | ServiceItem[] | SanityService[];
}) {
  // Discriminator: homepage items have a `description` field; Sanity services do not.
  const isSanityShape =
    items.length > 0 && !("description" in (items[0] as object));

  return (
    <section id="services" className="bg-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal className="max-w-3xl">
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-accent">
            What we do
          </p>
          <h2 className="mb-8 font-display text-section font-extrabold text-primary">
            Websites that do real work.
          </h2>
          <p className="mb-16 text-lg font-medium leading-relaxed text-primary/65">
            We design and build sites that load fast, look premium, and make it easy for the right visitors to take the next step.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => {
            const key =
              ("slug" in service && service.slug) ||
              ("title" in service && (service as HomepageService).title) ||
              String(index);
            return (
              <ScrollReveal key={key} stagger={index * 120}>
                {isSanityShape ? (
                  <ServiceRow service={service as SanityService} />
                ) : (
                  <GlassServiceCard service={service as HomepageService} />
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
