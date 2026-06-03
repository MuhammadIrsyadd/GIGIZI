"use client";

import { useState, useMemo } from "react";
import { ingredients } from "@/data/ingredients";
import { Search, ChevronRight, Filter, Info } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  "Semua",
  "Karbohidrat",
  "Protein Hewani",
  "Protein Nabati",
  "Sayuran",
  "Buah",
  "Masakan",
  "Lemak & Minyak",
  "Bumbu",
];

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredIngredients = useMemo(() => {
    return ingredients.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "Semua" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
          Database <span className="text-primary italic">Bahan</span>
        </h1>
        <p className="text-foreground/70 max-w-xl mx-auto italic">
          Jelajahi informasi gizi lengkap dari ratusan bahan makanan lokal
          Indonesia. Data dihitung per 100 gram.
        </p>
      </header>

      {/* Data Source Transparency & Disclaimer */}
      <section className="mb-12 bg-primary/5 border border-primary/10 p-8 rounded-[3rem]">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Info className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-playfair font-bold text-text-dark mb-3">
              Mengenai Akurasi & Sumber Data
            </h2>
            <div className="text-sm text-text-dark/70 space-y-4 leading-relaxed italic">
              <p>
                Informasi gizi di piring digital Anda diambil dari sumber terpercaya seperti 
                <strong> TKPI (Tabel Komposisi Pangan Indonesia) </strong> milik Kemenkes RI dan 
                <strong> USDA FoodData Central</strong>.
              </p>
              <p>
                Penting untuk dipahami bahwa nilai gizi pada <strong>masakan jadi </strong> (seperti Rendang atau Orek Tempe) 
                adalah <strong>estimasi rata-rata</strong>. Kandungan kalori nyata bisa berbeda tergantung pada metode memasak, 
                jumlah minyak, dan bumbu spesifik yang digunakan oleh setiap warung atau dapur.
              </p>
              <p className="not-italic font-bold text-primary">
                GIGIZI hadir sebagai alat edukasi dan panduan awal, bukan sebagai referensi medis mutlak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            placeholder="Cari dalam database..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-text-dark/10 rounded-2xl focus:outline-none focus:border-primary transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-5 h-5 text-foreground/40 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-primary text-background-warm shadow-md"
                  : "bg-white text-foreground/60 hover:bg-text-dark/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Database Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIngredients.map((item) => (
          <motion.div
            layout
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-3xl border border-text-dark/5 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl p-3 bg-background-warm rounded-2xl group-hover:rotate-6 transition-transform">
                {item.icon}
              </span>
              <div>
                <h3 className="font-bold text-lg text-foreground">{item.name}</h3>
                <span className="text-[10px] uppercase font-space-mono text-foreground/40 tracking-widest">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background-warm/50 p-3 rounded-xl border border-text-dark/5 text-center">
                <div className="text-[10px] uppercase font-space-mono text-foreground/40 mb-1">
                  Kalori
                </div>
                <div className="font-bold text-foreground">
                  {item.calories} <span className="text-[10px] font-normal opacity-50">kkal</span>
                </div>
              </div>
              <div className="bg-background-warm/50 p-3 rounded-xl border border-text-dark/5 text-center">
                <div className="text-[10px] uppercase font-space-mono text-primary mb-1">
                  Protein
                </div>
                <div className="font-bold text-foreground">
                  {item.protein} <span className="text-[10px] font-normal opacity-50">g</span>
                </div>
              </div>
              <div className="bg-background-warm/50 p-3 rounded-xl border border-text-dark/5 text-center">
                <div className="text-[10px] uppercase font-space-mono text-secondary mb-1">
                  Lemak
                </div>
                <div className="font-bold text-foreground">
                  {item.fat} <span className="text-[10px] font-normal opacity-50">g</span>
                </div>
              </div>
              <div className="bg-background-warm/50 p-3 rounded-xl border border-text-dark/5 text-center">
                <div className="text-[10px] uppercase font-space-mono text-accent mb-1">
                  Karbo
                </div>
                <div className="font-bold text-foreground">
                  {item.carbs} <span className="text-[10px] font-normal opacity-50">g</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredIngredients.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-text-dark/10">
          <p className="text-foreground/40 italic">
            Bahan tidak ditemukan. Coba gunakan kata kunci lain.
          </p>
        </div>
      )}
    </div>
  );
}
