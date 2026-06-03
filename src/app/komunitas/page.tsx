"use client";

import { mockCommunityMenus } from "@/data/mockCommunity";
import { ingredients } from "@/data/ingredients";
import { Heart, User, Share2, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function KomunitasPage() {
  const router = useRouter();

  const handleCopyMenu = (menuId: string) => {
    const menu = mockCommunityMenus.find((m) => m.id === menuId);
    if (menu) {
      const itemsToLoad = menu.items.map((item) => {
        const ingredient = ingredients.find((i) => i.id === item.ingredientId);
        return { ...ingredient, weight: item.weight };
      });
      
      // Save to a temporary load key in localStorage
      localStorage.setItem("gigizi_temp_load", JSON.stringify(itemsToLoad));
      router.push("/calculator?load=temp");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-text-dark mb-6">
          Pilihan <span className="text-primary italic">Komunitas</span>
        </h1>
        <p className="text-xl text-text-dark/70 max-w-2xl mx-auto italic leading-relaxed">
          Temukan inspirasi menu sehat dari pengguna GIGIZI lainnya. 
          Satu klik untuk mulai menghitung nutrisinya.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {mockCommunityMenus.map((menu, idx) => (
          <motion.div
            key={menu.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[3rem] overflow-hidden border border-text-dark/5 shadow-sm hover:shadow-xl transition-all group flex flex-col"
          >
            <div className="p-8 flex-grow">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-bold text-text-dark">{menu.author}</div>
                    <div className="text-[10px] uppercase font-space-mono text-text-dark/40">Kontributor</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-accent bg-accent/5 px-3 py-1 rounded-full">
                  <Heart className="w-4 h-4 fill-accent" />
                  <span className="text-sm font-bold">{menu.likes}</span>
                </div>
              </div>

              <h3 className="text-2xl font-playfair font-bold text-text-dark mb-3 group-hover:text-primary transition-colors">
                {menu.title}
              </h3>
              <p className="text-text-dark/60 text-sm mb-6 leading-relaxed italic">
                "{menu.description}"
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {menu.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-space-mono font-bold uppercase bg-text-dark/5 text-text-dark/50 px-3 py-1 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="space-y-3 mb-8">
                {menu.items.slice(0, 3).map((item) => {
                  const ing = ingredients.find((i) => i.id === item.ingredientId);
                  return (
                    <div key={item.ingredientId} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span>{ing?.icon}</span>
                        <span className="text-text-dark/80">{ing?.name}</span>
                      </div>
                      <span className="font-space-mono text-text-dark/40">{item.weight}g</span>
                    </div>
                  );
                })}
                {menu.items.length > 3 && (
                  <div className="text-xs text-text-dark/30 font-space-mono">
                    + {menu.items.length - 3} bahan lainnya
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => handleCopyMenu(menu.id)}
              className="w-full py-6 bg-primary text-background-warm font-bold text-lg flex items-center justify-center gap-3 group-hover:bg-primary/90 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Gunakan Menu Ini
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>

      <section className="mt-24 py-20 bg-secondary/5 rounded-[4rem] text-center border border-secondary/10">
        <h2 className="text-3xl font-playfair font-bold text-text-dark mb-4">
          Ingin Berbagi Menu Anda?
        </h2>
        <p className="text-text-dark/60 max-w-xl mx-auto mb-8 italic">
          Simpan menu Anda di Kalkulator dan bagikan kepada komunitas untuk menginspirasi orang lain hidup lebih sehat.
        </p>
        <div className="flex justify-center gap-4">
          <Share2 className="w-12 h-12 text-secondary opacity-20" />
        </div>
      </section>
    </div>
  );
}
