import SectionHeading from "@/components/ui/section-heading";
import { differentiators } from "@/lib/site";

export default function Differentiators() {
  return (
    <section className="cp-section bg-bg">
      <div className="cp-container">
        <SectionHeading
          eyebrow="Our standard"
          title="What we want every website to do."
          description="Look Premium, Convert Clearly, Load Fast, Launch Clean, Keep Improving."
        />
        <ul role="list" className="mt-10 divide-y divide-outline border-y border-outline">
          {differentiators.map((item) => (
            <li key={item.title} className="cp-grid items-baseline gap-y-2 py-5">
              <h3 className="col-span-full text-xl leading-tight font-bold tracking-tight text-ink sm:col-span-3 lg:col-span-4">
                {item.title}
              </h3>
              <p className="col-span-full max-w-prose text-muted sm:col-span-5 lg:col-span-8">
                {item.summary}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
