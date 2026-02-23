"use client";

import { useState } from "react";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { BentoCard } from "@/components/ui/BentoCard";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

const PROJECTS = [
    {
        title: "NEURAL_CORE",
        slug: "neural-core",
        category: "SaaS",
        year: "2024",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        desc: "Next-gen AI monitoring dashboard with high-density data visualization.",
        featured: true
    },
    {
        title: "VIRTUE_FINANCE",
        slug: "virtue-finance",
        category: "Marketing",
        year: "2024",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2564&auto=format&fit=crop",
        desc: "Modernizing asset management through a custom design system."
    },
    {
        title: "CHROMA_OS",
        slug: "chroma-os",
        category: "SaaS",
        year: "2023",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop",
        desc: "A brutalist design system for automated deployment workflows."
    },
    {
        title: "QUANTUM_PAY",
        slug: "quantum-pay",
        category: "E-Commerce",
        year: "2023",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2564&auto=format&fit=crop",
        desc: "Secure, high-performance checkout experience for decentralized finance."
    },
    {
        title: "NEXUS_DASH",
        slug: "nexus-dash",
        category: "SaaS",
        year: "2023",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        desc: "Enterprise analytics platform with real-time reporting capabilities."
    },
    {
        title: "PRISM_STUDIO",
        slug: "prism-studio",
        category: "Design",
        year: "2022",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
        desc: "Creative agency portfolio with immersive 3D interactions."
    }
];

const CATEGORIES = ["ALL", "SAAS", "MARKING", "E-COMMERCE", "DESIGN"];

function FeaturedProject({ project }: { project: typeof PROJECTS[0] }) {
    return (
        <Link href={`/work/${project.slug}`} className="block mb-12 group">
            <div className="swiss-grid items-stretch">
                <div className="col-span-12 lg:col-span-8 relative overflow-hidden bg-[var(--color-swiss-border)] aspect-[16/10]">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-swiss"
                    />
                    <div className="absolute inset-0 bg-[var(--color-swiss-indigo)]/10 group-hover:bg-transparent transition-swiss" />
                </div>
                <div className="col-span-12 lg:col-span-4 p-8 flex flex-col justify-between bg-white border border-[var(--color-swiss-border)] lg:border-l-0">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-muted)]">{project.category}</span>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-muted)]">{project.year}</span>
                        </div>
                        <h2 className="text-5xl font-bold tracking-tighter text-[var(--color-swiss-indigo)] uppercase group-hover:text-[var(--color-swiss-teal)] transition-swiss mb-4">
                            {project.title}
                        </h2>
                        <p className="text-base text-[var(--color-muted)] leading-relaxed">
                            {project.desc}
                        </p>
                    </div>
                    <div className="mt-8 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[var(--color-swiss-teal)]">
                        View Project <span className="text-xl">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
    return (
        <Link href={`/work/${project.slug}`}>
            <BentoCard className="group h-full p-0 overflow-hidden">
                <div className="aspect-video relative overflow-hidden bg-[var(--color-swiss-border)]">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-swiss scale-110 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-[var(--color-swiss-indigo)]/10 group-hover:bg-transparent transition-swiss" />
                </div>
                <div className="p-8 flex flex-col justify-between h-[250px] relative">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-muted)]">{project.category}</span>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-muted)]">{project.year}</span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-tighter text-[var(--color-swiss-indigo)] uppercase group-hover:text-[var(--color-swiss-teal)] transition-swiss">
                            {project.title}
                        </h2>
                    </div>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-sm">
                        {project.desc}
                    </p>
                    <div className="absolute bottom-8 right-8 text-4xl font-light scale-0 group-hover:scale-100 transition-swiss origin-bottom-right">
                        &rarr;
                    </div>
                </div>
            </BentoCard>
        </Link>
    );
}

export default function WorkPage() {
    const [activeFilter, setActiveFilter] = useState("ALL");

    const filteredProjects = activeFilter === "ALL" 
        ? PROJECTS 
        : PROJECTS.filter(p => p.category === activeFilter);

    const featuredProject = filteredProjects.find(p => p.featured);
    const gridProjects = filteredProjects.filter(p => p !== featuredProject);

    return (
        <main className="min-h-screen">
            <Navigation />

            <section className="pt-32 pb-24 border-b border-[var(--color-swiss-border)]">
                <div className="container-swiss">
                    <div className="mb-20">
                        <h1 className="text-[10rem] md:text-[14rem] font-bold leading-[0.8] tracking-tighter text-[var(--color-swiss-indigo)] uppercase mb-4">
                            Work
                        </h1>
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                            <p className="text-xl max-w-xl text-[var(--color-muted)] border-l-4 border-[var(--color-swiss-teal)] pl-6">
                                A definitive archive of engineered digital experiences. We prioritize structural integrity over superficial trends.
                            </p>
                            <div className="flex gap-4">
                                <Badge variant="outline">Selected Cases</Badge>
                                <Badge variant="accent">2023—2024</Badge>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter Bar */}
                    <div className="flex flex-wrap gap-6 mb-12 pb-6 border-b border-[var(--color-swiss-border)]">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`text-sm font-bold uppercase tracking-widest transition-swiss relative pb-2 ${
                                    activeFilter === category 
                                        ? "text-[var(--color-swiss-teal)]" 
                                        : "text-[var(--color-muted)] hover:text-[var(--color-swiss-black)]"
                                }`}
                            >
                                {category}
                                {activeFilter === category && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-swiss-teal)]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <div className="py-24 text-center">
                            <p className="text-xl text-[var(--color-muted)]">No projects found in this category.</p>
                        </div>
                    )}

                    {/* Featured Project Hero Slot */}
                    {featuredProject && (
                        <FeaturedProject project={featuredProject} />
                    )}

                    {/* Project Grid */}
                    <div className="bento-root grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {gridProjects.map((project, i) => (
                            <ProjectCard key={i} project={project} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
