import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "accent" | "outline";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className = "", variant = "default", children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-swiss";

        const variants = {
            default: "bg-[var(--color-swiss-black)] text-white",
            accent: "bg-[var(--color-swiss-teal)] text-white",
            outline: "border border-[var(--color-swiss-border)] text-[var(--color-swiss-black)]",
        };

        return (
            <div
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Badge.displayName = "Badge";
