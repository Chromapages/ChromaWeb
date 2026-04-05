import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

type Partner = {
  name: string;
  logo: SanityImageSource;
  website?: string;
};

type TrustBarProps = {
  partners: Partner[];
  className?: string;
};

export default function TrustBar({ partners, className }: TrustBarProps) {
  if (!partners || partners.length === 0) {
    return (
      <section className={cn("bg-surface-container-low py-10", className)}>
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <p className="text-label-sm font-bold uppercase tracking-[0.2em] text-on-surface/40">
              Trusted by leading brands
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-30 grayscale filter transition-all duration-700">
               {/* Placeholder logos if no data */}
               <div className="h-6 w-24 bg-on-surface/20 rounded-full" />
               <div className="h-6 w-20 bg-on-surface/20 rounded-full" />
               <div className="h-6 w-28 bg-on-surface/20 rounded-full" />
               <div className="h-6 w-24 bg-on-surface/20 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("bg-surface-container-low py-12", className)}>
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <p className="flex-shrink-0 text-label-xs font-bold uppercase tracking-[0.25em] text-on-surface/40 lg:text-left">
            Trusted by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:justify-end">
            {partners.map((partner, index) => {
              const logoUrl = partner.logo ? urlFor(partner.logo).url() : "";
              if (!logoUrl) return null;

              return (
                <div
                  key={`${partner.name}-${index}`}
                  className="group relative transition-all duration-500"
                >
                  <div className="relative h-8 w-28 grayscale opacity-40 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100">
                    <Image
                      src={logoUrl}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10"
                      aria-label={`Visit ${partner.name} website`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
