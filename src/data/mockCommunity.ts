import { Ingredient } from "./ingredients";

export interface CommunityMenu {
  id: string;
  author: string;
  title: string;
  description: string;
  items: { ingredientId: string; weight: number }[];
  likes: number;
  tags: string[];
}

export const mockCommunityMenus: CommunityMenu[] = [
  {
    id: "c1",
    author: "dr. Sari",
    title: "Makan Siang Seimbang",
    description: "Kombinasi klasik nasi merah dengan protein hewani dan nabati yang pas.",
    items: [
      { ingredientId: "nasi-merah", weight: 150 },
      { ingredientId: "ayam-dada", weight: 100 },
      { ingredientId: "tempe", weight: 50 },
      { ingredientId: "bayam", weight: 100 },
    ],
    likes: 124,
    tags: ["Sehat", "Protein Tinggi"],
  },
  {
    id: "c2",
    author: "Budi_Fit",
    title: "Menu Anak Kos Hemat",
    description: "Murah meriah tapi tetap bergizi. Tahu dan telur adalah kuncinya.",
    items: [
      { ingredientId: "nasi-putih", weight: 200 },
      { ingredientId: "telur-ayam", weight: 100 },
      { ingredientId: "tahu", weight: 100 },
      { ingredientId: "kangkung", weight: 75 },
    ],
    likes: 89,
    tags: ["Hemat", "Simpel"],
  },
  {
    id: "c3",
    author: "Mama_Gizi",
    title: "Sajian Rendang Sehat",
    description: "Siapa bilang makan rendang tidak bisa sehat? Kuncinya di porsi sayur.",
    items: [
      { ingredientId: "nasi-putih", weight: 100 },
      { ingredientId: "rendang-sapi", weight: 50 },
      { ingredientId: "sawi-hijau", weight: 150 },
      { ingredientId: "wortel", weight: 50 },
    ],
    likes: 256,
    tags: ["Lokal", "Kaya Rasa"],
  },
  {
    id: "c4",
    author: "Chef_Riri",
    title: "Bowl Ikan Nila",
    description: "Ikan nila yang kaya protein dipadukan dengan karbohidrat kompleks.",
    items: [
      { ingredientId: "ubi-jalar", weight: 150 },
      { ingredientId: "ikan-nila", weight: 120 },
      { ingredientId: "brokoli", weight: 100 },
    ],
    likes: 112,
    tags: ["Rendah Kalori", "Diet"],
  },
];
