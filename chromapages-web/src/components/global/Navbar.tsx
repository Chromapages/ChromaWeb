"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Process", href: "/process" },
        { label: "Work", href: "/work" },
        { label: "FAQ", href: "/faq" },
    ];

    return (
        <>
            <nav
                className={cn(
                    "sticky top-0 z-50 py-4 border-b transition-all duration-300",
                    scrolled
                        ? "bg-surface-base/95 backdrop-blur-md border-[#D7D9E0] shadow-sm"
                        : "bg-surface-base/95 backdrop-blur-sm border-[#D7D9E0]"
                )}
            >
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex items-center gap-1">
                            <span className="text-xl font-semibold tracking-tight text-brand-primary font-heading">Chroma</span>
                            <span className="text-xl font-semibold tracking-tight text-brand-secondary font-heading">pages</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-600">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "transition-colors hover:text-brand-primary",
                                    pathname === link.href ? "text-brand-secondary" : ""
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/work" className="px-5 py-2 rounded-full border border-[#D7D9E0] text-sm font-medium hover:border-brand-secondary hover:text-brand-secondary transition-all bg-white text-slate-700">
                            View Work
                        </Link>
                        <Link href="/contact" className="px-5 py-2 rounded-full bg-brand-secondary text-white text-sm font-medium hover:bg-brand-primary transition-all shadow-lg shadow-brand-secondary/20">
                            Book A Call
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-700">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={cn(
                    "md:hidden absolute top-full left-0 w-full bg-surface-base border-b border-[#D7D9E0] p-6 flex flex-col gap-4 shadow-xl transition-all duration-300 origin-top",
                    isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
                )}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-lg font-medium",
                                pathname === link.href ? "text-brand-secondary" : "text-slate-600"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <hr className="border-[#D7D9E0]" />
                    <div className="flex flex-col gap-3">
                        <Link href="/work" className="w-full py-3 rounded-full border border-[#D7D9E0] font-medium bg-white text-center text-slate-700">
                            View Work
                        </Link>
                        <Link href="/contact" className="w-full py-3 rounded-full bg-brand-secondary text-white font-medium text-center">
                            Book A Call
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}
