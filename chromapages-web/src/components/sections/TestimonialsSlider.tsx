"use client";

import { useState, useEffect } from "react";
import { Quote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";


interface TestimonialsSliderProps {
    testimonials?: any[];
}

export function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
    const defaultTestimonials = [
        {
            text: "\"Chromapages didn't just build a nicer site; they improved our entire funnel. Mobile conversion went up 40% in the first month.\"",
            name: "Marcus Chen",
            role: "Marketing Director, Fintech Co."
        },
        {
            text: "\"The launch process was incredibly smooth. No bugs, no downtime, just a faster site that immediately started performing.\"",
            name: "Elena Rodriguez",
            role: "Founder, StyleSpace"
        },
        {
            text: "\"We needed a partner who understood design AND performance. Chromapages delivered both flawlessly.\"",
            name: "James Wilson",
            role: "CTO, TechFlow"
        }
    ];

    const displayTestimonials = testimonials?.length ? testimonials : defaultTestimonials;


    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
                setIsAnimating(false);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [displayTestimonials.length]);

    // Safety check
    if (!displayTestimonials.length) return null;

    return (
        <section className="py-24 overflow-hidden rounded-t-[2rem] relative bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-8 bg-brand-primary"></div>
                        <span className="text-sm uppercase tracking-wider text-brand-primary font-heading font-bold">Client Results</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl mb-8 font-heading text-brand-ink font-bold">Trust at First Glance.</h2>

                    {/* Animated Testimonial Card */}
                    <div className="bg-surface-muted border p-10 rounded-[2rem] max-w-lg relative mb-10 min-h-[300px] flex flex-col justify-between transition-all border-slate-200">
                        <div>
                            <Quote className="text-brand-primary text-4xl mb-6 fill-brand-primary" size={40} />
                            <div className={cn("transition-opacity duration-500", isAnimating ? "opacity-0" : "opacity-100")}>
                                <p className="text-xl text-[#334155] italic mb-6 leading-relaxed font-light font-body">
                                    {displayTestimonials[currentIndex].text || displayTestimonials[currentIndex].quote}
                                </p>
                                <div>
                                    <div className="text-brand-ink text-lg font-heading font-bold">{displayTestimonials[currentIndex].name || displayTestimonials[currentIndex].author}</div>
                                    <div className="text-slate-500 text-sm">{displayTestimonials[currentIndex].role}</div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Indicators */}
                        <div className="flex gap-2 mt-8">
                            {displayTestimonials.map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1 rounded-full w-8 transition-all duration-300",
                                        i === currentIndex ? "bg-brand-primary" : "bg-slate-200"
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    <Link href="/work" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary rounded-full font-medium hover:bg-brand-accent transition-colors text-white">
                        Read Success Stories
                        <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="relative h-full min-h-[500px]">
                    {/* Large Background Image */}
                    <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                        <div className="opacity-90 mix-blend-normal w-full h-full bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
                        {/* Light Gradient overlay */}
                        <div className="bg-gradient-to-t from-white via-white/50 to-transparent absolute top-0 right-0 bottom-0 left-0"></div>
                    </div>


                    {/* Bottom Team List */}
                    <div className="absolute bottom-6 right-6 flex flex-col gap-4 items-end">
                        <div className="flex items-center gap-3 text-right bg-white/90 backdrop-blur px-4 py-2 rounded-full border border-slate-200 shadow-lg">
                            <div className="text-xs text-slate-500">
                                <div className="font-bold text-brand-ink">Conversion</div>
                                <div>Increased by 35%</div>
                            </div>
                            <div className="w-8 h-8 rounded-full border bg-brand-primary flex items-center justify-center text-xs border-white/20 text-white">
                                🚀
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
