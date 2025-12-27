import { Quote } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";

// Define a type for the Sanity testimonial structure
interface SanityTestimonial {
    _id: string;
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: any; // Using any for Sanity image object simplicity
}

interface TestimonialsSliderProps {
    testimonials?: SanityTestimonial[];
}

export function TestimonialsSlider({ testimonials = [] }: TestimonialsSliderProps) {
    // If no testimonials provided, don't render section
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 bg-[var(--brand-base)]">
            <SectionHeading
                label="Social Proof"
                title="Trusted by Growth Leaders"
                align="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <GlassCard key={testimonial._id} className="h-full flex flex-col hover:border-[var(--brand-primary)]/30">
                        <Quote className="w-8 h-8 text-[var(--brand-primary)]/20 mb-6" />

                        <p className="text-gray-700 leading-relaxed mb-8 flex-grow font-medium">
                            &quot;{testimonial.quote}&quot;
                        </p>

                        <div className="flex items-center gap-4 mt-auto border-t border-[var(--brand-primary)]/5 pt-6">
                            {testimonial.avatar && (
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white shadow-sm">
                                    <Image
                                        src={urlFor(testimonial.avatar).height(96).width(96).url()}
                                        alt={testimonial.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <div>
                                <div className="font-heading font-bold text-[var(--brand-ink)]">
                                    {testimonial.author}
                                </div>
                                <div className="text-xs font-mono text-gray-500 uppercase tracking-tight">
                                    {testimonial.role}
                                    {testimonial.company && <span className="text-[var(--brand-accent)]"> @ {testimonial.company}</span>}
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
