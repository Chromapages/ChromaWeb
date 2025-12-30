
export function FAQSection() {
    return (
        <section className="py-24 bg-surface-base">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold font-heading text-brand-ink mb-12 text-center">Common Questions</h2>

                <div className="space-y-4">
                    {/* Q1 */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                        <h4 className="font-bold text-brand-ink mb-2 font-heading">How long does a typical website take?</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">Marketing websites usually take 4-6 weeks from discovery to launch. E-commerce and Web App timelines vary based on complexity, typically ranging from 8-12 weeks.</p>
                    </div>
                    {/* Q2 */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                        <h4 className="font-bold text-brand-ink mb-2 font-heading">Do you work with existing codebases?</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">Yes, we can audit and improve existing React, Next.js, or Shopify implementations. However, for legacy systems (Wordpress/PHP), we often recommend a rebuild for performance.</p>
                    </div>
                    {/* Q3 */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                        <h4 className="font-bold text-brand-ink mb-2 font-heading">What is your tech stack?</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">We specialize in the modern JAMstack: React, Next.js, Tailwind CSS, and Typescript. For CMS we prefer Sanity or Strapi. For E-commerce, we are Shopify Experts.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
