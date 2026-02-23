import { BentoCard } from "../ui/BentoCard";

export function ServicesGrid() {
    const services = [
        { title: "Marketing Sites", desc: "Conversion-first architecture engineered to turn traffic into qualified pipeline." },
        { title: "SaaS Platforms", desc: "Complex web applications with frictionless UX and rigorous component systems." },
        { title: "E-Commerce", desc: "High-performance storefronts designed to maximize average order value." },
        { title: "Design Systems", desc: "Scalable visual frameworks and React component libraries for enterprise teams." }
    ];

    return (
        <section id="services" className="py-32 border-b border-[var(--color-swiss-border)]">
            <div className="container-swiss">
                <div className="mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase text-[var(--color-swiss-indigo)]">Capabilities</h2>
                </div>

                <div className="bento-root grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, i) => (
                        <BentoCard key={i} className="h-72 justify-between">
                            <div className="text-3xl font-bold text-[var(--color-swiss-teal)]">{`0${i + 1}`}</div>
                            <div>
                                <h3 className="text-lg font-bold uppercase mb-3">{service.title}</h3>
                                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{service.desc}</p>
                            </div>
                        </BentoCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
