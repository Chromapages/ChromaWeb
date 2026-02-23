import { BentoCard } from "../ui/BentoCard";

export function Process() {
    const steps = [
        { num: "01", title: "Discovery", desc: "Rigorous analysis of your business architecture, user needs, and primary conversion objectives." },
        { num: "02", title: "Engineering", desc: "Structural UI design and highly optimized full-stack development utilizing the Next.js App Router." },
        { num: "03", title: "Deployment", desc: "Automated QA, CI/CD performance testing, and zero-downtime production deployment." }
    ];

    return (
        <section id="process" className="py-32 border-b border-[var(--color-swiss-border)]">
            <div className="container-swiss">
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase text-[var(--color-swiss-indigo)] mb-16">Methodology</h2>

                <div className="bento-root grid grid-cols-1 md:grid-cols-3">
                    {steps.map((step, i) => (
                        <BentoCard key={i} className="h-80 justify-between">
                            <div className="text-6xl font-bold tracking-tighter text-[var(--color-swiss-border)]">{step.num}</div>
                            <div>
                                <h3 className="text-xl font-bold uppercase mb-4">{step.title}</h3>
                                <p className="text-[var(--color-muted)] leading-relaxed">{step.desc}</p>
                            </div>
                        </BentoCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
