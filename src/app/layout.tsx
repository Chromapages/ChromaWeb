import type {Metadata} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import localFont from "next/font/local";

import {AnalyticsConsent} from "@/components/analytics/AnalyticsConsent";
import {SiteHeaderGate} from "@/components/SiteHeaderGate";
import {SiteFooterGate} from "@/components/SiteFooterGate";
import {ApertureIntro} from "@/components/ui/ApertureIntro";
import {JsonLd, buildOrganizationSchema} from "@/components/seo/JsonLd";
import {siteUrl} from "@/lib/seo";
import {getSiteSeo} from "@/sanity/lib/siteSeo";

import "./globals.css";

const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  display: "swap",
  variable: "--font-inter",
  weight: "100 900",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-heading",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSeo();
  const siteTitle = site.data?.title ?? "Chromapages";
  const title = site.data?.defaultSeo?.metaTitle ?? siteTitle;
  const description = site.data?.defaultSeo?.metaDescription ?? "Premium web design and development for service businesses.";
  const faviconUrl = site.data?.favicon;

  return {
    metadataBase: siteUrl,
    title: {default: title, template: `%s | ${siteTitle}`},
    description,
    openGraph: {type: "website", siteName: siteTitle, title, description, images: []},
    twitter: {card: "summary", title, description, images: []},
    icons: {
      icon: faviconUrl
        ? [{url: faviconUrl}]
        : [
            {url: "/favicon.ico"},
            {url: "/icon.png", type: "image/png"},
          ],
      apple: [
        {url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png"},
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1},
    },
  };
}

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const site = await getSiteSeo();
  const logoUrl = site.data?.logo;
  const organizationJsonLd = buildOrganizationSchema();

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <JsonLd data={organizationJsonLd} />
      </head>
      <body className="flex min-h-screen flex-col bg-canvas text-ink antialiased">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <ApertureIntro />
        <SiteHeaderGate logoUrl={logoUrl} />
        <div className="flex-1">{children}</div>
        <SiteFooterGate logoUrl={logoUrl} />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
