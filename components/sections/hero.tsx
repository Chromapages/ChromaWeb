"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "@/components/ui/button";
import type { CaseStudy } from "@/types/sanity";
import { cn } from "@/lib/utils";

type HeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string; variant?: "primary" | "secondary" | "tertiary" };
  highlights?: string[];
  panelLabel?: string;
  panelTitle?: string;
  panelItems?: string[];
  isHome?: boolean;
  projects?: CaseStudy[];
};

export default function Hero({
  eyebrow = "Websites for service businesses",
  title = "A website that reflects the quality of your business.",
  description = "Your business has moved forward. Your website should show it. Chromapages designs and builds websites that explain what you offer and make the next step clear.",
  primaryAction = { label: "Send an inquiry", href: "/contact" },
  secondaryAction,
  isHome = false,
  projects = [],
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardStackRef = useRef<HTMLDivElement>(null);
  const resolvedSecondaryAction = secondaryAction ?? (isHome && projects.length === 0
    ? { label: "View services", href: "/services" }
    : { label: "View work", href: "/work" });

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      // Reset initial states for entrance
      gsap.set(".hero-fade-up", { y: 40, opacity: 0 });
      gsap.set(".hero-card", { scale: 0.9, opacity: 0, x: 20 });

      tl.to(".hero-fade-up", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
      }, 0.2);

      if (isHome && cardStackRef.current) {
        tl.to(".hero-card", {
          scale: 1,
          opacity: 1,
          x: 0,
          stagger: 0.15,
        }, 0.5);

        // Floating animation for the stack
        gsap.to(cardStackRef.current, {
          y: -12,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      });
      return () => media.revert();
    },
    { scope: containerRef, dependencies: [isHome] }
  );

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative flex items-center overflow-hidden bg-bg pt-20",
        isHome ? "min-h-[100svh]" : "py-24 lg:py-32"
      )}
    >
      {/* Background Layering */}
      <div className="grid-dot-pattern absolute inset-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none">
         <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[120px]" />
         <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className={cn(
          "grid gap-16 lg:items-center lg:gap-24",
          isHome ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-1 text-center"
        )}>
          
          {/* Content Column */}
          <div className={cn(
            "flex flex-col",
            isHome ? "items-start text-left" : "items-center text-center mx-auto max-w-4xl"
          )}>
            <div className="hero-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-surface-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {eyebrow}
            </div>

            <h1 className={cn(
              "hero-fade-up mb-8 font-display font-extrabold leading-[1.05] tracking-tight text-primary",
              isHome ? "text-hero" : "text-section lg:text-5xl"
            )}>
              {title}
            </h1>

            <p className={cn(
              "hero-fade-up mb-12 text-lg font-medium leading-relaxed text-primary/65 lg:text-xl",
              isHome ? "max-w-xl" : "max-w-2xl"
            )}>
              {description}
            </p>

            <div className="hero-fade-up flex flex-wrap gap-4 justify-center">
              <Button
                href={primaryAction.href}
                className="h-14 px-10 text-base"
                analyticsLabel="Hero primary CTA"
                analyticsLocation="hero"
              >
                {primaryAction.label}
              </Button>
              <Button
                href={resolvedSecondaryAction.href}
                variant="secondary"
                className="h-14 px-10 text-base"
                analyticsLabel="Hero secondary CTA"
                analyticsLocation="hero"
              >
                {resolvedSecondaryAction.label}
              </Button>
            </div>
            
            {isHome && projects.length > 0 && (
              <div className="hero-fade-up mt-16 border-t border-primary/5 pt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-primary/40">
                  Our work
                </p>
                <p className="mt-3 text-sm font-semibold text-primary/60">
                  Explore the project context and the work behind it.
                </p>
              </div>
            )}
          </div>

          {/* Visual Column / Card Stack */}
          {isHome && projects.length > 0 && (
            <div className="relative flex items-center justify-center lg:justify-end">
              <div
                ref={cardStackRef}
                className="relative h-[280px] w-full max-w-[400px] lg:h-[420px] lg:max-w-none"
              >
                {/* Stacked Glass Cards — real featured projects */}
                {projects.slice(0, 3).map((project, i) => {
                  const positions = [
                    "top-0 right-0 rotate-[3deg]",
                    "top-[40px] right-[20px] rotate-[-2deg] lg:top-[60px] lg:right-[30px]",
                    "top-[80px] right-[40px] rotate-[1deg] lg:top-[120px] lg:right-[60px]",
                  ];
                  return (
                    <div
                      key={project.slug}
                      className={cn(
                        "hero-card glass-panel-accent absolute w-[85%] p-6 lg:p-8",
                        positions[i]
                      )}
                    >
                      <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-widest text-accent lg:text-xs">
                        {project.client}
                      </p>
                      <p className="font-display text-lg font-extrabold text-primary lg:text-2xl">
                        {project.title}
                      </p>
                      <p className="mt-2 text-xs font-medium leading-relaxed text-primary/60 lg:text-sm">
                        {project.excerpt}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
