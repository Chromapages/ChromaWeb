import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroProps = {
  isHome?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string; variant?: "primary" | "secondary" | "tertiary" };
};

const standards = [
  "Look Premium",
  "Convert Clearly",
  "Load Fast",
  "Launch Clean",
  "Keep Improving",
];

export default function Hero({
  isHome = false,
  eyebrow = "Websites for service businesses",
  title,
  description = isHome
    ? "Your business has moved forward. Your website should show it. Give visitors a clear picture of what you offer and a straightforward next step."
    : "Your business has moved forward. Your website should show it. Chromapages designs and builds websites that explain what you offer and make the next step clear.",
  primaryAction = { label: "Send an inquiry", href: "/contact" },
  secondaryAction = { label: "View work", href: "/work" },
}: HeroProps) {
  return (
    <section className="cp-major bg-bg" aria-labelledby="hero-title">
      <div className={cn("cp-container", isHome && "cp-grid lg:items-center")}>
        <div className={isHome ? "col-span-full min-w-0 lg:col-span-5" : "mx-auto max-w-4xl text-center"}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">{eyebrow}</p>
          <h1 id="hero-title" className={cn("cp-heading-1 wrap-break-word", isHome ? "font-black" : "font-extrabold")}>
            {title ?? (
              <>A website that reflects {isHome ? <span className="text-primary">the quality</span> : "the quality"} of your business.</>
            )}
          </h1>
          <p className={cn("cp-intro mt-6", !isHome && "mx-auto")}>{description}</p>
          <div className={cn(
            "mt-8 flex flex-wrap gap-3",
            isHome ? "flex-col items-start sm:flex-row sm:items-center" : "items-center justify-center",
          )}>
            <Button
              href={primaryAction.href}
              className={cn("min-h-14 px-6 text-[0.9375rem]", isHome && "w-full sm:w-auto")}
              analyticsLabel="Hero primary CTA"
              analyticsLocation="hero"
            >
              {primaryAction.label}
            </Button>
            <Button
              href={secondaryAction.href}
              variant={isHome ? "tertiary" : secondaryAction.variant ?? "secondary"}
              className={isHome ? "min-h-11 py-0 text-base" : "min-h-14 px-6 text-[0.9375rem]"}
              analyticsLabel="Hero secondary CTA"
              analyticsLocation="hero"
            >
              {secondaryAction.label}
            </Button>
          </div>
        </div>

        {isHome && (
          <div className="col-span-full min-w-0 pt-8 sm:pt-12 lg:col-span-7 lg:ml-12 lg:pt-0">
            <section className="cp-page-stack" aria-labelledby="standards-title">
              <h2 id="standards-title" className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                Our standard
              </h2>
              <ol role="list" className="list-none divide-y divide-outline">
                {standards.map((standard, index) => (
                  <li key={standard} className="flex items-baseline gap-6 py-6">
                    <span aria-hidden="true" className="min-w-8 font-display font-medium text-primary">0{index + 1}</span>
                    <span className="font-display text-xl leading-[1.15] font-semibold tracking-[-0.015em] lg:text-2xl">{standard}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
