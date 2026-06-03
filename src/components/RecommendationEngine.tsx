"use client";

import { useMemo } from "react";
import { Lightbulb, Plus } from "lucide-react";
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
  const recommendations = useMemo(() => {
    const list: { title: string; desc: string; ingredientId?: string }[] = [];

    if (currentItems.length === 0) {
      list.push({
        title: "Piring Kosong?",
        desc: "Mulai dengan Karbohidrat kompleks seperti Nasi Merah atau Singkong.",
        ingredientId: "nasi-merah",
      });
    } else {
      // Check for protein
      if (totals.protein < 10) {
        list.push({
          title: "Butuh Protein?",
          desc: "Tambahkan Tempe atau Dada Ayam untuk memenuhi kebutuhan proteinmu.",
          ingredientId: "tempe",
        });
      }

      // Check for fiber
      if (totals.fiber < 2) {
        list.push({
          title: "Kurang Serat?",
          desc: "Sayuran hijau seperti Bayam atau Kangkung sangat baik untuk pencernaan.",
          ingredientId: "bayam",
        });
      }

      // Check for fruit
      const hasFruit = currentItems.some((item) => {
        const ing = ingredients.find((i) => i.id === item.id);
        return ing?.category === "Buah";
      });
      if (!hasFruit) {
        list.push({
          title: "Pencuci Mulut?",
          desc: "Pepaya atau Pisang adalah pilihan buah lokal yang kaya vitamin.",
          ingredientId: "pepaya",
        });
      }
    }

    return list.slice(0, 2); // Show max 2
  }, [currentItems, totals]);

  if (recommendations.length === 0) return null;

  return (
    <div className="bg-secondary/10 p-6 rounded-[2rem] border border-secondary/20 space-y-4">
      <div className="flex items-center gap-2 text-secondary">
        <Lightbulb className="w-5 h-5 fill-secondary/20" />
        <h4 className="font-bold text-sm uppercase tracking-widest">Saran GIGIZI</h4>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="flex-grow">
              <div className="font-bold text-text-dark text-sm">{rec.title}</div>
              <p className="text-xs text-text-dark/60 leading-relaxed italic">
                {rec.desc}
              </p>
            </div>
            {rec.ingredientId && (
              <button
                onClick={() => {
                  const ing = ingredients.find((i) => i.id === rec.ingredientId);
                  if (ing) onAdd(ing);
                }}
                className="p-2 bg-white text-secondary rounded-xl hover:bg-secondary hover:text-white transition-all shadow-sm border border-secondary/10"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
