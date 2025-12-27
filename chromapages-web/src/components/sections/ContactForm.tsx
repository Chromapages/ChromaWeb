"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    return (
        <section className="relative z-10 max-w-3xl mx-auto px-6 py-24" id="contact">
            <SectionHeading
                label="Start Your Project"
                title="Let's Build Something Great"
                description="Tell us about your project, timeline, and budget. We'll get back to you within 24 hours."
            />

            <GlassCard className="p-8 md:p-10">
                {isSuccess ? (
                    <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="heading-section text-2xl text-[var(--brand-ink)] mb-4">
                            Message Received!
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                            Thanks for reaching out. A member of our team will review your project and be in touch shortly.
                        </p>
                        <Button onClick={() => setIsSuccess(false)} variant="secondary">
                            Send Another Message
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="First Name" placeholder="Jane" required />
                            <Input label="Last Name" placeholder="Doe" required />
                        </div>

                        <Input label="Email Address" type="email" placeholder="jane@company.com" required />

                        <div className="space-y-2">
                            <label className="text-sm font-heading font-bold text-[var(--brand-ink)] ml-1">
                                Project Details
                            </label>
                            <textarea
                                className="w-full bg-white/50 border border-[var(--brand-primary)]/10 rounded-xl px-4 py-3 text-[var(--brand-ink)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] transition-all font-medium backdrop-blur-sm min-h-[120px]"
                                placeholder="Tell us about your goals..."
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            isLoading={isSubmitting}
                            rightIcon={<Send className="w-4 h-4" />}
                        >
                            Send Message
                        </Button>

                        <p className="text-center text-xs text-gray-400">
                            We respect your privacy. No spam, ever.
                        </p>
                    </form>
                )}
            </GlassCard>
        </section>
    );
}
