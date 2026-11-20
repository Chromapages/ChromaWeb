import Link from "next/link";
import type { Service } from "@/types/sanity";

const needs = [
  "Your website no longer reflects your business",
  "Your services are difficult to understand online",
  "Visitors struggle to find the next step",
  "You want a clear engagement before making changes",
];

export default function ServicesGrid({ items }: { items?: Service[] }) {
  return (
    <section id="services" className="cp-section bg-bg" aria-labelledby="services-title">
      <div className="cp-container">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">How we can help</p>
        <h2 id="services-title" className="cp-heading-2">Start with what your website needs to do.</h2>
        <p className="cp-intro mt-6">
          {items
            ? "A new website, a focused landing page, or improvements to an existing site. Start with the problem you want to solve."
            : "Make your services easier to understand, bring your presentation up to date, and give visitors a clear way to get in touch."}
        </p>

        {items ? (
          items.length > 0 && <ul role="list" className="mt-8 list-none divide-y divide-outline border-y border-outline sm:mt-12">
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
        ) : (
          <>
            <ul role="list" className="mt-12 max-w-[68ch] list-none">
              {needs.map((need) => <li key={need} className="border-t border-outline py-6">{need}</li>)}
            </ul>
            <Link href="/services" className="cp-text-link">View services</Link>
          </>
        )}
      </div>
    </section>
  );
}
