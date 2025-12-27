import { Navbar, Footer } from "@/components/global";
import { GlassCard, Button } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

// This is a placeholder page - will be replaced with dynamic [slug] routing

export default function CaseStudyDetailPage() {
    return (
        <>
            <Navbar />

            <main className="relative min-h-screen pt-32">
                <article className="max-w-4xl mx-auto px-6 pb-24">
                    {/* Back Link */}
                    <Link
                        href="/work"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--brand-primary)] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Work
                    </Link>

                    {/* Header */}
                    <header className="mb-12">
                        <span className="text-mono-label text-[var(--brand-accent)] mb-4 block">
                            E-Commerce • TechFlow
                        </span>
                        <h1 className="heading-hero text-4xl md:text-5xl text-[var(--brand-primary)] mb-6">
                            E-Commerce Redesign
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Complete redesign of their Shopify store resulting in 65% increase in conversion rate and 120% revenue growth.
                        </p>
                    </header>

                    {/* Hero Image Placeholder */}
                    <GlassCard className="aspect-video mb-16 flex items-center justify-center bg-gradient-to-br from-[var(--brand-base)] to-gray-100">
                        <span className="font-mono text-gray-400">Featured Image</span>
                    </GlassCard>

                    {/* Results Strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {[
                            { value: "+65%", label: "Conversion Rate" },
                            { value: "+120%", label: "Revenue" },
                            { value: "0.8s", label: "LCP Score" },
                            { value: "98", label: "Lighthouse" },
                        ].map((stat) => (
                            <GlassCard key={stat.label} className="text-center py-6">
                                <div className="font-mono text-3xl font-bold text-[var(--brand-primary)]">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mt-1">
                                    {stat.label}
                                </div>
                            </GlassCard>
                        ))}
                    </div>

                    {/* Content Sections */}
                    <section className="mb-12">
                        <h2 className="heading-section text-2xl text-[var(--brand-ink)] mb-4">The Challenge</h2>
                        <p className="text-gray-600 leading-relaxed">
                            TechFlow came to us with an outdated Shopify theme that was hurting their conversion rates. Their mobile experience was clunky, page speeds were slow, and the checkout flow had too much friction. They needed a complete overhaul that would match their premium brand positioning.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="heading-section text-2xl text-[var(--brand-ink)] mb-4">Our Solution</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We designed and built a custom Shopify theme from scratch, focusing on three key areas:
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--brand-primary)] font-bold">1.</span>
                                <span>Mobile-first redesign with optimized touch targets and streamlined navigation</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--brand-primary)] font-bold">2.</span>
                                <span>Performance optimization achieving sub-second load times</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--brand-primary)] font-bold">3.</span>
                                <span>Checkout flow redesign reducing cart abandonment by 40%</span>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="heading-section text-2xl text-[var(--brand-ink)] mb-4">Technologies Used</h2>
                        <div className="flex flex-wrap gap-2">
                            {["Shopify", "Liquid", "Tailwind CSS", "JavaScript", "Figma"].map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 bg-[var(--brand-base)] rounded-full text-sm font-mono text-[var(--brand-ink)]"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
                        <Link href="/contact">
                            <Button size="lg">Start Your Project</Button>
                        </Link>
                        <Button variant="secondary" size="lg" leftIcon={<ExternalLink className="w-4 h-4" />}>
                            Visit Live Site
                        </Button>
                    </div>
                </article>

                <CTABanner />
            </main>

            <Footer />
        </>
    );
}
