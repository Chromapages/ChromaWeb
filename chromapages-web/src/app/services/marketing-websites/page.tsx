import { Navbar, Footer } from "@/components/global";
import { GlassCard, SectionHeading, Button } from "@/components/ui";
import { CTABanner, ProcessSteps } from "@/components/sections";
import { Monitor, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Marketing Websites | Chromapages",
    description: "High-performance landing pages designed to capture leads and build brand authority. Optimized for SEO and conversion.",
};

const features = [
    "Custom Design System",
    "Mobile-First Development",
    "Sub-Second Load Times",
    "SEO Optimization",
    "CMS Integration (Sanity)",
    "Analytics & Tracking Setup",
    "Lead Capture Forms",
    "Conversion Tracking",
];

export default function MarketingWebsitesPage() {
    return (
        <>
            <Navbar />

            <main className="relative min-h-screen pt-32">
                {/* Hero */}
                <section className="max-w-7xl mx-auto px-6 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6">
                                <Monitor className="w-4 h-4 text-[var(--brand-primary)]" />
                                <span className="text-mono-label text-[var(--brand-primary)]">Marketing Websites</span>
                            </div>

                            <h1 className="heading-hero text-4xl md:text-5xl lg:text-6xl text-[var(--brand-primary)] mb-6">
                                Websites That Convert Visitors Into Customers
                            </h1>

                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                High-performance landing pages designed to capture leads and build brand authority. We don&apos;t just make things look good—we engineer every element for maximum conversion.
                            </p>

                            <Link href="/contact">
                                <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                                    Start Your Project
                                </Button>
                            </Link>
                        </div>

                        <GlassCard className="p-0 overflow-hidden aspect-[4/3] bg-gradient-to-br from-[var(--brand-base)] to-white flex items-center justify-center">
                            <div className="text-6xl font-mono font-bold text-[var(--brand-primary)]/10">
                                PREVIEW
                            </div>
                        </GlassCard>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="bg-[var(--brand-base)] py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <SectionHeading
                            label="What's Included"
                            title="Everything You Need to Win Online"
                            align="left"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 text-green-600" />
                                    </div>
                                    <span className="font-medium text-[var(--brand-ink)]">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <ProcessSteps />
                <CTABanner />
            </main>

            <Footer />
        </>
    );
}
