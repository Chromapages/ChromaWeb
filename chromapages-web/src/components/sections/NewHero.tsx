"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface NewHeroProps {
    headline?: string;
    subheadline?: string;
    cta?: {
        label: string;
        href: string;
    };
    secondaryCta?: {
        label: string;
        href: string;
    };
}

export function NewHero({ headline, subheadline, cta, secondaryCta }: NewHeroProps) {
    return (
        <header className="relative px-4 lg:px-8 2xl:px-12 max-w-[1800px] mx-auto mt-4 pb-32">
            <div className="relative h-[650px] lg:h-[750px] 2xl:h-[850px] rounded-[2.5rem] overflow-hidden group bg-surface-base">
                {/* Stardust Background & Gradient Blobs */}
                <div className="absolute inset-0 bg-[#EFEFED]">
                    <Image
                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                        alt="Digital Design Background"
                        fill
                        className="object-cover opacity-[0.03] mix-blend-multiply"
                    />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl" />
                    {/* Noise texture removed */}
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-16 2xl:px-24 max-w-[1600px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <p className="text-brand-accent/80 text-sm font-medium mb-6 tracking-wide uppercase font-mono">
                            Digital Design Elevated
                        </p>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="text-5xl lg:text-7xl font-bold text-brand-ink tracking-tight leading-[1.1] mb-8 font-heading"
                    >
                        {headline ? (
                            <span dangerouslySetInnerHTML={{ __html: headline.replace(/\n/g, "<br/>") }} />
                        ) : (
                            <>
                                Fast Websites That <br />
                                <span className="text-brand-primary">Turn Visitors Into Customers</span>
                            </>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="text-slate-600 text-lg lg:text-xl font-light max-w-2xl mb-12 leading-relaxed font-body"
                    >
                        {subheadline || "We design and build modern sites and web apps that load fast, look premium, and drive more leads."}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        className="flex items-center gap-6"
                    >
                        <Link href={cta?.href || "/contact"} className="px-8 py-4 rounded-full bg-brand-primary text-white text-base font-bold uppercase tracking-wide hover:bg-brand-secondary hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-brand-primary/20">
                            {cta?.label || "Book A Call"}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href={secondaryCta?.href || "/work"} className="flex items-center gap-2 text-slate-600 text-base font-medium hover:text-brand-primary transition-colors group/link">
                            {secondaryCta?.label || "View our work"}
                            <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>


            </div>

            {/* Stats Bar (Overlapping) */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] lg:w-auto min-w-[900px] bg-white rounded-[2rem] shadow-xl shadow-brand-primary/10 p-8 lg:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 lg:gap-20 border border-slate-200"
            >
                <div className="flex-1">
                    <div className="text-4xl lg:text-5xl font-medium text-brand-primary tracking-tight mb-2 font-mono">99/100</div>
                    <p className="text-slate-600 text-sm leading-relaxed font-body">Google Mobile<br />Performance Score</p>
                </div>
                <div className="w-px h-16 bg-slate-200 hidden md:block"></div>
                <div className="flex-1">
                    <div className="text-4xl lg:text-5xl font-medium text-brand-primary tracking-tight mb-2 font-mono">3.5x</div>
                    <p className="text-slate-600 text-sm leading-relaxed font-body">Average conversion<br />uplift for clients</p>
                </div>
                <div className="w-px h-16 bg-slate-200 hidden md:block"></div>
                <div className="flex-1">
                    <div className="text-4xl lg:text-5xl font-medium text-brand-primary tracking-tight mb-2 font-mono">48hr</div>
                    <p className="text-slate-600 text-sm leading-relaxed font-body">Typical response time<br />for support requests</p>
                </div>
            </motion.div>
        </header>
    );
}
