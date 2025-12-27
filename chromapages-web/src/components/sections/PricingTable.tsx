import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

// Dummy data structure - will be replaced by Sanity data in real usage
const defaultPackages = [
    {
        name: "Starter",
        description: "Perfect for small businesses establishing a premium presence.",
        price: 3500,
        features: [
            "Custom 5-Page Website",
            "Next.js + Sanity CMS",
            "Mobile Responsive",
            "Basic SEO Setup",
            "Contact Form Integration",
        ],
        isPopular: false,
        ctaLabel: "Get Started",
    },
    {
        name: "Growth",
        description: "For scaling companies that need advanced functionality and lead gen.",
        price: 7500,
        features: [
            "Up to 10 Unique Pages",
            "Advanced Animations",
            "Blog / Resource Hub",
            "CRM Integration",
            "Conversion Optimization",
            "Google Analytics 4 Setup",
        ],
        isPopular: true,
        ctaLabel: "Scale Now",
    },
    {
        name: "Enterprise",
        description: "Full-scale digital transformation for established organizations.",
        price: 15000,
        features: [
            "Unlimited Component Library",
            "Custom Web App Features",
            "Interactive Data Viz",
            "Advanced Security",
            "Priority Support SLA",
            "A/B Testing Setup",
        ],
        isPopular: false,
        ctaLabel: "Contact Sales",
    },
];

export function PricingTable() {
    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24" id="pricing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {defaultPackages.map((pkg) => (
                    <GlassCard
                        key={pkg.name}
                        className={cn(
                            "flex flex-col relative transition-all duration-300",
                            pkg.isPopular
                                ? "border-[var(--brand-primary)] shadow-xl ring-4 ring-[var(--brand-primary)]/5 scale-105 z-10"
                                : "hover:border-[var(--brand-primary)]/30 hover:shadow-lg"
                        )}
                        hoverEffect={false}
                    >
                        {pkg.isPopular && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <span className="bg-[var(--brand-accent)] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                                    Most Popular
                                </span>
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="heading-section text-2xl text-[var(--brand-ink)] mb-2">
                                {pkg.name}
                            </h3>
                            <p className="text-gray-500 text-sm min-h-[40px]">
                                {pkg.description}
                            </p>
                        </div>

                        <div className="mb-8 p-6 bg-[var(--brand-base)] rounded-2xl text-center">
                            <div className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">Starting At</div>
                            <div className="font-mono text-4xl font-bold text-[var(--brand-primary)]">
                                {formatCurrency(pkg.price)}
                            </div>
                        </div>

                        <ul className="space-y-4 mb-10 flex-grow">
                            {pkg.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-sm text-[var(--brand-ink)]">
                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant={pkg.isPopular ? "primary" : "secondary"}
                            className="w-full"
                        >
                            {pkg.ctaLabel}
                        </Button>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
