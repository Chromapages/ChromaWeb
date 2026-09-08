import Link from "next/link";

import type {DifferentiatorItem} from "./differentiators";

/** A semantic, ordered list for differentiating operating commitments. */
export function DifferentiatorList({items}: {items: DifferentiatorItem[]}) {
  return (
    <ol className="max-w-[65ch] list-decimal space-y-12 pl-6 marker:font-display marker:font-semibold marker:text-teal">
      {items.map((item) => (
        <li key={item.id} className="pl-2">
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
          <p className="mt-3 text-base leading-8 text-ink/72 sm:text-lg">{item.description}</p>
          {item.proofLink ? (
            <Link className="mt-4 inline-flex text-sm font-semibold text-teal hover:text-indigo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo" href={item.proofLink}>
              View supporting proof for {item.title} →
            </Link>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
