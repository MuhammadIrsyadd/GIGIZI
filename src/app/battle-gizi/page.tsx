"use client";

import { useState, useMemo } from "react";
import { ingredients, Ingredient } from "@/data/ingredients";
import { Search, Swords, Info, ArrowRight, Zap, TrendingDown, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";

export default function BattleGiziPage() {
  const [search1, setSearchQuery1] = useState("");
  const [search2, setSearchQuery2] = useState("");
  const [item1, setItem1] = useState<Ingredient | null>(null);
  const [item2, setItem2] = useState<Ingredient | null>(null);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const fuse = useMemo(() => new Fuse(ingredients, { keys: ["name"], threshold: 0.3 }), []);

  const results1 = useMemo(() => search1 ? fuse.search(search1).slice(0, 5).map(r => r.item) : [], [search1, fuse]);
  const results2 = useMemo(() => search2 ? fuse.search(search2).slice(0, 5).map(r => r.item) : [], [search2, fuse]);

  const compare = (val1: number, val2: number, lowerIsBetter = false) => {
    if (val1 === val2) return "neutral";
    if (lowerIsBetter) return val1 < val2 ? "win" : "loss";
    return val1 > val2 ? "win" : "loss";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4">
          <Swords className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark mb-4">
          Battle <span className="text-accent italic">Gizi</span>
        </h1>
        <p className="text-text-dark/60 italic max-w-2xl mx-auto">
          "Bandingkan dua makanan secara visual. Temukan mana yang lebih bernutrisi untuk piring Anda hari ini."
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-start">
        {/* Item 1 Selection */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dark/30" />
            <input
              type="text"
              placeholder="Cari makanan pertama..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-text-dark/10 rounded-2xl focus:outline-none focus:border-primary transition-all shadow-sm"
              value={search1}
              onChange={(e) => { setSearchQuery1(e.target.value); setShow1(true); }}
              onFocus={() => setShow1(true)}
            />
            <AnimatePresence>
              {show1 && results1.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute z-20 w-full mt-2 bg-white border border-text-dark/10 rounded-2xl shadow-xl overflow-hidden">
                  {results1.map(ing => (
                    <button key={ing.id} onClick={() => { setItem1(ing); setShow1(false); setSearchQuery1(""); }} className="w-full px-6 py-4 text-left hover:bg-primary/5 transition-colors flex items-center gap-3 border-b border-text-dark/5 last:border-0">
                      <span>{ing.icon}</span>
                      <span className="font-bold">{ing.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {item1 && (
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
              <div className="relative z-10 flex items-center gap-4 mb-6">
                <span className="text-5xl p-4 bg-white/20 rounded-3xl backdrop-blur-sm">{item1.icon}</span>
                <h3 className="text-2xl font-playfair font-bold leading-tight">{item1.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <div className="text-[10px] uppercase font-space-mono opacity-60 mb-1">Kalori</div>
                  <div className="text-2xl font-bold">{item1.calories} <span className="text-xs font-normal">kkal</span></div>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <div className="text-[10px] uppercase font-space-mono opacity-60 mb-1">Protein</div>
                  <div className="text-2xl font-bold">{item1.protein}g</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* VS Divider */}
        <div className="lg:col-span-1 flex lg:flex-col items-center justify-center py-4">
          <div className="h-px lg:w-px flex-grow bg-text-dark/10"></div>
          <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-playfair font-bold italic shadow-lg z-10">VS</div>
          <div className="h-px lg:w-px flex-grow bg-text-dark/10"></div>
        </div>

        {/* Item 2 Selection */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dark/30" />
            <input
              type="text"
              placeholder="Cari makanan kedua..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-text-dark/10 rounded-2xl focus:outline-none focus:border-primary transition-all shadow-sm"
              value={search2}
              onChange={(e) => { setSearchQuery2(e.target.value); setShow2(true); }}
              onFocus={() => setShow2(true)}
            />
            <AnimatePresence>
              {show2 && results2.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute z-20 w-full mt-2 bg-white border border-text-dark/10 rounded-2xl shadow-xl overflow-hidden">
                  {results2.map(ing => (
                    <button key={ing.id} onClick={() => { setItem2(ing); setShow2(false); setSearchQuery2(""); }} className="w-full px-6 py-4 text-left hover:bg-primary/5 transition-colors flex items-center gap-3 border-b border-text-dark/5 last:border-0">
                      <span>{ing.icon}</span>
                      <span className="font-bold">{ing.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {item2 && (
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-secondary text-text-dark p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
              <div className="relative z-10 flex items-center gap-4 mb-6">
                <span className="text-5xl p-4 bg-white/40 rounded-3xl backdrop-blur-sm">{item2.icon}</span>
                <h3 className="text-2xl font-playfair font-bold leading-tight">{item2.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/40 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                  <div className="text-[10px] uppercase font-space-mono opacity-60 mb-1">Kalori</div>
                  <div className="text-2xl font-bold">{item2.calories} <span className="text-xs font-normal">kkal</span></div>
                </div>
                <div className="bg-white/40 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                  <div className="text-[10px] uppercase font-space-mono opacity-60 mb-1">Protein</div>
                  <div className="text-2xl font-bold">{item2.protein}g</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Battle Report */}
      <AnimatePresence>
        {item1 && item2 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-16 space-y-8">
            <h3 className="text-2xl font-playfair font-bold text-text-dark text-center">Analisis Perbandingan (per 100g)</h3>
            
            <div className="bg-white rounded-[3rem] border border-text-dark/5 shadow-sm p-8 md:p-12">
              <div className="space-y-12">
                {/* Calories Row */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-4 font-bold text-sm uppercase font-space-mono text-text-dark/40">
                    <span>{item1.name}</span>
                    <span className="text-text-dark">KALORI</span>
                    <span>{item2.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-8 bg-background-warm rounded-full overflow-hidden relative">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(item1.calories / (item1.calories + item2.calories)) * 100}%` }} className={cn("h-full transition-all flex items-center justify-end px-4 text-xs font-bold", item1.calories < item2.calories ? "bg-primary text-white" : "bg-accent text-white")}>
                        {item1.calories}
                      </motion.div>
                    </div>
                    <div className="flex-1 h-8 bg-background-warm rounded-full overflow-hidden relative flex flex-row-reverse">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(item2.calories / (item1.calories + item2.calories)) * 100}%` }} className={cn("h-full transition-all flex items-center justify-end px-4 text-xs font-bold flex-row-reverse", item2.calories < item1.calories ? "bg-primary text-white" : "bg-accent text-white")}>
                        {item2.calories}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Protein Row */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-4 font-bold text-sm uppercase font-space-mono text-text-dark/40">
                    <span>{item1.name}</span>
                    <span className="text-text-dark">PROTEIN</span>
                    <span>{item2.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-8 bg-background-warm rounded-full overflow-hidden relative">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(item1.protein / (item1.protein + item2.protein || 1)) * 100}%` }} className={cn("h-full transition-all flex items-center justify-end px-4 text-xs font-bold", item1.protein > item2.protein ? "bg-primary text-white" : "bg-text-dark/10 text-text-dark/40")}>
                        {item1.protein}g
                      </motion.div>
                    </div>
                    <div className="flex-1 h-8 bg-background-warm rounded-full overflow-hidden relative flex flex-row-reverse">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(item2.protein / (item1.protein + item2.protein || 1)) * 100}%` }} className={cn("h-full transition-all flex items-center justify-end px-4 text-xs font-bold flex-row-reverse", item2.protein > item1.protein ? "bg-primary text-white" : "bg-text-dark/10 text-text-dark/40")}>
                        {item2.protein}g
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Fiber Row */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-4 font-bold text-sm uppercase font-space-mono text-text-dark/40">
                    <span>{item1.name}</span>
                    <span className="text-text-dark">SERAT</span>
                    <span>{item2.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-8 bg-background-warm rounded-full overflow-hidden relative">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(item1.fiber / (item1.fiber + item2.fiber || 1)) * 100}%` }} className={cn("h-full transition-all flex items-center justify-end px-4 text-xs font-bold", item1.fiber > item2.fiber ? "bg-primary text-white" : "bg-text-dark/10 text-text-dark/40")}>
                        {item1.fiber}g
                      </motion.div>
                    </div>
                    <div className="flex-1 h-8 bg-background-warm rounded-full overflow-hidden relative flex flex-row-reverse">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(item2.fiber / (item1.fiber + item2.fiber || 1)) * 100}%` }} className={cn("h-full transition-all flex items-center justify-end px-4 text-xs font-bold flex-row-reverse", item2.fiber > item1.fiber ? "bg-primary text-white" : "bg-text-dark/10 text-text-dark/40")}>
                        {item2.fiber}g
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 p-8 bg-primary/5 rounded-[2rem] border border-primary/10 text-center italic text-sm text-text-dark/70">
                <Zap className="w-6 h-6 text-primary mx-auto mb-4" />
                "Kesimpulan: {item1.calories < item2.calories ? item1.name : item2.name} lebih rendah kalori, sementara {item1.protein > item2.protein ? item1.name : item2.name} memiliki protein lebih tinggi. Pilih sesuai kebutuhan energi Anda!"
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
