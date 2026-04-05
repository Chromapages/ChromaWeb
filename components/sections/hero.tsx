"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "tertiary";
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
  highlights?: string[];
  panelLabel?: string;
  panelTitle?: string;
  panelItems?: string[];
  isHome?: boolean;
  className?: string;
};

export default function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  highlights = [],
  panelLabel,
  panelTitle,
  panelItems,
  isHome = false,
  className,
}: HeroProps) {
  const container = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      // Entrance Animations
      tl.from(".hero-content > *", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
      })
        .from(
          mockupRef.current,
          {
            x: -50,
            opacity: 0,
            duration: 1.2,
          },
          "-=0.5",
        )
        .from(
          [card1Ref.current, card2Ref.current, card3Ref.current],
          {
            scale: 0.8,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
          },
          "-=0.8",
        );

      // Continuous Floating Floating
      gsap.to(card1Ref.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(card2Ref.current, {
        y: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
      gsap.to(card3Ref.current, {
        y: -12,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className={cn(
        "relative flex min-h-[90vh] items-center overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24",
        className,
      )}
    >
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          {/* Visual Area (Left) */}
          <div className="relative order-2 lg:order-1">
            {isHome && !panelItems ? (
              <>
                {/* Product Showcase */}
                <div ref={mockupRef} className="relative z-10 mx-auto max-w-[320px] lg:max-w-none">
                  <Image
                    src="/images/hero/mockup.png"
                    alt="Chromapages Product Interface"
                    width={600}
                    height={800}
                    className="h-auto w-full drop-shadow-[0_32px_64px_rgba(0,0,0,0.15)]"
                    priority
                  />
                </div>

                {/* Floating Cards */}
                <div
                  ref={card1Ref}
                  className="absolute -left-4 top-[20%] z-20 w-32 md:-left-12 md:w-48 lg:w-56"
                >
                  <Image
                    src="/images/hero/card-graph.png"
                    alt="Growth Metrics"
                    width={240}
                    height={240}
                    className="h-auto w-full rounded-2xl shadow-ambient backdrop-blur-md"
                  />
                </div>
                <div
                  ref={card2Ref}
                  className="absolute -right-4 top-[10%] z-20 w-28 md:-right-8 md:w-40 lg:w-48"
                >
                  <Image
                    src="/images/hero/card-speed.png"
                    alt="Performance Score"
                    width={200}
                    height={200}
                    className="h-auto w-full rounded-2xl shadow-ambient backdrop-blur-md"
                  />
                </div>
                <div
                  ref={card3Ref}
                  className="absolute bottom-[10%] right-0 z-20 w-36 md:right-[-20px] md:w-52 lg:w-60"
                >
                  <Image
                    src="/images/hero/card-conversion.png"
                    alt="Conversion Optimization"
                    width={260}
                    height={260}
                    className="h-auto w-full rounded-2xl shadow-ambient backdrop-blur-md"
                  />
                </div>
              </>
            ) : panelItems ? (
              /* Information Panel (Standard Pages) */
              <div className="relative z-10 h-full w-full">
                <div className="rounded-structural border border-outline-variant/30 bg-surface-container-low p-8 shadow-ambient backdrop-blur-xl lg:p-12">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      {panelLabel && (
                        <span className="text-label-sm font-bold uppercase tracking-widest text-primary/60">
                          {panelLabel}
                        </span>
                      )}
                      {panelTitle && (
                        <h3 className="font-display text-headline-sm text-on-surface">
                          {panelTitle}
                        </h3>
                      )}
                    </div>
                    <ul className="space-y-4">
                      {panelItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span className="text-body-md text-on-surface/70 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Visual Accent for Panel */}
                <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
              </div>
            ) : null}
          </div>

          {/* Content (Right) */}
          <div className="hero-content space-y-8 order-1 lg:order-2">
            {eyebrow && (
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-label-md font-bold uppercase tracking-widest text-primary">
                {eyebrow}
              </span>
            )}
            <div className="space-y-6">
              <h1 className="font-display text-display-lg leading-[0.96] tracking-[-0.03em] text-on-surface">
                {title}
              </h1>
              <p className="max-w-xl text-body-lg text-on-surface/70 lg:text-xl">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                href={primaryAction.href}
                variant={primaryAction.variant ?? "primary"}
                analyticsLabel={primaryAction.label}
                analyticsLocation="hero"
                className="h-14 px-10 text-base"
              >
                {primaryAction.label}
              </Button>
              {secondaryAction && (
                <Button
                  href={secondaryAction.href}
                  variant={secondaryAction.variant ?? "secondary"}
                  analyticsLabel={secondaryAction.label}
                  analyticsLocation="hero"
                  className="h-14 px-10 text-base border border-outline-variant/30 glass-surface"
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>

            {/* Social Proof */}
            <div className="flex flex-col gap-6 pt-10 border-t border-surface-highest/50">
              <div className="flex items-center gap-4">
                <div className="relative h-10 w-32">
                  <Image
                    src="/images/hero/avatars.png"
                    alt="Our Happy Clients"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <p className="text-body-md font-medium text-on-surface/60">
                  <span className="text-on-surface font-bold text-primary">150+</span> high-growth
                  brands launched
                </p>
              </div>
              
              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2 text-label-md text-on-surface/50">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      {highlight}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

