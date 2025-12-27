"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const navLinks = [
        { label: "Services", href: "/services" },
        { label: "System", href: "/system" },
        { label: "Work", href: "/work" },
        { label: "Pricing", href: "/pricing" },
    ];

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled
                        ? "py-4 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm"
                        : "py-6 bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative z-50">
                        <span className={cn(
                            "font-heading font-extrabold text-2xl tracking-tight transition-colors",
                            scrolled ? "text-[var(--brand-ink)]" : "text-[var(--brand-primary)]"
                        )}>
                            Chromapages
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex gap-6 card px-6 py-2 rounded-full glass-panel bg-white/50">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-[var(--brand-primary)]",
                                        pathname.startsWith(link.href)
                                            ? "text-[var(--brand-primary)] font-bold"
                                            : "text-[var(--brand-ink)]/70"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <Link href="/contact">
                            <Button size="sm" className="hidden lg:inline-flex">
                                Book A Call
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative z-50 p-2 text-[var(--brand-ink)]"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-[var(--brand-base)]/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col justify-center items-center gap-8",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="flex flex-col items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-3xl font-heading font-bold text-[var(--brand-primary)]"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/contact" className="mt-8">
                        <Button size="lg">Book A Call</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
