import { HomeClient } from "@/components/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GIGIZI — Kalkulator Kalori & Nutrisi Makanan Indonesia",
  description:
    "GIGIZI membantu Anda hitung kalori dan gizi harian dengan mudah. Kalkulator kalori praktis untuk makanan warteg dan masakan Indonesia sehari-hari.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomeClient />;
}
