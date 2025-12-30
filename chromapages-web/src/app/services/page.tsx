"use client";

import { Navbar, Footer } from "@/components/global";
import {
    Monitor, Check, Layers, ShoppingCart, PenTool,
    CheckCircle2, ChevronDown, Download
} from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-[#EFEFED]">
            <Navbar />

            {/* Services Hero */}
            <header className="relative px-6 pt-32 pb-20 max-w-[1440px] mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D7D9E0] text-[#2C3892] text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#2C3892] animate-pulse"></span>
                    Our Expertise
                </div>
                <h1 className="text-5xl lg:text-7xl font-semibold text-[#0F172A] tracking-tight mb-8 leading-[1.1] font-heading">
                    Capabilities designed <br />
                    <span className="text-[#334155]/50">for ambitious growth.</span>
                </h1>
                <p className="text-lg lg:text-xl text-[#334155] max-w-2xl mx-auto leading-relaxed mb-12 font-body">
                    We don&apos;t just ship code. We build digital infrastructure that scales, converts, and outperforms the competition.
                </p>
            </header>

            {/* Detailed Services Grid */}
            <section className="px-6 pb-24 max-w-[1440px] mx-auto">
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Service 1: Marketing Sites */}
                    <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-[#D7D9E0] hover:border-[#2C3892] transition-colors group shadow-sm flex flex-col h-full">
                        <div className="w-14 h-14 rounded-2xl bg-[#F7F7F6] border border-[#D7D9E0] flex items-center justify-center text-[#2C3892] mb-8 group-hover:bg-[#2C3892] group-hover:text-white transition-colors">
                            <Monitor className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#0F172A] mb-4 font-heading">Marketing Websites</h3>
                        <p className="text-[#334155] mb-8 leading-relaxed font-body">High-performance landing pages and corporate sites designed to tell your story and capture leads. Built on modern stacks for speed and SEO dominance.</p>

                        <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
                            {[
                                "CMS Integration", "Advanced Animations",
                                "Technical SEO", "Analytics Setup"
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3 text-sm font-medium text-[#334155]">
                                    <Check className="w-4 h-4 text-[#23698C]" /> {item}
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-8 border-t border-[#F1F5F9] flex gap-3 flex-wrap">
                            {["Next.js", "Webflow", "Framer", "Tailwind"].map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-md bg-[#F7F7F6] text-[#64748B] text-xs font-mono">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Service 2: Web Applications */}
                    <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-[#D7D9E0] hover:border-[#2C3892] transition-colors group shadow-sm flex flex-col h-full">
                        <div className="w-14 h-14 rounded-2xl bg-[#F7F7F6] border border-[#D7D9E0] flex items-center justify-center text-[#2C3892] mb-8 group-hover:bg-[#2C3892] group-hover:text-white transition-colors">
                            <Layers className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#0F172A] mb-4 font-heading">Web Applications</h3>
                        <p className="text-[#334155] mb-8 leading-relaxed font-body">Custom dashboards, portals, and SaaS products. We handle the complex logic and database architecture while keeping the UI buttery smooth.</p>

                        <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
                            {[
                                "React / Vue", "Database Design",
                                "API Development", "Auth & Security"
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3 text-sm font-medium text-[#334155]">
                                    <Check className="w-4 h-4 text-[#23698C]" /> {item}
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-8 border-t border-[#F1F5F9] flex gap-3 flex-wrap">
                            {["React", "Supabase", "Node.js", "PostgreSQL"].map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-md bg-[#F7F7F6] text-[#64748B] text-xs font-mono">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Service 3: E-Commerce */}
                    <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-[#D7D9E0] hover:border-[#2C3892] transition-colors group shadow-sm flex flex-col h-full">
                        <div className="w-14 h-14 rounded-2xl bg-[#F7F7F6] border border-[#D7D9E0] flex items-center justify-center text-[#2C3892] mb-8 group-hover:bg-[#2C3892] group-hover:text-white transition-colors">
                            <ShoppingCart className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#0F172A] mb-4 font-heading">E-Commerce &amp; Shopify</h3>
                        <p className="text-[#334155] mb-8 leading-relaxed font-body">Custom Shopify themes and headless commerce builds. We focus on increasing average order value (AOV) and reducing cart abandonment through UX.</p>

                        <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
                            {[
                                "Custom Themes", "App Integration",
                                "Speed Optimization", "Migration Support"
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3 text-sm font-medium text-[#334155]">
                                    <Check className="w-4 h-4 text-[#23698C]" /> {item}
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-8 border-t border-[#F1F5F9] flex gap-3 flex-wrap">
                            {["Shopify Liquid", "Hydrogen", "Stripe"].map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-md bg-[#F7F7F6] text-[#64748B] text-xs font-mono">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Service 4: Design Systems */}
                    <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-[#D7D9E0] hover:border-[#2C3892] transition-colors group shadow-sm flex flex-col h-full">
                        <div className="w-14 h-14 rounded-2xl bg-[#F7F7F6] border border-[#D7D9E0] flex items-center justify-center text-[#2C3892] mb-8 group-hover:bg-[#2C3892] group-hover:text-white transition-colors">
                            <PenTool className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#0F172A] mb-4 font-heading">Product Design</h3>
                        <p className="text-[#334155] mb-8 leading-relaxed font-body">From wireframes to high-fidelity prototypes. We create design systems that ensure consistency across your digital presence.</p>

                        <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
                            {[
                                "UI/UX Design", "Design Systems",
                                "Prototyping", "User Research"
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3 text-sm font-medium text-[#334155]">
                                    <Check className="w-4 h-4 text-[#23698C]" /> {item}
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-8 border-t border-[#F1F5F9] flex gap-3 flex-wrap">
                            {["Figma", "Adobe CC", "Rive"].map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-md bg-[#F7F7F6] text-[#64748B] text-xs font-mono">{tag}</span>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Process Section (Dark) */}
            <section className="bg-[#0F172A] py-24 px-6 text-white rounded-t-[3rem] mt-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-medium tracking-tight mb-4 font-heading">How we ship.</h2>
                            <p className="text-gray-400 max-w-md font-body">A transparent, iterative process designed to get your product to market without the headaches.</p>
                        </div>
                        <button className="px-6 py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white hover:text-[#0F172A] transition-all flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download Process PDF
                        </button>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-gradient-to-r from-[#2C3892] via-[#23698C] to-transparent opacity-50 z-0"></div>

                        {/* Steps */}
                        {[
                            { step: "01", title: "Discovery", desc: "We audit your current setup, define goals, and map out the technical requirements before writing a line of code." },
                            { step: "02", title: "Design & Proto", desc: "High-fidelity designs in Figma. We focus on mobile responsiveness and user flows. You approve every pixel." },
                            { step: "03", title: "Development", desc: "We build using clean, component-based code. Staging links are shared weekly so you can see progress in real-time." },
                            { step: "04", title: "Launch & QA", desc: "Rigorous cross-browser testing, SEO checklist verification, and performance optimization before flipping the switch." },
                        ].map((item) => (
                            <div key={item.step} className="relative z-10">
                                <div className="w-16 h-16 rounded-full bg-[#1E293B] border border-white/10 flex items-center justify-center text-[#23698C] mb-8 font-mono text-xl shadow-2xl shadow-black/50">
                                    {item.step}
                                </div>
                                <h4 className="text-xl font-semibold mb-3 font-heading">{item.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed font-body">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Engagement Models / Pricing Lite */}
            <section className="bg-white py-24 px-6 border-b border-[#D7D9E0]">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-3xl lg:text-4xl font-medium text-[#0F172A] tracking-tight mb-4 font-heading">
                            Engagement Models
                        </h2>
                        <p className="text-[#334155] font-body">Flexible ways to work with us, tailored to your stage.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-start">

                        {/* Card 1: Project Based */}
                        <div className="p-8 rounded-3xl border border-[#D7D9E0] bg-[#F7F7F6]">
                            <h3 className="text-lg font-semibold text-[#0F172A] mb-2 font-heading">Project Based</h3>
                            <p className="text-[#334155] text-sm mb-6 font-body">Perfect for defined scopes.</p>
                            <div className="text-3xl font-bold text-[#0F172A] tracking-tight mb-8 font-heading">Custom<span className="text-lg font-normal text-[#334155]/60"> / quote</span></div>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Fixed timeline & budget",
                                    "Clear deliverables",
                                    "50/50 Payment structure"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-[#334155] font-body">
                                        <CheckCircle2 className="w-4 h-4 text-[#334155]" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-3 rounded-full border border-[#D7D9E0] bg-white text-[#0F172A] font-medium hover:border-[#2C3892] transition-colors">
                                Get a Quote
                            </button>
                        </div>

                        {/* Card 2: Retainer (Featured) */}
                        <div className="p-8 rounded-3xl border border-[#2C3892] bg-white shadow-xl shadow-[#2C3892]/10 relative">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2C3892] text-white px-4 py-1 rounded-full text-xs font-medium tracking-wide font-mono">MOST POPULAR</div>
                            <h3 className="text-lg font-semibold text-[#0F172A] mb-2 font-heading">Monthly Retainer</h3>
                            <p className="text-[#334155] text-sm mb-6 font-body">Continuous growth &amp; support.</p>
                            <div className="text-3xl font-bold text-[#0F172A] tracking-tight mb-8 font-heading">$4,500<span className="text-lg font-normal text-[#334155]/60"> / mo</span></div>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Up to 40 hours / mo",
                                    "Priority support (24h)",
                                    "Design & Dev included",
                                    "Cancel anytime"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-[#334155] font-body">
                                        <CheckCircle2 className="w-4 h-4 text-[#2C3892]" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-3 rounded-full bg-[#2C3892] text-white font-medium hover:bg-[#23698C] transition-colors shadow-lg shadow-[#2C3892]/20">
                                Start Retainer
                            </button>
                        </div>

                        {/* Card 3: Sprint */}
                        <div className="p-8 rounded-3xl border border-[#D7D9E0] bg-[#F7F7F6]">
                            <h3 className="text-lg font-semibold text-[#0F172A] mb-2 font-heading">Sprint</h3>
                            <p className="text-[#334155] text-sm mb-6 font-body">Rapid MVP development.</p>
                            <div className="text-3xl font-bold text-[#0F172A] tracking-tight mb-8 font-heading">$12,000<span className="text-lg font-normal text-[#334155]/60"> / week</span></div>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Dedicated senior team",
                                    "Daily standups",
                                    "Shippable MVP in 2 weeks"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-[#334155] font-body">
                                        <CheckCircle2 className="w-4 h-4 text-[#334155]" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-3 rounded-full border border-[#D7D9E0] bg-white text-[#0F172A] font-medium hover:border-[#2C3892] transition-colors">
                                Book a Sprint
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-6 max-w-3xl mx-auto">
                <h2 className="text-3xl font-medium text-[#0F172A] tracking-tight mb-12 text-center font-heading">Common Questions</h2>

                <div className="space-y-4">
                    {[
                        {
                            q: "What is your typical turnaround time?",
                            a: "For a standard marketing site (5-8 pages), typical turnaround is 3-4 weeks from design approval. Web applications and e-commerce builds vary based on complexity, usually ranging from 6-12 weeks."
                        },
                        {
                            q: "Do you handle hosting and maintenance?",
                            a: "Yes. We recommend Vercel for web apps and marketing sites, or Shopify for e-commerce. We can set everything up on your accounts or manage it for you via our monthly retainer packages."
                        },
                        {
                            q: "Do you work with existing design files?",
                            a: "Absolutely. If you have designs in Figma ready to go, we can jump straight into the development phase. We will do a quick audit first to ensure all responsive states are accounted for."
                        }
                    ].map((item, i) => (
                        <details key={i} className="group bg-white rounded-2xl border border-[#D7D9E0] overflow-hidden">
                            <summary className="flex justify-between items-center p-6 cursor-pointer font-medium text-[#0F172A] list-none hover:bg-[#F7F7F6] transition-colors font-heading">
                                <span>{item.q}</span>
                                <ChevronDown className="w-4 h-4 text-[#334155] group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 text-sm text-[#334155] leading-relaxed font-body">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
