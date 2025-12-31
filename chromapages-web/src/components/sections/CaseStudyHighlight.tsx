import Image from "next/image";
import Link from "next/link";
import { Layout, ShoppingBag, AppWindow } from "lucide-react";

interface CaseStudy {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    industry: string;
    mainImage: string;
    excerpt: string;
    testimonial?: {
        quote: string;
        author: string;
        role: string;
        company: string;
    };
}

interface CaseStudyHighlightProps {
    caseStudies?: CaseStudy[];
}

export function CaseStudyHighlight({ caseStudies }: CaseStudyHighlightProps) {
    // Use the first case study if available, otherwise fallback
    const featured = caseStudies && caseStudies.length > 0 ? caseStudies[0] : null;

    // Fallback data
    const fallback = {
        industry: "Fintech Startup",
        quote: "Chromapages redesigned our core marketing site. The new build is blazing fast, and our conversion rate on paid traffic increased by 45% within the first month of launch.",
        href: "/work",
        author: "Sarah Jenkins",
        role: "CMO, FinanceFlow",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    };

    const displayData = featured ? {
        industry: featured.industry || featured.client,
        quote: featured.testimonial?.quote || featured.excerpt,
        href: `/work/${featured.slug.current}`,
        author: featured.testimonial?.author || "Happy Client",
        role: featured.testimonial ? `${featured.testimonial.role}, ${featured.testimonial.company}` : featured.client,
        image: featured.mainImage || fallback.image
    } : fallback;

    return (
        <section className="py-24 px-6 bg-surface-base">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-medium text-brand-ink tracking-tight leading-[1.2] font-heading">
                        See how we solve problems,<br />
                        <span className="text-slate-500/60">right on target.</span>
                    </h2>
                </div>

                <div className="bg-white rounded-[3rem] p-8 lg:p-12 overflow-hidden border border-slate-200 shadow-sm">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Text Content */}
                        <div className="lg:pl-8">
                            <div className="mb-8">
                                <span className="text-brand-primary font-semibold tracking-tight text-lg font-heading">{displayData.industry}</span>
                            </div>
                            <blockquote className="text-xl text-slate-600 leading-relaxed font-light mb-10 font-body">
                                "{displayData.quote}"
                            </blockquote>
                            <Link href={displayData.href} className="inline-block px-6 py-2.5 rounded-full bg-brand-secondary text-white text-sm font-medium hover:bg-brand-primary transition-all mb-16">
                                View case study
                            </Link>
                            <div>
                                <p className="text-sm font-semibold text-brand-ink font-heading">{displayData.author}</p>
                                <p className="text-sm text-slate-500/70 font-body">{displayData.role}</p>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden border border-slate-200 relative">
                            <Image
                                src={displayData.image}
                                alt="Analytics Dashboard"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-8 mt-12 border-b border-slate-200 pb-1 max-w-3xl mx-auto">
                    <button className="flex items-center gap-2 pb-4 border-b-2 border-brand-secondary text-brand-ink font-semibold text-sm">
                        <Layout className="w-4 h-4 text-brand-secondary" /> SaaS Marketing
                    </button>
                    <button className="flex items-center gap-2 pb-4 border-b-2 border-transparent text-slate-500/60 font-medium text-sm hover:text-slate-500 transition-colors">
                        <ShoppingBag className="w-4 h-4" /> E-commerce
                    </button>
                    <button className="flex items-center gap-2 pb-4 border-b-2 border-transparent text-slate-500/60 font-medium text-sm hover:text-slate-500 transition-colors">
                        <AppWindow className="w-4 h-4" /> Web Applications
                    </button>
                </div>
            </div>
        </section>
    );
}
