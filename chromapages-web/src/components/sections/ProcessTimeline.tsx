
export function ProcessTimeline() {
    return (
        <section className="py-24 px-6 max-w-5xl mx-auto relative z-20">
            <div className="relative space-y-24">
                {/* Vertical Line - Only visible on desktop */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block" aria-hidden="true" />

                {/* Step 1: Discovery */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in-up delay-300">
                    <div className="md:text-right order-2 md:order-1">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary text-white font-bold text-lg mb-6 shadow-lg shadow-brand-primary/30 md:hidden">01</div>
                        <h3 className="text-3xl font-bold text-brand-ink font-heading mb-4">Discovery & Strategy</h3>
                        <p className="text-slate-500 leading-relaxed font-body mb-6">
                            We start by listening. We analyze your competitors, define your audience, and map out the technical requirements. No code is written until we have a blueprint.
                        </p>
                        <ul className="inline-flex flex-col gap-2 md:items-end">
                            <li className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Stakeholder Interviews</li>
                            <li className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Competitive Analysis</li>
                            <li className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Sitemap & Architecture</li>
                        </ul>
                    </div>
                    {/* Center Point */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-[4px] border-brand-primary hidden md:block"></div>

                    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 order-1 md:order-2 hover:-translate-y-1 transition-transform duration-300">
                        <div className="hidden md:flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                            <span className="text-brand-primary font-bold font-heading">Phase 01</span>
                            <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" opacity=".5"></path><path fill="currentColor" d="m11 7l-5 5l5 5v-4h7v-2h-7z" transform="rotate(180 12 12)"></path></svg>
                        </div>
                        <div className="aspect-video bg-surface-muted rounded-xl flex items-center justify-center border border-slate-100 overflow-hidden relative">
                            {/* Decorative abstract visual for Discovery */}
                            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" className="text-brand-primary"><path fill="currentColor" d="M18.944 10.889q.056.275.056.555a7.5 7.5 0 0 1-14.881 1.667a4 4 0 0 1 1.38-7.778A7.47 7.47 0 0 1 12 3c2.476 0 4.673 1.203 6.056 3.056a4.49 4.49 0 0 1 3.444 4.388a4.5 4.5 0 0 1-2.556 4.056" opacity=".5"></path><path fill="currentColor" d="m14 13l-1.35 4.05a1.5 1.5 0 0 1-2.85 0L8.5 13H5l4.65 4.65a1.5 1.5 0 0 0 2.12 0L17.5 13z"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Step 2: Design */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in-up delay-400">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
                        <div className="hidden md:flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                            <span className="text-brand-primary font-bold font-heading">Phase 02</span>
                            <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" opacity=".5"></path><path fill="currentColor" d="m11 7l-5 5l5 5v-4h7v-2h-7z" transform="rotate(180 12 12)"></path></svg>
                        </div>
                        <div className="aspect-video bg-surface-muted rounded-xl flex items-center justify-center border border-slate-100 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-white to-surface-muted"></div>
                            {/* Abstract UI Grid */}
                            <div className="w-3/4 h-3/4 grid grid-cols-2 gap-2 relative">
                                <div className="bg-white rounded-lg shadow-sm border border-slate-200"></div>
                                <div className="bg-brand-primary/10 rounded-lg border border-brand-primary/20"></div>
                                <div className="col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 h-1/2"></div>
                            </div>
                        </div>
                    </div>

                    {/* Center Point */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-[4px] border-brand-primary hidden md:block"></div>

                    <div className="md:text-left">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary text-white font-bold text-lg mb-6 shadow-lg shadow-brand-primary/30 md:hidden">02</div>
                        <h3 className="text-3xl font-bold text-brand-ink font-heading mb-4">Design & Prototyping</h3>
                        <p className="text-slate-500 leading-relaxed font-body mb-6">
                            We move to Figma to design the visual identity. We focus on UX best practices, creating interactive prototypes that look and feel like the final product.
                        </p>
                        <ul className="inline-flex flex-col gap-2">
                            <li className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Wireframing</li>
                            <li className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">High-Fidelity UI</li>
                            <li className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Interaction Design</li>
                        </ul>
                    </div>
                </div>

                {/* Step 3: Development */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in-up delay-500">
                    <div className="md:text-right order-2 md:order-1">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary text-white font-bold text-lg mb-6 shadow-lg shadow-brand-primary/30 md:hidden">03</div>
                        <h3 className="text-3xl font-bold text-brand-ink font-heading mb-4">Development</h3>
                        <p className="text-slate-500 leading-relaxed font-body mb-6">
                            This is where the magic happens. We translate designs into clean, semantic code using modern frameworks. We prioritize speed, accessibility, and scalability.
                        </p>
                        <ul className="inline-flex flex-col gap-2 md:items-end">
                            <li className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Front-end (React/Tailwind)</li>
                            <li className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">CMS Integration</li>
                            <li className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">API Development</li>
                        </ul>
                    </div>
                    {/* Center Point */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-[4px] border-brand-primary hidden md:block"></div>

                    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 order-1 md:order-2 hover:-translate-y-1 transition-transform duration-300">
                        <div className="hidden md:flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                            <span className="text-brand-primary font-bold font-heading">Phase 03</span>
                            <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" opacity=".5"></path><path fill="currentColor" d="m11 7l-5 5l5 5v-4h7v-2h-7z" transform="rotate(180 12 12)"></path></svg>
                        </div>
                        <div className="aspect-video bg-[#0F172A] rounded-xl flex items-center justify-center border border-slate-700 relative overflow-hidden">
                            <div className="w-full h-full p-4 font-mono text-xs text-blue-300 opacity-70 leading-relaxed">
                                <span className="text-purple-400">const</span> <span className="text-yellow-300">Launch</span> = () ={">"} {"{"}<br />
                                &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">Success</span> /&gt;<br />
                                &nbsp;&nbsp;);<br />
                                {"}"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 4: Launch */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in-up delay-500">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
                        <div className="hidden md:flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                            <span className="text-brand-primary font-bold font-heading">Phase 04</span>
                            <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" opacity=".5"></path><path fill="currentColor" d="m11 7l-5 5l5 5v-4h7v-2h-7z" transform="rotate(180 12 12)"></path></svg>
                        </div>
                        <div className="aspect-video bg-surface-muted rounded-xl flex items-center justify-center border border-slate-100 relative overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" className="text-brand-primary"><path fill="currentColor" d="M18.364 4.636a9 9 0 0 1 .2 12.71a10.02 10.02 0 0 0-1.554-1.743a7 7 0 1 0-9.887-9.923A9.95 9.95 0 0 0 5.4 4.097a9 9 0 0 1 12.964.54" opacity=".5"></path><path fill="currentColor" d="M12.002 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m-2.122 4.122a3 3 0 1 1 4.244 1.758a3 3 0 0 1-4.244-1.758"></path></svg>
                        </div>
                    </div>

                    {/* Center Point */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-[4px] border-brand-primary hidden md:block"></div>

                    <div className="md:text-left">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary text-white font-bold text-lg mb-6 shadow-lg shadow-brand-primary/30 md:hidden">04</div>
                        <h3 className="text-3xl font-bold text-brand-ink font-heading mb-4">QA & Launch</h3>
                        <p className="text-slate-500 leading-relaxed font-body mb-6">
                            Before going live, we test across all devices and browsers. We handle domain configuration, SEO setup, and analytics integration to ensure a smooth liftoff.
                        </p>
                        <ul className="inline-flex flex-col gap-2">
                            <li className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Browser Testing</li>
                            <li className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Performance Optimization</li>
                            <li className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">Training & Handoff</li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
}
