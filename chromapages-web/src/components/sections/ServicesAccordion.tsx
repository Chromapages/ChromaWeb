"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";


interface ServicesAccordionProps {
    services?: any[];
}

export function ServicesAccordion({ services }: ServicesAccordionProps) {
    const [activeIndex, setActiveIndex] = useState(1); // Default open

    const defaultServices = [
        {
            title: "Marketing Websites",
            shortDescription: "High-conversion pages for ads, SEO, and growth. We build pages that are fast on mobile and designed to get action.",
        },
        {
            title: "E-Commerce Builds",
            shortDescription: "Make buying easy. We create clean product templates and checkout flows that increase completion rates and average order value.",
        },
        {
            title: "Web Apps & Tools",
            shortDescription: "Customer portals and internal tools that feel like real products. We handle UX flows, core build, and release planning.",
        },
        {
            title: "Ongoing Support",
            shortDescription: "You’re not left hanging after launch. We provide updates, fixes, new pages, and performance monitoring.",
        },
    ];

    const displayServices = services?.length ? services : defaultServices;

    return (
        <section className="py-12 px-4 md:px-6">
            <div className="lg:p-20 overflow-hidden bg-white border-slate-200 border rounded-[2rem] p-8 relative shadow-xl">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row mb-16 items-start justify-between">
                        <div className="max-w-xl">
                            <span className="text-brand-primary text-sm tracking-wide uppercase mb-4 block font-heading font-bold">— Our Process</span>
                            <h2 className="text-4xl lg:text-5xl font-heading text-brand-ink font-bold">Launch with Confidence.</h2>
                        </div>
                        <div className="md:mt-0 text-lg font-light text-slate-500 font-body max-w-xs mt-6">
                            Launch is not the finish line—it’s the start. We support you from strategy to scale.
                            <Link href="/contact" className="inline-flex items-center gap-2 hover:bg-brand-accent text-sm font-semibold text-white bg-brand-secondary rounded-full mt-6 px-5 py-2.5">
                                Get A Quote
                                <Download size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Interactive Accordion List */}
                    <div className="flex flex-col border-t border-slate-200">
                        {displayServices.map((service, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <div
                                    key={index}
                                    className="group border-b transition-all duration-300 border-slate-200 cursor-pointer"
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className="py-8 flex flex-col">
                                        <div className="flex justify-between items-center">
                                            <h3 className={cn(
                                                "text-2xl font-heading font-bold transition-colors",
                                                isActive ? "text-brand-primary" : "text-brand-ink group-hover:text-brand-primary"
                                            )}>
                                                {service.title}
                                            </h3>
                                            <div className={cn(
                                                "rounded-full p-3 transition-colors",
                                                isActive ? "bg-brand-primary text-white" : "bg-slate-100 text-brand-ink group-hover:bg-brand-primary group-hover:text-white"
                                            )}>
                                                <PlusCircle size={24} className={cn("transition-transform duration-300", isActive && "rotate-45")} />
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "overflow-hidden transition-all duration-500 ease-in-out",
                                            isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                        )}>
                                            <p className="text-slate-500 max-w-2xl text-lg font-light pt-4 font-body">
                                                {service.shortDescription || service.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
