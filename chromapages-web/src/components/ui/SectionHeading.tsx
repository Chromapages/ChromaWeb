import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
}

export function SectionHeading({
    label,
    title,
    description,
    align = "center",
    className,
    ...props
}: SectionHeadingProps) {
    return (
        <div
            className={cn(
                "mb-12 md:mb-16",
                align === "center" && "text-center",
                className
            )}
            {...props}
        >
            {label && (
                <span className="text-mono-label text-[var(--brand-accent)] mb-4 block">
                    {label}
                </span>
            )}
            <h2 className="heading-section text-3xl md:text-4xl text-[var(--brand-ink)] mb-6">
                {title}
            </h2>
            {description && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}
