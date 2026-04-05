import Link from "next/link";
import { footerGroups, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="max-w-md space-y-4">
            <Link href="/" className="font-display text-2xl text-on-surface">
              {site.name}
            </Link>
            <p className="text-body-lg text-on-surface/72">{site.description}</p>
            <p className="text-sm text-on-surface/60">{site.tagline}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="text-label-md uppercase text-primary-container">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-on-surface/72">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition hover:text-on-surface">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 bg-surface-container-low/70 pt-8 text-sm text-on-surface/60 md:flex-row md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built to feel clear, calm, and ready to convert.</p>
        </div>
      </div>
    </footer>
  );
}
