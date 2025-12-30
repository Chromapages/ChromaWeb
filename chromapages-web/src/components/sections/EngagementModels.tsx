
export function EngagementModels() {
    return (
        <section className="py-24 bg-white border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <span className="text-brand-primary text-sm tracking-wide uppercase mb-4 block font-heading font-bold">— Engagement Models</span>
                        <h2 className="text-4xl text-brand-ink font-heading font-bold">How we partner with you.</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Card 1 */}
                    <div className="p-8 rounded-[2rem] border border-slate-200 bg-surface-muted flex flex-col hover:shadow-lg transition-shadow">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-brand-ink mb-4">Most Popular</span>
                            <h3 className="text-2xl font-bold font-heading text-brand-ink">Project Based</h3>
                            <p className="text-slate-500 mt-2 font-body">Perfect for new builds, redesigns, or specific feature launches with a clear scope.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-slate-700">
                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-brand-primary">✓</div>
                                Fixed timeline and budget
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-700">
                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-brand-primary">✓</div>
                                Clear deliverables
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-700">
                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-brand-primary">✓</div>
                                30-day post-launch support
                            </li>
                        </ul>
                        <a href="#" className="w-full py-4 rounded-xl border border-slate-300 text-center font-semibold text-brand-ink hover:bg-white hover:border-brand-primary transition-colors">Get A Quote</a>
                    </div>

                    {/* Card 2 */}
                    <div className="p-8 rounded-[2rem] bg-brand-ink text-white flex flex-col shadow-2xl">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-brand-primary text-xs font-bold text-white mb-4">Long Term</span>
                            <h3 className="text-2xl font-bold font-heading">Growth Retainer</h3>
                            <p className="text-slate-400 mt-2 font-body">For companies that need continuous improvements, landing pages, and A/B testing.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-brand-primary">✓</div>
                                Dedicated design & dev hours
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-brand-primary">✓</div>
                                Priority turnaround (48h)
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-brand-primary">✓</div>
                                Monthly strategy calls
                            </li>
                        </ul>
                        <a href="#" className="w-full py-4 rounded-xl bg-brand-primary text-center font-semibold text-white hover:bg-brand-accent transition-colors">Apply for Retainer</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
