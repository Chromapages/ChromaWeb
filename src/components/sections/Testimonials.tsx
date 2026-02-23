"use client";

const testimonials = [
  {
    quote: "Chromapages transformed our digital presence. The results speak for themselves — a 240% increase in conversions within 3 months.",
    name: "Sarah Chen",
    role: "VP of Product",
    company: "FinTech Solutions",
  },
  {
    quote: "Working with Chromapages was a revelation. They don't just design — they engineer experiences that drive business outcomes.",
    name: "Marcus Webb",
    role: "CEO",
    company: "Scale Ventures",
  },
  {
    quote: "The attention to detail is unmatched. Every interaction feels intentional, every pixel serves a purpose. True Swiss precision.",
    name: "Elena Rodriguez",
    role: "Head of Design",
    company: "Global Systems",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-[var(--color-swiss-bg)] border-b border-[var(--color-swiss-border)]">
      <div className="container-swiss">
        <div className="mb-16">
          <div className="text-sm font-bold tracking-widest text-[var(--color-swiss-teal)] mb-4">
            TRUST SIGNALS
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">
            What Clients<br />Say.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-swiss-border)] border border-[var(--color-swiss-border)]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 md:p-12 bg-[var(--color-swiss-bg)] hover:bg-white transition-swiss"
            >
              <div className="text-6xl font-bold text-[var(--color-swiss-teal)] leading-none mb-6">
                &ldquo;
              </div>
              <p className="text-lg text-[var(--color-swiss-black)] mb-8 leading-relaxed">
                {testimonial.quote}
              </p>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-swiss-black)]">
                  {testimonial.name}
                </div>
                <div className="text-sm text-[var(--color-swiss-black)]/50 mt-1">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
