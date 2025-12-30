import {
    SiNextdotjs,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiNodedotjs,
} from "react-icons/si";

export function TechStack() {
    const logos = [
        { Icon: SiNextdotjs, label: "Next.js" },
        { Icon: SiReact, label: "React" },
        { Icon: SiTailwindcss, label: "Tailwind" },
        { Icon: SiTypescript, label: "TypeScript" },
        { Icon: SiNodedotjs, label: "Node.js" },
    ];

    return (
        <section className="py-16 bg-surface-base">
            <div className="flex flex-wrap gap-12 lg:gap-20 transition-all hover:grayscale-0 hover:opacity-80 opacity-40 max-w-7xl mx-auto px-6 grayscale justify-center">
                {logos.map((logo) => (
                    <logo.Icon
                        key={logo.label}
                        className="w-12 h-12 text-brand-ink"
                        aria-label={logo.label}
                    />
                ))}
            </div>
        </section>
    );
}
