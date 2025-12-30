import { Navbar, Footer } from "@/components/global";
import {
    ProcessTimeline,
    ProcessPrinciples,
    ProcessTools,
    ServicesCTA
} from "@/components/sections";

export const metadata = {
    title: "Process | Chromapages",
    description: "Our roadmap involves Discovery, Design, Development, and Launch. We make the complex simple.",
};

export default function ProcessPage() {
    return (
        <>
            <Navbar />

            <main className="relative min-h-screen bg-surface-base">
                {/* Process Hero */}
                <header className="bg-white pt-32 pb-20 rounded-b-[2rem] shadow-sm relative overflow-hidden">
                    {/* Abstract Bg Elements */}
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-primary/5 to-transparent rounded-full blur-3xl translate-y-[-20%] translate-x-[-20%] pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <span className="animate-fade-in-up inline-block px-4 py-1.5 rounded-full bg-surface-muted text-brand-primary text-xs font-bold tracking-wide uppercase mb-6 font-heading">The Roadmap</span>

                        <h1 className="animate-fade-in-up delay-[100ms] text-5xl lg:text-7xl font-extrabold text-brand-ink font-heading mb-8 tracking-tight leading-[1.1]">
                            Concept to launch, <br />
                            <span className="text-brand-primary">without the chaos.</span>
                        </h1>

                        <p className="animate-fade-in-up delay-[200ms] text-xl text-slate-500 font-body font-light max-w-2xl mx-auto leading-relaxed">
                            We believe great software is born from clear communication and a structured workflow. Here is exactly how we take your project from idea to reality.
                        </p>
                    </div>
                </header>

                <ProcessTimeline />
                <ProcessPrinciples />
                <ProcessTools />
                <ServicesCTA />
            </main>

            <Footer />
        </>
    );
}
