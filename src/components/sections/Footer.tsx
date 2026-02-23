import { Button } from "../ui/Button";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[var(--color-swiss-indigo)] text-white pt-32 pb-12">
            <div className="container-swiss">
                <div className="swiss-grid border-b border-white/20 pb-24 mb-12">
                    <div className="col-span-12 md:col-span-6">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8">
                            Initiate<br />Protocol
                        </h2>
                        <Button variant="secondary" size="lg" className="rounded-none">BOOK CONSULTATION</Button>
                    </div>
                    <div className="col-span-12 md:col-span-6 flex flex-col justify-end md:items-end mt-12 md:mt-0">
                        <div className="text-xl font-bold uppercase mb-2">Systems Online</div>
                        <p className="text-white/60 mb-8 max-w-sm md:text-right">
                            Ready to upgrade your digital infrastructure? Schedule a technical review of your current web properties.
                        </p>
                        <a href="mailto:hello@chromapages.com" className="text-2xl font-bold hover:text-[var(--color-swiss-teal)] transition-swiss">
                            HELLO@CHROMAPAGES.COM
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-xs font-bold tracking-widest uppercase text-white/50">
                    <div>&copy; {new Date().getFullYear()} CHROMAPAGES LLC</div>
                    <div className="flex gap-8 mt-6 md:mt-0">
                        <Link href="/blog" className="hover:text-white transition-swiss underline decoration-white/20 underline-offset-4">Journal</Link>
                        <a href="#" className="hover:text-white transition-swiss">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-swiss">Twitter</a>
                        <a href="#" className="hover:text-white transition-swiss">System Status</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
