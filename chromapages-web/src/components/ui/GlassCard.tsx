import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
    intensity?: "low" | "medium" | "high"; // Controls transparency/blur if we want variation
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, hoverEffect = true, intensity = "medium", children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "glass-panel rounded-3xl p-8 relative overflow-hidden",
                    hoverEffect && "group cursor-pointer hover:bg-white hover:border-[var(--brand-accent)] hover:shadow-[var(--shadow-colored)]",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
