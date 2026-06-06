"use client";

import { useMemo } from "react";
import { Lightbulb, Plus, AlertTriangle, Sparkles, Utensils, Zap } from "lucide-react";
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
  type: "info" | "warning" | "success" | "neutral";
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

    // --- 1. Empty State ---
    if (currentItems.length === 0) {
      list.push({
        type: "info",
        title: "Dapur Siap Digunakan!",
        desc: "Tambahkan nasi atau sumber karbohidrat favoritmu sebagai langkah pertama menuju hidup sehat.",
        ingredientId: "nasi-merah",
      });
      return list;
    }

    // --- 2. Context-Aware Pairing Logic (Aggressive) ---
    const hasRendang = currentItems.some(i => i.id === "rendang-sapi");
    const hasFriedFood = currentItems.some(i => i.id === "ayam-goreng-warteg" || i.id === "tempe");
    const hasVeggie = currentItems.some(i => ingredients.find(ing => ing.id === i.id)?.category === "Sayuran");
    const hasHighFat = totals.fat > 30;

    if (hasRendang && !hasVeggie) {
        list.push({
            type: "warning",
            title: "Rendangmu Butuh Pasangan!",
            desc: "Rendang sangat kaya lemak. Tambahkan Sayur Asem atau Tumis Kangkung agar piringmu lebih seimbang dan segar.",
            ingredientId: "sayur-asem"
        });
    } else if (hasHighFat && !hasVeggie) {
        list.push({
            type: "neutral",
            title: "Netralisir Lemak",
            desc: "Piringmu cukup berminyak. Tambahkan sayuran hijau untuk membantu melancarkan pencernaan.",
            ingredientId: "bayam"
        });
    } else if (hasFriedFood && !hasVeggie) {
        list.push({
            type: "neutral",
            title: "Gorengan Saja Belum Cukup",
            desc: "Gorengan memang nikmat, tapi tambahkan sayuran agar asupan seratmu tidak kosong sama sekali.",
            ingredientId: "kangkung"
        });
    }

    // --- 3. Perfect Plate Check ---
    const isPerfect = 
      totals.calories >= 450 && 
      totals.calories <= 750 && 
      totals.protein >= 20 && 
      totals.fiber >= 5 && 
      totals.fat >= 10 &&
      totals.fat <= 30 &&
      totals.carbs >= 45;

    if (isPerfect) {
      return [{
        type: "success",
        title: "Karya Seni Nutrisi!",
        desc: "Selamat! Piring ini adalah definisi gizi seimbang. Porsi kalori, makro, dan serat Anda sudah dalam sinkronisasi sempurna.",
      } as FeedbackItem];
    }

    // --- 4. Warnings (Excessive) ---
    if (totals.calories > 900) {
        list.push({ type: "warning", title: "Porsi Sangat Besar", desc: "Satu porsi ini cukup berat. Jika ini makan siang, pastikan aktivitas fisikmu juga tinggi hari ini." });
    }
    if (totals.carbs > 120) {
        list.push({ type: "warning", title: "Waspada 'Food Coma'", desc: "Karbohidrat yang sangat tinggi bisa memicu lonjakan gula darah dan membuatmu sangat mengantuk." });
    }

    // --- 5. Critical Suggestions (Missing) ---
    if (totals.protein < 10) {
      list.push({
        type: "info",
        title: "Butuh Pondasi Protein",
        desc: "Protein membantu rasa kenyang lebih lama. Coba tambahkan Tempe atau Telur.",
        ingredientId: "tempe",
      });
    }
    if (totals.fiber < 2 && !hasVeggie) {
      list.push({
        type: "info",
        title: "Mana Sayurnya?",
        desc: "Serat sangat penting. Tambahkan Sayur Asem atau Tumis Kangkung agar pencernaanmu lancar.",
        ingredientId: "kangkung",
      });
    }

    // --- 6. Educational Tips ---
    if (list.length < 3) {
        const hasFruit = currentItems.some(i => ingredients.find(ing => ing.id === i.id)?.category === "Buah");
        if (!hasFruit) {
            list.push({
                type: "neutral",
                title: "Tips Pencuci Mulut",
                desc: "Tambahkan Pepaya atau Pisang untuk asupan vitamin alami setelah makan.",
                ingredientId: "pepaya"
            });
        }
        
        if (totals.calories > 0 && !isPerfect && list.length < 3) {
            list.push({
                type: "neutral",
                title: "Menuju Sempurna",
                desc: "Menu Anda sudah lumayan baik. Sesuaikan porsi serat atau protein untuk mencapai 'Piring Sempurna'.",
            });
        }
    }

    return list.slice(0, 3);
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
            item.type === "info" && "bg-secondary/10 border-secondary/20",
            item.type === "neutral" && "bg-white border-text-dark/5 shadow-sm"
          )}
        >
          <div className="flex items-center gap-3 mb-3">
            {item.type === "success" && <Sparkles className="w-5 h-5 text-primary" />}
            {item.type === "warning" && <AlertTriangle className="w-5 h-5 text-accent" />}
            {item.type === "info" && <Lightbulb className="w-5 h-5 text-secondary" />}
            {item.type === "neutral" && <Utensils className="w-5 h-5 text-text-dark/40" />}
            
            <h4 className={cn(
              "font-bold text-sm uppercase tracking-widest",
              item.type === "success" && "text-primary",
              item.type === "warning" && "text-accent",
              item.type === "info" && "text-secondary",
              item.type === "neutral" && "text-text-dark/40"
            )}>
              {item.type === "success" ? "Pencapaian" : item.type === "neutral" ? "Tips Pasangan" : "Panduan GIZI"}
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
