import { CalculatorClient } from "@/components/CalculatorClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Kalori & Nutrisi Praktis",
  description:
    "Hitung kalori, protein, lemak, dan karbohidrat makanan harian Anda secara real-time. Kalkulator nutrisi mudah untuk masakan Indonesia.",
  alternates: {
    canonical: "/calculator",
  },
};

export default function CalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Kalkulator Kalori GIGIZI",
    "url": "https://gigizi.vercel.app/calculator",
    "description": "Kalkulator nutrisi praktis untuk menghitung kalori, protein, lemak, dan karbohidrat makanan Indonesia.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    },
    "author": {
      "@type": "Person",
      "name": "Irsyad"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorClient />
    </>
  );
}
