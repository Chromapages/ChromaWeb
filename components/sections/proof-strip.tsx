import { cn } from "@/lib/utils";

type ProofStripProps = {
  items: string[];
  className?: string;
};

export default function ProofStrip({ items, className }: ProofStripProps) {
  return (
    <section className={cn("mx-auto max-w-7xl px-6 md:px-8", className)}>
      <div className="grid gap-3 rounded-structural bg-surface-container-low p-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="rounded-structural bg-surface-lowest px-4 py-4 shadow-ambient">
            <p className="text-sm font-medium text-on-surface">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
