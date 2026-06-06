"use client";

import { useState } from "react";
import { Leaf, Thermometer, ShieldAlert, Zap, Moon, Coffee, HeartPulse, Search, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Remedy {
  id: string;
  condition: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  recommendations: {
    item: string;
    reason: string;
  }[];
  tips: string;
}

const REMEDIES: Remedy[] = [
  {
    id: "masuk-angin",
    condition: "Masuk Angin",
    icon: <Thermometer className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-600 border-blue-200",
    description: "Tubuh terasa pegal, perut kembung, dan kedinginan.",
    recommendations: [
      { item: "Jahe Geprek", reason: "Memberikan rasa hangat dan meredakan mual." },
      { item: "Madu", reason: "Meningkatkan stamina tubuh." },
      { item: "Sayur Asem", reason: "Segar dan membantu membangkitkan selera makan." }
    ],
    tips: "Hindari minuman es dan pastikan istirahat cukup dengan pakaian hangat."
  },
  {
    id: "sariawan",
    condition: "Sariawan",
    icon: <ShieldAlert className="w-6 h-6" />,
    color: "bg-red-100 text-red-600 border-red-200",
    description: "Luka kecil di mulut yang perih saat makan.",
    recommendations: [
      { item: "Pepaya", reason: "Kaya vitamin C untuk membantu pemulihan jaringan." },
      { item: "Jeruk Manis", reason: "Sumber vitamin C alami." },
      { item: "Air Kelapa", reason: "Membantu mendinginkan suhu tubuh internal." }
    ],
    tips: "Hindari makanan pedas dan kerupuk yang bisa melukai sariawan lebih lanjut."
  },
  {
    id: "lemas",
    condition: "Kurang Energi / Lemas",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-yellow-100 text-yellow-600 border-yellow-200",
    description: "Sulit konsentrasi dan merasa lelah sepanjang hari.",
    recommendations: [
      { item: "Pisang Ambon", reason: "Karbohidrat cepat serap untuk energi instan." },
      { item: "Telur Rebus", reason: "Protein berkualitas tinggi untuk tenaga tahan lama." },
      { item: "Kacang Tanah", reason: "Mengandung magnesium untuk fungsi otot." }
    ],
    tips: "Pastikan hidrasi cukup. Lemas seringkali disebabkan oleh dehidrasi ringan."
  },
  {
    id: "insomnia",
    condition: "Susah Tidur",
    icon: <Moon className="w-6 h-6" />,
    color: "bg-indigo-100 text-indigo-600 border-indigo-200",
    description: "Pikiran gelisah dan sulit memejamkan mata di malam hari.",
    recommendations: [
      { item: "Susu Hangat", reason: "Mengandung tryptophan yang membantu rileks." },
      { item: "Pisang", reason: "Membantu otot rileks sebelum tidur." },
      { item: "Alpukat", reason: "Lemak sehat yang membantu regulasi hormon tidur." }
    ],
    tips: "Matikan layar HP 30 menit sebelum tidur dan redupkan lampu kamar."
  },
  {
    id: "pencernaan",
    condition: "Sembelit",
    icon: <HeartPulse className="w-6 h-6" />,
    color: "bg-green-100 text-green-600 border-green-200",
    description: "Buang air besar tidak lancar dan perut terasa penuh.",
    recommendations: [
      { item: "Pepaya Matang", reason: "Enzim papain sangat ampuh melancarkan pencernaan." },
      { item: "Sayur Bayam/Kangkung", reason: "Serat tinggi untuk mendorong kotoran." },
      { item: "Air Putih", reason: "Melunakkan feses agar mudah dikeluarkan." }
    ],
    tips: "Coba lakukan jalan kaki ringan 15 menit untuk merangsang gerak usus."
  }
];

export default function ApotekAlamiPage() {
  const [selected, setSelected] = useState<Remedy | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
          <Leaf className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark mb-4">
          Apotek <span className="text-primary italic">Alami</span>
        </h1>
        <p className="text-text-dark/60 italic max-w-2xl mx-auto">
          "Dapur Anda adalah apotek terbaik. Temukan solusi alami untuk keluhan harian dari bahan makanan sekitar."
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Remedy List (Cabinet) */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-text-dark/40 mb-4 px-2">Pilih Keluhan</h3>
          {REMEDIES.map((remedy) => (
            <button
              key={remedy.id}
              onClick={() => setSelected(remedy)}
              className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                selected?.id === remedy.id
                  ? "bg-primary border-primary text-white shadow-lg scale-105"
                  : "bg-white border-text-dark/5 text-text-dark hover:border-primary/20"
              }`}
            >
              <div className={`p-2 rounded-xl ${selected?.id === remedy.id ? "bg-white/20" : remedy.color.split(' ')[0]}`}>
                {remedy.icon}
              </div>
              <span className="font-bold">{remedy.condition}</span>
            </button>
          ))}
        </div>

        {/* Prescription Detail */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-[3rem] border border-dashed border-text-dark/10 p-12 text-center"
              >
                <Search className="w-12 h-12 text-text-dark/10 mb-4" />
                <p className="text-text-dark/40 italic">Pilih salah satu keluhan di samping untuk melihat resep alami dari dapur.</p>
              </motion.div>
            ) : (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[3rem] border border-text-dark/5 shadow-sm overflow-hidden"
              >
                <div className={`p-10 ${selected.color.split(' ')[0]} border-b border-inherit`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-inherit">
                      {selected.icon}
                    </div>
                    <h2 className="text-3xl font-playfair font-bold">{selected.condition}</h2>
                  </div>
                  <p className="text-sm opacity-80 leading-relaxed font-medium">
                    {selected.description}
                  </p>
                </div>

                <div className="p-10 space-y-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-dark/40 mb-6 flex items-center gap-2">
                      <Coffee className="w-4 h-4" /> Resep Alami Dapur
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selected.recommendations.map((rec, idx) => (
                        <div key={idx} className="p-6 bg-background-warm rounded-2xl border border-text-dark/5 hover:border-primary/20 transition-colors">
                          <div className="font-bold text-text-dark mb-1">{rec.item}</div>
                          <p className="text-xs text-text-dark/60 italic">{rec.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                    <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Tips Tambahan
                    </h4>
                    <p className="text-sm text-text-dark/70 leading-relaxed italic">
                      "{selected.tips}"
                    </p>
                  </div>
                </div>

                <div className="bg-text-dark/5 p-4 text-center">
                  <p className="text-[10px] text-text-dark/30 font-space-mono uppercase">
                    Apotek Alami — Bukan pengganti saran medis profesional.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
