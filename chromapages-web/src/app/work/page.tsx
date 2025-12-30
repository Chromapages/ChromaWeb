"use client";

import { Navbar, Footer } from "@/components/global";
import { FolderOpen, ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WorkPage() {
    return (
        <div className="min-h-screen bg-[#EFEFED] text-[#0F172A] antialiased selection:bg-[#23698C] selection:text-white">
            <Navbar />

            {/* Work Hero */}
            <header className="relative px-6 pt-32 pb-20 max-w-[1440px] mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D7D9E0] text-[#23698C] text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
                    <FolderOpen className="w-3 h-3" />
                    Selected Projects
                </div>
                <h1 className="text-5xl lg:text-7xl font-semibold text-[#0F172A] tracking-tight mb-8 leading-[1.1] font-heading">
                    Digital products<br />
                    <span className="text-[#334155]/50">engineered for growth.</span>
                </h1>
                <p className="text-lg lg:text-xl text-[#334155] max-w-2xl mx-auto leading-relaxed mb-12 font-body">
                    A curated selection of applications, websites, and design systems we&apos;ve shipped for ambitious companies.
                </p>

                {/* Categories Filter (Visual only) */}
                <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
                    <button className="px-4 py-2 rounded-full bg-[#0F172A] text-white text-sm font-medium shadow-md">All Work</button>
                    {["SaaS", "Fintech", "E-Commerce", "Design Systems"].map((cat) => (
                        <button key={cat} className="px-4 py-2 rounded-full bg-white border border-[#D7D9E0] text-[#334155] text-sm font-medium hover:border-[#2C3892] transition-colors">
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            {/* Projects Grid */}
            <section className="px-6 pb-24 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                    {/* Project 1: Fintech Dashboard */}
                    <article className="group project-card cursor-pointer">
                        <div className="relative bg-white rounded-3xl border border-[#D7D9E0] overflow-hidden aspect-[4/3] flex flex-col mb-6">
                            {/* Fake UI Container */}
                            <div className="absolute inset-0 bg-[#F8FAFC] p-8 flex items-center justify-center">
                                <div className="w-full h-full bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col group-hover:scale-[1.02] transition-transform duration-500 origin-center">
                                    {/* Header */}
                                    <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6 bg-white">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                        </div>
                                        <div className="w-24 h-2 rounded-full bg-slate-100"></div>
                                    </div>
                                    {/* Body */}
                                    <div className="flex-1 p-6 flex gap-6">
                                        <div className="w-16 flex flex-col gap-4 pt-2">
                                            <div className="w-8 h-8 rounded-lg bg-[#23698C]/10"></div>
                                            <div className="w-8 h-8 rounded-lg bg-slate-50"></div>
                                            <div className="w-8 h-8 rounded-lg bg-slate-50"></div>
                                        </div>
                                        <div className="flex-1 flex flex-col gap-4">
                                            <div className="flex gap-4">
                                                <div className="flex-1 h-24 rounded-lg bg-slate-50 border border-slate-100 p-4">
                                                    <div className="w-8 h-8 rounded-full bg-[#DCFCE7] mb-2"></div>
                                                    <div className="w-16 h-2 rounded bg-slate-200"></div>
                                                </div>
                                                <div className="flex-1 h-24 rounded-lg bg-slate-50 border border-slate-100 p-4">
                                                    <div className="w-8 h-8 rounded-full bg-[#E0F2FE] mb-2"></div>
                                                    <div className="w-16 h-2 rounded bg-slate-200"></div>
                                                </div>
                                            </div>
                                            <div className="flex-1 rounded-lg bg-slate-50 border border-slate-100 relative overflow-hidden">
                                                {/* Chart Line */}
                                                <svg className="absolute bottom-0 left-0 w-full h-16 text-[#2C3892]" preserveAspectRatio="none" viewBox="0 0 100 20">
                                                    <path d="M0 20 L0 10 Q15 5 30 12 T60 8 T100 5 V20 Z" fill="currentColor" fillOpacity="0.1"></path>
                                                    <path d="M0 10 Q15 5 30 12 T60 8 T100 5" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-[#0F172A] mb-2 group-hover:text-[#2C3892] transition-colors font-heading">Nova Financial</h3>
                                <p className="text-[#334155] leading-relaxed mb-4 max-w-md text-sm lg:text-base font-body">
                                    A comprehensive wealth management dashboard allowing real-time asset tracking across multiple banking APIs.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["React", "Tailwind", "D3.js"].map((tag) => (
                                        <span key={tag} className="px-2.5 py-1 rounded bg-white border border-[#D7D9E0] text-[11px] font-mono uppercase tracking-wide text-[#475569]">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-[#D7D9E0] flex items-center justify-center bg-white text-[#334155] group-hover:bg-[#2C3892] group-hover:text-white group-hover:border-[#2C3892] transition-all shrink-0">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </article>

                    {/* Project 2: AI SaaS */}
                    <article className="group project-card cursor-pointer lg:translate-y-16">
                        <div className="relative bg-[#0F172A] rounded-3xl border border-[#1E293B] overflow-hidden aspect-[4/3] flex flex-col mb-6">
                            {/* Fake UI Container */}
                            <div className="absolute inset-0 flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-[#0f172a]">
                                <div className="w-full h-full rounded-xl border border-white/10 bg-[#0F172A] shadow-2xl relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                    {/* Sidebar */}
                                    <div className="absolute left-0 top-0 bottom-0 w-16 border-r border-white/5 flex flex-col items-center py-4 gap-4">
                                        <div className="w-8 h-8 rounded bg-[#23698C]"></div>
                                        <div className="w-6 h-6 rounded bg-white/5 mt-4"></div>
                                        <div className="w-6 h-6 rounded bg-white/5"></div>
                                    </div>
                                    {/* Content */}
                                    <div className="ml-16 p-6">
                                        <div className="flex justify-between mb-6">
                                            <div className="w-32 h-4 rounded bg-white/10"></div>
                                            <div className="w-8 h-8 rounded-full bg-white/5"></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="h-24 rounded border border-white/5 bg-white/[0.02] p-3 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#2C3892]/20 to-transparent"></div>
                                                <div className="w-16 h-2 rounded bg-white/20 mb-2"></div>
                                                <div className="w-full h-1 rounded bg-white/5"></div>
                                            </div>
                                            <div className="h-24 rounded border border-white/5 bg-white/[0.02] p-3">
                                                <div className="w-16 h-2 rounded bg-white/20 mb-2"></div>
                                                <div className="w-24 h-1 rounded bg-white/5"></div>
                                            </div>
                                            <div className="col-span-2 h-32 rounded border border-white/5 bg-white/[0.02] p-3 flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full border-2 border-[#23698C] border-t-transparent animate-spin"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-[#0F172A] mb-2 group-hover:text-[#2C3892] transition-colors font-heading">Vortex AI</h3>
                                <p className="text-[#334155] leading-relaxed mb-4 max-w-md text-sm lg:text-base font-body">
                                    Generative AI platform interface designed for complex prompt engineering and model fine-tuning workflows.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Next.js 14", "Typescript", "OpenAI API"].map((tag) => (
                                        <span key={tag} className="px-2.5 py-1 rounded bg-white border border-[#D7D9E0] text-[11px] font-mono uppercase tracking-wide text-[#475569]">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-[#D7D9E0] flex items-center justify-center bg-white text-[#334155] group-hover:bg-[#2C3892] group-hover:text-white group-hover:border-[#2C3892] transition-all shrink-0">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </article>

                    {/* Project 3: Mobile Commerce */}
                    <article className="group project-card cursor-pointer">
                        <div className="relative bg-[#F1F5F9] rounded-3xl border border-[#D7D9E0] overflow-hidden aspect-[4/3] flex flex-col mb-6">
                            {/* Fake UI Container */}
                            <div className="absolute inset-0 flex items-center justify-center gap-6 p-8">
                                {/* Phone Mockup 1 */}
                                <div className="w-[140px] h-[260px] bg-white rounded-[2rem] border-[4px] border-[#334155] shadow-xl overflow-hidden relative group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="absolute top-0 inset-x-0 h-6 bg-[#334155] flex justify-center z-10"><div className="w-16 h-4 bg-[#334155] rounded-b-lg"></div></div>
                                    <div className="p-4 pt-8">
                                        <div className="w-full aspect-square rounded-lg bg-slate-100 mb-3 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-[#23698C]/20 to-[#E0F2FE]"></div>
                                        </div>
                                        <div className="w-3/4 h-2 rounded bg-slate-200 mb-2"></div>
                                        <div className="w-1/2 h-2 rounded bg-slate-100"></div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 h-8 bg-[#0F172A] rounded-full"></div>
                                </div>
                                {/* Phone Mockup 2 */}
                                <div className="w-[140px] h-[260px] bg-white rounded-[2rem] border-[4px] border-[#334155] shadow-xl overflow-hidden relative mt-12 group-hover:translate-y-2 transition-transform duration-500 hidden sm:block">
                                    <div className="absolute top-0 inset-x-0 h-6 bg-[#334155] flex justify-center z-10"><div className="w-16 h-4 bg-[#334155] rounded-b-lg"></div></div>
                                    <div className="p-4 pt-8 grid grid-cols-2 gap-2">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="aspect-square rounded bg-slate-100"></div>)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-[#0F172A] mb-2 group-hover:text-[#2C3892] transition-colors font-heading">Lumina Market</h3>
                                <p className="text-[#334155] leading-relaxed mb-4 max-w-md text-sm lg:text-base font-body">
                                    A high-performance mobile e-commerce PWA focusing on speed, accessibility, and frictionless checkout flows.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["React Native", "Stripe", "PWA"].map((tag) => (
                                        <span key={tag} className="px-2.5 py-1 rounded bg-white border border-[#D7D9E0] text-[11px] font-mono uppercase tracking-wide text-[#475569]">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-[#D7D9E0] flex items-center justify-center bg-white text-[#334155] group-hover:bg-[#2C3892] group-hover:text-white group-hover:border-[#2C3892] transition-all shrink-0">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </article>

                    {/* Project 4: Dev Tool */}
                    <article className="group project-card cursor-pointer lg:translate-y-16">
                        <div className="relative bg-white rounded-3xl border border-[#D7D9E0] overflow-hidden aspect-[4/3] flex flex-col mb-6">
                            {/* Fake UI Container */}
                            <div className="absolute inset-0 bg-[#FAFAFA] flex items-center justify-center p-8">
                                <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-[#D7D9E0] p-6 group-hover:scale-[1.02] transition-transform duration-500">
                                    <div className="flex gap-2 mb-4 border-b border-[#F1F5F9] pb-4">
                                        <div className="px-3 py-1 rounded bg-[#E0F2FE] text-[#0284C7] text-xs font-mono">POST</div>
                                        <div className="text-xs font-mono text-slate-500 py-1">api.devscale.io/v1/deploy</div>
                                    </div>
                                    <div className="space-y-2 font-mono text-xs">
                                        <div className="flex">
                                            <span className="text-[#2C3892] w-6">01</span>
                                            <span className="text-[#9333EA]">const</span> <span className="text-[#0F172A]">deploy</span> = <span className="text-[#9333EA]">async</span> () =&gt; {"{"}
                                        </div>
                                        <div className="flex">
                                            <span className="text-[#2C3892] w-6">02</span>
                                            <span className="pl-4 text-[#0F172A]">await</span> <span className="text-[#23698C]">client</span>.init({"{"}
                                        </div>
                                        <div className="flex">
                                            <span className="text-[#2C3892] w-6">03</span>
                                            <span className="pl-8 text-[#0F172A]">mode:</span> <span className="text-[#16A34A]">'production'</span>,
                                        </div>
                                        <div className="flex">
                                            <span className="text-[#2C3892] w-6">04</span>
                                            <span className="pl-8 text-[#0F172A]">region:</span> <span className="text-[#16A34A]">'us-east-1'</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-[#2C3892] w-6">05</span>
                                            <span className="pl-4">{"});"}</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-[#2C3892] w-6">06</span>
                                            <span className="text-[#0F172A]">{"}"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-[#0F172A] mb-2 group-hover:text-[#2C3892] transition-colors font-heading">DevScale API</h3>
                                <p className="text-[#334155] leading-relaxed mb-4 max-w-md text-sm lg:text-base font-body">
                                    Documentation and marketing site for a developer infrastructure tool. Focused on clarity, code highlighting, and speed.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Astro", "MDX", "Search"].map((tag) => (
                                        <span key={tag} className="px-2.5 py-1 rounded bg-white border border-[#D7D9E0] text-[11px] font-mono uppercase tracking-wide text-[#475569]">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-[#D7D9E0] flex items-center justify-center bg-white text-[#334155] group-hover:bg-[#2C3892] group-hover:text-white group-hover:border-[#2C3892] transition-all shrink-0">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </article>

                </div>

                {/* View More Link */}
                <div className="mt-20 lg:mt-32 text-center">
                    <button className="inline-flex items-center gap-2 text-[#334155] hover:text-[#2C3892] font-medium transition-colors border-b border-transparent hover:border-[#2C3892] pb-0.5">
                        View Archive <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* Client Logos (Social Proof) */}
            <section className="border-y border-[#D7D9E0] bg-white py-16">
                <div className="max-w-[1400px] mx-auto px-6 text-center">
                    <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wider mb-10 font-mono">Trusted by teams from</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Abstract Logos */}
                        <div className="flex items-center gap-2 font-bold text-xl text-[#0F172A] font-heading">
                            <div className="w-6 h-6 bg-[#0F172A] rounded-md"></div> ACME
                        </div>
                        <div className="flex items-center gap-2 font-bold text-xl text-[#0F172A] font-heading">
                            <div className="w-6 h-6 border-2 border-[#0F172A] rounded-full"></div> Sphere
                        </div>
                        <div className="flex items-center gap-2 font-bold text-xl text-[#0F172A] font-heading">
                            <div className="w-6 h-6 bg-gradient-to-tr from-[#23698C] to-[#2C3892] rounded-tl-xl rounded-br-xl"></div> Vertex
                        </div>
                        <div className="flex items-center gap-2 font-bold text-xl text-[#0F172A] font-heading">
                            <div className="w-6 h-6 border-l-4 border-[#0F172A]"></div> Layers
                        </div>
                        <div className="hidden lg:flex items-center gap-2 font-bold text-xl text-[#0F172A] font-heading">
                            <div className="w-6 h-6 bg-[#0F172A] transform rotate-45"></div> Bolt
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 max-w-[1000px] mx-auto text-center">
                <div className="w-16 h-16 mx-auto bg-[#F1F5F9] rounded-2xl flex items-center justify-center text-[#2C3892] mb-8 shadow-sm">
                    <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-semibold text-[#0F172A] tracking-tight mb-6 font-heading">
                    Have a project in mind?
                </h2>
                <p className="text-lg text-[#334155] mb-10 max-w-xl mx-auto leading-relaxed font-body">
                    We specialize in turning complex requirements into simple, beautiful, and high-performing digital products.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-4 rounded-full bg-[#2C3892] text-white font-semibold hover:bg-[#23698C] transition-all shadow-xl shadow-[#2C3892]/20 w-full sm:w-auto">
                        Start a Project
                    </button>
                    <button className="px-8 py-4 rounded-full bg-white border border-[#D7D9E0] text-[#0F172A] font-medium hover:border-[#2C3892] transition-colors w-full sm:w-auto">
                        Browse Services
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
