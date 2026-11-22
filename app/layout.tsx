import Script from "next/script";
import type { Metadata } from "next";
import localFont from "next/font/local";
import SkipLink from "@/components/global/skip-link";
import { services, site, siteOrigin, siteSocialMetadata } from "@/lib/site";
import "./globals.css";

const montserrat = localFont({
  src: "../docs/design-review/fonts/montserrat-latin.woff2",
  variable: "--font-montserrat",
  weight: "400 900",
  display: "swap",
});

const inter = localFont({
  src: "../docs/design-review/fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const configuredGtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
const gtmId = configuredGtmId && /^GTM-[A-Z0-9]+$/.test(configuredGtmId) && !/^GTM-X+$/.test(configuredGtmId)
  ? configuredGtmId
  : null;

const organizationId = `${siteOrigin}/#organization`;

// Describe only verified services; no prices, reviews, or physical address.
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: siteOrigin,
    description: site.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website services",
      itemListElement: services.map(({ label, summary, slug }) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: label,
          description: summary,
          url: `${siteOrigin}/services/${slug}`,
        },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteOrigin}/#website`,
    name: site.name,
    url: siteOrigin,
    publisher: { "@id": organizationId },
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Chromapages",
    template: "%s | Chromapages",
  },
  description: site.description,
  ...siteSocialMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {gtmId && <Script
          id="gtm"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-full bg-surface text-on-surface font-body">
        {gtmId && <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            aria-hidden="true"
          ></iframe>
        </noscript>}
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
