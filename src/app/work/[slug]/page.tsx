import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

const PROJECTS = [
    {
        slug: "neural-core",
        title: "NEURAL_CORE",
        category: "SaaS Platform",
        year: "2024",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        challenge: "Processing high-density AI telemetry in real-time while maintaining sub-100ms interface responsiveness.",
        solution: "A custom React component system built on a persistent WebSocket layer, utilizing absolute layout grids for extreme data density.",
        results: ["40% reduction in cognitive load", "99.9% system uptime", "3x faster data ingestion"],
        stack: ["Next.js", "React", "Sanity", "Tailwind", "Vercel"],
        quote: {
            text: "Chromapages transformed our AI dashboard from a technical prototype into a product that enterprise customers actually want to use. The attention to detail is unmatched.",
            name: "Sarah Chen",
            role: "VP of Product",
            company: "Neural Systems"
        },
        timeline: [
            { phase: "Discover", period: "Jan 2024", desc: "User research & technical audit" },
            { phase: "Design", period: "Feb 2024", desc: "UI/UX & component architecture" },
            { phase: "Build", period: "Mar 2024", desc: "Core development & integration" },
            { phase: "Deploy", period: "Apr 2024", desc: "Testing & production launch" }
        ]
    },
    {
        slug: "virtue-finance",
        title: "VIRTUE_FINANCE",
        category: "Fintech",
        year: "2024",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2564&auto=format&fit=crop",
        challenge: "Modernizing a legacy finance platform while maintaining regulatory compliance.",
        solution: "A complete design system overhaul with accessibility-first approach.",
        results: ["60% increase in user engagement", "100% WCAG compliance", "2x faster load times"],
        stack: ["Next.js", "TypeScript", "Framer", "AWS"],
        quote: {
            text: "The team understood our complex requirements and delivered a platform that exceeded expectations.",
            name: "Marcus Webb",
            role: "CEO",
            company: "Virtue Finance"
        },
        timeline: [
            { phase: "Discover", period: "2023", desc: "Compliance audit" },
            { phase: "Design", period: "2024", desc: "Design system creation" },
            { phase: "Build", period: "2024", desc: "Full platform rebuild" },
            { phase: "Deploy", period: "2024", desc: "Phased rollout" }
        ]
    },
    {
        slug: "chroma-os",
        title: "CHROMA_OS",
        category: "Internal Tooling",
        year: "2023",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop",
        challenge: "Creating a brutalist design system for automated deployment workflows.",
        solution: "Minimalist interface focused on developer productivity.",
        results: ["50% reduction in deployment errors", "3x faster workflow", "90% positive developer feedback"],
        stack: ["React", "Node.js", "GraphQL", "Docker"],
        quote: {
            text: "Our developers actually enjoy using the tool now. That's saying something.",
            name: "Alex Torres",
            role: "CTO",
            company: "Chroma Tech"
        },
        timeline: [
            { phase: "Discover", period: "Q2 2023", desc: "Developer interviews" },
            { phase: "Design", period: "Q3 2023", desc: "Interface prototyping" },
            { phase: "Build", period: "Q3 2023", desc: "Core features" },
            { phase: "Deploy", period: "Q4 2023", desc: "Internal release" }
        ]
    },
    {
        slug: "quantum-pay",
        title: "QUANTUM_PAY",
        category: "Payment Gateway",
        year: "2023",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2564&auto=format&fit=crop",
        challenge: "Building a secure, high-performance checkout for DeFi.",
        solution: "Optimized transaction flow with real-time validation.",
        results: ["99.99% uptime", "Sub-second transactions", "Zero security incidents"],
        stack: ["Next.js", "Rust", "Web3", "Stripe"],
        quote: {
            text: "The performance metrics speak for themselves. We've never seen checkout this fast.",
            name: "Elena Rodriguez",
            role: "Head of Engineering",
            company: "Quantum Pay"
        },
        timeline: [
            { phase: "Discover", period: "2023", desc: "Security assessment" },
            { phase: "Design", period: "2023", desc: "Transaction flow design" },
            { phase: "Build", period: "2023", desc: "Core payment engine" },
            { phase: "Deploy", period: "2023", desc: "Beta launch" }
        ]
    }
];

function getProject(slug: string) {
    return PROJECTS.find(p => p.slug === slug) || PROJECTS[0];
}

function getNextProject(currentSlug: string) {
    const currentIndex = PROJECTS.findIndex(p => p.slug === currentSlug);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    return PROJECTS[nextIndex];
}

