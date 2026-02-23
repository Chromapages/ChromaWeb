"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";

const PROJECT_TYPES = [
    { id: "marketing", label: "Marketing Site", icon: "M", desc: "Landing pages & growth" },
    { id: "saas", label: "SaaS Platform", icon: "S", desc: "Web applications" },
    { id: "ecommerce", label: "E-Commerce", icon: "E", desc: "Storefronts & checkout" },
    { id: "design-systems", label: "Design System", icon: "D", desc: "Component libraries" }
];

const BUDGET_RANGES = [
    { id: "2k-5k", label: "$2K–$5K", desc: "Single page" },
    { id: "5k-15k", label: "$5K–$15K", desc: "Multi-page site" },
    { id: "15k-50k", label: "$15K–$50K", desc: "Full platform" },
    { id: "50k+", label: "$50K+", desc: "Enterprise" }
];

const CALL_SLOTS = [
    { day: "Mon", date: "Feb 23", time: "10:00 AM" },
    { day: "Wed", date: "Feb 25", time: "2:00 PM" },
    { day: "Fri", date: "Feb 27", time: "11:00 AM" }
];

function TrustSignals() {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className="text-[var(--color-swiss-teal)]">★</span>
                    ))}
                </div>
                <div className="text-sm font-bold uppercase tracking-wider">4.9/5 Client Satisfaction</div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-swiss-teal)]/10 border border-[var(--color-swiss-teal)]/30">
                <span className="text-[var(--color-swiss-teal)] font-bold">✓</span>
                <span className="text-xs font-bold uppercase tracking-wider">14-Day Delivery</span>
            </div>

            <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-3">Trusted By</div>
                <div className="flex gap-4">
                    {["S", "L", "V"].map((logo, i) => (
                        <div key={i} className="w-10 h-10 rounded bg-[var(--color-swiss-black)] flex items-center justify-center text-white font-bold text-sm">
                            {logo}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ResponseTimeStrip() {
    return (
        <div className="bg-[#2C3892] py-4">
            <div className="container-swiss">
                <div className="flex items-center justify-center gap-4">
                    <span className="text-[var(--color-swiss-teal)] text-xl">⏱</span>
                    <div className="text-white font-bold uppercase tracking-wider">We respond within 4 hours</div>
                    <span className="text-white/60 text-sm hidden md:inline">Mon–Fri, 9am–6pm PST</span>
                </div>
            </div>
        </div>
    );
}

function BookCallCard() {
    return (
        <div className="p-8 bg-[var(--color-swiss-bg)] border border-[var(--color-swiss-border)]">
            <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-4">Alternative</div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">Book a Call</h3>
            <p className="text-sm text-[var(--color-muted)] mb-6">30-min strategy session</p>

            <div className="space-y-3 mb-6">
                {CALL_SLOTS.map((slot, i) => (
                    <a
                        key={i}
                        href="https://cal.com/chromapages"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border border-[var(--color-swiss-border)] hover:border-[var(--color-swiss-teal)] transition-swiss cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold uppercase">{slot.day} {slot.date}</span>
                        </div>
                        <span className="text-sm font-bold text-[var(--color-swiss-teal)]">{slot.time}</span>
                    </a>
                ))}
            </div>

            <a
                href="https://cal.com/chromapages"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button variant="outline" size="lg" className="w-full">VIEW ALL SLOTS →</Button>
            </a>
        </div>
    );
}

function SuccessState() {
    return (
        <div className="text-center py-16 animate-[fadeIn_0.5s_ease-out]">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[var(--color-swiss-teal)] flex items-center justify-center">
                <span className="text-5xl text-white">✓</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tighter uppercase mb-4">Brief Received.</h2>
            <p className="text-[var(--color-muted)]">We'll respond within 4 hours.</p>
        </div>
    );
}

function ProgressBar({ currentStep }: { currentStep: number }) {
    const steps = ["Project", "Budget", "Details"];
    return (
        <div className="flex items-center gap-4 mb-12 overflow-x-auto">
            {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 whitespace-nowrap">
                    <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold ${i + 1 <= currentStep
                            ? "bg-[var(--color-swiss-teal)] text-white"
                            : "bg-[var(--color-swiss-border)] text-[var(--color-muted)]"
                        }`}>
                        {i + 1}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${i + 1 <= currentStep ? "text-[var(--color-swiss-black)]" : "text-[var(--color-muted)]"
                        }`}>
                        0{i + 1} {step}
                    </span>
                    {i < steps.length - 1 && (
                        <div className={`w-8 h-px ${i + 1 < currentStep ? "bg-[var(--color-swiss-teal)]" : "bg-[var(--color-swiss-border)]"}`} />
                    )}
                </div>
            ))}
        </div>
    );
}

