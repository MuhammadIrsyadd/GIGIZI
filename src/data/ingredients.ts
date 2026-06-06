export interface Ingredient {
  id: string;
  name: string;
  calories: number; // per 100g
  protein: number;  // per 100g
  fat: number;      // per 100g
  carbs: number;    // per 100g
  fiber: number;    // per 100g
  category: string;
  icon?: string;
  price?: number; // per 100g or per unit
}

export const ingredients: Ingredient[] = [
  // --- KARBOHIDRAT ---
  { id: "nasi-putih", name: "Nasi Putih", calories: 130, protein: 2.7, fat: 0.3, carbs: 28, fiber: 0.4, category: "Karbohidrat", icon: "🍚", price: 3000 },
  { id: "nasi-merah", name: "Nasi Merah", calories: 110, protein: 2.6, fat: 0.9, carbs: 23, fiber: 1.8, category: "Karbohidrat", icon: "🍚", price: 5000 },
  { id: "singkong-rebus", name: "Singkong Rebus", calories: 160, protein: 1.4, fat: 0.3, carbs: 38, fiber: 1.8, category: "Karbohidrat", icon: "🍠", price: 2000 },
  { id: "kentang-rebus", name: "Kentang Rebus", calories: 77, protein: 2, fat: 0.1, carbs: 17, fiber: 2.2, category: "Karbohidrat", icon: "🥔", price: 2500 },
  { id: "ubi-jalar", name: "Ubi Jalar Rebus", calories: 86, protein: 1.6, fat: 0.1, carbs: 20, fiber: 3, category: "Karbohidrat", icon: "🍠", price: 2500 },
  { id: "mie-instan", name: "Mie Instan (Kering)", calories: 450, protein: 8, fat: 17, carbs: 65, fiber: 2, category: "Karbohidrat", icon: "🍜", price: 3500 },
  { id: "roti-putih", name: "Roti Putih", calories: 265, protein: 9, fat: 3.2, carbs: 49, fiber: 2.7, category: "Karbohidrat", icon: "🍞", price: 2000 },
  { id: "jagung-rebus", name: "Jagung Rebus", calories: 96, protein: 3.4, fat: 1.5, carbs: 21, fiber: 2.4, category: "Karbohidrat", icon: "🌽", price: 2000 },

  // --- PROTEIN HEWANI (WARTEG STYLE) ---
  { id: "ayam-dada", name: "Ayam (dada, tanpa kulit)", calories: 165, protein: 31, fat: 3.6, carbs: 0, fiber: 0, category: "Protein Hewani", icon: "🍗", price: 12000 },
  { id: "ayam-goreng-warteg", name: "Ayam Goreng Lengkuas", calories: 260, protein: 25, fat: 17, carbs: 2, fiber: 0, category: "Protein Hewani", icon: "🍗", price: 10000 },
  { id: "telur-ayam", name: "Telur Ayam Rebus", calories: 155, protein: 13, fat: 11, carbs: 1.1, fiber: 0, category: "Protein Hewani", icon: "🥚", price: 3000 },
  { id: "telur-balado", name: "Telur Balado", calories: 190, protein: 12, fat: 14, carbs: 4, fiber: 0.5, category: "Protein Hewani", icon: "🌶️", price: 4000 },
  { id: "telur-dadar-warteg", name: "Telur Dadar Tebal", calories: 250, protein: 11, fat: 21, carbs: 3, fiber: 0, category: "Protein Hewani", icon: "🍳", price: 4000 },
  { id: "daging-sapi", name: "Daging Sapi (Tanpa Lemak)", calories: 250, protein: 26, fat: 15, carbs: 0, fiber: 0, category: "Protein Hewani", icon: "🥩", price: 20000 },
  { id: "paru-goreng", name: "Paru Goreng", calories: 340, protein: 22, fat: 27, carbs: 1, fiber: 0, category: "Protein Hewani", icon: "🥩", price: 8000 },
  { id: "usus-ayam", name: "Usus Ayam (Sate/Goreng)", calories: 280, protein: 18, fat: 22, carbs: 2, fiber: 0, category: "Protein Hewani", icon: "🍡", price: 3000 },
  { id: "ati-ampela", name: "Ati Ampela Goreng", calories: 210, protein: 24, fat: 11, carbs: 2, fiber: 0, category: "Protein Hewani", icon: "🍗", price: 3000 },
  { id: "ikan-lele", name: "Ikan Lele Goreng", calories: 230, protein: 18, fat: 16, carbs: 0, fiber: 0, category: "Protein Hewani", icon: "🐟", price: 7000 },
  { id: "ikan-nila", name: "Ikan Nila Bakar", calories: 120, protein: 20, fat: 4, carbs: 0, fiber: 0, category: "Protein Hewani", icon: "🐟", price: 10000 },
  { id: "ikan-tongkol-balado", name: "Tongkol Balado", calories: 185, protein: 22, fat: 9, carbs: 3, fiber: 0.5, category: "Protein Hewani", icon: "🐟", price: 6000 },
  { id: "kikil", name: "Kikil (Gulai/Oseng)", calories: 150, protein: 20, fat: 7, carbs: 1, fiber: 0, category: "Protein Hewani", icon: "🍲", price: 5000 },
  { id: "udang-balado", name: "Udang Balado", calories: 145, protein: 18, fat: 7, carbs: 3, fiber: 0.5, category: "Protein Hewani", icon: "🦐", price: 8000 },

  // --- PROTEIN NABATI (WARTEG STYLE) ---
  { id: "tempe", name: "Tempe Goreng", calories: 193, protein: 19, fat: 11, carbs: 9, fiber: 1.4, category: "Protein Nabati", icon: "🫘", price: 2000 },
  { id: "orek-tempe-kering", name: "Orek Tempe Kering", calories: 280, protein: 12, fat: 14, carbs: 28, fiber: 3, category: "Protein Nabati", icon: "🍱", price: 3000 },
  { id: "orek-tempe-basah", name: "Orek Tempe Basah", calories: 185, protein: 10, fat: 8, carbs: 18, fiber: 2, category: "Protein Nabati", icon: "🍲", price: 3000 },
  { id: "tahu-goreng", name: "Tahu Goreng", calories: 115, protein: 8, fat: 8, carbs: 3, fiber: 0.3, category: "Protein Nabati", icon: "🫘", price: 2000 },
  { id: "tahu-isi", name: "Tahu Isi (Gehu)", calories: 180, protein: 6, fat: 12, carbs: 14, fiber: 1.5, category: "Protein Nabati", icon: "🥟", price: 2000 },
  { id: "perkedel-kentang", name: "Perkedel Kentang", calories: 165, protein: 3, fat: 9, carbs: 18, fiber: 1.5, category: "Protein Nabati", icon: "🥔", price: 2000 },
  { id: "dadar-jagung", name: "Dadar Jagung (Bakwan)", calories: 210, protein: 4, fat: 13, carbs: 20, fiber: 2, category: "Protein Nabati", icon: "🌽", price: 2000 },
  { id: "kacang-tanah", name: "Kacang Tanah Goreng", calories: 567, protein: 25.8, fat: 49.2, carbs: 16.1, fiber: 8.5, category: "Protein Nabati", icon: "🥜", price: 5000 },

  // --- SAYURAN (ALA WARTEG) ---
  { id: "sayur-asem", name: "Sayur Asem (Tanpa Isi)", calories: 30, protein: 1, fat: 0.5, carbs: 6, fiber: 1.5, category: "Sayuran", icon: "🥣", price: 3000 },
  { id: "sayur-lodeh", name: "Sayur Lodeh", calories: 120, protein: 3, fat: 9, carbs: 8, fiber: 2.5, category: "Sayuran", icon: "🥣", price: 4000 },
  { id: "bayam", name: "Bayam Bening", calories: 18, protein: 2, fat: 0.2, carbs: 3, fiber: 2, category: "Sayuran", icon: "🥬", price: 3000 },
  { id: "kangkung", name: "Tumis Kangkung", calories: 45, protein: 3, fat: 3, carbs: 4, fiber: 2, category: "Sayuran", icon: "🥦", price: 4000 },
  { id: "oseng-kacang-panjang", name: "Oseng Kacang Panjang", calories: 65, protein: 3, fat: 4, carbs: 6, fiber: 2.5, category: "Sayuran", icon: "🌱", price: 4000 },
  { id: "capcay-warteg", name: "Capcay Warteg", calories: 85, protein: 4, fat: 5, carbs: 8, fiber: 2, category: "Sayuran", icon: "🥗", price: 5000 },
  { id: "terong-balado", name: "Terong Balado", calories: 132, protein: 1.5, fat: 11, carbs: 8, fiber: 2.5, category: "Sayuran", icon: "🍆", price: 4000 },
  { id: "sawi-hijau", name: "Sawi Hijau Tumis", calories: 35, protein: 2.3, fat: 2, carbs: 3.5, fiber: 1.8, category: "Sayuran", icon: "🥬", price: 3000 },
  { id: "brokoli", name: "Brokoli Rebus", calories: 34, protein: 2.8, fat: 0.4, carbs: 6.6, fiber: 2.6, category: "Sayuran", icon: "🥦", price: 4000 },
  { id: "wortel", name: "Wortel Rebus", calories: 41, protein: 0.9, fat: 0.2, carbs: 9.6, fiber: 2.8, category: "Sayuran", icon: "🥕", price: 2000 },
  { id: "jengkol-balado", name: "Jengkol Balado", calories: 155, protein: 4, fat: 7, carbs: 20, fiber: 2, category: "Sayuran", icon: "🫘", price: 5000 },
  { id: "pete-rebus", name: "Pete Rebus/Mentah", calories: 124, protein: 10, fat: 2, carbs: 15, fiber: 3, category: "Sayuran", icon: "🫛", price: 5000 },

  // --- BUAH ---
  { id: "pisang", name: "Pisang Ambon", calories: 89, protein: 1.1, fat: 0.3, carbs: 22.8, fiber: 2.6, category: "Buah", icon: "🍌", price: 2000 },
  { id: "pepaya", name: "Pepaya", calories: 43, protein: 0.5, fat: 0.3, carbs: 10.8, fiber: 1.7, category: "Buah", icon: "🥭", price: 2000 },
  { id: "alpukat", name: "Alpukat", calories: 160, protein: 2, fat: 15, carbs: 9, fiber: 7, category: "Buah", icon: "🥑", price: 5000 },
  { id: "mangga", name: "Mangga Harum Manis", calories: 60, protein: 0.8, fat: 0.4, carbs: 15, fiber: 1.6, category: "Buah", icon: "🥭", price: 5000 },
  { id: "jeruk", name: "Jeruk Manis", calories: 47, protein: 0.9, fat: 0.1, carbs: 12, fiber: 2.4, category: "Buah", icon: "🍊", price: 3000 },

  // --- MASAKAN LAIN ---
  { id: "rendang-sapi", name: "Rendang Sapi (1 potong)", calories: 195, protein: 18, fat: 12, carbs: 4, fiber: 0.5, category: "Masakan", icon: "🥘", price: 15000 },
  { id: "sate-ayam", name: "Sate Ayam (per tusuk)", calories: 35, protein: 4, fat: 2, carbs: 1, fiber: 0, category: "Masakan", icon: "🍡", price: 2000 },
  { id: "bakso-sapi", name: "Bakso Sapi (per butir)", calories: 50, protein: 4, fat: 3, carbs: 2, fiber: 0, category: "Masakan", icon: "🥣", price: 2000 },
  { id: "nasi-goreng", name: "Nasi Goreng Biasa", calories: 168, protein: 5, fat: 7, carbs: 22, fiber: 1, category: "Masakan", icon: "🍳", price: 12000 },

  // --- PELENGKAP ---
  { id: "sambal-terasi", name: "Sambal Terasi (1 sdm)", calories: 45, protein: 1, fat: 3.5, carbs: 3, fiber: 1, category: "Bumbu", icon: "🌶️", price: 1000 },
  { id: "kerupuk-kaleng", name: "Kerupuk Putih (1 buah)", calories: 100, protein: 1, fat: 6, carbs: 11, fiber: 0, category: "Masakan", icon: "🍪", price: 1000 },
  { id: "minyak-goreng", name: "Minyak Goreng (1 sdm)", calories: 120, protein: 0, fat: 14, carbs: 0, fiber: 0, category: "Lemak & Minyak", icon: "💧", price: 500 },
  
  // --- ANAK KOS FAVORITES ---
  { id: "ayam-geprek", name: "Ayam Geprek (1 porsi)", calories: 450, protein: 35, fat: 28, carbs: 12, fiber: 0, category: "Masakan", icon: "🍗", price: 15000 },
  { id: "mentimun", name: "Mentimun Segar", calories: 15, protein: 0.7, fat: 0.1, carbs: 3.6, fiber: 0.5, category: "Sayuran", icon: "🥒", price: 1000 },
  { id: "kuah-soto", name: "Kuah Soto Ayam", calories: 60, protein: 4, fat: 4, carbs: 2, fiber: 0, category: "Masakan", icon: "🥣", price: 3000 },
  { id: "ayam-suwir", name: "Ayam Suwir (Soto)", calories: 165, protein: 31, fat: 3.6, carbs: 0, fiber: 0, category: "Protein Hewani", icon: "🍗", price: 5000 },
  { id: "soun", name: "Soun (Bihun)", calories: 175, protein: 0.2, fat: 0.1, carbs: 43, fiber: 0.1, category: "Karbohidrat", icon: "🍜", price: 2000 },
  { id: "bubur-ayam", name: "Bubur Ayam (Polos)", calories: 155, protein: 2, fat: 0.3, carbs: 36, fiber: 0.4, category: "Karbohidrat", icon: "🥣", price: 5000 },
  { id: "cakwe", name: "Cakwe (1 buah)", calories: 120, protein: 2, fat: 6, carbs: 15, fiber: 0.5, category: "Protein Nabati", icon: "🥖", price: 1500 },
  { id: "kerupuk-udang", name: "Kerupuk Udang", calories: 150, protein: 1, fat: 9, carbs: 16, fiber: 0, category: "Masakan", icon: "🍪", price: 2000 },
  { id: "sambal-bawang", name: "Sambal Bawang (Geprek)", calories: 60, protein: 0.5, fat: 6, carbs: 1, fiber: 0.5, category: "Bumbu", icon: "🌶️", price: 1000 },
  { id: "nasi-kuning", name: "Nasi Kuning", calories: 150, protein: 3, fat: 4, carbs: 26, fiber: 0.5, category: "Karbohidrat", icon: "🍚", price: 5000 },
];
