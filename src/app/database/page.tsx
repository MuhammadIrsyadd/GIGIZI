import { DatabaseClient } from "@/components/DatabaseClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Database Gizi & Kalori Makanan Indonesia",
  description:
    "Cari tahu kandungan kalori, protein, lemak, dan karbohidrat dari ratusan bahan makanan lokal Indonesia seperti tempe, rendang, dan lainnya.",
  alternates: {
    canonical: "/database",
  },
};

export default function DatabasePage() {
  return <DatabaseClient />;
}