function ProcessTimeline({ timeline }: { timeline: { phase: string; period: string; desc: string }[] }) {
    return (
        <section className="py-24 border-b border-[var(--color-swiss-border)] bg-[var(--color-swiss-bg)]">
            <div className="container-swiss">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-muted)] mb-16">Process</h2>
                <div className="relative">
                    <div className="absolute top-6 left-0 right-0 h-px bg-[var(--color-swiss-border)]" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {timeline.map((step, i) => (
                            <Reveal key={i} delay={i * 100}>
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-[var(--color-swiss-bg)] border-2 border-[var(--color-swiss-teal)] flex items-center justify-center text-sm font-bold text-[var(--color-swiss-teal)] mb-6 relative z-10">
                                        {i + 1}
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-2">{step.phase}</div>
                                    <div className="text-sm font-bold text-[var(--color-swiss-black)] mb-1">{step.period}</div>
                                    <div className="text-sm text-[var(--color-muted)]">{step.desc}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TechStack({ stack }: { stack: string[] }) {
    const stackCategories: Record<string, string> = {
        "Next.js": "Framework",
        "React": "UI Library",
        "Sanity": "CMS",
        "Tailwind": "Styling",
        "Vercel": "Deployment",
        "TypeScript": "Language",
        "Framer": "Animation",
        "AWS": "Cloud",
        "Node.js": "Runtime",
        "GraphQL": "API",
        "Docker": "Container",
        "Rust": "Language",
        "Web3": "Blockchain",
        "Stripe": "Payments"
    };

    return (
        <section className="py-16 border-b border-[var(--color-swiss-border)]">
            <div className="container-swiss">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-muted)] mb-8">Technology Stack</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[var(--color-swiss-border)] border border-[var(--color-swiss-border)]">
                    {stack.map((tech, i) => (
                        <div key={i} className="p-4 bg-white hover:bg-[var(--color-swiss-bg)] transition-swiss">
                            <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-swiss-black)]">{tech}</div>
                            <div className="text-xs text-[var(--color-muted)] mt-1">{stackCategories[tech] || "Technology"}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ClientQuote({ quote }: { quote: { text: string; name: string; role: string; company: string } }) {
    return (
        <section className="py-24 border-b border-[var(--color-swiss-border)]">
            <div className="container-swiss">
                <div className="max-w-4xl">
                    <div className="pl-8 border-l-4 border-[var(--color-swiss-teal)]">
                        <div className="text-7xl font-bold text-[var(--color-swiss-teal)] leading-none mb-6">&ldquo;</div>
                        <p className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-swiss-black)] leading-relaxed mb-8">
                            {quote.text}
                        </p>
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-swiss-black)]">{quote.name}</div>
                            <div className="text-sm text-[var(--color-muted)]">{quote.role}, {quote.company}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function NextProject({ nextProject }: { nextProject: { slug: string; title: string } }) {
    return (
        <Link href={`/work/${nextProject.slug}`} className="block bg-[#2C3892] hover:bg-[#1a1a5e] transition-swiss">
            <div className="container-swiss py-12 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-xs font-bold uppercase tracking-widest text-white/60">Next Project</div>
                <div className="flex items-center gap-4">
                    <span className="text-2xl md:text-4xl font-bold tracking-tighter text-white uppercase">{nextProject.title}</span>
                    <span className="text-3xl text-white">→</span>
                </div>
            </div>
        </Link>
    );
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
    const project = getProject(params.slug);
    const nextProject = getNextProject(params.slug);

    return (
        <main className="min-h-screen">
            <Navigation />

            <section className="pt-32 pb-24 border-b border-[var(--color-swiss-border)]">
                <div className="container-swiss">
                    <div className="swiss-grid items-end">
                        <div className="col-span-12 lg:col-span-8">
                            <Badge variant="accent" className="mb-8">CASE STUDY_{project.year}</Badge>
                            <h1 className="text-8xl md:text-[10rem] font-bold tracking-tighter text-[var(--color-swiss-indigo)] uppercase leading-[0.9]">
                                {project.title}
                            </h1>
                        </div>
                        <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0 flex flex-col gap-4">
                            <div className="border-t border-[var(--color-swiss-border)] pt-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]">Category</span>
                                <div className="text-sm font-bold uppercase mt-1">{project.category}</div>
                            </div>
                            <div className="border-t border-[var(--color-swiss-border)] pt-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]">Year</span>
                                <div className="text-sm font-bold uppercase mt-1">{project.year}</div>
                            </div>
                            <Button variant="primary" className="mt-4">VISIT LIVE PLATFORM</Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--color-swiss-border)]">
                <div className="aspect-[21/9] w-full relative overflow-hidden bg-[var(--color-swiss-border)]">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full grayscale px-6 py-12 lg:px-24"
                    />
                </div>
            </section>

            <section className="py-24 border-b border-[var(--color-swiss-border)]">
                <div className="container-swiss">
                    <div className="swiss-grid">
                        <div className="col-span-12 md:col-span-6 border-r border-[var(--color-swiss-border)] pr-12">
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-muted)] mb-8">01_The Challenge</h2>
                            <p className="text-3xl font-bold tracking-tight text-[var(--color-swiss-indigo)]">
                                {project.challenge}
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-6 pl-0 md:pl-12 mt-16 md:mt-0">
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-muted)] mb-8">02_The Engineering</h2>
                            <p className="text-lg text-[var(--color-muted)] leading-relaxed">
                                {project.solution}
                            </p>
                            <div className="mt-12 space-y-4">
                                {project.results.map((res: string, i: number) => (
                                    <div key={i} className="flex items-center gap-4 py-3 border-b border-[var(--color-swiss-border)]">
                                        <span className="text-[var(--color-swiss-teal)] font-bold text-sm">✓</span>
                                        <span className="text-sm font-bold uppercase tracking-widest">{res}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ProcessTimeline timeline={project.timeline} />

            <TechStack stack={project.stack} />

            <ClientQuote quote={project.quote} />

            <NextProject nextProject={nextProject} />

            <Footer />
        </main>
    );
}
