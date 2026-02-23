"use client";

import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

const POSTS = [
    {
        title: "Objective Design: Beyond Aesthetics",
        slug: "objective-design",
        date: "2024-02-20",
        category: "Protocols",
        excerpt: "Why we abandoned 'vibes' for a quantifiable engineering approach to visual systems."
    },
    {
        title: "Scaling SaaS with Swiss Precision",
        slug: "scaling-saas",
        date: "2024-02-15",
        category: "Performance",
        excerpt: "How architectural clarity in code translates to 300% faster deployment cycles."
    },
    {
        title: "The 14-Day Delivery Protocol",
        slug: "delivery-protocol",
        date: "2024-02-10",
        category: "Workflow",
        excerpt: "Deconstructing the logistics behind our high-speed, high-quality production engine."
    }
];

export default function BlogPage() {
    return (
        <main className="min-h-screen">
            <Navigation />

            <section className="pt-32 pb-24 border-b border-[var(--color-swiss-border)]">
                <div className="container-swiss">
                    <Reveal>
                        <div className="mb-24">
                            <h1 className="text-8xl md:text-[12rem] font-bold leading-[0.8] tracking-tighter text-[var(--color-swiss-indigo)] uppercase mb-8">
                                Journal.
                            </h1>
                            <p className="text-xl max-w-xl text-[var(--color-muted)] border-l-4 border-[var(--color-swiss-teal)] pl-6">
                                Technical documentations, architectural protocols, and strategic insights from the ChromaPages lab.
                            </p>
                        </div>
                    </Reveal>

                    <div className="space-y-px bg-[var(--color-swiss-border)] border border-[var(--color-swiss-border)]">
                        {POSTS.map((post, idx) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="block bg-[var(--color-swiss-bg)] hover:bg-white transition-swiss group"
                            >
                                <Reveal delay={idx * 100}>
                                    <div className="p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        <div className="max-w-2xl">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">{post.date}</span>
                                                <Badge variant="outline">{post.category}</Badge>
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4 group-hover:text-[var(--color-swiss-indigo)] transition-swiss">
                                                {post.title}
                                            </h2>
                                            <p className="text-lg text-[var(--color-muted)] leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                        <div className="text-4xl font-bold text-[var(--color-swiss-teal)] opacity-20 group-hover:opacity-100 transition-swiss translate-x-4 group-hover:translate-x-0">
                                            →
                                        </div>
                                    </div>
                                </Reveal>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
