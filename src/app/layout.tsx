import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gigizi.vercel.app"),
  title: {
    default: "GIGIZI — Kalkulator Kalori & Nutrisi Anak Kos",
    template: "%s | GIGIZI",
  },
  description:
    "GIGIZI adalah kalkulator kalori dan nutrisi praktis untuk anak kos. Hitung kalori, protein, lemak, dan karbohidrat dari makanan warteg secara akurat dan mudah.",
  keywords: [
    "GIGIZI",
    "Kalkulator Kalori",
    "Hitung Kalori",
    "Kalkulator Nutrisi",
    "Gizi Anak Kos",
    "Nutrisi Warteg",
    "Gizi Seimbang",
    "Kalori Makanan Indonesia",
    "Diet Anak Kos",
    "Health Calculator Indonesia",
  ],
  authors: [{ name: "Irsyad" }],
  openGraph: {
    title: "GIGIZI — Kalkulator Kalori & Gizi di Ujung Jari",
    description: "Kalkulator nutrisi praktis untuk anak kos dan masakan Indonesia.",
    url: "https://gigizi.vercel.app",
    siteName: "GIGIZI",
    images: [
      {
        url: "/og-image.png", // Ensure this exists or use a default
        width: 1200,
        height: 630,
        alt: "GIGIZI - Kalkulator Kalori & Nutrisi",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GIGIZI — Kalkulator Kalori & Gizi di Ujung Jari",
    description: "Hitung kalori makanan harian Anda dengan mudah.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  verification: {
    google: "wjVywy-HvCzYXe6LiZS6HQxN1iAbipVLPyE8tYxH5e8",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#3D6B4F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-dm-sans selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
