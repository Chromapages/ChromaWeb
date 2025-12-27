import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
    headline?: string;
    subheadline?: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
}

export function HeroSection({
    headline = "Websites That Perform.",
    subheadline = "We merge premium aesthetics with engineering-grade performance. Digital Design Elevated.",
    primaryCta = { label: "Start Building", href: "/contact" },
    secondaryCta = { label: "View Our Work", href: "/work" },
}: HeroSectionProps) {
    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8">
                    <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)] shadow-[0_0_8px_var(--brand-primary)] animate-pulse" />
                    <span className="text-mono-label text-[var(--brand-primary)]">
                        Accepting Q1 Projects
                    </span>
                </div>

                {/* Headline */}
                <h1 className="heading-hero text-5xl md:text-7xl lg:text-8xl text-[var(--brand-primary)] mb-6 tracking-tight">
                    {headline.split("Perform.").shift()}
                    <span className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] bg-clip-text text-transparent">
                        Perform.
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                    {subheadline}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={primaryCta.href}>
                        <Button size="lg" className="w-full sm:w-auto group">
                            {primaryCta.label}
                            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                    <Link href={secondaryCta.href}>
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                            {secondaryCta.label}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
