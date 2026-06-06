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
      { ingredientId: "tahu-goreng", weight: 100 },
      { ingredientId: "kangkung", weight: 75 },
    ],
    likes: 89,
    tags: ["Hemat", "Simpel"],
  },
  {
    id: "c5",
    author: "Irsyad_Geprek",
    title: "Paket Geprek Kenyang",
    description: "Menu andalan tanggal muda. Pedasnya nampol, proteinnya dapet!",
    items: [
      { ingredientId: "nasi-putih", weight: 200 },
      { ingredientId: "ayam-geprek", weight: 150 },
      { ingredientId: "mentimun", weight: 50 },
      { ingredientId: "sambal-bawang", weight: 20 },
    ],
    likes: 312,
    tags: ["Populer", "Pedas"],
  },
  {
    id: "c6",
    author: "Soto_Lover",
    title: "Soto Ayam Segar",
    description: "Hangat dan segar untuk musim hujan. Tetap terkontrol kalorinya.",
    items: [
      { ingredientId: "nasi-putih", weight: 150 },
      { ingredientId: "kuah-soto", weight: 200 },
      { ingredientId: "ayam-suwir", weight: 50 },
      { ingredientId: "telur-ayam", weight: 50 },
      { ingredientId: "soun", weight: 30 },
    ],
    likes: 198,
    tags: ["Segar", "Kuah"],
  },
  {
    id: "c7",
    author: "Bubur_Team",
    title: "Sarapan Bubur Lengkap",
    description: "Tim diaduk atau tidak, yang penting gizinya lengkap!",
    items: [
      { ingredientId: "bubur-ayam", weight: 250 },
      { ingredientId: "cakwe", weight: 50 },
      { ingredientId: "ayam-suwir", weight: 30 },
      { ingredientId: "kerupuk-udang", weight: 20 },
    ],
    likes: 145,
    tags: ["Sarapan", "Lokal"],
  },
  {
    id: "c8",
    author: "Anak_Mie",
    title: "Mie Instan Upgrade Sehat",
    description: "Cara makan mie instan yang lebih bertanggung jawab.",
    items: [
      { ingredientId: "mie-instan", weight: 80 },
      { ingredientId: "telur-ayam", weight: 50 },
      { ingredientId: "sawi-hijau", weight: 100 },
    ],
    likes: 423,
    tags: ["Hemat", "Andalan"],
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

// Helper to store daily intake for Weekly Trends
export interface DailyLog {
    date: string; // YYYY-MM-DD
    totalCalories: number;
    protein: number;
    fat: number;
    carbs: number;
}

export const saveDailyLog = (log: Omit<DailyLog, 'date'>) => {
    const logs = JSON.parse(localStorage.getItem("gigizi_weekly_logs") || "[]") as DailyLog[];
    const today = new Date().toISOString().split('T')[0];
    
    // Simple logic: keep latest per day
    const filteredLogs = logs.filter(l => l.date !== today);
    filteredLogs.push({ ...log, date: today });
    
    // Keep only last 7 days
    const last7Days = filteredLogs.slice(-7);
    localStorage.setItem("gigizi_weekly_logs", JSON.stringify(last7Days));
};
