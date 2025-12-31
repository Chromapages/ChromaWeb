import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Service {
    _id: string;
    title: string;
    shortDescription: string;
    slug: { current: string };
}

interface ServicesOfferProps {
    services?: Service[];
}

export function ServicesOffer({ services }: ServicesOfferProps) {
    const defaultServices = [
        {
            _id: "1",
            title: "Marketing Sites &\nLanding Pages",
            shortDescription: "Lead Generation",
            slug: { current: "marketing-sites" }
        },
        {
            _id: "2",
            title: "E-Commerce\nBuilds",
            shortDescription: "Shopify & Custom",
            slug: { current: "ecommerce" }
        },
        {
            _id: "3",
            title: "Web Apps &\nMVPs",
            shortDescription: "Portals & Tools",
            slug: { current: "web-apps" }
        },
        {
            _id: "4",
            title: "Retainers &\nSupport",
            shortDescription: "Ongoing Growth",
            slug: { current: "retainers" }
        }
    ];

    const displayServices = services?.length ? services : defaultServices;

    return (
        <section className="py-24 px-6 max-w-[1440px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div className="pl-4 lg:pl-12">
                    <h2 className="text-3xl lg:text-4xl font-medium text-brand-ink tracking-tight mb-4 leading-[1.2] font-heading">
                        Offer Architecture. <span className="text-slate-500/60">Clear packages for your needs.</span>
                    </h2>

                    <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 mt-6 mb-12 rounded-full bg-brand-primary text-white font-medium hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20">
                        Get a Quote <ArrowRight className="w-4 h-4" />
                    </Link>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {displayServices.map((service, index) => (
                            <Link href={`/services/${service.slug.current}`} key={service._id}>
                                <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-brand-secondary transition-colors group cursor-pointer h-full">
                                    <span className="text-xs font-semibold text-slate-500/60 mb-3 block font-mono">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <h4 className="text-lg font-semibold text-brand-ink mb-6 group-hover:text-brand-secondary transition-colors font-heading whitespace-pre-line">
                                        {service.title}
                                    </h4>
                                    <span className="text-xs font-semibold text-brand-primary border-b border-brand-primary/30 pb-0.5 font-heading">
                                        {service.shortDescription}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Image */}
                <div className="h-[700px] rounded-[2.5rem] overflow-hidden relative border border-slate-200 shadow-2xl">
                    <Image
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
                        alt="Web Development"
                        fill
                        className="object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/40 to-transparent"></div>
                </div>
            </div>
        </section>
    );
}
