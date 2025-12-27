import { Navbar, Footer } from "@/components/global";
import { GlassCard, SectionHeading } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
    title: "Our Work | Chromapages",
    description: "Case studies showcasing our premium web development projects. See the results we deliver for growth-focused businesses.",
};

// Placeholder case studies - will be replaced with Sanity data
const placeholderCaseStudies = [
    {
        _id: "1",
        title: "E-Commerce Redesign",
        slug: { current: "ecommerce-redesign" },
        client: "TechFlow",
        industry: "E-Commerce",
        excerpt: "Complete redesign of their Shopify store resulting in 65% increase in conversion rate.",
        results: [
            { metric: "Conversion Rate", value: "+65%" },
            { metric: "Revenue", value: "+120%" },
        ],
    },
    {
        _id: "2",
        title: "SaaS Dashboard MVP",
        slug: { current: "saas-dashboard" },
        client: "DataPulse",
        industry: "Technology",
        excerpt: "Built a scalable analytics dashboard from concept to launch in 8 weeks.",
        results: [
            { metric: "Time to Market", value: "8 weeks" },
            { metric: "User Adoption", value: "2,500+" },
        ],
    },
    {
        _id: "3",
        title: "Marketing Site Overhaul",
        slug: { current: "marketing-overhaul" },
        client: "GreenLeaf Co",
        industry: "Professional Services",
        excerpt: "New brand identity and website that doubled their lead generation.",
        results: [
            { metric: "Lead Gen", value: "+200%" },
            { metric: "Page Speed", value: "98/100" },
        ],
    },
];

export default function WorkPage() {
    return (
        <>
            <Navbar />

            <main className="relative min-h-screen pt-32">
                <section className="max-w-7xl mx-auto px-6 pb-16">
                    <SectionHeading
                        label="Case Studies"
                        title="Results That Speak"
                        description="A curated collection of projects where premium design meets measurable business impact."
                    />
                </section>

                <section className="max-w-7xl mx-auto px-6 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {placeholderCaseStudies.map((caseStudy) => (
                            <Link
                                key={caseStudy._id}
                                href={`/work/${caseStudy.slug.current}`}
                                className="group block h-full"
                            >
                                <GlassCard className="h-full flex flex-col hover:border-[var(--brand-accent)] transition-all duration-300">
                                    {/* Image Placeholder */}
                                    <div className="aspect-video bg-gradient-to-br from-[var(--brand-base)] to-gray-100 rounded-xl mb-6 flex items-center justify-center">
                                        <span className="font-mono text-sm text-gray-400 uppercase">Project Image</span>
                                    </div>

                                    <span className="text-xs font-mono text-[var(--brand-accent)] uppercase tracking-wider mb-2">
                                        {caseStudy.industry}
                                    </span>

                                    <h3 className="heading-section text-xl text-[var(--brand-ink)] mb-2 group-hover:text-[var(--brand-primary)] transition-colors">
                                        {caseStudy.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                                        {caseStudy.excerpt}
                                    </p>

                                    {/* Results */}
                                    <div className="border-t border-gray-100 pt-4 flex gap-6">
                                        {caseStudy.results.map((result, idx) => (
                                            <div key={idx}>
                                                <div className="font-mono text-xl font-bold text-[var(--brand-primary)]">
                                                    {result.value}
                                                </div>
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    {result.metric}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 flex items-center text-sm font-bold text-[var(--brand-primary)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        View Case Study <ArrowRight className="ml-1 w-4 h-4" />
                                    </div>
                                </GlassCard>
                            </Link>
                        ))}
                    </div>
                </section>

                <CTABanner />
            </main>

            <Footer />
        </>
    );
}
