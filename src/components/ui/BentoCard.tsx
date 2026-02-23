import * as React from "react";

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

export const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
    ({ className = "", hoverEffect = true, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`bento-cell p-8 flex flex-col transition-swiss ${hoverEffect ? "hover:bg-white hover:shadow-[unset] hover:ring-1 hover:ring-[var(--color-swiss-teal)] cursor-pointer" : ""
                    } ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);
BentoCard.displayName = "BentoCard";
