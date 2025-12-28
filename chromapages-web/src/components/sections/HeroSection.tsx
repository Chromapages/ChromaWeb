import Link from "next/link";
import {
    ArrowRight,
    Star,
    Lock,
    Play,
    CheckCircle2,
    TrendingUp,
    Signal,
    Wifi,
    BatteryFull,
    PenTool,
    Zap,
    Home,
    PieChart,
    Plus,
    Wallet,
    User,
    Globe2
} from "lucide-react";

interface HeroSectionProps {
    headline?: string;
    subheadline?: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
}

export function HeroSection({
    headline = "The documentation platform of tomorrow",
    subheadline = "Meet the next generation of documentation. AI-native, beautiful out-of-the-box, and built for developers to convert users.",
    primaryCta = { label: "Try for free", href: "/contact" },
    secondaryCta = { label: "Get a demo", href: "/work" },
}: HeroSectionProps) {
    return (
        <>
            <section className="relative pt-24 lg:pt-32 pb-20 overflow-visible bg-brand-base">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Hero Content */}
                    <div className="max-w-2xl relative z-10">
                        {/* Trust Pill */}
                        <div className="inline-flex items-center gap-2 bg-white/60 border border-white/50 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-sm">
                            <div className="flex text-brand-accent">
                                <Star className="w-3.5 h-3.5 fill-current" />
                            </div>
                            <span className="text-sm font-medium text-brand-ink/70"><span className="text-brand-primary font-bold">4.9</span> (6k+ Reviews) by Trustpilot</span>
                        </div>

                        <h1 className="text-5xl lg:text-[4.5rem] font-extrabold font-heading tracking-tight text-brand-primary mb-8 leading-[1.05]">
                            {headline}
                        </h1>

                        <p className="text-lg md:text-xl text-brand-ink/70 font-normal leading-relaxed mb-10 max-w-lg">
                            {subheadline}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                            <Link
                                href={primaryCta.href}
                                className="w-full sm:w-auto h-14 px-8 rounded-full bg-brand-primary text-white font-bold tracking-wide text-sm flex items-center justify-center gap-2 hover:bg-brand-primary/95 transition-all shadow-xl shadow-brand-primary/20 border border-brand-accent/20 group"
                            >
                                <Lock className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                {primaryCta.label}
                            </Link>
                            <Link
                                href={secondaryCta.href}
                                className="w-full sm:w-auto h-14 px-8 rounded-full bg-white/50 text-brand-primary border border-brand-primary/10 font-bold tracking-wide text-sm flex items-center justify-center gap-2 hover:bg-white transition-all shadow-sm backdrop-blur-sm"
                            >
                                <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                    <Play className="w-3 h-3 fill-brand-primary ml-0.5" />
                                </div>
                                {secondaryCta.label}
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-6 text-sm font-medium text-brand-ink/60">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                                No credit card required
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                                Fast acceptance
                            </div>
                        </div>
                    </div>

                    {/* Phone Mockup Area */}
                    <div className="relative flex justify-center lg:justify-end mt-10 lg:mt-0 lg:translate-x-32 lg:scale-[1.35] origin-center lg:origin-left">
                        {/* Floating Card Left */}
                        <div className="absolute top-[60%] left-0 lg:-left-24 z-20 bg-white/80 p-4 rounded-2xl shadow-xl shadow-brand-primary/10 border border-white/50 backdrop-blur-md w-48 animate-[bounce_3s_infinite]">
                            <div className="text-xs text-slate-500 mb-1">Total Income</div>
                            <div className="text-xl font-semibold text-brand-primary flex items-baseline gap-1">
                                90,560.00 <span className="text-[10px] text-slate-400">USD</span>
                            </div>
                            <div className="mt-2 flex items-center gap-1 text-[10px] text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded-full w-fit">
                                <TrendingUp className="w-3 h-3" />
                                <span>+20% increase</span>
                            </div>
                        </div>

                        {/* Phone Body */}
                        <div className="relative w-[300px] h-[600px] bg-brand-primary rounded-[3rem] p-3 shadow-2xl ring-1 ring-brand-primary/5 z-10">
                            <div className="h-full w-full bg-white rounded-[2.5rem] overflow-hidden relative flex flex-col">
                                {/* Notch & Status Bar */}
                                <div className="h-12 flex items-center justify-between px-6 pt-2">
                                    <span className="text-xs font-semibold text-slate-900">9:41</span>
                                    <div className="w-20 h-6 bg-black rounded-full absolute top-2 left-1/2 -translate-x-1/2"></div>
                                    <div className="flex gap-1.5">
                                        <Signal className="w-3 h-3 text-slate-900" />
                                        <Wifi className="w-3 h-3 text-slate-900" />
                                        <BatteryFull className="w-3 h-3 text-slate-900" />
                                    </div>
                                </div>

                                {/* App Content */}
                                <div className="flex-1 px-6 pt-4 bg-brand-base/50">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <div className="text-xs text-slate-500 font-medium mb-1">Total Balance</div>
                                            <div className="text-3xl font-bold text-brand-primary tracking-tight">$44,089</div>
                                        </div>
                                        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-medium flex items-center gap-1 shadow-sm">
                                            <PenTool className="w-3 h-3" /> Edit
                                        </button>
                                    </div>

                                    {/* Action Pills */}
                                    <div className="bg-white p-1.5 rounded-xl flex items-center justify-between mb-8 shadow-sm border border-slate-100">
                                        <button className="flex-1 bg-brand-primary text-white text-xs font-medium py-2.5 rounded-lg shadow-sm">Payout</button>
                                        <button className="flex-1 text-slate-500 text-xs font-medium py-2.5 hover:text-slate-900">Card</button>
                                        <button className="flex-1 text-slate-500 text-xs font-medium py-2.5 hover:text-slate-900">Bank</button>
                                    </div>

                                    {/* Secondary Balance */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <div className="text-[10px] text-slate-400 font-medium mb-1">Total Payout</div>
                                            <div className="text-2xl font-semibold text-brand-primary tracking-tight">$1,469</div>
                                        </div>
                                        <button className="px-4 py-2 bg-brand-primary/5 text-brand-primary rounded-full text-xs font-semibold flex items-center gap-1.5 hover:bg-brand-primary/10 transition-colors">
                                            <Zap className="w-3 h-3 fill-current" /> Get Paid
                                        </button>
                                    </div>

                                    {/* List Items */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-100/50 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 p-0.5 overflow-hidden">
                                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-slate-900">Sohawardi</div>
                                                    <div className="text-[10px] text-slate-400">info@howardi.com</div>
                                                </div>
                                            </div>
                                            <div className="text-xs font-semibold text-slate-900">+$800</div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-100/50 shadow-sm opacity-60">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 p-0.5 overflow-hidden">
                                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ella" alt="User" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-slate-900">Ella</div>
                                                    <div className="text-[10px] text-slate-400">ella@design.com</div>
                                                </div>
                                            </div>
                                            <div className="text-xs font-semibold text-slate-900">+$450</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Nav */}
                                <div className="h-16 bg-white border-t border-slate-100 flex items-center justify-around px-6">
                                    <Home className="w-5 h-5 text-brand-primary fill-brand-primary" />
                                    <PieChart className="w-5 h-5 text-slate-400" />
                                    <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center -mt-8 border-4 border-white shadow-lg">
                                        <Plus className="w-5 h-5 text-white" />
                                    </div>
                                    <Wallet className="w-5 h-5 text-slate-400" />
                                    <User className="w-5 h-5 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-white/50 bg-white/40 backdrop-blur-sm -mt-10 lg:-mt-20 relative z-30">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-4 max-w-sm">
                        <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0 text-brand-primary">
                            <Globe2 className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-brand-ink/70 leading-snug">
                            Powered and supported by leading international financial services
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center lg:justify-end gap-12 lg:gap-20">
                        <div className="text-center lg:text-left">
                            <div className="text-3xl font-bold tracking-tight text-brand-primary mb-1">160+</div>
                            <div className="text-xs font-bold text-brand-accent uppercase tracking-wide">Beneficial Cashback</div>
                        </div>
                        <div className="text-center lg:text-left">
                            <div className="text-3xl font-bold tracking-tight text-brand-primary mb-1">1.8M</div>
                            <div className="text-xs font-bold text-brand-accent uppercase tracking-wide">Satisfied Customers</div>
                        </div>
                        <div className="text-center lg:text-left">
                            <div className="text-3xl font-bold tracking-tight text-brand-primary mb-1">196+</div>
                            <div className="text-xs font-bold text-brand-accent uppercase tracking-wide">Countries Available</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
