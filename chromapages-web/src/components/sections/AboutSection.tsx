import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-px w-8 bg-brand-secondary"></div>
                    <span className="text-sm uppercase tracking-wider text-brand-secondary font-heading font-bold">Why Chromapages</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex -space-x-4">
                                <div className="w-14 h-14 rounded-full border-4 border-white relative overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100"
                                        alt="Reviewer"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="w-14 h-14 rounded-full border-4 border-white relative overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100"
                                        alt="Reviewer"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="w-14 h-14 rounded-full border-4 border-white relative overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100"
                                        alt="Reviewer"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-xl text-brand-ink">Reliable</div>
                                <div className="text-slate-500 text-sm font-light">Trusted by Growing Brands</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="lg:text-4xl leading-tight text-3xl text-brand-ink mb-6 font-heading font-bold">
                            Fast Websites That Turn Visitors Into Customers.
                        </h2>
                        <p className="text-xl text-slate-500 leading-relaxed mb-8 font-light font-body">
                            We build with a simple belief: clarity wins. A site should be easy to understand, fast to use, and built to generate real business outcomes.
                        </p>
                    </div>
                </div>

                {/* About Images */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-5 relative group h-80 rounded-[1.5rem] overflow-hidden shadow-xl">
                        <Image
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
                            alt="Strategy Session"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="md:col-span-5 relative group h-80 rounded-[1.5rem] overflow-hidden shadow-xl">
                        <Image
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
                            alt="Collaboration"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="md:col-span-2 flex items-end justify-end">
                        <Link href="/process" className="w-full h-full min-h-[100px] rounded-[1.5rem] flex flex-col items-center justify-center gap-3 hover:bg-slate-50 transition-colors p-6 text-center border border-slate-200 shadow-xl group text-brand-ink bg-white">
                            <span className="text-lg font-heading text-brand-ink font-bold">How We Work</span>
                            <ArrowRight className="text-2xl text-brand-primary group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
