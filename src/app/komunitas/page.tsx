import { KomunitasClient } from "@/components/KomunitasClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inspirasi Menu Sehat Komunitas",
  description:
    "Lihat menu sehat pilihan komunitas GIGIZI. Mulai dari menu warteg hingga masakan rumah yang seimbang nutrisinya.",
  alternates: {
    canonical: "/komunitas",
  },
};

export default function KomunitasPage() {
  return <KomunitasClient />;
}
