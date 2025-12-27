import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            <div className="relative rounded-3xl overflow-hidden bg-[var(--brand-primary)] text-center p-12 md:p-24 shadow-2xl shadow-[var(--brand-primary)]/30">

                {/* Background blobs for texture */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-white/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-[var(--brand-accent)]/30 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="heading-hero text-3xl md:text-5xl text-white mb-6">
                        Ready to Elevate Your Digital Presence?
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed font-medium">
                        Stop losing leads to slow, outdated design. Let&apos;s build a performance engine that scales with your ambition.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <button className="w-full inline-flex items-center justify-center px-10 py-5 bg-white text-[var(--brand-primary)] font-heading font-bold text-lg rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all">
                                Book A Discovery Call
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                        </Link>
                        <Link href="/pricing" className="w-full sm:w-auto">
                            <button className="w-full inline-flex items-center justify-center px-10 py-5 bg-transparent border border-white/20 text-white font-heading font-bold text-lg rounded-xl hover:bg-white/10 transition-all">
                                View Pricing
                            </button>
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-white/40 font-mono uppercase tracking-widest">
                        Limited Availability for Q1 2025
                    </p>
                </div>
            </div>
        </section>
    );
}
