"use client";

import { use } from "react";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

const POSTS = {
    "objective-design": {
        title: "Objective Design: Beyond Aesthetics",
        date: "2024-02-20",
        category: "Protocols",
        content: `
            <p>Design is often treated as a subjective exercise in "feel" and "vibes." At ChromaPages, we've found that this approach fails at scale. For high-growth SaaS platforms, design must be an engineering discipline.</p>
            <h3>The Grid as Logic</h3>
            <p>We utilize the Swiss Modernism 2.0 framework because it provides a mathematical foundation for information hierarchy. Every pixel is accounted for in a multi-column grid that ensures predictability across all breakpoints.</p>
            <h3>Quantifiable Clarity</h3>
            <p>By defining strict visual tokens—typography scales, spacing increments, and color harmonies—we remove the guesswork from the development cycle. This leads to faster build times and a product that feels consistently premium.</p>
        `
    },
    "scaling-saas": {
        title: "Scaling SaaS with Swiss Precision",
        date: "2024-02-15",
        category: "Performance",
        content: `
            <p>Performance isn't just about bundle size or server response times; it's about structural clarity. A well-organized codebase is a fast codebase.</p>
            <h3>Architectural Protocols</h3>
            <p>We treat our React component libraries like mechanical blueprints. Each component has a single responsibility and a defined interface. This modularity allows us to ship complex features with zero regression risk.</p>
            <h3>Continuous Delivery</h3>
            <p>Our 14-day production protocol is backed by CI/CD pipelines that enforce quality at ogni commit. We don't just "deploy"; we execute a transition between verified system states.</p>
        `
    },
    "delivery-protocol": {
        title: "The 14-Day Delivery Protocol",
        date: "2024-02-10",
        category: "Workflow",
        content: `
            <p>Speed is often the enemy of quality. However, through structural optimization and concurrent workflows, we've broken that trade-off.</p>
            <h3>Parallel Execution</h3>
            <p>Unlike traditional agencies that follow a linear "Design-then-Build" path, our protocol utilizes concurrent engineering. We establish the data architecture and design system foundations simultaneously on day one.</p>
            <h3>Extreme Efficiency</h3>
            <p>By eliminating opaque feedback loops and utilizing fixed-price, fixed-scope sprints, we ensure that every hour of effort is directly translated into production value.</p>
        `
    }
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const post = POSTS[slug as keyof typeof POSTS];

    if (!post) {
        return (
            <main className="min-h-screen">
                <Navigation />
                <section className="pt-32 pb-24">
                    <div className="container-swiss text-center">
                        <h1 className="text-4xl font-bold uppercase">Post Not Found</h1>
                        <Link href="/blog" className="inline-block mt-8 text-[var(--color-swiss-teal)] font-bold">← BACK TO JOURNAL</Link>
                    </div>
                </section>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <Navigation />

            <article className="pt-32 pb-24">
                <div className="container-swiss">
                    <Reveal>
                        <header className="mb-16 pb-16 border-b border-[var(--color-swiss-border)]">
                            <Link href="/blog" className="inline-block mb-12 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-muted)] hover:text-[var(--color-swiss-teal)] transition-swiss">
                                ← Back to Journal
                            </Link>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">{post.date}</span>
                                <Badge variant="outline">{post.category}</Badge>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-[var(--color-swiss-indigo)] max-w-5xl leading-[0.95]">
                                {post.title}
                            </h1>
                        </header>
                    </Reveal>

                    <Reveal delay={200}>
                        <div className="max-w-3xl mx-auto prose prose-xl">
                            <div
                                className="blog-content space-y-8 text-xl leading-relaxed text-[var(--color-muted)]"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>
                    </Reveal>
                </div>
            </article>

            <Footer />
        </main>
    );
}
