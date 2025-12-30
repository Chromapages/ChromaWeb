"use client";

import { useState } from "react";
import { Navbar, Footer } from "@/components/global";
import { HelpCircle, Search, Plus, MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FAQPage() {
    // State to track active accordion items
    // Using an object to allow for multiple open items if needed, or check logic for single
    // Here we'll stick to single open item per category for simplicity, or just toggle class
    // actually, let's allow independent toggling for each item.
    // Using a simple set or array of IDs might be best.
    // The previous request showed `onclick="toggleAccordion(this)"`, implying DOM manipulation.
    // In React, we'll store active state.

    const [activeItems, setActiveItems] = useState<Record<string, boolean>>({});

    const toggleItem = (id: string) => {
        setActiveItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const AccordionItem = ({ id, question, answer, children }: { id: string, question: string, answer?: string, children?: React.ReactNode }) => (
        <div
            className={cn("accordion-item group cursor-pointer hover:bg-[#F8FAFC] transition-colors", activeItems[id] && "active")}
            onClick={() => toggleItem(id)}
        >
            <div className="px-6 py-5 flex justify-between items-center">
                <h4 className="text-lg font-medium text-[#0F172A] pr-4">{question}</h4>
                <div className="w-6 h-6 rounded-full bg-[#EFEFED] text-[#334155] flex items-center justify-center group-hover:bg-[#E0F2FE] group-hover:text-[#23698C] transition-colors shrink-0">
                    <Plus className="accordion-icon w-4 h-4" />
                </div>
            </div>
            <div className="accordion-content bg-[#FAFAFA]">
                <div className="px-6 pb-6 text-[#334155] leading-relaxed text-sm lg:text-base border-t border-transparent">
                    {answer && <p>{answer}</p>}
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#EFEFED] text-[#0F172A] antialiased selection:bg-[#23698C] selection:text-white">
            <Navbar />

            {/* FAQ Hero */}
            <header className="relative px-6 pt-32 pb-20 max-w-[1440px] mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D7D9E0] text-[#23698C] text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
                    <HelpCircle className="w-3 h-3" />
                    Support &amp; Questions
                </div>
                <h1 className="text-5xl lg:text-7xl font-semibold text-[#0F172A] tracking-tight mb-8 leading-[1.1] font-heading">
                    Common questions<br />
                    <span className="text-[#334155]/50">about working with us.</span>
                </h1>
                <p className="text-lg lg:text-xl text-[#334155] max-w-2xl mx-auto leading-relaxed mb-12 font-body">
                    Everything you need to know about our design process, development pricing, timelines, and post-launch support.
                </p>

                {/* Search Input (Visual Only) */}
                <div className="max-w-md mx-auto relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="w-5 h-5 text-[#94a3b8] group-focus-within:text-[#2C3892] transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white border border-[#D7D9E0] text-[#0F172A] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2C3892]/20 focus:border-[#2C3892] transition-all shadow-sm font-body"
                        placeholder="Search for answers..."
                    />
                </div>
            </header>

            {/* Main FAQ Content */}
            <section className="px-6 pb-24 max-w-[900px] mx-auto">

                {/* Category: General & Process */}
                <div className="mb-16">
                    <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wider mb-6 ml-1 font-mono">General &amp; Process</h3>

                    <div className="bg-white rounded-2xl border border-[#D7D9E0] shadow-sm divide-y divide-[#D7D9E0] overflow-hidden">

                        <AccordionItem
                            id="gen-1"
                            question="How long does a typical project take?"
                            answer="Timelines vary based on complexity. A standard marketing website typically takes 4-6 weeks from kick-off to launch. More complex web applications or SaaS products can take 8-12 weeks or more. We work in 2-week sprints and provide a detailed timeline during our initial proposal."
                        />

                        <AccordionItem
                            id="gen-2"
                            question="What is your design process like?"
                        >
                            We follow a four-stage process:
                            <ol className="list-decimal pl-5 mt-2 space-y-1">
                                <li><strong>Discovery:</strong> Understanding your goals and users.</li>
                                <li><strong>Design:</strong> Wireframing and high-fidelity UI creation.</li>
                                <li><strong>Development:</strong> Coding responsive, high-performance pages.</li>
                                <li><strong>Launch:</strong> QA testing, deployment, and handoff.</li>
                            </ol>
                        </AccordionItem>

                        <AccordionItem
                            id="gen-3"
                            question="Do you provide content or copywriting?"
                            answer="We primarily focus on design and development. However, we have a network of trusted copywriters we partner with if you need assistance crafting your brand messaging. For the layout, we can use placeholder text until your content is ready."
                        />

                    </div>
                </div>

                {/* Category: Technical & Billing */}
                <div>
                    <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wider mb-6 ml-1 font-mono">Technical &amp; Billing</h3>

                    <div className="bg-white rounded-2xl border border-[#D7D9E0] shadow-sm divide-y divide-[#D7D9E0] overflow-hidden">

                        <AccordionItem
                            id="tech-1"
                            question="Which technologies do you use?"
                            answer="We build on modern stacks to ensure speed and scalability. Our primary stack includes React/Next.js for the frontend, Tailwind CSS for styling, and Node.js or Python for backend needs. For content-heavy sites, we often implement headless CMS solutions like Sanity or Contentful."
                        />

                        <AccordionItem
                            id="tech-2"
                            question="How are payments structured?"
                            answer="Typically, we operate on a 50/50 basis: a 50% deposit to secure your slot in our calendar and commence work, with the remaining 50% due upon project completion and before final handoff. For larger projects, we can structure payments across milestones (e.g., 30/30/40)."
                        />

                        <AccordionItem
                            id="tech-3"
                            question="Do I own the code after the project?"
                            answer="Yes, absolutely. Once the final invoice is paid, you own 100% of the intellectual property, design files (Figma), and codebase. We do not lock you into proprietary platforms."
                        />

                        <AccordionItem
                            id="tech-4"
                            question="Do you offer on-going support?"
                            answer="We provide a 30-day bug-fix guarantee after launch. Beyond that, we offer monthly retainer packages for updates, new feature development, and server maintenance, or we can train your team to manage the product internally."
                        />

                    </div>
                </div>

            </section>

            {/* Still have questions? */}
            <section className="border-t border-[#D7D9E0] bg-white py-16">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="bg-[#F1F5F9] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#D7D9E0]">
                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 rounded-xl bg-white border border-[#D7D9E0] flex items-center justify-center text-[#2C3892] shadow-sm shrink-0">
                                <MessageCircle className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-[#0F172A] mb-2 font-heading">Can&apos;t find what you&apos;re looking for?</h3>
                                <p className="text-[#334155] font-body">Chat with our team directly. We usually respond within 2 hours during business days.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <button className="px-6 py-3 rounded-full bg-[#2C3892] text-white font-medium hover:bg-[#23698C] transition-all shadow-lg shadow-[#2C3892]/20 whitespace-nowrap w-full md:w-auto text-center">
                                Contact Support
                            </button>
                            <button className="px-6 py-3 rounded-full bg-white border border-[#D7D9E0] text-[#0F172A] font-medium hover:border-[#2C3892] transition-colors whitespace-nowrap w-full md:w-auto text-center hidden sm:block">
                                Email Us
                            </button>
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
                    Ready to get started?
                </h2>
                <p className="text-lg text-[#334155] mb-10 max-w-xl mx-auto leading-relaxed font-body">
                    Skip the confusion and start building your next great product with a team that cares about the details.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-4 rounded-full bg-[#2C3892] text-white font-semibold hover:bg-[#23698C] transition-all shadow-xl shadow-[#2C3892]/20 w-full sm:w-auto">
                        Start a Project
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
