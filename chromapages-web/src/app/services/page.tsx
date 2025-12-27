import { Navbar, Footer } from "@/components/global";
import { SectionHeading } from "@/components/ui";
import { ServicesPreview, CTABanner } from "@/components/sections";

export const metadata = {
    title: "Services | Chromapages",
    description: "Premium web development services: Marketing Websites, E-Commerce, and Web Applications. Built for performance and conversion.",
};

export default function ServicesPage() {
    return (
        <>
            <Navbar />

            <main className="relative min-h-screen pt-32">
                <section className="max-w-7xl mx-auto px-6 pb-16">
                    <SectionHeading
                        label="What We Build"
                        title="Premium Digital Products"
                        description="We specialize in three core areas, delivering deep expertise rather than spreading thin. Every project is built to the Chromapages Standard."
                    />
                </section>

                <ServicesPreview />

                <CTABanner />
            </main>

            <Footer />
        </>
    );
}
