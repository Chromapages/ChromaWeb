import { Navbar, Footer } from "@/components/global";
import { SectionHeading } from "@/components/ui";
import { FeaturesGrid, ProcessSteps, CTABanner } from "@/components/sections";

export const metadata = {
    title: "The Chromapages System | Chromapages",
    description: "Our four pillars of digital excellence: Premium Design, Conversion Engineering, Performance, and Ongoing Support.",
};

export default function SystemPage() {
    return (
        <>
            <Navbar />

            <main className="relative min-h-screen pt-32">
                <section className="max-w-7xl mx-auto px-6 pb-16">
                    <SectionHeading
                        label="Our Philosophy"
                        title="The Chromapages System"
                        description="Every project we take on is built on four non-negotiable pillars. This is how we ensure every website we deliver performs at the highest level."
                    />
                </section>

                <FeaturesGrid />

                <ProcessSteps />

                <CTABanner />
            </main>

            <Footer />
        </>
    );
}
