"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { BentoCard } from "@/components/ui/BentoCard";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

const SERVICES = [
    {
        id: "01",
        title: "Marketing Sites",
        slug: "marketing",
        tagline: "Strategic Outreach & Growth",
        description: "Data-driven landing pages and corporate sites engineered for extreme performance and brand positioning.",
        stats: ["+240% Lead Gen", "14 Days to Launch", "99/100 Score"],
        relatedWork: {
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2564&auto=format&fit=crop",
            title: "Virtue Finance",
            slug: "virtue-finance"
        },
        protocols: [
            { name: "Audit & Strategy", items: ["Market Analysis", "Competitor Review"] },
            { name: "Campaign Launch", items: ["Asset Creation", "Channel Setup"] },
            { name: "Optimization", items: ["A/B Testing", "Bid Management"] },
            { name: "Reporting", items: ["KPI Tracking", "ROI Calculation"] },
        ]
    },
    {
        id: "02",
        title: "SaaS Platforms",
        slug: "saas",
        tagline: "Cloud Solutions & Platforms",
        description: "Multi-page ecosystems designed for complex user journeys and seamless third-party integrations.",
        stats: ["100ms Response", "99.9% Uptime", "3x Faster Dev"],
        relatedWork: {
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            title: "Neural Core",
            slug: "neural-core"
        },
        protocols: [
            { name: "Requirements", items: ["User Stories", "Functional Specs"] },
            { name: "Architecture", items: ["System Blueprint", "Database Schema"] },
            { name: "Development", items: ["Agile Sprints", "Code Review"] },
            { name: "Deployment", items: ["CI/CD Pipelines", "Monitoring"] },
        ]
    },
    {
        id: "03",
        title: "E-Commerce",
        slug: "ecommerce",
        tagline: "Digital Commerce Engines",
        description: "Custom storefronts and high-speed checkout flows designed to maximize revenue and average order value.",
        stats: ["+38% AOV", "Sub-100ms Checkout", "Zero Downtime"],
        relatedWork: {
            image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2564&auto=format&fit=crop",
            title: "Quantum Pay",
            slug: "quantum-pay"
        },
        protocols: [
            { name: "Platform Selection", items: ["Vendor Assessment", "Feature Mapping"] },
            { name: "Storefront Build", items: ["Theme Customization", "Product Upload"] },
            { name: "Integration Hub", items: ["CRM Connection", "ERP Sync"] },
            { name: "Post-Launch", items: ["Security Patches", "Feature Updates"] },
        ]
    },
    {
        id: "04",
        title: "Design Systems",
        slug: "design-systems",
        tagline: "Scalable UI/UX Frameworks",
        description: "Comprehensive React component libraries and visual tokens for enterprise development consistency.",
        stats: ["60% Less Dev Time", "100% WCAG", "1 Source of Truth"],
        relatedWork: {
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop",
            title: "Chroma OS",
            slug: "chroma-os"
        },
        protocols: [
            { name: "Foundations", items: ["Typography & Color", "Grid System"] },
            { name: "Components", items: ["Button States", "Form Elements"] },
            { name: "Documentation", items: ["Usage Guidelines", "Version Control"] },
            { name: "Governance", items: ["Review Process", "Contribution Model"] },
        ]
    }
];

const PERSONA_ORDER = {
    "startup": [0, 1, 2, 3],
    "marketing": [0, 2, 1, 3],
    "cto": [1, 3, 0, 2]
};

type PersonaType = "startup" | "marketing" | "cto";