function ContactForm() {
    const searchParams = useSearchParams();
    const initialService = searchParams.get("service") || "";

    const [formStep, setFormStep] = useState(1);
    const [formState, setFormState] = useState<'idle' | 'success'>('idle');
    const [projectType, setProjectType] = useState(initialService);
    const [budget, setBudget] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const service = searchParams.get("service");
        if (service) {
            setProjectType(service);
        }
    }, [searchParams]);

    const handleNext = () => {
        if (formStep === 1 && !projectType) return;
        if (formStep === 2 && !budget) return;
        if (formStep === 3 && (!name || !email)) return;

        if (formStep < 3) {
            setFormStep(formStep + 1);
        } else {
            setFormState('success');
        }
    };

    const canProceed = () => {
        if (formStep === 1) return !!projectType;
        if (formStep === 2) return !!budget;
        if (formStep === 3) return !!name && !!email;
        return false;
    };

    if (formState === 'success') {
        return (
            <div className="max-w-xl mx-auto">
                <SuccessState />
            </div>
        );
    }

    return (
        <div className="swiss-grid">
            <div className="col-span-12 lg:col-span-5 pr-12">
                <h1 className="text-7xl md:text-[9rem] font-bold leading-[0.8] tracking-tighter text-[var(--color-swiss-indigo)] uppercase mb-12">
                    Connect.
                </h1>

                <div className="space-y-12 mb-12">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-muted)] mb-4">Inquiries</h2>
                        <a href="mailto:hello@chromapages.com" className="text-2xl md:text-3xl font-bold hover:text-[var(--color-swiss-teal)] transition-swiss underline decoration-2">
                            hello@chromapages.com
                        </a>
                    </div>
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-muted)] mb-4">Operations</h2>
                        <p className="text-2xl font-bold uppercase tracking-tighter">
                            Remote_First<br />
                            Global_Standard
                        </p>
                    </div>
                </div>

                <TrustSignals />

                <div className="mt-12">
                    <BookCallCard />
                </div>
            </div>

            <div className="col-span-12 lg:col-span-1" />

            <div className="col-span-12 lg:col-span-6 pl-0 lg:pl-12">
                <div className="pt-12 lg:pt-32">
                    <ProgressBar currentStep={formStep} />

                    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-8">
                        {formStep === 1 && (
                            <div className="animate-[fadeIn_0.3s_ease-out]">
                                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-muted)] mb-8">01_Select Project Type</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {PROJECT_TYPES.map((type) => (
                                        <button
                                            key={type.id}
                                            type="button"
                                            onClick={() => setProjectType(type.id)}
                                            className={`p-6 border text-left transition-swiss ${projectType === type.id
                                                    ? "border-[var(--color-swiss-teal)] bg-[var(--color-swiss-teal)]/5"
                                                    : "border-[var(--color-swiss-border)] hover:border-[var(--color-swiss-teal)]"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className={`text-2xl font-bold ${projectType === type.id ? "text-[var(--color-swiss-teal)]" : "text-[var(--color-swiss-black)]"}`}>
                                                    {type.icon}
                                                </span>
                                                {projectType === type.id && (
                                                    <span className="text-[var(--color-swiss-teal)]">✓</span>
                                                )}
                                            </div>
                                            <div className="font-bold uppercase tracking-wider text-sm">{type.label}</div>
                                            <div className="text-xs text-[var(--color-muted)] mt-1">{type.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {formStep === 2 && (
                            <div className="animate-[fadeIn_0.3s_ease-out]">
                                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-muted)] mb-8">02_Select Investment Range</h2>
                                <div className="space-y-3">
                                    {BUDGET_RANGES.map((range) => (
                                        <button
                                            key={range.id}
                                            type="button"
                                            onClick={() => setBudget(range.id)}
                                            className={`w-full p-5 border text-left flex items-center justify-between transition-swiss ${budget === range.id
                                                    ? "border-[var(--color-swiss-teal)] bg-[var(--color-swiss-teal)]/5"
                                                    : "border-[var(--color-swiss-border)] hover:border-[var(--color-swiss-teal)]"
                                                }`}
                                        >
                                            <div>
                                                <div className={`font-bold uppercase tracking-wider ${budget === range.id ? "text-[var(--color-swiss-teal)]" : ""}`}>
                                                    {range.label}
                                                </div>
                                                <div className="text-xs text-[var(--color-muted)]">{range.desc}</div>
                                            </div>
                                            {budget === range.id && (
                                                <span className="text-[var(--color-swiss-teal)] font-bold">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {formStep === 3 && (
                            <div className="animate-[fadeIn_0.3s_ease-out]">
                                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-muted)] mb-8">03_Your Details</h2>
                                <div className="space-y-6">
                                    <div className="border-b border-[var(--color-swiss-border)] pb-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)] mb-2 block">Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="YOUR NAME"
                                            className="w-full bg-transparent border-none p-0 text-xl font-bold tracking-tight outline-none focus:placeholder:text-[var(--color-swiss-teal)]"
                                        />
                                    </div>
                                    <div className="border-b border-[var(--color-swiss-border)] pb-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)] mb-2 block">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="YOUR@EMAIL.COM"
                                            className="w-full bg-transparent border-none p-0 text-xl font-bold tracking-tight outline-none focus:placeholder:text-[var(--color-swiss-teal)]"
                                        />
                                    </div>
                                    <div className="border-b border-[var(--color-swiss-border)] pb-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)] mb-2 block">Project Details</label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows={4}
                                            placeholder="Tell us about your project..."
                                            className="w-full bg-transparent border-none p-0 text-xl font-bold tracking-tight outline-none resize-none focus:placeholder:text-[var(--color-swiss-teal)]"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 pt-8">
                            {formStep > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="lg"
                                    onClick={() => setFormStep(formStep - 1)}
                                >
                                    ← BACK
                                </Button>
                            )}
                            <Button
                                type="submit"
                                size="lg"
                                className="flex-grow"
                                disabled={!canProceed()}
                            >
                                {formStep === 3 ? "TRANSMIT_BRIEF" : "NEXT →"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            <Navigation />
            <ResponseTimeStrip />

            <section className="pt-16 pb-24 border-b border-[var(--color-swiss-border)]">
                <div className="container-swiss">
                    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
                        <ContactForm />
                    </Suspense>
                </div>
            </section>

            <Footer />
        </main>
    );
}
