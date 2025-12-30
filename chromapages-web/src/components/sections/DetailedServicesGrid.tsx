import Link from "next/link";

export function DetailedServicesGrid() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto -mt-10 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Service 1: Marketing Sites */}
                <div className="animate-fade-in-up delay-300 bg-white rounded-[2rem] p-10 border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-brand-primary/30 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-8 text-brand-primary group-hover:scale-110 transition-transform duration-500">
                        {/* Replaced Iconify with Lucide/Inline SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" opacity=".5"></path><path fill="currentColor" d="M15 9h-6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-brand-ink font-heading mb-4">Marketing Websites</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed font-body">
                        The face of your brand. We design and build responsive, SEO-optimized marketing sites that tell your story and capture leads. We focus on speed, accessibility, and pixel-perfect implementation.
                    </p>

                    <div className="bg-surface-muted rounded-2xl p-6 border border-slate-100">
                        <span className="text-xs font-bold text-brand-ink uppercase tracking-wider mb-4 block font-heading">Deliverables</span>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Custom UI/UX Design (Figma)
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                CMS Integration (Sanity, WordPress, or Webflow)
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Interactive Animations (GSAP / Framer Motion)
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Core Web Vitals Optimization
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Service 2: E-Commerce */}
                <div className="animate-fade-in-up delay-300 bg-white rounded-[2rem] p-10 border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-brand-primary/30 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-8 text-brand-primary group-hover:scale-110 transition-transform duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21.5 6.5a1.5 1.5 0 0 0-1.5-1.5H6.38l-.667-1.334A2.25 2.25 0 0 0 3.7 2.25h-1.2a.75.75 0 0 0 0 1.5h1.2c.456 0 .86.262 1.05.68l3.143 6.914l-1.353 3.608a2.38 2.38 0 0 0 2.227 3.214h10.983a.75.75 0 0 0 0-1.5H8.767a.88.88 0 0 1-.823-1.19l1.107-2.952h9.526a2.25 2.25 0 0 0 2.126-1.541z" opacity=".5"></path><path fill="currentColor" d="M10.5 20.25a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m7.5 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-brand-ink font-heading mb-4">E-Commerce & Shopify</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed font-body">
                        Headless or Liquid-based storefronts designed to sell. We optimize product discovery, cart flow, and mobile checkout to increase Average Order Value (AOV).
                    </p>

                    <div className="bg-surface-muted rounded-2xl p-6 border border-slate-100">
                        <span className="text-xs font-bold text-brand-ink uppercase tracking-wider mb-4 block font-heading">Deliverables</span>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Shopify Plus / 2.0 Theme Development
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Headless Commerce (Hydrogen/Next.js)
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Custom App & API Integrations
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Conversion Rate Optimization (CRO)
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Service 3: Web Apps */}
                <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-brand-primary/30 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-8 text-brand-primary group-hover:scale-110 transition-transform duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12" opacity=".5"></path><path fill="currentColor" d="M8.5 12a1 1 0 0 1 1 1v.5a1 1 0 1 1-2 0V13a1 1 0 0 1 1-1m7 0a1 1 0 0 1 1 1v.5a1 1 0 1 1-2 0V13a1 1 0 0 1 1-1"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-brand-ink font-heading mb-4">Web Applications</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed font-body">
                        Scalable, secure, and robust SaaS products. We build customer portals, internal tools, and dashboards that feel like native apps.
                    </p>

                    <div className="bg-surface-muted rounded-2xl p-6 border border-slate-100">
                        <span className="text-xs font-bold text-brand-ink uppercase tracking-wider mb-4 block font-heading">Deliverables</span>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Full-Stack Development (Next.js / Node)
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Database Architecture (Postgres / Supabase)
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Authentication & User Management
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Payment Gateway Integration (Stripe)
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Service 4: Design Systems */}
                <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-brand-primary/30 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-8 text-brand-primary group-hover:scale-110 transition-transform duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" opacity=".5"></path><path fill="currentColor" d="m15.535 9.536l-4.95 4.95l-2.12-2.122a.75.75 0 0 0-1.06 1.06l2.65 2.652a.75.75 0 0 0 1.06 0l5.48-5.48a.75.75 0 0 0-1.06-1.06"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-brand-ink font-heading mb-4">Design Systems & Branding</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed font-body">
                        Consistency is key to trust. We create comprehensive design systems and brand identities that ensure your product looks professional across every touchpoint.
                    </p>

                    <div className="bg-surface-muted rounded-2xl p-6 border border-slate-100">
                        <span className="text-xs font-bold text-brand-ink uppercase tracking-wider mb-4 block font-heading">Deliverables</span>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Visual Identity (Logo, Typography, Color)
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Component Libraries (Figma Variables)
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Interactive Prototypes
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                                <svg class="w-5 h-5 text-brand-primary shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.172l9.192-9.193l1.415 1.414L10 18l-6.364-6.364l1.414-1.414z"></path></svg>
                                Brand Guidelines Documentation
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
