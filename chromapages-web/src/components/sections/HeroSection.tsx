import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Laptop, ShoppingCart, Code2, ShieldCheck } from "lucide-react";

interface HeroProps {
    headline?: string;
    subheadline?: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    heroImage?: string;
}

export function HeroSection({ headline, subheadline, primaryCta, secondaryCta, heroImage }: HeroProps) {
    const marqueeCards = [
        {
            title: "Marketing Websites",
            icon: <Laptop size={32} className="text-brand-primary" />,
            desc: "Lead generation and high-conversion pages for ads, SEO, and growth. Built to perform.",
            bg: "bg-white",
        },
        {
            title: "E-Commerce Builds",
            icon: <ShoppingCart size={32} className="text-white" />,
            desc: "Clean product pages and checkout flows that make buying easy and increase AOV.",
            bg: "bg-surface-muted",
            iconBg: "bg-brand-primary",
        },
        {
            title: "Web Apps / MVPs",
            icon: <Code2 size={32} className="text-brand-primary" />,
            desc: "Customer portals and tools that feel like real products. Scalable and secure.",
            bg: "bg-white",
        },
        {
            title: "Ongoing Support",
            icon: <ShieldCheck size={32} className="text-brand-primary" />,
            desc: "We don't leave you hanging. Updates, fixes, performance improvements, and growth.",
            bg: "bg-white",
        },
    ];

    // Duplicate for infinite scroll
    const allCards = [...marqueeCards, ...marqueeCards];

    return (
        <section className="bg-white rounded-b-[2rem] pt-32 pb-24 px-6 md:px-10 relative shadow-sm overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-20">
                    {/* Left Column */}
                    <div className="lg:col-span-6 flex flex-col gap-8 z-10">
                        <div>
                            <h1 className="lg:text-[4.5rem] leading-[1.1] text-5xl font-extrabold text-brand-ink font-heading mb-6">
                                Digital Design <br />
                                <span className="text-brand-primary">Elevated.</span>
                            </h1>
                            <p className="text-slate-500 text-lg font-body font-light leading-relaxed max-w-lg">
                                We build fast, modern websites and web apps that look premium and turn visitors into customers.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 mt-2 items-center">
                            <Link href="/contact" className="px-8 py-4 bg-brand-primary rounded-xl font-semibold text-base hover:bg-brand-accent transition-colors shadow-[0_0_20px_rgba(35,105,140,0.3)] text-white">
                                Book A Call
                            </Link>
                            <Link href="/work" className="flex items-center gap-2 hover:text-brand-primary transition-colors font-medium px-4 text-brand-ink">
                                View Work
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-6 relative">
                        <div className="relative rounded-3xl overflow-hidden border aspect-[4/3] shadow-2xl border-slate-200 bg-slate-50">
                            <div className="absolute top-6 right-6 z-20 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg max-w-[200px] bg-white/90 border border-slate-100">
                                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-heading font-bold">Performance</div>
                                <div className="text-sm font-semibold text-brand-ink leading-tight">Mobile-first, conversion ready.</div>
                            </div>
                            {/* Placeholder Image - In real implementation, use Next/Image */}
                            <div className="relative w-full h-full">
                                <Image
                                    src={heroImage || "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=80"}
                                    alt="Premium web design"
                                    fill
                                    className="hover:scale-105 transition-transform duration-700 opacity-90 object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="flex mt-8 px-4 space-x-4 items-start justify-between">
                            {[
                                { label: "Fast", sub: "On Mobile", color: "text-brand-ink" },
                                { label: "Premium", sub: "Design Quality", color: "text-brand-primary" },
                                { label: "High", sub: "Conversion", color: "text-brand-ink" },
                                { label: "Launch", sub: "Safe QA", color: "text-brand-primary" }
                            ].map((stat, i) => (
                                <div key={i} className="text-center lg:text-left">
                                    <h3 className={`text-3xl font-heading mb-1 font-bold ${stat.color}`}>{stat.label}</h3>
                                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wide font-body">{stat.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Marquee */}
                <div className="w-full relative group">
                    <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-white via-transparent to-white" />
                    <div className="flex overflow-hidden w-full">
                        <div className="flex gap-6 animate-marquee w-max py-4 group-hover:[animation-play-state:paused]">
                            {allCards.map((card, i) => (
                                <div key={i} className={`w-[350px] rounded-3xl p-8 flex flex-col h-full border hover:border-brand-primary/50 transition-colors border-slate-200 shadow-xl shadow-slate-200/50 ${card.bg}`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-transform hover:scale-110 ${card.iconBg || "bg-brand-primary/10"}`}>
                                        {card.icon}
                                    </div>
                                    <h3 className={`text-xl mb-3 font-heading tracking-tight font-bold ${card.iconBg ? "text-brand-primary" : "text-brand-ink"}`}>{card.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
