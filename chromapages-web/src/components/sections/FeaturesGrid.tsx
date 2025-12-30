import { Smartphone, MousePointerClick, LifeBuoy, ShieldCheck, BarChart3, Search } from "lucide-react";

export function FeaturesGrid() {
    const features = [
        {
            icon: Smartphone,
            title: "Fast on Mobile",
            description: "Pages that load fast and feel smooth. Faster pages reduce drop‑offs and turn paid traffic into revenue."
        },
        {
            icon: MousePointerClick,
            title: "Built To Convert",
            description: "Clear message hierarchy and friction-free forms designed to drive action: calls, bookings, and purchases."
        },
        {
            icon: LifeBuoy,
            title: "Ongoing Support",
            description: "You’re not left hanging. We provide updates, fixes, performance improvements, and new pages post-launch."
        },
        {
            icon: ShieldCheck,
            title: "Launch-Safe QA",
            description: "Cross-device testing and staging environments to ensure a stable launch with no unpleasant surprises."
        },
        {
            icon: BarChart3,
            title: "Measurement",
            description: "GA4 baseline and event tracking set up correctly, so you know exactly what is working and can measure ROI."
        },
        {
            icon: Search,
            title: "Built To Be Found",
            description: "Clean heading hierarchy, unique meta tags, and schema. A clean foundation for organic SEO growth."
        }
    ];

    return (
        <section className="bg-white py-24 px-6 border-y border-slate-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl lg:text-4xl font-medium text-brand-ink tracking-tight mb-4 leading-[1.2] font-heading">
                        Product Standards. <span className="text-slate-500/60">Included by default.</span>
                    </h2>
                    <p className="text-slate-600 font-body">Most agencies charge extra for quality. We consider it the baseline.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-surface-muted p-8 rounded-3xl hover:shadow-xl hover:shadow-brand-secondary/5 transition-all duration-300 group border border-transparent hover:border-slate-200">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-secondary mb-6 group-hover:bg-brand-secondary group-hover:text-white transition-colors border border-slate-200">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-brand-ink mb-3 font-heading">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm font-body">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
