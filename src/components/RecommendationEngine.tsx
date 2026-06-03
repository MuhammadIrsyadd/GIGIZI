"use client";

import { useMemo } from "react";
import { Lightbulb, Plus, AlertTriangle, CheckCircle2, Info } from "lucide-react";
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

export const RecommendationEngine = ({
  currentItems,
  totals,
  onAdd,
}: RecommendationEngineProps) => {
  const feedback = useMemo(() => {
    const list: { type: "info" | "warning" | "success"; title: string; desc: string; ingredientId?: string }[] = [];

    if (currentItems.length === 0) {
      list.push({
        type: "info",
        title: "Piring Kosong?",
        desc: "Mulai dengan Karbohidrat kompleks seperti Nasi Merah atau Singkong.",
        ingredientId: "nasi-merah",
      });
      return list;
    }

    // --- WARNINGS (Excessive Macros) ---
    
    // High Calories (Example threshold for single meal > 800 kcal)
    if (totals.calories > 800) {
      list.push({
        type: "warning",
        title: "Kalori Cukup Tinggi",
        desc: "Porsi ini mengandung >800 kkal. Jika ini bukan satu-satunya makanan beratmu, pertimbangkan untuk mengurangi porsi atau bahan berminyak.",
      });
    }

    // High Carbs (> 100g in a single meal)
    if (totals.carbs > 100) {
      list.push({
        type: "warning",
        title: "Karbohidrat Berlebih",
        desc: "Karbohidratmu sangat tinggi. Terlalu banyak karbohidrat bisa membuat cepat mengantuk. Coba kurangi nasi atau mie.",
      });
    }

    // High Fat (> 35g in a single meal)
    if (totals.fat > 35) {
      list.push({
        type: "warning",
        title: "Lemak Cukup Banyak",
        desc: "Kandungan lemak tinggi. Batasi gorengan atau masakan bersantan kental agar jantung tetap sehat.",
      });
    }

    // --- SUGGESTIONS (Missing Macros) ---

    // Low Protein
    if (totals.protein < 15) {
      list.push({
        type: "info",
        title: "Butuh Protein?",
        desc: "Proteinmu masih rendah. Tambahkan Tempe, Tahu, atau Dada Ayam agar otot tetap terjaga.",
        ingredientId: "tempe",
      });
    }

    // Low Fiber
    if (totals.fiber < 3) {
      list.push({
        type: "info",
        title: "Kurang Serat?",
        desc: "Tambahkan sayuran hijau seperti Bayam atau Kangkung untuk pencernaan yang lebih lancar.",
        ingredientId: "bayam",
      });
    }

    // --- SUCCESS (Balanced Meal) ---
    const isBalanced = 
      totals.calories >= 400 && 
      totals.calories <= 750 && 
      totals.protein >= 20 && 
      totals.fiber >= 5 && 
      totals.fat <= 30;

    if (isBalanced) {
      // Clear warnings if it's perfectly balanced according to these specific rules
      // (Or we can just append it as a top priority)
      return [{
        type: "success",
        title: "Piring Sempurna!",
        desc: "Luar biasa! Kombinasi nutrisimu sudah sangat seimbang antara kalori, protein, dan serat. Pertahankan pola ini!",
      }];
    }

    return list.slice(0, 3); // Show top 3 relevant pieces of feedback
  }, [currentItems, totals]);

  if (feedback.length === 0) return null;

  return (
    <div className="space-y-4">
      {feedback.map((item, idx) => (
        <div 
          key={idx} 
          className={cn(
            "p-6 rounded-[2rem] border transition-all",
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
              {item.type === "success" ? "Status Gizi" : "Saran GIGIZI"}
            </h4>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-grow">
              <div className="font-bold text-text-dark text-base mb-1">{item.title}</div>
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
                title="Tambahkan Bahan"
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

// Helper function to handle conditional classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
