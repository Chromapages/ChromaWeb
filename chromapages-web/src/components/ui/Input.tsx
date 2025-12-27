import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, leftIcon, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-heading font-bold text-[var(--brand-ink)] ml-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            "w-full bg-white/50 border border-[var(--brand-primary)]/10 rounded-xl px-4 py-3 text-[var(--brand-ink)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] transition-all font-medium backdrop-blur-sm",
                            leftIcon && "pl-12",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-200",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && <p className="text-xs text-red-500 font-medium ml-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
