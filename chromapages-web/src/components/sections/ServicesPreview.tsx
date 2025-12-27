import { Monitor, ShoppingBag, Terminal } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Static preview data for development/fallback
const defaultServices = [
    {
        title: "Marketing Websites",
        description: "High-performance landing pages designed to capture leads and build brand authority. optimized for SEO and conversion.",
        icon: Monitor,
        href: "/services/marketing-websites",
        color: "text-blue-600 bg-blue-50"
    },
    {
        title: "E-Commerce",
        description: "Custom Shopify builds that maximize AOV and LTV. Frictionless checkout flows and premium product presentation.",
        icon: ShoppingBag,
        href: "/services/ecommerce",
        color: "text-purple-600 bg-purple-50"
    },
    {
        title: "Web Applications",
        description: "Scalable SaaS dashboards and MVPs built with Next.js. Complex logic wrapped in intuitive UI.",
        icon: Terminal,
        href: "/services/web-apps",
        color: "text-emerald-600 bg-emerald-50"
    },
];

export function ServicesPreview() {
    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            <SectionHeading
                label="What We Build"
                title="Digital Products for Growth"
                description="We specialize in three core areas, avoiding the 'jack of all trades' trap to deliver deep expertise in each."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {defaultServices.map((service) => (
                    <GlassCard key={service.title} className="flex flex-col h-full group">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300", service.color)}>
                            <service.icon className="w-7 h-7" />
                        </div>

                        <h3 className="heading-section text-2xl mb-3 text-[var(--brand-ink)]">
                            {service.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                            {service.description}
                        </p>

                        <Link href={service.href} className="mt-auto">
                            <Button variant="secondary" className="w-full justify-between group-hover:bg-[var(--brand-primary)] group-hover:text-white group-hover:border-[var(--brand-primary)]">
                                Learn More
                            </Button>
                        </Link>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
