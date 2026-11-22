import Link from "next/link";
import Button from "@/components/ui/button";
import { services } from "@/lib/site";
import type { Service } from "@/types/sanity";

const homeServices = services.filter(({ slug }) =>
  slug === "marketing-websites" || slug === "landing-pages" || slug === "ongoing-support",
);

export default function ServicesGrid({ items, isHome }: { items?: Service[]; isHome?: boolean }) {
  if (isHome || items === undefined) {
    return (
      <section id="services" className="cp-section border-t border-outline bg-surface-lowest" aria-labelledby="services-title">
        <div className="cp-container">
          <div className="cp-grid items-end">
            <div className="col-span-full lg:col-span-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">How we can help</p>
              <h2 id="services-title" className="cp-heading-2">Start with what your website needs to do.</h2>
              <p className="cp-intro mt-6">
                Make your services easier to understand, bring your presentation up to date, and give visitors a clear way to get in touch.
              </p>
            </div>
            <Button
              href="/services"
              variant="tertiary"
              analyticsLabel="View all services"
              analyticsLocation="homepage-services"
              className="col-span-full justify-self-start lg:col-span-4 lg:justify-self-end"
            >
              View all 5 services
            </Button>
          </div>
          <ul role="list" className="mt-8 list-none divide-y divide-outline border-y border-outline sm:mt-12">
            {homeServices.map(({ slug, label, summary }) => (
              <li key={slug} className="cp-grid relative items-center gap-y-2 py-5 sm:py-6">
                <h3 className="col-span-full text-xl font-semibold lg:col-span-4 lg:text-2xl">{label}</h3>
                <p className="col-span-full text-muted sm:col-span-5 lg:col-span-5">{summary}</p>
                <Button
                  href={`/services/${slug}`}
                  variant="tertiary"
                  analyticsLabel={`Explore service: ${label}`}
                  analyticsLocation="homepage-services"
                  className="col-span-full justify-self-start after:absolute after:inset-0 after:content-[''] sm:col-span-3 sm:justify-self-end"
                >
                  Explore service<span className="sr-only">: {label}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="cp-section bg-bg" aria-labelledby="services-title">
      <div className="cp-container">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">How we can help</p>
        <h2 id="services-title" className="cp-heading-2">Start with what your website needs to do.</h2>
        <p className="cp-intro mt-6">
          A new website, a focused landing page, or improvements to an existing site. Start with the problem you want to solve.
        </p>

        {items.length > 0 && (
          <ul role="list" className="mt-8 list-none divide-y divide-outline border-y border-outline sm:mt-12">
            {items.map((service) => {
              const heading = service.label || service.title || service.slug;
              return (
                <li key={service.slug} className="cp-grid items-center gap-y-2 py-6 sm:py-8">
                  <div className="col-span-full min-w-0 lg:col-span-8">
                    <h3 className="wrap-break-word text-xl font-semibold lg:text-2xl">{heading}</h3>
                    <p className="mt-3 max-w-[68ch] text-muted">{service.summary}</p>
                  </div>
                  {service.slug && (
                    <Link href={`/services/${service.slug}`} className="cp-text-link col-span-full justify-self-start lg:col-span-4 lg:justify-self-end">
                      Explore service<span className="sr-only">: {heading}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
