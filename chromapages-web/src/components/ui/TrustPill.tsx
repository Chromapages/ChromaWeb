import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustPillProps {
    rating?: string;
    reviewCount?: string;
    source?: string;
    className?: string;
}

export function TrustPill({
    rating = "4.9",
    reviewCount = "6000+",
    source = "Trustpilot",
    className
}: TrustPillProps) {
    return (
        <div className={cn(
            "inline-flex items-center gap-2 bg-white/60 border border-slate-200/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm",
            className
        )}>
            <div className="flex text-brand-accent">
                <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-sm font-medium text-slate-600">
                <span className="text-slate-900 font-bold">{rating}</span> ({reviewCount}) by {source}
            </span>
        </div>
    );
}
