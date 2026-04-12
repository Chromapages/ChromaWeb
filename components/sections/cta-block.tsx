"use client";

import Button from "@/components/ui/button";
import ScrollReveal from "@/components/ui/scroll-reveal";

type CtaBlockProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CtaBlock({
  title = "Ready to engineering a system that actually converts?",
  description = "Schedule a discovery call to audit your current performance bottlenecks and map a path to high-performance customer acquisition.",
  primaryLabel = "Book your discovery call",
  primaryHref = "/contact",
}: CtaBlockProps) {
  return (
    <section className="bg-primary pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden relative text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8">
        <ScrollReveal>
          <h2 className="mb-10 font-display text-hero font-extrabold leading-[1.1] tracking-tight text-bg">
            {title}
          </h2>
        </ScrollReveal>
        
        <ScrollReveal stagger={240}>
          <p className="mb-14 mx-auto max-w-2xl text-lg font-medium leading-relaxed text-bg/70 lg:text-xl">
             {description}
          </p>
        </ScrollReveal>

        <ScrollReveal stagger={480}>
          <div className="flex justify-center">
            <Button
              href={primaryHref}
              className="h-16 px-12 text-lg active:scale-95"
              analyticsLabel="Bottom CTA"
              analyticsLocation="homepage-bottom"
            >
              {primaryLabel}
            </Button>
          </div>
        </ScrollReveal>
        
        <ScrollReveal stagger={600} className="mt-20 flex justify-center gap-10 opacity-30 grayscale filter">
           <div className="h-6 w-24 bg-bg/20 rounded-full" />
           <div className="h-6 w-20 bg-bg/20 rounded-full" />
           <div className="h-6 w-28 bg-bg/20 rounded-full" />
        </ScrollReveal>
      </div>
    </section>
  );
}
