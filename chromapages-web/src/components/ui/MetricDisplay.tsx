import React from "react";
import { cn } from "@/lib/utils";

interface MetricDisplayProps {
    value: string;
    label: string;
    trend?: string; // e.g. "+12%"
    trendDirection?: "up" | "down" | "neutral";
}

export function MetricDisplay({ value, label, trend, trendDirection = "neutral" }: MetricDisplayProps) {
    return (
        <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
                <span className="font-mono text-4xl font-bold text-[var(--brand-primary)]">
                    {value}
                </span>
                {trend && (
                    <span
                        className={cn(
                            "text-xs font-bold px-2 py-0.5 rounded-full",
                            trendDirection === "up" && "bg-green-100 text-green-700",
                            trendDirection === "down" && "bg-red-100 text-red-700",
                            trendDirection === "neutral" && "bg-gray-100 text-gray-700"
                        )}
                    >
                        {trend}
                    </span>
                )}
            </div>
            <span className="text-mono-label text-[var(--brand-accent)] mt-1">
                {label}
            </span>
        </div>
    );
}