function StickyNav({ activeSection }: { activeSection: string }) {
    return (
        <div className="sticky top-[60px] z-40 bg-[var(--color-swiss-bg)]/95 backdrop-blur-md border-b border-[var(--color-swiss-border)]">
            <div className="container-swiss py-3 flex gap-8 overflow-x-auto">
                {SERVICES.map((service) => (
                    <a
                        key={service.id}
                        href={`#${service.slug}`}
                        className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-swiss relative pb-2 ${
                            activeSection === service.slug
                                ? "text-[var(--color-swiss-teal)]"
                                : "text-[var(--color-muted)] hover:text-[var(--color-swiss-black)]"
                        }`}
                    >
                        {service.id} {service.title}
                        {activeSection === service.slug && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-swiss-teal)]" />
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}

function OutcomeStats({ stats }: { stats: string[] }) {
    return (
        <div className="grid grid-cols-3 gap-px bg-[var(--color-swiss-border)] border border-[var(--color-swiss-border)] mt-8">
            {stats.map((stat, i) => (
                <div key={i} className="p-4 bg-white text-center">
                    <div className="text-lg font-bold tracking-tighter text-[var(--color-swiss-teal)]">{stat}</div>
                </div>
            ))}
        </div>
    );
}

function RelatedWorkCard({ work }: { work: { image: string; title: string; slug: string } }) {
    return (
        <Link href={`/work/${work.slug}`} className="block mt-8 group">
            <div className="flex items-center gap-6 p-4 bg-[var(--color-swiss-bg)] border border-[var(--color-swiss-border)] hover:border-[var(--color-swiss-teal)] transition-swiss">
                <div className="w-24 h-16 overflow-hidden bg-[var(--color-swiss-border)] shrink-0">
                    <img src={work.image} alt={work.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-swiss" />
                </div>
                <div className="flex-grow">
                    <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">Related Work</div>
                    <div className="font-bold uppercase">{work.title}</div>
                </div>
                <div className="text-[var(--color-swiss-teal)] font-bold">→</div>
            </div>
        </Link>
    );
}

function DifferentiationStrip() {
    return (
        <section className="py-24 border-t border-[var(--color-swiss-border)]">
            <div className="container-swiss">
                <h2 className="text-3xl font-bold tracking-tighter uppercase mb-12">Why ChromaPages</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[var(--color-swiss-border)]">
                                <th className="text-left py-4 pr-8 font-bold uppercase tracking-wider text-[var(--color-muted)]">Criteria</th>
                                <th className="text-center py-4 px-4 font-bold uppercase tracking-wider bg-[var(--color-swiss-indigo)] text-white">ChromaPages</th>
                                <th className="text-center py-4 px-4 font-bold uppercase tracking-wider">Freelancers</th>
                                <th className="text-center py-4 px-4 font-bold uppercase tracking-wider">Traditional Agencies</th>
                                <th className="text-center py-4 px-4 font-bold uppercase tracking-wider">DIY Builders</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-[var(--color-swiss-border)]">
                                <td className="py-4 pr-8 font-bold uppercase tracking-wider">Timeline</td>
                                <td className="text-center py-4 px-4 bg-[var(--color-swiss-indigo)]/5 font-bold">14 Days</td>
                                <td className="text-center py-4 px-4 text-[var(--color-muted)]">4-8 Weeks</td>
                                <td className="text-center py-4 px-4 text-[var(--color-muted)]">8-12 Weeks</td>
                                <td className="text-center py-4 px-4 text-[var(--color-muted)]">Varies</td>
                            </tr>
                            <tr className="border-b border-[var(--color-swiss-border)]">
                                <td className="py-4 pr-8 font-bold uppercase tracking-wider">Process Clarity</td>
                                <td className="text-center py-4 px-4 bg-[var(--color-swiss-indigo)]/5 font-bold">Defined Protocol</td>
                                <td className="text-center py-4 px-4 text-[var(--color-muted)]">Ad-hoc</td>
                                <td className="text-center py-4 px-4 text-[var(--color-muted)]">Opaque</td>
                                <td className="text-center py-4 px-4 text-[var(--color-muted)]">Self-managed</td>
                            </tr>
                            <tr className="border-b border-[var(--color-swiss-border)]">
                                <td className="py-4 pr-8 font-bold uppercase tracking-wider">Scalability</td>
                                <td className="text-center py-4 px-4 bg-[var(--color-swiss-indigo)]/5 font-bold">Enterprise-ready</td>
                                <td className="text-center py-4 px-4 text-[var(--color-muted)]">Limited</td>
                                <td className="text-center py-4 px-4 text-[var(--color-muted)]">Variable</td>
                                <td className="text-center py-4 px-4 text-[var(--color-muted)]">Platform limits</td>
                            </tr>
                            <tr>
                                <td className="py-4 pr-8 font-bold uppercase tracking-wider">Price Transparency</td>
                                <td className="text-center py-4 px-4 bg-[var(--color-swiss-indigo)]/5 font-bold">Fixed Pricing</td>
                                <td className="text-center py-4 px-4 text-[var(--color-muted)]">Hourly</td>
                                <td className="text-center py-4 px-4 text-[var(--color-muted)]">Retainer</td>
                                <td className="text-center py-4 px-4 text-[var(--color-muted)]">Subscription</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default function ServicesPage() {
    const [activePersona, setActivePersona] = useState<PersonaType>("startup");
    const [activeSection, setActiveSection] = useState("marketing");
    const [showStickyNav, setShowStickyNav] = useState(false);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        const handleScroll = () => {
            setShowStickyNav(window.scrollY > 500);

            const sections = SERVICES.map(s => s.slug);
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const orderedServices = PERSONA_ORDER[activePersona].map(i => SERVICES[i]);

    return (
        <main className="min-h-screen">
            <Navigation />

            {showStickyNav && <StickyNav activeSection={activeSection} />}

            <section className="pt-32 pb-24 border-b border-[var(--color-swiss-border)]">
                <div className="container-swiss">
                    <Reveal>
                        <div className="mb-12">
                            <h1 className="text-8xl md:text-[12rem] font-bold leading-[0.8] tracking-tighter text-[var(--color-swiss-indigo)] uppercase mb-8">
                                Capabilities.
                            </h1>
                            <p className="text-xl max-w-xl text-[var(--color-muted)] border-l-4 border-[var(--color-swiss-teal)] pl-6">
                                Objective engineering protocols applied to high-impact digital products. Swiss precision, scaled for SaaS.
                            </p>
                        </div>
                    </Reveal>

                    {/* Persona Switcher */}
                    <div className="flex flex-wrap gap-4 mb-12 pb-6 border-b border-[var(--color-swiss-border)]">
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mr-4 self-center">I'm a:</span>
                        {[
                            { key: "startup", label: "Startup Founder" },
                            { key: "marketing", label: "Marketing Director" },
                            { key: "cto", label: "CTO / VP Engineering" }
                        ].map((persona) => (
                            <button
                                key={persona.key}
                                onClick={() => setActivePersona(persona.key as PersonaType)}
                                className={`text-xs font-bold uppercase tracking-widest px-4 py-2 transition-swiss ${
                                    activePersona === persona.key
                                        ? "bg-[var(--color-swiss-black)] text-white"
                                        : "bg-[var(--color-swiss-border)] text-[var(--color-muted)] hover:bg-[var(--color-swiss-black)]/20"
                                }`}
                            >
                                {persona.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-24">
                        {orderedServices.map((service, idx) => (
                            <div key={service.id} id={service.slug} className="border-t border-[var(--color-swiss-border)] pt-12 scroll-mt-32">
                                <Reveal delay={idx * 100}>
                                    <div className="swiss-grid mb-8">
                                        <div className="col-span-12 lg:col-span-5">
                                            <div className="text-6xl font-bold text-[var(--color-swiss-teal)] mb-4">{service.id}</div>
                                            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">{service.title}</h2>
                                            <Badge variant="outline" className="mb-6">{service.tagline}</Badge>
                                            <p className="text-lg text-[var(--color-muted)] pr-8">{service.description}</p>
                                            
                                            {/* Per-Service CTA */}
                                            <Link
                                                href={`/contact?service=${service.slug}`}
                                                className="inline-block mt-6 text-sm font-bold uppercase tracking-widest text-[var(--color-swiss-teal)] hover:text-[var(--color-swiss-indigo)] transition-swiss"
                                            >
                                                Discuss {service.title} Project →
                                            </Link>
                                        </div>

                                        <div className="col-span-12 lg:col-span-7 mt-8 lg:mt-0">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color border border-[var-swiss-border)](--color-swiss-border)]">
                                                {service.protocols.map((proto) => (
                                                    <div key={proto.name} className="bg-[var(--color-swiss-bg)] p-8">
                                                        <h3 className="font-bold uppercase tracking-widest text-sm mb-4 border-b border-[var(--color-swiss-border)] pb-2">
                                                            {service.id}.{proto.name}
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {proto.items.map((item) => (
                                                                <li key={item} className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                                                    <span className="w-1.5 h-1.5 bg-[var(--color-swiss-teal)]" />
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Outcome Stats */}
                                    <OutcomeStats stats={service.stats} />

                                    {/* Related Work Card */}
                                    <RelatedWorkCard work={service.relatedWork} />
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <DifferentiationStrip />

            <Footer />
        </main>
    );
}
