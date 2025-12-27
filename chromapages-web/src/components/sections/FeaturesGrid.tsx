import { Zap, Target, Clock, Headphones } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MetricDisplay } from "@/components/ui/MetricDisplay";

// Default pillars data
const defaultPillars = [
    {
        icon: Zap,
        title: "Looks Premium",
        description: "Design that builds trust through cleanliness and light.",
        metric: "100%",
        metricLabel: "Brand Aligned",
    },
    {
        icon: Target,
        title: "Built to Convert",
        description: "Clear paths to action with aggressive conversion engineering.",
        metric: "+40%",
        metricLabel: "Conversion Lift",
    },
    {
        icon: Clock,
        title: "Fast + Reliable",
        description: "Sub-second load times with engineering-grade performance.",
        metric: "0.8s",
        metricLabel: "LCP Score",
    },
    {
        icon: Headphones,
        title: "Ongoing Support",
        description: "We stay to iterate. Your success is our success.",
        metric: "24/7",
        metricLabel: "Support",
    },
];

export function FeaturesGrid() {
    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            <SectionHeading
                label="The Chromapages System"
                title="Four Pillars of Digital Excellence"
                description="We don't just build websites; we build performance engines. Every project is grounded in strict adherence to these four core principles."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {defaultPillars.map((pillar, index) => (
                    <GlassCard
                        key={index}
                        className="flex flex-col h-full transition-all duration-500 hover:scale-105"
                    >
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-[var(--brand-base)] flex items-center justify-center mb-6 shadow-sm border border-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                            <pillar.icon className="w-6 h-6" />
                        </div>

                        {/* Content */}
                        <h3 className="heading-section text-xl mb-3 text-[var(--brand-ink)]">
                            {pillar.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                            {pillar.description}
                        </p>

                        {/* Metric */}
                        <div className="border-t border-[var(--brand-primary)]/10 pt-4 mt-auto">
                            <MetricDisplay
                                value={pillar.metric}
                                label={pillar.metricLabel}
                            />
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
