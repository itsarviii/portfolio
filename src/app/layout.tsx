import type { Metadata, Viewport } from "next";
import {
  Inter,
  Instrument_Serif,
  Geist_Mono,
  Boldonse,
} from "next/font/google";
import { site } from "@/content/site";
import ThemeProvider from "@/components/layout/ThemeProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const boldonse = Boldonse({
  variable: "--font-hero",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: site.metadata.url?.startsWith("http")
    ? new URL(site.metadata.url)
    : undefined,
  title: {
    default: site.metadata.title,
    template: `%s — ${site.name}`,
  },
  description: site.metadata.description,
  openGraph: {
    title: site.metadata.title,
    description: site.metadata.description,
    type: "website",
    images: [site.metadata.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.metadata.title,
    description: site.metadata.description,
    images: [site.metadata.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} ${boldonse.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-bg text-fg antialiased">
        <ThemeProvider>
          <SmoothScroll />
          <Navbar />
          <main className="flex-1 pt-(--nav-h)">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
