import type { Metadata } from "next";
import { Inter, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Font Configuration - Chromapages Typography System
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

// Site Metadata
export const metadata: Metadata = {
  title: {
    default: "Chromapages | Digital Design Elevated",
    template: "%s | Chromapages",
  },
  description:
    "Premium web design and development studio. We build immersive, high-performance websites that merge aesthetics with engineering-grade speed.",
  keywords: [
    "web design",
    "web development",
    "marketing websites",
    "ecommerce",
    "Next.js",
    "premium agency",
  ],
  authors: [{ name: "Chromapages" }],
  creator: "Chromapages",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chromapages.com",
    siteName: "Chromapages",
    title: "Chromapages | Digital Design Elevated",
    description:
      "Premium web design and development studio. Websites that perform.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chromapages | Digital Design Elevated",
    description:
      "Premium web design and development studio. Websites that perform.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${inter.variable} ${montserrat.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
