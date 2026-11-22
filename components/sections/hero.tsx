import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroProps = {
  isHome?: boolean;
  hasApprovedWork?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string; variant?: "primary" | "secondary" | "tertiary" };
};

const standards = [
  { title: "Look Premium", detail: "Reflect real craft" },
  { title: "Convert Clearly", detail: "Clear next steps" },
  { title: "Load Fast", detail: "Minimal client JS" },
  { title: "Launch Clean", detail: "Verified routes and SEO" },
  { title: "Keep Improving", detail: "Track meaningful actions" },
];

const inquiryAction = { label: "Send an inquiry", href: "/contact" };

export default function Hero({
  isHome = false,
  hasApprovedWork = false,
  eyebrow = "Websites for service businesses",
  title,
  description = isHome
    ? "Turn an outdated site into clear service pages, fast mobile performance, and a straightforward path to inquiry."
    : "Your business has moved forward. Your website should show it. Chromapages designs and builds websites that explain what you offer and make the next step clear.",
  primaryAction = inquiryAction,
  secondaryAction = { label: "View work", href: "/work" },
}: HeroProps) {
  const primary = isHome ? inquiryAction : primaryAction;
  const secondary = isHome
    ? hasApprovedWork ? { label: "View work", href: "#work" } : { label: "Explore services", href: "#services" }
    : secondaryAction;

  return (
    <section className={cn("bg-bg", isHome ? "cp-major" : "cp-section")} aria-labelledby="hero-title">
      <div className={cn("cp-container", isHome && "cp-grid lg:items-center")}>
        <div className={isHome ? "col-span-full min-w-0 lg:col-span-5" : "max-w-3xl"}>
          {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">{eyebrow}</p>}
          <h1 id="hero-title" className={cn("cp-heading-1 wrap-break-word", isHome ? "font-black" : "font-extrabold")}>
            {title ?? (
              <>A website that reflects {isHome ? <span className="text-primary">the quality</span> : "the quality"} of your business.</>
            )}
          </h1>
          <p className="cp-intro mt-6">{description}</p>
          <div className={cn(
            "flex flex-wrap gap-3",
            isHome ? "mt-6 flex-col items-start sm:mt-8 sm:flex-row sm:items-center" : "mt-8 items-center",
          )}>
            <Button
              href={primary.href}
              prefetch={isHome ? false : undefined}
              className={isHome ? "min-h-14 w-full px-6 text-[0.9375rem] sm:w-auto" : undefined}
              analyticsLabel="Hero primary CTA"
              analyticsLocation="hero"
            >
              {primary.label}
            </Button>
            <Button
              href={secondary.href}
              variant={isHome ? "tertiary" : secondaryAction.variant ?? "secondary"}
              className={isHome ? "min-h-11 py-0 text-base" : undefined}
              analyticsLabel="Hero secondary CTA"
              analyticsLocation="hero"
            >
              {secondary.label}
            </Button>
          </div>
          {isHome && (
            <p className="mt-2 max-w-[48ch] text-sm text-muted">
              Share your current URL and what needs to change — instant reference number on submit.
            </p>
          )}
        </div>

        {isHome && (
          <div className="col-span-full min-w-0 pt-2 sm:pt-4 lg:col-span-7 lg:ml-12 lg:pt-0">
            <section className="cp-page-stack" aria-labelledby="standards-title">
              <h2 id="standards-title" className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                Our standard
              </h2>
              <ol role="list" className="list-none divide-y divide-outline">
                {standards.map(({ title, detail }, index) => (
                  <li key={title} className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-baseline gap-2.5 py-2.5 text-sm leading-snug sm:py-3 lg:py-3.5">
                    <span aria-hidden="true" className="font-display font-medium text-primary tabular-nums">0{index + 1}</span>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <span data-standard-title="true" className="font-display text-base font-semibold leading-snug">{title}</span>
                      <span className="text-muted">{detail}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <figure className="mt-3 rounded-panel border border-outline bg-surface-container-low p-4">
                <figcaption className="text-xs font-semibold tracking-wide text-primary">
                  Illustrative service-page anatomy
                </figcaption>
                <ol role="list" className="mt-3 grid list-none grid-cols-3 gap-2 text-xs font-semibold leading-snug wrap-break-word">
                  <li className="rounded-functional border border-outline bg-indigo-wash p-2">
                    <span aria-hidden="true" className="mb-1 block text-primary tabular-nums">01</span>
                    Clear Offer
                  </li>
                  <li className="rounded-functional border border-outline bg-surface-lowest p-2">
                    <span aria-hidden="true" className="mb-1 block text-primary tabular-nums">02</span>
                    Service Scope
                  </li>
                  <li className="rounded-functional border border-outline border-t-2 border-t-accent bg-surface-lowest px-2 pt-[7px] pb-2">
                    <span aria-hidden="true" className="mb-1 block text-primary tabular-nums">03</span>
                    Inquiry Action
                  </li>
                </ol>
              </figure>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
