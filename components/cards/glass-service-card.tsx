"use client";

import { LucideIcon, Zap, Target, Gauge } from "lucide-react";
import Button from "@/components/ui/button";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  stats: string;
};

export const homepageServices: Service[] = [
  {
    title: "Digital Experience Design",
    description: "High-conviction interfaces that reduce cognitive load and move visitors toward action.",
    icon: Zap,
    stats: "+40% Action Rate",
  },
  {
    title: "Conversion Engineering",
    description: "Systematic optimization of the entire funnel, from first click to discovery call booked.",
    icon: Target,
    stats: "2.4x Avg ROAS",
  },
  {
    title: "Performance SEO Systems",
    description: "Authority-led search strategies that capture high-intent demand without the fluff.",
    icon: Gauge,
    stats: "Top 3 Ranking Focus",
  },
];

type GlassServiceCardProps = {
  service: Service;
};

export default function GlassServiceCard({ service }: GlassServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="glass-panel-accent group flex flex-col items-start p-8 lg:p-10">
      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-functional bg-surface-2 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
        <Icon className="h-7 w-7" />
      </div>
      
      <div className="mb-4 inline-flex rounded-full bg-accent/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
        {service.stats}
      </div>
      
      <h3 className="mb-6 font-display text-2xl font-bold text-primary">
        {service.title}
      </h3>
      
      <p className="mb-10 text-base font-medium leading-relaxed text-primary/65">
        {service.description}
      </p>
      
      <div className="mt-auto">
        <Button 
          href="/contact" 
          variant="tertiary" 
          className="text-accent group/btn"
        >
          Discuss project 
          <span className="ml-2 transition-transform duration-280 group-hover/btn:translate-x-1">→</span>
        </Button>
      </div>
    </article>
  );
}
