import { Button } from "../ui/Button";
import { BentoCard } from "../ui/BentoCard";
import { Badge } from "../ui/Badge";

export function Hero() {
    return (
        <section className="relative pt-32 pb-24 border-b border-[var(--color-swiss-border)] overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hero-bg.png"
                    alt="Swiss Modern Hero Background"
                    className="w-full h-full object-cover grayscale opacity-15"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-swiss-bg)]/80 via-transparent to-[var(--color-swiss-bg)]/90" />
            </div>

            <div className="container-swiss relative z-10">
                <div className="swiss-grid items-center">

                    <div className="col-span-12 lg:col-span-7 pr-8">
                        <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-bold text-[var(--color-swiss-indigo)] leading-[0.95] tracking-tighter uppercase mb-8">
                            Digital<br />Design<br />That<br />Delivers<br />Results.
                        </h1>
                        <p className="text-lg md:text-xl max-w-lg mb-10 text-[var(--color-muted)] border-l-4 border-[var(--color-swiss-teal)] pl-6">
                            Premium websites and SaaS apps engineered for extreme performance, structural clarity, and high conversion.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="w-full sm:w-auto">INITIATE PROJECT</Button>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">VIEW METRICS</Button>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-5 mt-16 lg:mt-0">
                        <div className="bento-root grid grid-cols-2">
                            <BentoCard className="col-span-2 flex-row justify-between items-end h-40" hoverEffect={false}>
                                <div>
                                    <Badge variant="accent" className="mb-4">Live Status</Badge>
                                    <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted)]">System Uptime</div>
                                </div>
                                <div className="text-4xl sm:text-5xl font-bold tracking-tighter">99.9%</div>
                            </BentoCard>
                            <BentoCard className="h-48 justify-between" hoverEffect={false}>
                                <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted)] mb-2">Projects<br />Deployed</div>
                                <div className="text-4xl font-bold tracking-tighter text-[var(--color-swiss-teal)]">500+</div>
                            </BentoCard>
                            <BentoCard className="h-48 justify-between" hoverEffect={false}>
                                <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted)] mb-2">Avg. Return<br />On Spend</div>
                                <div className="text-4xl font-bold tracking-tighter">2.5X</div>
                            </BentoCard>
                            <BentoCard className="col-span-2 h-32 items-center justify-center bg-[var(--color-swiss-indigo)] text-white group cursor-pointer overflow-hidden relative">
                                <div className="absolute inset-0 bg-[var(--color-swiss-teal)] translate-y-full group-hover:translate-y-0 transition-swiss" />
                                <div className="relative text-lg font-bold tracking-widest uppercase flex items-center gap-3">
                                    <span>Explore Architecture</span>
                                    <span className="group-hover:translate-x-3 transition-swiss text-2xl">&rarr;</span>
                                </div>
                            </BentoCard>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
