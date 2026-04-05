import SectionHeading from "@/components/ui/section-heading";
import ServiceCard from "@/components/cards/service-card";
import type { Service } from "@/types/sanity";

type ServicesGridProps = {
  items: Service[];
};

export default function ServicesGrid({ items }: ServicesGridProps) {
  return (
    <section id="services" className="bg-surface-container-low">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Services"
          title="Focused offers for the parts of the site that need to do real work."
          description="The service stack is intentionally small. Each offer maps to a real buying situation and can grow into a deeper page when needed."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {items.map((service, index) => (
            <ServiceCard key={service._id || service.slug || index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
