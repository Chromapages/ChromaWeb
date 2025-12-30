import { Zap, MousePointer2 } from "lucide-react";

export function LogoCloud() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
                <h2 className="text-3xl lg:text-4xl font-medium text-brand-ink tracking-tight max-w-xl leading-[1.2] font-heading">
                    We build for growth. <span className="text-slate-500/60">Trusted by brands that care about results.</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-md leading-relaxed font-body">
                    From high-converting landing pages to complex web apps, we ensure every pixel serves a purpose.
                </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8">
                {/* Active/Hovered Logo */}
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-white shadow-[0_20px_40px_-10px_rgba(44,56,146,0.1)] border border-slate-200 flex flex-col items-center justify-center gap-2 group transition-transform hover:-translate-y-1 cursor-pointer">
                    <div className="text-brand-primary">
                        <Zap className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-xs tracking-wider uppercase text-brand-ink font-heading">Speed</span>
                    <MousePointer2 className="w-4 h-4 text-slate-500 absolute bottom-6 opacity-0 group-hover:opacity-100 transition-opacity animate-bounce" />
                </div>

                {/* Standard Logos */}
                <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-surface-muted flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300">
                    <span className="font-semibold text-slate-600 tracking-tight font-heading">Vercel</span>
                </div>

                <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-surface-muted flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300">
                    <span className="font-semibold text-slate-600 tracking-tight font-heading">Shopify</span>
                </div>

                <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-surface-muted flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300">
                    <span className="font-semibold text-slate-600 tracking-tight font-heading">Stripe</span>
                </div>

                <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-surface-muted flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300">
                    <span className="font-semibold text-slate-600 tracking-tight font-heading">Linear</span>
                </div>
            </div>
        </section>
    );
}
