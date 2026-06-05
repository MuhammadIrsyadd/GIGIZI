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
  title: "GIGIZI — Kalkulator Nutrisi & Gizi Anak Kos",
  description: "GIGIZI adalah kalkulator nutrisi praktis untuk anak kos. Cek kalori, makronutrien, dan dapatkan saran gizi seimbang untuk makanan warteg Anda.",
  keywords: ["GIGIZI", "Kalkulator Kalori", "Nutrisi Anak Kos", "Gizi Seimbang", "Makanan Warteg", "Hitung Kalori"],
  authors: [{ name: "Irsyad" }],
  openGraph: {
    title: "GIGIZI — Gizi di Ujung Jari",
    description: "Kalkulator nutrisi praktis untuk anak kos.",
    url: "https://gigizi.vercel.app",
    siteName: "GIGIZI",
    locale: "id_ID",
    type: "website",
  },
  manifest: "/manifest.json",
  verification: {
    google: <meta name="google-site-verification" content="wjVywy-HvCzYXe6LiZS6HQxN1iAbipVLPyE8tYxH5e8" />,
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
