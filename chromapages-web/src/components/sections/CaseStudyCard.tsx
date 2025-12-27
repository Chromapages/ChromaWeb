import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { urlFor } from "@/lib/sanity/client";

interface SanityCaseStudy {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    industry?: string;
    mainImage: any;
    excerpt?: string;
    results?: { metric: string; value: string }[];
}

interface CaseStudyCardProps {
    caseStudy: SanityCaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
    return (
        <Link href={`/work/${caseStudy.slug.current}`} className="group block h-full">
            <GlassCard className="h-full p-0 overflow-hidden flex flex-col hover:border-[var(--brand-accent)] transition-all duration-300">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    {caseStudy.mainImage ? (
                        <Image
                            src={urlFor(caseStudy.mainImage).width(800).height(500).url()}
                            alt={caseStudy.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-mono text-sm uppercase">
                            No Image Available
                        </div>
                    )}

                    {/* Overlay Tag */}
                    {caseStudy.industry && (
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[var(--brand-ink)] text-xs font-mono font-bold uppercase tracking-wider rounded-md shadow-sm">
                                {caseStudy.industry}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-4">
                        <span className="text-sm font-bold text-[var(--brand-accent)] mb-1 block">
                            {caseStudy.client}
                        </span>
                        <h3 className="heading-section text-2xl text-[var(--brand-ink)] group-hover:text-[var(--brand-primary)] transition-colors">
                            {caseStudy.title}
                        </h3>
                    </div>

                    {caseStudy.excerpt && (
                        <p className="text-gray-600 line-clamp-3 mb-6 text-sm flex-grow">
                            {caseStudy.excerpt}
                        </p>
                    )}

                    {/* Results Footer */}
                    {caseStudy.results && caseStudy.results.length > 0 && (
                        <div className="mt-auto border-t border-gray-100 pt-5 flex gap-6">
                            {caseStudy.results.slice(0, 2).map((result, idx) => (
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
                    )}

                    <div className="mt-6 flex items-center text-sm font-bold text-[var(--brand-primary)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        View Case Study <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                </div>
            </GlassCard>
        </Link>
    );
}
