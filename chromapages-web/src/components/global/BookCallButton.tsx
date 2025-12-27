"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookCallButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 100px
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={cn(
                "fixed bottom-6 left-6 right-6 z-50 md:hidden transition-all duration-300 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            )}
        >
            <Link href="/contact" className="block shadow-xl shadow-[var(--brand-primary)]/20 rounded-xl">
                <Button className="w-full text-lg shadow-none" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
                    Book A Call
                </Button>
            </Link>
        </div>
    );
}
