import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
        // Base Swiss styles: sharp, high contrast, smooth transitions
        const baseStyles = "inline-flex items-center justify-center font-medium transition-swiss focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-swiss-teal)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

        const variants = {
            primary: "bg-[var(--color-swiss-indigo)] text-white hover:bg-[#1a1a5e]",
            secondary: "bg-[var(--color-swiss-teal)] text-white hover:bg-[#1a516e]",
            outline: "border border-[var(--color-swiss-black)] text-[var(--color-swiss-black)] hover:bg-[var(--color-swiss-black)] hover:text-white",
            ghost: "text-[var(--color-swiss-black)] hover:bg-[var(--color-swiss-border)]",
        };

        const sizes = {
            sm: "h-9 px-4 text-xs",
            md: "h-11 px-6 text-sm",
            lg: "h-14 px-8 text-base",
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
