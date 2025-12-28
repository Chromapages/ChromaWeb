"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

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
                    "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
                    scrolled
                        ? "bg-brand-base/80 backdrop-blur-xl border-brand-accent/20 shadow-sm"
                        : "bg-brand-base/60 backdrop-blur-sm border-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                                <span className="text-white font-heading font-bold text-sm">C</span>
                            </div>
                            <span className="font-heading font-bold text-xl tracking-tight text-brand-primary">
                                Chromapages
                            </span>
                        </Link>
                    </div>

                    {/* Right Side: Navigation & CTA */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Desktop Nav Links */}
                        <div className="flex items-center gap-1 bg-white/50 backdrop-blur-md rounded-full px-1.5 py-1.5 border border-white/50 shadow-sm">
                            {navLinks.map((link) => {
                                const isActive = pathname.startsWith(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                            isActive
                                                ? "bg-white text-brand-primary shadow-sm font-semibold"
                                                : "text-brand-ink/70 hover:text-brand-primary hover:bg-white/50"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* CTA Button */}
                        <Link
                            href="/contact"
                            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 flex items-center gap-2 group transform active:scale-95 border border-brand-accent/20"
                        >
                            GET STARTED
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-brand-primary hover:bg-brand-primary/5 rounded-full transition-colors"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-brand-base/98 backdrop-blur-3xl transition-all duration-500 md:hidden flex flex-col pt-24",
                    isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
                )}
            >
                <div className="flex flex-col items-center gap-6 px-6 w-full max-w-sm mx-auto">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-heading font-semibold text-brand-primary w-full text-center py-4 border-b border-brand-primary/10 transition-all hover:text-brand-accent active:scale-95"
                            style={{ transitionDelay: `${i * 50}ms` }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-4 w-full mt-8">
                        <Link href="/contact" className="w-full" onClick={() => setIsOpen(false)}>
                            <button className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold tracking-wide shadow-xl flex items-center justify-center gap-2 border border-brand-accent/20">
                                GET STARTED
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
