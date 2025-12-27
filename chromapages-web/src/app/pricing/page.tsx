import { Navbar, Footer } from "@/components/global";
import { SectionHeading } from "@/components/ui";
import { PricingTable, CTABanner } from "@/components/sections";

export const metadata = {
    title: "Pricing | Chromapages",
    description: "Transparent pricing for premium web development. Starter, Growth, and Enterprise packages available.",
};

export default function PricingPage() {
    return (
        <>
            <Navbar />

            <main className="relative min-h-screen pt-32">
                <section className="max-w-7xl mx-auto px-6 pb-16">
                    <SectionHeading
                        label="Investment"
                        title="Transparent Pricing"
                        description="No hidden fees, no hourly surprises. Choose the package that fits your growth stage."
                    />
                </section>

                <PricingTable />

                {/* FAQ Section */}
                <section className="max-w-3xl mx-auto px-6 py-24">
                    <SectionHeading
                        label="FAQ"
                        title="Common Questions"
                        align="left"
                    />

                    <div className="space-y-6">
                        {[
                            {
                                q: "What's included in the quoted price?",
                                a: "Everything listed in the package features, plus project management, design revisions, and 30 days of post-launch support.",
                            },
                            {
                                q: "Do you offer payment plans?",
                                a: "Yes! We typically structure payments as 50% upfront and 50% on launch. For larger projects, we can discuss milestone-based payments.",
                            },
                            {
                                q: "What if I need something not listed?",
                                a: "We love custom work. Book a discovery call and we'll scope a solution tailored to your exact needs.",
                            },
                            {
                                q: "How long does a typical project take?",
                                a: "Starter projects: 3-4 weeks. Growth projects: 6-8 weeks. Enterprise: 10-16 weeks depending on complexity.",
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="border-b border-gray-100 pb-6">
                                <h3 className="heading-section text-lg text-[var(--brand-ink)] mb-2">
                                    {item.q}
                                </h3>
                                <p className="text-gray-600">
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <CTABanner />
            </main>

            <Footer />
        </>
    );
}
