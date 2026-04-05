import Script from "next/script";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import SkipLink from "@/components/global/skip-link";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chromapages.com";
const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-XXXXXXX";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chromapages",
    template: "%s | Chromapages",
  },
  description:
    "Chromapages builds modern websites and web apps that help businesses get more customers.",
  openGraph: {
    type: "website",
    siteName: "Chromapages",
    title: "Chromapages",
    description:
      "Websites, landing pages, and web apps designed to convert.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chromapages",
    description:
      "Websites, landing pages, and web apps designed to convert.",
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
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <Script
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
        />
      </head>
      <body className="min-h-full bg-surface text-on-surface font-body">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            aria-hidden="true"
          ></iframe>
        </noscript>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
