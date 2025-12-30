
export function ProcessPrinciples() {
    return (
        <section className="py-24 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-brand-ink font-heading mb-4">Our Principles</h2>
                    <p className="text-slate-500 font-body">The core values that guide our process and ensure quality deliverables.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-surface-muted border border-slate-200">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0c1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659c-1.106-.879-1.106-2.303 0-3.182c1.108-.879 2.901-.879 4.006 0l.497.325" /></svg>
                        </div>
                        <h4 className="font-bold text-brand-ink font-heading mb-2">Transparency</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">No hidden fees or surprise delays. You get access to our project board (Linear/Trello) to see progress in real-time.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-surface-muted border border-slate-200">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0a9 9 0 0 1 18 0" /></svg>
                        </div>
                        <h4 className="font-bold text-brand-ink font-heading mb-2">Agile Sprints</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">We work in 1-2 week sprints. This allows for rapid iteration and ensures we are always building what you actually need.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-surface-muted border border-slate-200">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 12l2 2l4-4m6 2a9 9 0 1 1-18 0a9 9 0 0 1 18 0" /></svg>
                        </div>
                        <h4 className="font-bold text-brand-ink font-heading mb-2">Quality First</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">We don't cut corners. Every line of code and pixel of design is reviewed to meet high industry standards.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
