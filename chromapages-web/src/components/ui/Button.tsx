import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const variants = {
            primary: "btn-primary", // Defined in globals.css
            secondary: "btn-secondary", // Defined in globals.css
            ghost:
                "bg-transparent text-[var(--brand-ink)] hover:bg-[var(--brand-base)] hover:text-[var(--brand-primary)] transition-colors font-heading font-bold rounded-xl",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-8 py-4 text-base",
            lg: "px-10 py-5 text-lg",
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={cn(
                    "inline-flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:pointer-events-none active:scale-95",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {!isLoading && leftIcon}
                {children}
                {!isLoading && rightIcon}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
