import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function NewHero() {
    return (
        <header className="relative px-4 lg:px-6 max-w-[1440px] mx-auto mt-4 pb-32">
            <div className="relative h-[650px] lg:h-[750px] rounded-[2.5rem] overflow-hidden group">
                {/* Background Image */}
                <div className="absolute inset-0 bg-brand-secondary">
                    <Image
                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                        alt="Digital Design Code"
                        fill
                        className="object-cover opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-secondary/80 to-brand-primary/40"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-16 max-w-7xl mx-auto">
                    <p className="text-surface-base/80 text-sm font-medium mb-6 tracking-wide uppercase font-body">Digital Design Elevated</p>
                    <h1 className="text-5xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.1] mb-8 font-heading">
                        Fast Websites That <br />
                        <span className="text-white/90">Turn Visitors Into Customers</span>
                    </h1>
                    <p className="text-surface-base/90 text-lg lg:text-xl font-light max-w-2xl mb-12 leading-relaxed font-body">
                        We design and build modern sites and web apps that load fast, look premium, and drive more leads.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href="/contact" className="px-8 py-4 rounded-full bg-white text-brand-secondary text-base font-medium hover:bg-surface-base transition-all flex items-center gap-2">
                            Book A Call
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/work" className="flex items-center gap-2 text-white/80 text-base font-medium hover:text-white transition-colors">
                            View our work
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Floating Card (Right) */}
                <div className="absolute top-24 right-12 hidden lg:block animate-float">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl w-72 shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <span className="text-[10px] text-white/60 font-mono">checkout.tsx</span>
                        </div>
                        <div className="space-y-2 font-mono text-xs">
                            <div className="h-2 w-3/4 bg-white/20 rounded"></div>
                            <div className="h-2 w-1/2 bg-brand-primary/60 rounded"></div>
                            <div className="h-2 w-full bg-white/10 rounded"></div>
                            <div className="h-2 w-2/3 bg-white/20 rounded"></div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] text-white/60 mb-0.5">Status</p>
                                <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                                    Launch Ready
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar (Overlapping) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] lg:w-auto min-w-[900px] bg-white rounded-[2rem] shadow-xl shadow-brand-secondary/10 p-8 lg:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 lg:gap-20 border border-slate-200">
                <div className="flex-1">
                    <div className="text-4xl lg:text-5xl font-medium text-brand-secondary tracking-tight mb-2 font-heading">99/100</div>
                    <p className="text-slate-600 text-sm leading-relaxed font-body">Google Mobile<br />Performance Score</p>
                </div>
                <div className="w-px h-16 bg-slate-200 hidden md:block"></div>
                <div className="flex-1">
                    <div className="text-4xl lg:text-5xl font-medium text-brand-secondary tracking-tight mb-2 font-heading">3.5x</div>
                    <p className="text-slate-600 text-sm leading-relaxed font-body">Average conversion<br />uplift for clients</p>
                </div>
                <div className="w-px h-16 bg-slate-200 hidden md:block"></div>
                <div className="flex-1">
                    <div className="text-4xl lg:text-5xl font-medium text-brand-secondary tracking-tight mb-2 font-heading">48hr</div>
                    <p className="text-slate-600 text-sm leading-relaxed font-body">Typical response time<br />for support requests</p>
                </div>
            </div>
        </header>
    );
}
