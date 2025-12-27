"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export function ExitIntentModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsOpen(true);
                setHasShown(true);
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);
        return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, [hasShown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="relative animate-in zoom-in-95 duration-300 max-w-lg w-full">
                <GlassCard className="p-0 overflow-hidden bg-white shadow-2xl">
                    <div className="bg-[var(--brand-primary)] p-8 text-white relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold mb-4 border border-white/20">
                            WAIT! ONE LAST THING...
                        </span>
                        <h3 className="heading-section text-3xl mb-2">
                            Get The Website Audit Checklist
                        </h3>
                        <p className="text-white/80">
                            Before you go, grab our internal checklist for high-converting websites. Free.
                        </p>
                    </div>

                    <div className="p-8 bg-white">
                        <ul className="space-y-3 mb-8">
                            {["Performance Benchmarks", "SEO Essentials", "Conversion Triggers"].map(item => (
                                <li key={item} className="flex items-center gap-2 text-[var(--brand-ink)] font-medium">
                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/10"
                            />
                            <Button className="w-full justify-between" rightIcon={<ArrowRight className="w-4 h-4" />}>
                                Send Me The Checklist
                            </Button>
                            <p className="text-center text-xs text-gray-400 mt-4">
                                No spam. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
