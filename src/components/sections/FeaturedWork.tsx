"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function FeaturedWork() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-[var(--color-swiss-bg)] border-b border-[var(--color-swiss-border)]"
    >
      <div className="container-swiss">
        <div className="swiss-grid">
          <div className="col-span-12 lg:col-span-7 relative overflow-hidden">
            <div
              className={`aspect-[4/3] bg-[var(--color-swiss-black)] relative transition-all duration-1000 ${
                isVisible ? "translate-y-0" : "translate-y-full"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/20 text-9xl font-bold tracking-tighter">CP</div>
              </div>
              <div className="absolute inset-0 bg-[var(--color-swiss-teal)] opacity-0 hover:opacity-0 transition-opacity duration-500" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 pl-0 lg:pl-12 flex flex-col justify-center mt-8 lg:mt-0">
            <div className="text-sm font-bold tracking-widest text-[var(--color-swiss-teal)] mb-4">
              FEATURED CASE STUDY
            </div>
            <div className="text-8xl md:text-9xl font-bold tracking-tighter text-[var(--color-swiss-black)] mb-8 leading-none">
              01
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6">
              FinTech Dashboard
            </h2>
            <div className="text-3xl md:text-4xl font-bold tracking-tighter text-[var(--color-swiss-teal)] mb-8">
              +240% Conversion
            </div>
            <p className="text-lg text-[var(--color-swiss-black)]/60 mb-8 max-w-md">
              A complete redesign of a financial services platform, focusing on data visualization and user experience optimization.
            </p>
            <Link
              href="/work/fintech-dashboard"
              data-cursor="view-work"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--color-swiss-indigo)] hover:text-[var(--color-swiss-teal)] transition-swiss"
            >
              VIEW FULL STUDY
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
