import { Navbar, Footer } from "@/components/global";
import { ContactForm } from "@/components/sections";
import { GlassCard } from "@/components/ui";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
    title: "Contact | Chromapages",
    description: "Get in touch with Chromapages. Book a discovery call or send us a message about your project.",
};

const contactDetails = [
    {
        icon: Mail,
        label: "Email",
        value: "hello@chromapages.com",
        href: "mailto:hello@chromapages.com",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "(555) 123-4567",
        href: "tel:+15551234567",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Remote-First, USA",
        href: null,
    },
    {
        icon: Clock,
        label: "Response Time",
        value: "Within 24 Hours",
        href: null,
    },
];

export default function ContactPage() {
    return (
        <>
            <Navbar />

            <main className="relative min-h-screen pt-32">
                <div className="max-w-7xl mx-auto px-6 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                        {/* Contact Info Column */}
                        <div className="lg:col-span-2 order-2 lg:order-1">
                            <h1 className="heading-hero text-3xl md:text-4xl text-[var(--brand-primary)] mb-4">
                                Let&apos;s Talk
                            </h1>
                            <p className="text-gray-600 mb-10 leading-relaxed">
                                Ready to elevate your digital presence? Reach out and let&apos;s discuss how we can help you achieve your goals.
                            </p>

                            <div className="space-y-6">
                                {contactDetails.map((item) => (
                                    <GlassCard key={item.label} className="p-4 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--brand-base)] flex items-center justify-center shrink-0">
                                            <item.icon className="w-5 h-5 text-[var(--brand-primary)]" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                                                {item.label}
                                            </div>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="font-medium text-[var(--brand-ink)] hover:text-[var(--brand-primary)] transition-colors"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <span className="font-medium text-[var(--brand-ink)]">
                                                    {item.value}
                                                </span>
                                            )}
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-3 order-1 lg:order-2">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
