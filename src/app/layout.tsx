import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import { AlbumViewer } from "@/components/AlbumViewer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/siteUrl";
import { businessGraph } from "@/lib/structuredData";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `San Antonio Real Estate Agents | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Buy, sell, or rent in San Antonio with Irma and John Nelson of Get It Sold Realty. 19 years of local experience, 290+ homes sold.",
  openGraph: { siteName: site.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#002868" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <AlbumViewer />
        <ScrollReveal />
        <JsonLd data={businessGraph()} />
        <Analytics />
      </body>
    </html>
  );
}
