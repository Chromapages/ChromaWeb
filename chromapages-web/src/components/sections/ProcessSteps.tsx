import { SectionHeading } from "@/components/ui/SectionHeading";

const defaultSteps = [
    {
        phase: "01",
        title: "Discovery & Strategy",
        description: "We dive deep into your business model, audience, and goals. No code is written until the strategy is crystal clear.",
    },
    {
        phase: "02",
        title: "Design & UX",
        description: "We craft the visual identity and user journey. High-fidelity prototypes that look and feel like the final product.",
    },
    {
        phase: "03",
        title: "Development",
        description: "We build with Next.js and Tailwind. Clean, semantic code that scores 100/100 on Lighthouse performance metrics.",
    },
    {
        phase: "04",
        title: "Launch & Growth",
        description: "We handle the deployment, SEO setup, and analytics. Then we iterate based on real user data.",
    },
];

export function ProcessSteps() {
    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 bg-white">
            <SectionHeading
                label="How We Work"
                title="From Concept to Conversion"
                description="Our proven process ensures we deliver on time, on budget, and beyond expectations."
            />

            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[45px] left-0 w-full h-0.5 bg-[var(--brand-primary)]/10 z-0" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {defaultSteps.map((step, index) => (
                        <div key={step.phase} className="relative z-10 group">
                            {/* Number Bubble */}
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-[var(--brand-base)] flex items-center justify-center mb-6 shadow-sm group-hover:border-[var(--brand-primary)] group-hover:scale-110 transition-all duration-300 mx-auto md:mx-0">
                                <span className="font-heading font-bold text-3xl text-[var(--brand-primary)]">
                                    {step.phase}
                                </span>
                            </div>

                            <h3 className="heading-section text-xl mb-3 text-center md:text-left text-[var(--brand-ink)]">
                                {step.title}
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed text-center md:text-left">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
