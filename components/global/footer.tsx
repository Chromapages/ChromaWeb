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
              High-performance digital systems for high-value brands.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="grid grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <p className="font-display text-sm font-bold uppercase tracking-widest text-primary/40">
                Navigation
              </p>
              <ul className="space-y-3">
                {["Work", "Services", "Process", "Contact"].map((label) => (
                  <li key={label}>
                    <Link
                      href={`/${label.toLowerCase()}`}
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
                Contact
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:hello@chromapages.com"
                    className="text-sm font-semibold text-primary/70 transition hover:text-accent"
                  >
                    hello@chromapages.com
                  </a>
                </li>
                <li>
                  <span className="text-sm font-semibold text-primary/70">
                    San Francisco, CA
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Social & Legal Column */}
          <div className="space-y-6 lg:text-right">
            <div className="flex gap-4 lg:justify-end">
              {[
                { label: "LinkedIn", href: "#" },
                { label: "Twitter", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-functional bg-surface-2 text-primary transition hover:bg-surface-3 hover:text-accent"
                >
                  <span className="text-xs font-bold">{social.label[0]}</span>
                </a>
              ))}
            </div>
            <p className="text-sm font-medium text-primary/40">
              © {new Date().getFullYear()} Chromapages. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
