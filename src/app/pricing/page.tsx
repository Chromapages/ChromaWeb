import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FAQ } from "@/components/sections/FAQ";

const PLANS = [
    {
        name: "Standard",
        price: "$4,500",
        period: "per project",
        features: ["Single Page Architecture", "Swiss Modern UI", "14-Day Engineering Cycle", "Basic SEO Protocol"],
        description: "Ideal for high-converting landing pages and MVP marketing sites."
    },
    {
        name: "Growth Retainer",
        price: "$2,800",
        period: "per month",
        features: ["10hr Dev Reserve", "Priority Support", "Monthly Design Sprint", "Performance Monitoring", "Weekly Sync Calls"],
        description: "Ongoing partnership for continuous digital improvement and rapid iteration."
    },
    {
        name: "Enterprise",
        price: "$9,500",
        period: "starting at",
        features: ["Multi-Page Ecosystem", "Custom Design System", "Full Sanity CMS Integration", "Advanced Performance Tier"],
        description: "Tailored for growing SaaS brands requiring a scalable digital footprint.",
        featured: true
    }
];

const COMPARISON = [
    { feature: "Design System", standard: true, retainer: true, enterprise: true },
    { feature: "CMS Integration", standard: "Basic", retainer: true, enterprise: "Full" },
    { feature: "SEO Protocol", standard: true, retainer: true, enterprise: "Advanced" },
    { feature: "Priority Support", standard: false, retainer: true, enterprise: true },
    { feature: "Revision Rounds", standard: "2", retainer: "Unlimited", enterprise: "Unlimited" },
    { feature: "Performance Audit", standard: false, retainer: "Monthly", enterprise: true },
    { feature: "API Integrations", standard: false, retainer: "3 included", enterprise: "Unlimited" },
];

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <Navigation />

            <section className="pt-32 pb-24 border-b border-[var(--color-swiss-border)]">
                <div className="container-swiss">
                    <div className="mb-20">
                        <h1 className="text-8xl md:text-[12rem] font-bold leading-[0.8] tracking-tighter text-[var(--color-swiss-indigo)] uppercase mb-8">
                            Investment.
                        </h1>
                        <p className="text-xl max-w-xl text-[var(--color-muted)] border-l-4 border-[var(--color-swiss-teal)] pl-6">
                            Predictable pricing for precise digital engineering. No hidden variables. Total structural transparency.
                        </p>
                    </div>

                    {/* ROI Value Strip */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-swiss-border)] border border-[var(--color-swiss-border)] mb-16">
                        <div className="p-8 bg-white">
                            <div className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--color-swiss-teal)] mb-2">2.5X</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">Avg. Return on Investment</div>
                        </div>
                        <div className="p-8 bg-white">
                            <div className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--color-swiss-teal)] mb-2">+240%</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">Avg. Lead Generation Increase</div>
                        </div>
                        <div className="p-8 bg-white">
                            <div className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--color-swiss-teal)] mb-2">3x</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">Avg. Site Speed Improvement</div>
                        </div>
                    </div>

                    {/* Delivery Guarantee Strip */}
                    <div className="bg-[#FAFAFA] border-l-4 border-[var(--color-swiss-teal)] p-8 mb-16">
                        <div className="text-2xl md:text-3xl font-bold tracking-tighter uppercase mb-2">14-DAY DELIVERY GUARANTEE</div>
                        <p className="text-[var(--color-muted)]">Delivered on-schedule, or we refund your deposit — no questions asked.</p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PLANS.map((plan, i) => (
                            <BentoCard key={i} className={`gap-8 h-full bg-[var(--color-swiss-bg)] ${plan.featured ? 'ring-2 ring-[var(--color-swiss-indigo)] z-10' : ''}`} hoverEffect={false}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Badge variant={plan.featured ? "accent" : "default"} className="mb-4">{plan.name}</Badge>
                                        <div className="text-6xl font-bold tracking-tighter">{plan.price}</div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mt-1">{plan.period}</div>
                                    </div>
                                    {plan.featured && <Badge variant="default" className="bg-[var(--color-swiss-indigo)]">RECOMMENDED</Badge>}
                                </div>

                                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                                    {plan.description}
                                </p>

                                <div className="space-y-4 flex-grow">
                                    {plan.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-4 py-2 border-b border-[var(--color-swiss-border)]">
                                            <span className="text-[var(--color-swiss-indigo)] font-bold">+</span>
                                            <span className="text-xs font-bold uppercase tracking-wider">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button variant={plan.featured ? "primary" : "outline"} size="lg" className="w-full">
                                    INITIATE {plan.name.toUpperCase()}
                                </Button>
                            </BentoCard>
                        ))}
                    </div>

                    {/* Feature Comparison Table */}
                    <div className="mt-24">
                        <h2 className="text-3xl font-bold tracking-tighter uppercase mb-8">What's Included</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--color-swiss-border)]">
                                        <th className="text-left py-4 pr-8 font-bold uppercase tracking-wider text-[var(--color-muted)]">Feature</th>
                                        <th className="text-center py-4 px-4 font-bold uppercase tracking-wider">Standard</th>
                                        <th className="text-center py-4 px-4 font-bold uppercase tracking-wider">Retainer</th>
                                        <th className="text-center py-4 px-4 font-bold uppercase tracking-wider bg-[var(--color-swiss-indigo)] text-white">Enterprise</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARISON.map((row, i) => (
                                        <tr key={i} className="border-b border-[var(--color-swiss-border)]">
                                            <td className="py-4 pr-8 font-bold uppercase tracking-wider">{row.feature}</td>
                                            <td className="text-center py-4 px-4">
                                                {typeof row.standard === 'boolean' ? (
                                                    row.standard ? <span className="text-[var(--color-swiss-teal)] font-bold">✓</span> : <span className="text-[var(--color-muted)]">—</span>
                                                ) : (
                                                    <span className="text-sm text-[var(--color-muted)]">{row.standard}</span>
                                                )}
                                            </td>
                                            <td className="text-center py-4 px-4">
                                                {typeof row.retainer === 'boolean' ? (
                                                    row.retainer ? <span className="text-[var(--color-swiss-teal)] font-bold">✓</span> : <span className="text-[var(--color-muted)]">—</span>
                                                ) : (
                                                    <span className="text-sm text-[var(--color-muted)]">{row.retainer}</span>
                                                )}
                                            </td>
                                            <td className="text-center py-4 px-4 bg-[var(--color-swiss-indigo)]/5">
                                                {typeof row.enterprise === 'boolean' ? (
                                                    row.enterprise ? <span className="text-[var(--color-swiss-teal)] font-bold">✓</span> : <span className="text-white/40">—</span>
                                                ) : (
                                                    <span className="text-sm font-bold">{row.enterprise}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ />

            {/* Protocol Section */}
            <section className="py-24">
                <div className="container-swiss">
                    <div className="swiss-grid">
                        <div className="col-span-12 lg:col-span-4">
                            <h2 className="text-2xl font-bold tracking-tighter uppercase mb-4">The Protocol</h2>
                        </div>
                        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-12">
                            <div>
                                <h3 className="font-bold uppercase mb-2">01_Payment</h3>
                                <p className="text-sm text-[var(--color-muted)]">50% upfront to initiate the architecture, 50% upon zero-downtime deployment.</p>
                            </div>
                            <div>
                                <h3 className="font-bold uppercase mb-2">02_Timeline</h3>
                                <p className="text-sm text-[var(--color-muted)]">Standard cycles are 14 business days from kickoff to final deployment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
