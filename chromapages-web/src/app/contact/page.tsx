"use client";

import { useState } from "react";
import { Navbar, Footer } from "@/components/global";
import { MessageSquare, Mail, Users, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
    const [projectType, setProjectType] = useState<string>("Marketing Website");
    const [budgetLevel, setBudgetLevel] = useState<number>(40);

    const getBudgetText = (level: number) => {
        if (level < 20) return "< $10k";
        if (level < 40) return "$10k - $25k";
        if (level < 60) return "$25k - $50k";
        if (level < 80) return "$50k - $100k";
        return "$100k+";
    };

    const projectTypes = [
        "Marketing Website",
        "Web Application",
        "E-commerce",
        "Design System"
    ];

    return (
        <div className="min-h-screen bg-[#EFEFED]">
            <Navbar />

            <main className="max-w-[1400px] mx-auto px-6 py-12 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column: Copy & Info */}
                    <div className="lg:col-span-5 flex flex-col gap-10 sticky top-32">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D7D9E0] text-[#23698C] text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
                                <MessageSquare className="w-3 h-3" />
                                Get in touch
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight mb-6 leading-[1.1] font-heading">
                                Let's build<br />
                                <span className="text-[#334155]/60">something ambitious.</span>
                            </h1>
                            <p className="text-lg text-[#334155] leading-relaxed font-body">
                                Whether you need a complete platform overhaul or a high-converting marketing site, we are ready to help. Fill out the form, and we'll get back to you within 24 hours.
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-[#D7D9E0] hover:bg-white/50 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#23698C] shrink-0 group-hover:scale-110 transition-transform">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-[#0F172A]">Email us</h3>
                                    <a href="mailto:hello@chromapages.com" className="text-[#334155] hover:text-[#2C3892] transition-colors">hello@chromapages.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-[#D7D9E0] hover:bg-white/50 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#23698C] shrink-0 group-hover:scale-110 transition-transform">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-[#0F172A]">Join the team</h3>
                                    <a href="#" className="text-[#334155] hover:text-[#2C3892] transition-colors">View open positions</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-[#D7D9E0] hover:bg-white/50 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#23698C] shrink-0 group-hover:scale-110 transition-transform">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-[#0F172A]">Office</h3>
                                    <p className="text-[#334155]">156 2nd Street<br />San Francisco, CA 94105</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Proof */}
                        <div className="pt-8 border-t border-[#D7D9E0]">
                            <p className="text-sm font-medium text-[#64748B] mb-4 font-mono">TRUSTED BY TEAMS AT</p>
                            <div className="flex gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                {/* Simple Geometric Logo Placeholders */}
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-[#0F172A]"></div>
                                    <span className="font-bold text-[#0F172A]">Acme</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-[#0F172A] rotate-45"></div>
                                    <span className="font-bold text-[#0F172A]">Vertex</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-sm border-2 border-[#0F172A]"></div>
                                    <span className="font-bold text-[#0F172A]">Kundo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[2rem] p-8 lg:p-10 border border-[#D7D9E0] shadow-sm">
                            <form className="flex flex-col gap-8">

                                {/* Name & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="first-name" className="text-xs font-semibold uppercase tracking-wider text-[#64748B] ml-1 font-mono">First Name</label>
                                        <input type="text" id="first-name" placeholder="Jane" className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2C3892]/10 focus:border-[#2C3892] transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="last-name" className="text-xs font-semibold uppercase tracking-wider text-[#64748B] ml-1 font-mono">Last Name</label>
                                        <input type="text" id="last-name" placeholder="Doe" className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2C3892]/10 focus:border-[#2C3892] transition-all" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-[#64748B] ml-1 font-mono">Work Email</label>
                                    <input type="email" id="email" placeholder="jane@company.com" className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2C3892]/10 focus:border-[#2C3892] transition-all" />
                                </div>

                                {/* Project Type Custom Selection */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#64748B] ml-1 font-mono">Project Type</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {projectTypes.map((type) => (
                                            <div
                                                key={type}
                                                className={cn(
                                                    "custom-radio-card cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-all",
                                                    projectType === type
                                                        ? "border-[#2C3892] bg-[#F8FAFC] shadow-[0_0_0_1px_#2C3892]"
                                                        : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                                                )}
                                                onClick={() => setProjectType(type)}
                                            >
                                                <div className={cn(
                                                    "radio-circle w-5 h-5 rounded-full border relative shrink-0 transition-colors",
                                                    projectType === type
                                                        ? "border-[#2C3892] bg-[#2C3892]"
                                                        : "border-[#CBD5E1]"
                                                )}>
                                                    {projectType === type && (
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full" />
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium text-[#334155]">{type}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <input type="hidden" name="project_type" value={projectType} />
                                </div>

                                {/* Budget Range Slider (Custom) */}
                                <div className="flex flex-col gap-4 mt-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-[#64748B] ml-1 font-mono">Budget Range</label>
                                        <span className="text-sm font-semibold text-[#2C3892] bg-[#F1F5F9] px-3 py-1 rounded-full">
                                            {getBudgetText(budgetLevel)}
                                        </span>
                                    </div>
                                    <div className="relative h-2 bg-[#F1F5F9] rounded-full w-full mt-2 touch-none select-none flex items-center">
                                        <div
                                            className="absolute h-full bg-[#2C3892] rounded-full"
                                            style={{ width: `${budgetLevel}%` }}
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={budgetLevel}
                                            onChange={(e) => setBudgetLevel(parseInt(e.target.value))}
                                            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        {/* Custom Thumb Visual - Positioned by percentage */}
                                        <div
                                            className="absolute w-6 h-6 bg-white border-2 border-[#2C3892] rounded-full shadow-md top-1/2 -translate-y-1/2 pointer-events-none transition-transform hover:scale-110"
                                            style={{ left: `calc(${budgetLevel}% - 12px)` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs text-[#94a3b8] px-1 font-mono">
                                        <span>$5k</span>
                                        <span>$100k+</span>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="flex flex-col gap-2 mt-2">
                                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-[#64748B] ml-1 font-mono">Project Details</label>
                                    <textarea id="message" rows={4} placeholder="Tell us about your goals, timeline, and any specific requirements..." className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2C3892]/10 focus:border-[#2C3892] transition-all resize-none"></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <button type="button" className="group w-full py-4 rounded-xl bg-[#2C3892] text-white font-semibold text-lg hover:bg-[#23698C] transition-all shadow-xl shadow-[#2C3892]/20 flex items-center justify-center gap-2">
                                        Send Message
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <p className="text-center text-xs text-[#94a3b8] mt-4">By submitting this form, you agree to our privacy policy.</p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
