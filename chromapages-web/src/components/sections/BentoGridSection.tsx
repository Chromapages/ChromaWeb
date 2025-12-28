import { BentoCard, BentoCardProps } from "../ui/BentoCard";

interface BentoGridSectionProps {
    title?: string;
    subtitle?: string;
    cards: BentoCardProps[];
}

export function BentoGridSection({ title, subtitle, cards }: BentoGridSectionProps) {
    return (
        <section className="py-24 bg-surface-base">
            <div className="max-w-7xl mx-auto px-6">
                {(title || subtitle) && (
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-6 tracking-tight">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-lg text-slate-500 leading-relaxed">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[minmax(300px,auto)]">
                    {cards.map((card, index) => (
                        <BentoCard key={index} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
}
