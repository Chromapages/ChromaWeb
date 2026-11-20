"use client";

import Button from "@/components/ui/button";
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
      {"slug" in service && service.slug && (
        <Button href={`/services/${service.slug}`} variant="tertiary" className="mt-6">
          Explore service
        </Button>
      )}
    </article>
  );
}

export default function ServicesGrid({
  items = homepageServices,
}: {
  items?: HomepageService[] | ServiceItem[] | SanityService[];
}) {
  const isServiceRow = items.length > 0 && "slug" in items[0];

  return (
    <section id="services" className="bg-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal className="max-w-3xl">
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-accent">
            How we can help
          </p>
          <h2 className="mb-8 font-display text-section font-extrabold text-primary">
            Start with what your website needs to do.
          </h2>
          <p className="mb-16 text-lg font-medium leading-relaxed text-primary/65">
            A new website, a focused landing page, or improvements to an existing site. Start with the problem you want to solve.
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
                {isServiceRow ? (
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
