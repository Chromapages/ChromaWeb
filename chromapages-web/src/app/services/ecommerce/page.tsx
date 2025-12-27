import { Navbar, Footer } from "@/components/global";
import { GlassCard, SectionHeading, Button } from "@/components/ui";
import { CTABanner, ProcessSteps } from "@/components/sections";
import { ShoppingBag, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "E-Commerce Development | Chromapages",
    description: "Custom Shopify builds that maximize AOV and LTV. Frictionless checkout flows and premium product presentation.",
};

const features = [
    "Custom Shopify Theme",
    "Frictionless Checkout",
    "Product Page Optimization",
    "Upsell/Cross-sell Flows",
    "Inventory Management",
    "Payment Gateway Setup",
    "Shipping Integration",
    "Analytics Dashboard",
];

export default function EcommercePage() {
    return (
        <>
            <Navbar />

            <main className="relative min-h-screen pt-32">
                {/* Hero */}
                <section className="max-w-7xl mx-auto px-6 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6">
                                <ShoppingBag className="w-4 h-4 text-purple-600" />
                                <span className="text-mono-label text-purple-600">E-Commerce</span>
                            </div>

                            <h1 className="heading-hero text-4xl md:text-5xl lg:text-6xl text-[var(--brand-primary)] mb-6">
                                Online Stores Built to Maximize Revenue
                            </h1>

                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Custom Shopify builds that maximize AOV and LTV. We obsess over every pixel of your product pages and every step of your checkout flow.
                            </p>

                            <Link href="/contact">
                                <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                                    Start Your Project
                                </Button>
                            </Link>
                        </div>

                        <GlassCard className="p-0 overflow-hidden aspect-[4/3] bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
                            <div className="text-6xl font-mono font-bold text-purple-600/10">
                                PREVIEW
                            </div>
                        </GlassCard>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="bg-purple-50/50 py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <SectionHeading
                            label="What's Included"
                            title="End-to-End E-Commerce Excellence"
                            align="left"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center gap-3 p-4 bg-white/80 rounded-xl">
                                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 text-purple-600" />
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
