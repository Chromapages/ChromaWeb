"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string; variant?: any };
  highlights?: string[];
  panelLabel?: string;
  panelTitle?: string;
  panelItems?: string[];
  isHome?: boolean;
};

export default function Hero({
  eyebrow = "Digital Design Elevated",
  title = "High-performance digital systems for high-value brands.",
  description = "Chromapages builds conversion-engineered experiences that transform your digital presence into a silent, 24/7 client-acquisition engine.",
  primaryAction = { label: "Book a discovery call", href: "/contact" },
  secondaryAction = { label: "View our work", href: "/work" },
  isHome = false,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardStackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      // Reset initial states for entrance
      gsap.set(".hero-fade-up", { y: 40, opacity: 0 });
      gsap.set(".hero-card", { scale: 0.9, opacity: 0, x: 20 });

      tl.to(".hero-fade-up", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
      }, 0.2);

      if (isHome) {
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
                href={secondaryAction.href}
                variant="secondary"
                className="h-14 px-10 text-base"
                analyticsLabel="Hero secondary CTA"
                analyticsLocation="hero"
              >
                {secondaryAction.label}
              </Button>
            </div>
            
            {isHome && (
              <div className="hero-fade-up mt-16 flex items-center gap-6 border-t border-primary/5 pt-8">
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="h-10 w-10 overflow-hidden rounded-full border-2 border-bg bg-surface-3" />
                   ))}
                </div>
                <p className="text-sm font-semibold text-primary/50">
                  Join <span className="text-primary font-bold">150+</span> founders growing with Chromapages
                </p>
              </div>
            )}
          </div>

          {/* Visual Column / Card Stack */}
          {isHome && (
            <div className="relative flex items-center justify-center lg:justify-end">
              <div 
                ref={cardStackRef}
                className="relative h-[280px] w-full max-w-[400px] lg:h-[400px] lg:max-w-none"
              >
                {/* Stacked Glass Cards */}
                <div className="hero-card glass-panel-accent absolute top-0 right-0 w-[85%] rotate-[3deg] p-8 lg:p-10">
                  <p className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-accent">Efficiency</p>
                  <p className="font-display text-3xl font-extrabold text-primary lg:text-4xl">≤21 Days</p>
                  <p className="mt-2 text-sm font-medium text-primary/60">Average turnaround</p>
                </div>

                <div className="hero-card glass-panel-accent absolute top-[40px] right-[20px] w-[85%] rotate-[-2deg] p-8 lg:p-10">
                  <p className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-accent">Growth</p>
                  <p className="font-display text-3xl font-extrabold text-primary lg:text-4xl">+40%</p>
                  <p className="mt-2 text-sm font-medium text-primary/60">Conversion lift</p>
                </div>

                <div className="hero-card glass-panel-accent absolute top-[80px] right-[40px] w-[85%] rotate-[1deg] p-8 lg:top-[100px] lg:right-[60px] lg:p-10">
                  <p className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-accent">Trust</p>
                  <p className="font-display text-3xl font-extrabold text-primary lg:text-4xl">150+</p>
                  <p className="mt-2 text-sm font-medium text-primary/60">Brands launched</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
