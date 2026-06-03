"use client";

import { useMemo } from "react";
import { Lightbulb, Plus, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Ingredient, ingredients } from "@/data/ingredients";

interface RecommendationEngineProps {
  currentItems: { id: string; weight: number }[];
  totals: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
  };
  onAdd: (ingredient: Ingredient) => void;
}

interface FeedbackItem {
  type: "info" | "warning" | "success";
  title: string;
  desc: string;
  ingredientId?: string;
}

export const RecommendationEngine = ({
  currentItems,
  totals,
  onAdd,
}: RecommendationEngineProps) => {
  const feedback = useMemo(() => {
    const list: FeedbackItem[] = [];

    if (currentItems.length === 0) {
      list.push({
        type: "info",
        title: "Piring Kosong?",
        desc: "Mulai dengan Karbohidrat kompleks seperti Nasi Merah atau Singkong.",
        ingredientId: "nasi-merah",
      });
      return list;
    }

    // --- SUCCESS (Balanced Meal) logic ---
    const isBalanced = 
      totals.calories >= 350 && 
      totals.calories <= 800 && 
      totals.protein >= 15 && 
      totals.fiber >= 3 && 
      totals.fat <= 35 &&
      totals.carbs >= 40;

    if (isBalanced) {
      return [{
        type: "success",
        title: "Piring Sempurna!",
        desc: "Luar biasa! Menu ini sudah sangat seimbang. Kalori, protein, dan serat berada dalam rentang ideal untuk satu porsi makan.",
      } as FeedbackItem];
    }

    // --- WARNINGS (Excessive Macros) ---
    if (totals.calories > 850) {
      list.push({
        type: "warning",
        title: "Kalori Sangat Tinggi",
        desc: "Porsi ini melebihi 850 kkal. Jika ingin lebih sehat, coba kurangi porsi nasi atau gorengan.",
      });
    }

    if (totals.carbs > 110) {
      list.push({
        type: "warning",
        title: "Karbohidrat Tinggi",
        desc: "Terlalu banyak karbohidrat bisa membuat cepat mengantuk. Pertimbangkan kurangi porsi karbo Anda.",
      });
    }

    if (totals.fat > 40) {
      list.push({
        type: "warning",
        title: "Lemak Tinggi",
        desc: "Kandungan lemak cukup tinggi. Batasi masakan bersantan kental atau gorengan.",
      });
    }

    // --- SUGGESTIONS (Missing Macros) ---
    if (totals.protein < 15) {
      list.push({
        type: "info",
        title: "Butuh Protein?",
        desc: "Protein membantu rasa kenyang lebih lama. Coba tambahkan Tempe atau Telur.",
        ingredientId: "tempe",
      });
    }

    if (totals.fiber < 3) {
      list.push({
        type: "info",
        title: "Kurang Serat?",
        desc: "Sayuran hijau sangat penting untuk pencernaan. Coba tambahkan Bayam atau Kangkung.",
        ingredientId: "bayam",
      });
    }

    if (totals.carbs < 30) {
      list.push({
        type: "info",
        title: "Energi Rendah?",
        desc: "Karbohidrat adalah sumber energi utama. Coba tambahkan sedikit nasi atau singkong.",
        ingredientId: "nasi-putih",
      });
    }

    return list.slice(0, 2);
  }, [currentItems, totals]);

  if (feedback.length === 0) return null;

  return (
    <div className="space-y-4">
      {feedback.map((item, idx) => (
        <div 
          key={idx} 
          className={cn(
            "p-6 rounded-[2rem] border transition-all animate-in fade-in slide-in-from-bottom-2",
            item.type === "success" && "bg-primary/10 border-primary/20",
            item.type === "warning" && "bg-accent/10 border-accent/20",
            item.type === "info" && "bg-secondary/10 border-secondary/20"
          )}
        >
          <div className="flex items-center gap-3 mb-3">
            {item.type === "success" && <CheckCircle2 className="w-5 h-5 text-primary" />}
            {item.type === "warning" && <AlertTriangle className="w-5 h-5 text-accent" />}
            {item.type === "info" && <Lightbulb className="w-5 h-5 text-secondary" />}
            
            <h4 className={cn(
              "font-bold text-sm uppercase tracking-widest",
              item.type === "success" && "text-primary",
              item.type === "warning" && "text-accent",
              item.type === "info" && "text-secondary"
            )}>
              {item.type === "success" ? "Status Gizi: Luar Biasa" : "Panduan GIZI"}
            </h4>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-grow">
              <div className="font-bold text-text-dark text-lg mb-1">{item.title}</div>
              <p className="text-sm text-text-dark/70 leading-relaxed italic">
                {item.desc}
              </p>
            </div>
            {item.ingredientId && (
              <button
                onClick={() => {
                  const ing = ingredients.find((i) => i.id === item.ingredientId);
                  if (ing) onAdd(ing);
                }}
                className="p-3 bg-white text-secondary rounded-2xl hover:bg-secondary hover:text-white transition-all shadow-sm border border-secondary/10 group"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
