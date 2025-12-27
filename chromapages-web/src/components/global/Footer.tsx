import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: "Services",
            links: [
                { label: "Marketing Websites", href: "/services/marketing-websites" },
                { label: "E-Commerce", href: "/services/ecommerce" },
                { label: "Web Applications", href: "/services/web-apps" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "The System", href: "/system" },
                { label: "Work", href: "/work" },
                { label: "Pricing", href: "/pricing" },
                { label: "Contact", href: "/contact" },
            ],
        },
        {
            title: "Connect",
            links: [
                { label: "Twitter / X", href: "https://twitter.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "Instagram", href: "https://instagram.com" },
            ],
        },
    ];

    return (
        <footer className="relative bg-[var(--brand-void)] text-white pt-20 pb-10 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[var(--brand-primary)] rounded-full blur-[120px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="font-heading font-extrabold text-2xl tracking-tight">
                                Chromapages
                            </span>
                        </Link>
                        <p className="text-white/60 text-lg leading-relaxed max-w-sm">
                            Digital Design Elevated. We merge premium aesthetics with engineering-grade speed.
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                                All Systems Operational
                            </span>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {footerLinks.map((group) => (
                            <div key={group.title} className="space-y-6">
                                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                                    {group.title}
                                </h4>
                                <ul className="space-y-4">
                                    {group.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="group flex items-center text-white/80 hover:text-white transition-colors"
                                            >
                                                {link.label}
                                                <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
                    <p>© {currentYear} Chromapages. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
