import Script from "next/script";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import SkipLink from "@/components/global/skip-link";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chromapages.com";
const configuredGtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
const gtmId = configuredGtmId && /^GTM-[A-Z0-9]+$/.test(configuredGtmId) && !/^GTM-X+$/.test(configuredGtmId)
  ? configuredGtmId
  : null;

// Structured data limited to facts already visible on the site: the business
// name, public URL, and the configured brand description.
// No address, phone, ratings, reviews, or logo are asserted here.
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    description: site.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chromapages",
    template: "%s | Chromapages",
  },
  description:
    "Chromapages designs and builds websites for service businesses ready for an online presence that reflects the quality of their work.",
  openGraph: {
    type: "website",
    siteName: "Chromapages",
    title: "Chromapages",
    description:
      "Chromapages designs and builds websites for service businesses ready for an online presence that reflects the quality of their work.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chromapages",
    description:
      "Chromapages designs and builds websites for service businesses ready for an online presence that reflects the quality of their work.",
    images: ["/og-image.png"],
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
