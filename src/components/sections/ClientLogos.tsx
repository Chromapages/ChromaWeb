"use client";

const clients = [
  { name: "Stripe", logo: "S" },
  { name: "Linear", logo: "L" },
  { name: "Vercel", logo: "V" },
  { name: "Notion", logo: "N" },
  { name: "Figma", logo: "F" },
  { name: "Slack", logo: "S" },
  { name: "Webflow", logo: "W" },
  { name: "Framer", logo: "F" },
];

const clientsRow2 = [
  { name: "Airtable", logo: "A" },
  { name: "Typeform", logo: "T" },
  { name: "Intercom", logo: "I" },
  { name: "Monday", logo: "M" },
  { name: "Zapier", logo: "Z" },
  { name: "Shopify", logo: "S" },
  { name: "Calendly", logo: "C" },
  { name: "Hotjar", logo: "H" },
];

export function ClientLogos() {
  return (
    <section className="py-12 bg-[#FAFAFA] border-y border-[var(--color-swiss-border)] overflow-hidden">
      <div className="mb-8">
        <div className="flex animate-marquee gap-16 items-center">
          {[...clients, ...clients, ...clients].map((client, i) => (
            <div
              key={`row1-${i}`}
              className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="w-10 h-10 rounded bg-[var(--color-swiss-black)] flex items-center justify-center text-white font-bold text-lg">
                {client.logo}
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-[var(--color-swiss-black)]">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex animate-marquee-reverse gap-16 items-center">
          {[...clientsRow2, ...clientsRow2, ...clientsRow2].map((client, i) => (
            <div
              key={`row2-${i}`}
              className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="w-10 h-10 rounded bg-[var(--color-swiss-indigo)] flex items-center justify-center text-white font-bold text-lg">
                {client.logo}
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-[var(--color-swiss-black)]">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
