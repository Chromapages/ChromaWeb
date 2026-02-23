"use client";

import Link from "next/link";
import { Button } from "../ui/Button";

export function CtaStrip() {
  return (
    <section className="py-16 bg-[var(--color-swiss-teal)]">
      <div className="container-swiss">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white uppercase whitespace-nowrap">
            Ready to Build?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/pricing">
              <Button variant="ghost" size="lg" className="border border-white/50 text-white hover:bg-white hover:text-[var(--color-swiss-teal)]">
                VIEW PRICING →
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg" className="border border-white/50 text-white hover:bg-white hover:text-[var(--color-swiss-teal)]">
                BOOK CALL →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
