import Link from "next/link";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy policy" },
];

export default function Footer() {
  return (
    <footer className="cp-dark border-t border-outline-dark py-12">
      <div className="cp-container flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <Link href="/" className="inline-flex min-h-11 items-center font-display text-xl font-bold">
          Chromapages
        </Link>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6">
          {footerLinks.map(({ href, label }) => (
            <Link key={href} href={href} prefetch={href === "/contact" ? false : undefined} className="cp-text-link text-sm">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
