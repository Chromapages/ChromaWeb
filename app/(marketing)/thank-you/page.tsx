import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import CtaBlock from "@/components/sections/cta-block";

export const metadata: Metadata = {
  title: "Inquiry confirmation information",
  description: "Find out where the contact form displays an inquiry confirmation, or open the form to send a request.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <>
      <Hero
        eyebrow="Your inquiry"
        title="Looking for your inquiry confirmation?"
        description="Successful submissions show a confirmation and a reference number in the contact form. If you still need to send an inquiry, open the form below."
        primaryAction={{ label: "Return home", href: "/" }}
        secondaryAction={{ label: "Open inquiry form", href: "/contact", variant: "secondary" }}
      />
      <CtaBlock
        title="Still need to send an inquiry?"
        description="Use the contact form to tell us about your business and what needs to change on your website."
        primaryLabel="Open inquiry form"
        primaryHref="/contact"
      />
    </>
  );
}
