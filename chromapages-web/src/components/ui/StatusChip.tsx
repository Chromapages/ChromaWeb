import React from "react";
import { cn } from "@/lib/utils";

type Status = "operational" | "warning" | "error" | "loading" | "neutral";

interface StatusChipProps {
    status?: Status;
    label: string;
    pulse?: boolean;
    className?: string;
}

const statusConfig = {
    operational: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    error: "bg-red-50 text-red-700 border-red-200",
    loading: "bg-blue-50 text-blue-700 border-blue-200",
    neutral: "bg-gray-50 text-gray-700 border-gray-200",
};

const dotColor = {
    operational: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
    loading: "bg-blue-500",
    neutral: "bg-gray-500",
};

export function StatusChip({ status = "neutral", label, pulse = false, className }: StatusChipProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider",
                statusConfig[status],
                className
            )}
        >
            <span
                className={cn(
                    "w-2 h-2 rounded-full",
                    dotColor[status],
                    pulse && "animate-pulse"
                )}
            />
            {label}
        </div>
    );
}
