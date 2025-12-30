import { Navbar, Footer } from "@/components/global";
import {
    DetailedServicesGrid,
    EngagementModels,
    FAQSection,
    ServicesCTA
} from "@/components/sections";

export const metadata = {
    title: "Services | Chromapages",
    description: "Capabilities built for growth & scale. Marketing Websites, E-Commerce, and Web Applications.",
};

export default function ServicesPage() {
    return (
        <>
            <Navbar />

            <main className="relative min-h-screen bg-surface-base">
                {/* Services Hero */}
                <header className="bg-white pt-32 pb-20 rounded-b-[2rem] shadow-sm relative overflow-hidden">
                    {/* Abstract Bg Elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-brand-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-slate-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <span className="animate-fade-in-up inline-block px-4 py-1.5 rounded-full bg-surface-muted text-brand-primary text-xs font-bold tracking-wide uppercase mb-6 font-heading">Our Expertise</span>

                        <h1 className="animate-fade-in-up delay-[100ms] text-5xl lg:text-7xl font-extrabold text-brand-ink font-heading mb-8 tracking-tight leading-[1.1]">
                            Capabilities built for <br />
                            <span className="text-brand-primary">growth & scale.</span>
                        </h1>

                        <p className="animate-fade-in-up delay-[200ms] text-xl text-slate-500 font-body font-light max-w-2xl mx-auto leading-relaxed">
                            We combine technical precision with high-end aesthetics. From simple landing pages to complex web applications, we build engines for your business.
                        </p>
                    </div>
                </header>

                <DetailedServicesGrid />
                <EngagementModels />
                <FAQSection />
                <ServicesCTA />
            </main>

            <Footer />
        </>
    );
}
