"use client";

import Link from "next/link";
import { ArrowRight, Monitor, ShoppingCart, Code2, ShieldCheck, LucideIcon } from "lucide-react";
import Image from "next/image";

interface Service {
    _id: string;
    title: string;
    shortDescription: string;
    slug: { current: string };
    icon: string;
    description?: string; // Add optional description
}

interface ServicesListProps {
    services?: Service[];
}

// Icon mapping helper
const getIcon = (iconName: string): LucideIcon => {
    switch (iconName) {
        case "Monitor": return Monitor;
        case "ShoppingCart": return ShoppingCart;
        case "Code2": return Code2;
        case "ShieldCheck": return ShieldCheck;
        default: return Monitor; // Fallback
    }
};

export function ServicesList({ services }: ServicesListProps) {
    const defaultServices = [
        {
            _id: "1",
            title: "Marketing Websites",
            shortDescription: "High-performance landing pages designed to capture leads and build brand authority. optimized for SEO and conversion.",
            description: "Full description fallback...",
            slug: { current: "marketing-websites" },
            icon: "Monitor"
        },
        {
            _id: "2",
            title: "E-Commerce Builds",
            shortDescription: "Custom Shopify builds that maximize AOV and LTV. Frictionless checkout flows and premium product presentation.",
            description: "Full description fallback...",
            slug: { current: "ecommerce" },
            icon: "ShoppingCart"
        },
        {
            _id: "3",
            title: "Web Applications",
            shortDescription: "Scalable SaaS dashboards and MVPs built with Next.js. Complex logic wrapped in intuitive UI.",
            description: "Full description fallback...",
            slug: { current: "web-apps" },
            icon: "Code2"
        },
        {
            _id: "4",
            title: "Ongoing Support",
            shortDescription: "We don't leave you hanging. Updates, fixes, performance improvements, and growth.",
            description: "Full description fallback...",
            slug: { current: "support" },
            icon: "ShieldCheck"
        }
    ];

    const displayServices = services?.length ? services : defaultServices;

    return (
        <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayServices.map((service) => {
                        // Decide Icon based on string name if from CMS, or object if from default (simplified here to string for both)
                        // For now assuming CMS returns icon string name like "Monitor"
                        const IconComponent = getIcon(service.icon);

                        return (
                            <Link
                                key={service._id}
                                href={`/services/${service.slug.current}`}
                                className="group bg-white border border-slate-200 rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-8 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                                    <IconComponent size={28} />
                                </div>

                                <h3 className="text-2xl font-bold text-brand-ink font-heading mb-4 group-hover:text-brand-primary transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-slate-500 leading-relaxed mb-8 flex-grow font-body text-lg font-light">
                                    {service.shortDescription || service.description}
                                </p>

                                <div className="flex items-center gap-2 text-brand-secondary font-medium mt-auto group-hover:translate-x-1 transition-transform">
                                    Learn More
                                    <ArrowRight size={18} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
