import Button from "@/components/ui/button";
import type { Service } from "@/types/sanity";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export default function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <article
      className={cn(
        "rounded-structural bg-surface-lowest p-7 shadow-ambient transition duration-300 hover:bg-surface-highest",
        className,
      )}
    >
      <p className="text-label-md uppercase text-primary-container">Service</p>
      <h3 className="mt-4 font-display text-2xl text-on-surface">{service.label || service.title || "Service"}</h3>
      <p className="mt-4 text-body-lg text-on-surface/72">{service.summary}</p>
      <ul className="mt-6 space-y-3 text-sm text-on-surface/72">
        {(service.outcomes || service.features || ["Focused execution"]).slice(0, 3).map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <Button
          href={`/services/${service.slug}`}
          variant="tertiary"
          analyticsLabel={`Explore ${service.label || service.title}`}
          analyticsLocation="service-card"
          className="inline-flex"
        >
          Explore service
          <span aria-hidden="true" className="inline-flex">
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Button>
      </div>
    </article>
  );
}
