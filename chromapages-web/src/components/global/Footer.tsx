import Link from "next/link";
import { Check, ArrowUpRight, Linkedin, Twitter, Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-brand-ink text-white pt-24 pb-12 px-6">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 border-b border-gray-800 pb-20 mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-8 font-heading">
                            Launch with confidence.<br />
                            <span className="text-gray-500">Then keep improving.</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-8">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-white">
                                    <Check className="w-3.5 h-3.5 stroke-[3px]" />
                                </div>
                                <span className="text-sm font-medium text-gray-300">Launch-ready with QA</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-white">
                                    <Check className="w-3.5 h-3.5 stroke-[3px]" />
                                </div>
                                <span className="text-sm font-medium text-gray-300">Clear tracking & analytics</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-6">
                        <p className="text-gray-400 text-sm max-w-xs font-body">
                            Chromapages builds fast, modern websites and web apps that look premium and turn visitors into customers.
                        </p>
                        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-brand-ink font-semibold hover:bg-surface-base transition-colors font-heading">
                            Book A Call <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <span className="text-lg font-semibold tracking-tight text-brand-primary font-heading">Chroma</span>
                            <span className="text-lg font-semibold tracking-tight text-white font-heading">pages</span>
                        </div>
                    </Link>

                    {/* Links */}
                    <div className="flex gap-8 text-sm font-medium text-gray-400">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                        <Link href="/process" className="hover:text-white transition-colors">Process</Link>
                        <Link href="/work" className="hover:text-white transition-colors">Work</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
                        <Link href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-all">
                            <Linkedin className="w-4 h-4" />
                        </Link>
                        <Link href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-all">
                            <Twitter className="w-4 h-4" />
                        </Link>
                        <Link href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-all">
                            <Github className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-900 text-xs text-gray-500 font-body">
                    <p>&copy; 2025 Chromapages. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
                        <a href="https://chromapages.sanity.studio/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">CMS</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
