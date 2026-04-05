import SectionHeading from "@/components/ui/section-heading";
import { differentiators } from "@/lib/site";

export default function Differentiators() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Why Chromapages"
          title="The site is designed to sell the work, not just describe it."
          description="These are the habits that separate a convincing marketing site from a page full of generic claims."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {differentiators.map((item, index) => (
            <article
              key={item._id || `${item.title}-${index}`}
              className="rounded-structural bg-surface-lowest p-7 shadow-ambient"
            >
              <h3 className="font-display text-2xl text-on-surface">{item.title}</h3>
              <p className="mt-4 text-body-lg text-on-surface/72">{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
