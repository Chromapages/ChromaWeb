import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, LucideIcon, Square, Zap, TrendingUp, Shield } from "lucide-react";
import * as Icons from "lucide-react";

export interface BentoCardProps {
    title: string;
    description?: string;
    variant?: "standard" | "featured" | "gradient" | "stat";
    span?: "1x1" | "2x1" | "1x2" | "2x2";
    iconName?: string;
    imageUrl?: string;
    stat?: {
        value: string;
        label: string;
        trend?: "up" | "down" | "neutral";
    };
    cta?: {
        label: string;
        href: string;
    };
    className?: string;
}

export function BentoCard({
    title,
    description,
    variant = "standard",
    span = "1x1",
    iconName,
    imageUrl,
    stat,
    cta,
    className,
}: BentoCardProps) {

    // Resolve Icon
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = iconName ? (Icons as any)[iconName] || Square : Square;

    // Span Classes
    const spanClasses = {
        "1x1": "col-span-1 row-span-1",
        "2x1": "col-span-1 md:col-span-2 row-span-1",
        "1x2": "col-span-1 row-span-2",
        "2x2": "col-span-1 md:col-span-2 row-span-2",
    };

    // Variant Classes
    const variantClasses = {
        standard: "bg-surface-card border-slate-100 hover:border-slate-200",
        featured: "bg-surface-base border-transparent overflow-hidden",
        gradient: "bg-gradient-to-br from-slate-900 to-slate-800 text-white border-transparent",
        stat: "bg-surface-card border-slate-100 flex-col justify-center",
    };

    return (
        <div className={cn(
            "group relative rounded-3xl p-6 md:p-8 border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col",
            spanClasses[span],
            variantClasses[variant],
            className
        )}>
            {/* Background Image for Featured */}
            {variant === "featured" && imageUrl && (
                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
            )}

            <div className="relative z-10 flex flex-col h-full">
                {/* Icon Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                        variant === "gradient" ? "bg-white/10 text-white" : "bg-brand-primary/5 text-brand-primary"
                    )}>
                        <IconComponent className="w-5 h-5" />
                    </div>
                </div>

                {/* Content */}
                <div className="mt-auto">
                    {variant === "stat" && stat ? (
                        <div className="mb-2">
                            <div className="text-4xl font-bold font-mono tracking-tight text-slate-900 mb-1">
                                {stat.value}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1",
                                    stat.trend === "down" ? "bg-red-50 text-red-600" : "bg-brand-accent/10 text-brand-accent"
                                )}>
                                    {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
                                    {stat.label}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 className={cn(
                                "text-lg font-bold mb-2",
                                variant === "gradient" ? "text-white" : "text-slate-900"
                            )}>
                                {title}
                            </h3>
                            {description && (
                                <p className={cn(
                                    "text-sm leading-relaxed mb-4",
                                    variant === "gradient" ? "text-slate-200" : "text-slate-500"
                                )}>
                                    {description}
                                </p>
                            )}
                        </>
                    )}

                    {/* CTA */}
                    {cta && (
                        <Link href={cta.href} className={cn(
                            "inline-flex items-center text-sm font-medium mt-2 group/btn",
                            variant === "gradient" ? "text-white hover:text-brand-accent" : "text-brand-primary hover:text-brand-secondary"
                        )}>
                            {cta.label}
                            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
