"use client";

import { Badge } from "../ui/Badge";
import { useEffect, useRef, useState } from "react";

interface MetricProps {
  target: string;
  suffix?: string;
  label: string;
}

function AnimatedMetric({ target, suffix = "", label }: MetricProps) {
  const [count, setCount] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const numTarget = parseFloat(target.replace(/[^0-9.]/g, ""));
    const hasDecimal = target.includes(".");
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = numTarget * easeOut;

      setCount(hasDecimal ? currentValue.toFixed(1) : Math.floor(currentValue).toString());

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      }
    };

    animationRef.current = requestAnimationFrame(step);
  }, [isVisible, target]);

  return (
    <div ref={ref} className="p-10 bg-[var(--color-swiss-black)] hover:bg-white/5 transition-swiss">
      <div className="text-5xl lg:text-6xl font-bold text-[var(--color-swiss-teal)] mb-2 tracking-tighter">
        {count}{suffix}
      </div>
      <div className="text-sm font-bold uppercase tracking-widest text-white/50">{label}</div>
    </div>
  );
}

export function Metrics() {
  return (
    <section className="py-32 bg-[var(--color-swiss-black)] text-white border-b border-[var(--color-swiss-border)]">
      <div className="container-swiss">
        <div className="swiss-grid">
          <div className="col-span-12 lg:col-span-5 mb-12 lg:mb-0 pr-8">
            <Badge variant="outline" className="text-white border-white/20 mb-6">Objective Data</Badge>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">Why<br />Chromapages.</h2>
            <p className="mt-8 text-lg text-white/60 max-w-xl border-l-4 border-[var(--color-swiss-teal)] pl-6">
              We engineer digital experiences based on objective metrics and structural integrity, not just aesthetics. Every pixel serves a purpose.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
              <AnimatedMetric target="150" suffix="ms" label="Avg. Response Time" />
              <AnimatedMetric target="240" suffix="%" label="Lead Generation" />
              <AnimatedMetric target="50" suffix="+" label="Enterprise Deployments" />
              <AnimatedMetric target="100/100" suffix="" label="Lighthouse Score" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
