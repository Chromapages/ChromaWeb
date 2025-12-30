import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";


interface FeaturedWorkProps {
    projects?: any[];
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
    const defaultProjects = [
        {
            _id: "1",
            slug: { current: "nexus" },
            title: "Nexus Financial",
            projectType: "SaaS / Web App",
            client: "Customer Portal & Tools", // Mapping client to subtitle for fallback look
            mainImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1600&q=80"
        },
        {
            _id: "2",
            slug: { current: "lumina" },
            title: "Lumina Store",
            projectType: "E-Commerce",
            client: "Shopify Plus Build",
            mainImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"
        },
        {
            _id: "3",
            slug: { current: "velocity" },
            title: "Velocity AI",
            projectType: "Landing Page",
            client: "High-Growth Startup",
            mainImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
        }
    ];

    const displayProjects = projects?.length ? projects : defaultProjects;

    return (
        <section className="py-24 bg-surface-base">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-8 bg-brand-secondary"></div>
                            <span className="text-sm uppercase tracking-wider text-brand-secondary font-heading font-bold">Featured Work</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl text-brand-ink font-heading font-bold">Recent Launches</h2>
                    </div>
                    <Link href="/work" className="px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-secondary transition-colors flex items-center gap-2 mt-6 md:mt-0 text-white bg-brand-ink">
                        View All Work
                        <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayProjects.map((project) => (
                        <Link key={project._id} href={`/work/${project.slug.current}`} className="group cursor-pointer p-4 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 bg-white block">
                            <div className="bg-[#F7F7F6] rounded-[1.5rem] overflow-hidden mb-6 relative aspect-[4/3]">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-brand-secondary/10 transition-colors z-10" />
                                <Image
                                    src={project.mainImage || "https://placehold.co/800x600"}
                                    alt={project.title}
                                    fill
                                    className="group-hover:scale-105 transition-transform duration-700 object-cover"
                                />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <span className="inline-block px-4 py-1 rounded-full bg-white text-xs font-medium font-body text-brand-ink shadow-md">
                                        {project.projectType || project.industry || "Project"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-start px-2 pb-2">
                                <div>
                                    <h3 className="text-2xl mb-1 text-brand-ink font-heading font-bold">{project.title}</h3>
                                    <p className="text-slate-500 text-lg font-light font-body">{project.client}</p>
                                </div>
                                <div className="p-3 rounded-full bg-surface-base text-brand-secondary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
