
export function ServicesCTA() {
    return (
        <div className="mb-0 pr-6 pb-6 pl-6 bg-surface-base">
            <div className="lg:p-24 overflow-hidden group text-center bg-white max-w-7xl mx-auto py-12 px-6 relative border border-slate-200 rounded-[2rem] shadow-2xl">
                <h2 className="text-4xl lg:text-6xl font-heading mb-6 relative z-10 text-brand-ink font-bold">Ready to start?</h2>
                <p className="text-slate-500 text-lg max-w-xl mx-auto mb-10 relative z-10 font-body">
                    Schedule a discovery call to discuss your project. No pressure, just a conversation about your goals.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
                    <a href="#" className="px-8 py-4 bg-brand-primary rounded-full font-semibold text-lg hover:bg-brand-accent transition-colors shadow-lg text-white">
                        Book Discovery Call
                    </a>
                </div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-primary rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity bg-blue-300 pointer-events-none"></div>
            </div>
        </div>
    );
}
