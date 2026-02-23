import Link from "next/link";
import { Button } from "../ui/Button";

export function Navigation() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-swiss-bg)]/90 backdrop-blur-md border-b border-[var(--color-swiss-border)]">
            <div className="container-swiss py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-[var(--color-swiss-indigo)]">
                    CHROMAPAGES
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-semibold uppercase tracking-widest hover:text-[var(--color-swiss-teal)] transition-swiss">Home</Link>
                    <Link href="/services" className="text-sm font-semibold uppercase tracking-widest hover:text-[var(--color-swiss-teal)] transition-swiss">Services</Link>
                    <Link href="/work" className="text-sm font-semibold uppercase tracking-widest hover:text-[var(--color-swiss-teal)] transition-swiss">Work</Link>
                    <Link href="/pricing" className="text-sm font-semibold uppercase tracking-widest hover:text-[var(--color-swiss-teal)] transition-swiss">Pricing</Link>
                    <Link href="/contact">
                        <Button variant="primary" size="sm">START PROJECT</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
