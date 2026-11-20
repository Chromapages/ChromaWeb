import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-bg transition-colors duration-280">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-primary">
                Chromapages
              </span>
            </Link>
            <p className="max-w-xs text-base font-medium text-primary/65">
              Chromapages designs and builds websites for service businesses ready for an online presence that reflects the quality of their work.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="grid grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <p className="font-display text-sm font-bold uppercase tracking-widest text-primary/40">
                Navigation
              </p>
              <ul className="space-y-3">
                {["Services", "Work", "Process", "Pricing", "About", "Contact", "Privacy Policy"].map((label) => (
                  <li key={label}>
                    <Link
                      href={`/${label.toLowerCase().replaceAll(" ", "-")}`}
                      className="text-sm font-semibold text-primary/70 transition hover:text-accent"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-display text-sm font-bold uppercase tracking-widest text-primary/40">
                Services
              </p>
              <ul className="space-y-3">
                {[
                  ["Marketing websites", "/services/marketing-websites"],
                  ["Landing pages", "/services/landing-pages"],
                  ["Ecommerce", "/services/ecommerce"],
                  ["Web apps", "/services/web-apps"],
                  ["Ongoing support", "/services/ongoing-support"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm font-semibold text-primary/70 transition hover:text-accent">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social & Legal Column */}
          <div className="space-y-6 lg:text-right">
            <p className="text-sm font-medium text-primary/40">
              © {new Date().getFullYear()} Chromapages. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
