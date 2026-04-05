import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaBlockProps = {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
};

export default function CtaBlock({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CtaBlockProps) {
  return (
    <section className={cn("bg-surface-container-low", className)}>
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <div className="rounded-structural gradient-primary p-8 text-white shadow-ambient md:p-10">
          <div className="max-w-3xl space-y-5">
            <h2 className="font-display text-3xl tracking-[-0.02em] md:text-[2.75rem]">
              {title}
            </h2>
            {description ? (
              <p className="max-w-2xl text-base leading-7 text-white/85">{description}</p>
            ) : null}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button href={primaryHref} variant="secondary" analyticsLabel={primaryLabel} analyticsLocation="cta-block">
                {primaryLabel}
              </Button>
              {secondaryLabel && secondaryHref ? (
                <Button
                  href={secondaryHref}
                  variant="tertiary"
                  analyticsLabel={secondaryLabel}
                  analyticsLocation="cta-block"
                  className="text-white hover:text-white"
                >
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
