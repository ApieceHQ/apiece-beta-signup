import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Footer from "./Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const title = "Apiece — A place for curation";
const description = "Collect anything. Curate everywhere. Apply for early access to Apiece.";

// Used to make OG/Twitter image URLs absolute. Set NEXT_PUBLIC_SITE_URL to the
// production domain (e.g. https://apiece.co); falls back to the Vercel URL, then localhost.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Home keeps the full default title; interior pages set just their name
  // (e.g. "About") and render as "About — Apiece".
  title: {
    default: title,
    template: "%s — Apiece",
  },
  description,
  openGraph: {
    title,
    description,
    siteName: "Apiece",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F0F5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
