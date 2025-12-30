"use client";

import { Navbar, Footer } from "@/components/global";
import {
    GitBranch, CheckCircle2, Figma, Code2, Github, Layout, Server,
    Slack, MessageSquare, Trello, Clock, Search, ShieldCheck, Rocket, Check
} from "lucide-react";

export default function ProcessPage() {
    return (
        <div className="min-h-screen bg-[#EFEFED] text-[#0F172A] antialiased selection:bg-[#23698C] selection:text-white">
            <Navbar />

            {/* Process Hero */}
            <header className="relative px-6 pt-32 pb-20 max-w-[1440px] mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D7D9E0] text-[#23698C] text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
                    <GitBranch className="w-3 h-3" />
                    The Workflow
                </div>
                <h1 className="text-5xl lg:text-7xl font-semibold text-[#0F172A] tracking-tight mb-8 leading-[1.1] font-heading">
                    From ambiguous idea <br />
                    <span className="text-[#334155]/50">to shipping product.</span>
                </h1>
                <p className="text-lg lg:text-xl text-[#334155] max-w-2xl mx-auto leading-relaxed mb-12 font-body">
                    We&apos;ve refined a systematic approach that eliminates guesswork. No black boxes, just clear milestones and consistent shipping.
                </p>
            </header>

            {/* The Timeline Section */}
            <section className="px-6 pb-24 max-w-[1000px] mx-auto relative">
                {/* Vertical Line (Absolute) */}
                <div className="absolute left-[39px] lg:left-1/2 top-0 bottom-24 w-px timeline-line -translate-x-1/2 hidden lg:block"></div>
                <div className="absolute left-6 top-0 bottom-24 w-px timeline-line lg:hidden"></div>

                <div className="space-y-16">

                    {/* Step 1: Discovery */}
                    <div className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-24 group">
                        {/* Center Node */}
                        <div className="absolute left-0 lg:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#F7F7F6] border border-[#2C3892] z-10 flex items-center justify-center shadow-lg shadow-[#2C3892]/10 group-hover:scale-110 transition-transform duration-300">
                            <span className="font-mono font-bold text-[#2C3892]">01</span>
                        </div>

                        {/* Content Wrapper (Alternating) */}
                        <div className="ml-16 lg:ml-0 lg:w-1/2 lg:text-right lg:pr-16">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="px-2 py-0.5 rounded bg-[#E0F2FE] text-[#0369A1] text-[10px] font-bold uppercase tracking-wider font-mono">Week 1</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-[#0F172A] mb-3 font-heading">Discovery &amp; Strategy</h3>
                            <p className="text-[#334155] leading-relaxed mb-6 font-body">
                                Before we design, we define. We audit your current stack, interview key stakeholders, and map out the technical requirements to ensure scalability.
                            </p>
                            <ul className="inline-block text-left space-y-2">
                                <li className="flex items-center gap-2 text-sm text-[#334155] lg:justify-end lg:flex-row-reverse">
                                    <CheckCircle2 className="w-4 h-4 text-[#2C3892]" /> Competitor Analysis
                                </li>
                                <li className="flex items-center gap-2 text-sm text-[#334155] lg:justify-end lg:flex-row-reverse">
                                    <CheckCircle2 className="w-4 h-4 text-[#2C3892]" /> Technical Architecture
                                </li>
                                <li className="flex items-center gap-2 text-sm text-[#334155] lg:justify-end lg:flex-row-reverse">
                                    <CheckCircle2 className="w-4 h-4 text-[#2C3892]" /> Sitemap &amp; User Flows
                                </li>
                            </ul>
                        </div>
                        <div className="hidden lg:block lg:w-1/2"></div> {/* Spacer */}
                    </div>

                    {/* Step 2: Design */}
                    <div className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-24 group">
                        {/* Center Node */}
                        <div className="absolute left-0 lg:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-[#D7D9E0] z-10 flex items-center justify-center shadow-sm group-hover:border-[#23698C] transition-colors">
                            <span className="font-mono font-bold text-[#334155]">02</span>
                        </div>

                        <div className="hidden lg:block lg:w-1/2"></div> {/* Spacer */}

                        {/* Content Wrapper */}
                        <div className="ml-16 lg:ml-0 lg:w-1/2 lg:pl-16">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] text-[10px] font-bold uppercase tracking-wider font-mono">Week 2-3</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-[#0F172A] mb-3 font-heading">Design &amp; Prototype</h3>
                            <p className="text-[#334155] leading-relaxed mb-6 font-body">
                                We move to Figma to create high-fidelity designs. We focus on interactive prototypes that feel like the real app, ensuring you know exactly what we&apos;re building.
                            </p>
                            <div className="bg-white p-4 rounded-xl border border-[#D7D9E0] inline-block w-full">
                                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#F1F5F9]">
                                    <div className="w-8 h-8 rounded-lg bg-[#F7F7F6] flex items-center justify-center text-[#23698C]">
                                        <Figma className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium">Design System</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="h-2 bg-[#F1F5F9] rounded w-3/4"></div>
                                    <div className="h-2 bg-[#F1F5F9] rounded w-1/2"></div>
                                    <div className="h-2 bg-[#2C3892]/10 rounded w-full col-span-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Development */}
                    <div className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-24 group">
                        {/* Center Node */}
                        <div className="absolute left-0 lg:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-[#D7D9E0] z-10 flex items-center justify-center shadow-sm group-hover:border-[#23698C] transition-colors">
                            <span className="font-mono font-bold text-[#334155]">03</span>
                        </div>

                        {/* Content Wrapper */}
                        <div className="ml-16 lg:ml-0 lg:w-1/2 lg:text-right lg:pr-16">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] text-[10px] font-bold uppercase tracking-wider font-mono">Week 4-6</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-[#0F172A] mb-3 font-heading">Development</h3>
                            <p className="text-[#334155] leading-relaxed mb-6 font-body">
                                We write clean, semantic code using modern frameworks. Weekly staging links let you watch the build progress in real-time on your own devices.
                            </p>
                            <div className="flex gap-2 flex-wrap lg:justify-end">
                                <span className="px-3 py-1 rounded-full border border-[#D7D9E0] bg-white text-xs font-mono text-[#475569]">git commit</span>
                                <span className="px-3 py-1 rounded-full border border-[#D7D9E0] bg-white text-xs font-mono text-[#475569]">PR review</span>
                                <span className="px-3 py-1 rounded-full border border-[#D7D9E0] bg-white text-xs font-mono text-[#475569]">CI/CD</span>
                            </div>
                        </div>
                        <div className="hidden lg:block lg:w-1/2"></div> {/* Spacer */}
                    </div>

                    {/* Step 4: QA & Launch */}
                    <div className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-24 group">
                        {/* Center Node */}
                        <div className="absolute left-0 lg:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0F172A] border border-[#0F172A] z-10 flex items-center justify-center shadow-lg shadow-[#0F172A]/30">
                            <Rocket className="w-5 h-5 text-white" />
                        </div>

                        <div className="hidden lg:block lg:w-1/2"></div> {/* Spacer */}

                        {/* Content Wrapper */}
                        <div className="ml-16 lg:ml-0 lg:w-1/2 lg:pl-16">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] text-[10px] font-bold uppercase tracking-wider font-mono">Final Week</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-[#0F172A] mb-3 font-heading">QA &amp; Launch</h3>
                            <p className="text-[#334155] leading-relaxed mb-6 font-body">
                                Rigorous testing across browsers and devices. We optimize images, ensure accessibility compliance, and configure analytics before flipping the switch.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm text-[#334155]">
                                    <div className="w-5 h-5 rounded-full bg-[#23698C]/10 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-[#23698C]" />
                                    </div>
                                    Core Web Vitals Check
                                </li>
                                <li className="flex items-center gap-3 text-sm text-[#334155]">
                                    <div className="w-5 h-5 rounded-full bg-[#23698C]/10 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-[#23698C]" />
                                    </div>
                                    SEO Meta Tags Implementation
                                </li>
                                <li className="flex items-center gap-3 text-sm text-[#334155]">
                                    <div className="w-5 h-5 rounded-full bg-[#23698C]/10 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-[#23698C]" />
                                    </div>
                                    Client Training Session
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </section>

            {/* Communication & Tools (Dark Section) */}
            <section className="bg-[#0F172A] py-24 px-6 rounded-[2.5rem] mt-8 mx-4 lg:mx-8">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        <div>
                            <h2 className="text-3xl lg:text-4xl font-medium text-white tracking-tight mb-6 font-heading">
                                Tools that keep us<br />
                                <span className="text-gray-500">synced and moving.</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-10 max-w-md font-body">
                                We don&apos;t use email for project management. We use modern tools designed for transparency and velocity. You&apos;ll always know what&apos;s being worked on.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#1E293B] border border-white/10 flex items-center justify-center shrink-0">
                                        <Slack className="w-5 h-5 text-[#23698C]" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1 font-heading">Slack Connect</h4>
                                        <p className="text-sm text-gray-500 font-body">Direct access to the team. No formal tickets, just quick collaboration.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#1E293B] border border-white/10 flex items-center justify-center shrink-0">
                                        <Trello className="w-5 h-5 text-[#2C3892]" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1 font-heading">Linear / Trello</h4>
                                        <p className="text-sm text-gray-500 font-body">View the roadmap, track progress, and see exactly what&apos;s in the queue.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tools Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { icon: Figma, label: "Design" },
                                { icon: Code2, label: "VS Code" },
                                { icon: Github, label: "GitHub" },
                                { icon: Layout, label: "Linear" },
                                { icon: Server, label: "Vercel" },
                                { icon: Slack, label: "Slack" }
                            ].map((tool, i) => (
                                <div key={i} className="bg-[#1E293B] border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-[#232F42] transition-colors group">
                                    <tool.icon className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                                    <span className="text-xs font-medium text-gray-500 group-hover:text-gray-300 font-mono">{tool.label}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* Value Props / Why Us */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-medium text-[#0F172A] tracking-tight font-heading">Built on Principles</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Clock, title: "Respect for Time", desc: "We stick to deadlines. If we say it ships on Friday, it ships on Friday. We value your momentum as much as our code." },
                        { icon: Search, title: "Radical Transparency", desc: "You see the work as it happens. No \"big reveals\" after weeks of silence. We course-correct early and often together." },
                        { icon: ShieldCheck, title: "Post-Launch Support", desc: "We don't disappear after launch. We provide a warranty period for bugs and offer retainers for continuous improvement." }
                    ].map((item, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white border border-[#D7D9E0] hover:border-[#2C3892] transition-colors shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-[#F7F7F6] flex items-center justify-center text-[#2C3892] mb-6">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-[#0F172A] mb-3 font-heading">{item.title}</h3>
                            <p className="text-sm text-[#334155] leading-relaxed font-body">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
