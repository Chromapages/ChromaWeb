"use client";

import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

const FAQS: FAQItem[] = [
    {
        question: "What's included in the design system?",
        answer: "Every project includes a comprehensive design system with component libraries, typography scales, color palettes, spacing systems, and documentation. This ensures consistency across all pages and makes future updates straightforward."
    },
    {
        question: "How do revisions work?",
        answer: "Each plan includes a set number of revision rounds. Standard includes 2 rounds, Retainer includes unlimited revisions during the sprint, and Enterprise includes unlimited revisions throughout the project. Additional rounds can be purchased if needed."
    },
    {
        question: "Can I upgrade my plan?",
        answer: "Absolutely. You can upgrade at any time. We'll prorate the difference and the new features will be available immediately. Downgrades are also possible at the end of your billing cycle."
    },
    {
        question: "Do you offer maintenance?",
        answer: "Yes! The Retainer plan includes ongoing maintenance. We also offer a separate maintenance package for Standard and Enterprise clients at $500/month, covering security updates, performance monitoring, and minor content changes."
    },
    {
        question: "What's the payment schedule?",
        answer: "For one-time projects, we require 50% upfront to begin work and 50% upon completion before deployment. For Retainer clients, we invoice monthly in advance. Enterprise clients can discuss net-30 terms."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 border-b border-[var(--color-swiss-border)]">
            <div className="container-swiss">
                <div className="swiss-grid">
                    <div className="col-span-12 lg:col-span-4">
                        <h2 className="text-2xl font-bold tracking-tighter uppercase mb-4">Questions</h2>
                        <p className="text-[var(--color-muted)]">Common questions about our process and pricing.</p>
                    </div>
                    <div className="col-span-12 lg:col-span-8">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="border-b border-[var(--color-swiss-border)]">
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full py-6 flex items-center justify-between text-left hover:text-[var(--color-swiss-teal)] transition-swiss"
                                >
                                    <span className="font-bold uppercase tracking-wider">{faq.question}</span>
                                    <span className="text-2xl font-light text-[var(--color-swiss-teal)]">
                                        {openIndex === i ? "−" : "+"}
                                    </span>
                                </button>
                                <div 
                                    className={`overflow-hidden transition-all duration-300 ${
                                        openIndex === i ? "max-h-40 pb-6" : "max-h-0"
                                    }`}
                                >
                                    <p className="text-[var(--color-muted)] leading-relaxed">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
