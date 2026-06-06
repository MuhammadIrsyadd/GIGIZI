"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { Ingredient } from "@/data/ingredients";
import Fuse from "fuse.js";
import {
  Search,
  Plus,
  Trash2,
  Calculator as CalcIcon,
  Info,
  Save,
  Download,
  X,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSearchParams, useRouter } from "next/navigation";
import { RecommendationEngine } from "@/components/RecommendationEngine";
import { ExportCard } from "@/components/ExportCard";
import { saveDailyLog } from "@/data/mockCommunity";
import { useIngredients } from "@/hooks/useIngredients";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SelectedIngredient extends Ingredient {
  weight: number;
}

interface SavedMenu {
  id: string;
  name: string;
  date: string;
  items: SelectedIngredient[];
  totalCalories: number;
}

const COLORS = ["#3D6B4F", "#F5A623", "#E8503A", "#2C1810"];

function CalculatorContent() {
  const { allIngredients } = useIngredients();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [savedMenus, setSavedMenus] = useState<SavedMenu[]>([]);
  const [showToast, setShowToast] = useState<string | null>(null);
  
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("gigizi_menus");
    if (stored) {
      try {
        setSavedMenus(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved menus", e);
      }
    }

    if (searchParams.get("load") === "temp") {
      const temp = localStorage.getItem("gigizi_temp_load");
      if (temp) {
        try {
          const items = JSON.parse(temp);
          setSelectedIngredients(items);
          setShowToast("Menu komunitas berhasil dimuat!");
          setTimeout(() => setShowToast(null), 3000);
          localStorage.removeItem("gigizi_temp_load");
          router.replace("/calculator");
        } catch (e) {
          console.error("Failed to load temp menu", e);
        }
      }
    }
  }, [searchParams, router]);

  const fuse = useMemo(
    () =>
      new Fuse(allIngredients, {
        keys: ["name", "category"],
        threshold: 0.3,
      }),
    [allIngredients]
  );

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, fuse]);

  const addIngredient = (ingredient: Ingredient) => {
    const exists = selectedIngredients.find((item) => item.id === ingredient.id);
    if (!exists) {
      setSelectedIngredients([...selectedIngredients, { ...ingredient, weight: 100 }]);
    }
    setSearchQuery("");
    setShowResults(false);
  };

  const removeIngredient = (id: string) => {
    setSelectedIngredients(selectedIngredients.filter((item) => item.id !== id));
  };

  const updateWeight = (id: string, weight: number) => {
    setSelectedIngredients(
      selectedIngredients.map((item) =>
        item.id === id ? { ...item, weight: isNaN(weight) ? 0 : Math.max(0, weight) } : item
      )
    );
  };

  const totals = useMemo(() => {
    return selectedIngredients.reduce(
      (acc, item) => {
        const factor = item.weight / 100;
        return {
          calories: acc.calories + item.calories * factor,
          protein: acc.protein + item.protein * factor,
          fat: acc.fat + item.fat * factor,
          carbs: acc.carbs + item.carbs * factor,
          fiber: acc.fiber + item.fiber * factor,
          price: acc.price + (item.price || 0) * factor,
        };
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0, fiber: 0, price: 0 }
    );
  }, [selectedIngredients]);

  const chartData = useMemo(() => {
    return [
      { name: "Protein", value: totals.protein },
      { name: "Lemak", value: totals.fat },
      { name: "Karbohidrat", value: totals.carbs },
    ].filter((item) => item.value > 0);
  }, [totals]);

  const getStatus = (val: number, type: 'protein' | 'fat' | 'carbs' | 'fiber' | 'calories') => {
    if (val === 0) return null;
    const thresholds = {
        protein: { min: 15, max: 30 },
        fat: { min: 5, max: 25 },
        carbs: { min: 40, max: 90 },
        fiber: { min: 4, max: 10 },
        calories: { min: 400, max: 750 }
    };
    const t = thresholds[type];
    if (val < t.min) return { label: "Kurang", color: "text-secondary", icon: <TrendingDown className="w-3 h-3" /> };
    if (val > t.max) return { label: "Berlebih", color: "text-accent", icon: <TrendingUp className="w-3 h-3" /> };
    return { label: "Ideal", color: "text-primary", icon: <Target className="w-3 h-3" /> };
  };

  const handleSaveMenu = () => {
    if (!menuName || selectedIngredients.length === 0) return;

    const newMenu: SavedMenu = {
      id: Date.now().toString(),
      name: menuName,
      date: new Date().toLocaleDateString("id-ID"),
      items: selectedIngredients,
      totalCalories: Math.round(totals.calories),
    };

    const updatedMenus = [newMenu, ...savedMenus];
    setSavedMenus(updatedMenus);
    localStorage.setItem("gigizi_menus", JSON.stringify(updatedMenus));
    
    saveDailyLog({
        totalCalories: Math.round(totals.calories),
        protein: Math.round(totals.protein),
        fat: Math.round(totals.fat),
        carbs: Math.round(totals.carbs)
    });
    
    setIsSaving(false);
    setMenuName("");
    setShowToast("Menu berhasil disimpan!");
    setTimeout(() => setShowToast(null), 3000);
  };

  const loadSavedMenu = (menu: SavedMenu) => {
    setSelectedIngredients(menu.items);
    setShowToast(`Memuat menu: ${menu.name}`);
    setTimeout(() => setShowToast(null), 3000);
  };

  const deleteSavedMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedMenus = savedMenus.filter((m) => m.id !== id);
    setSavedMenus(updatedMenus);
    localStorage.setItem("gigizi_menus", JSON.stringify(updatedMenus));
  };

  const exportAsImage = () => {
    if (selectedIngredients.length === 0) return;
    
    let summary = `RINGKASAN NUTRISI GIGIZI\n`;
    summary += `Tanggal: ${new Date().toLocaleDateString("id-ID")}\n`;
    summary += `Menu: ${menuName || "Nutrisi Harian"}\n`;
    summary += `--------------------------\n`;
    selectedIngredients.forEach(item => {
        summary += `- ${item.name}: ${item.weight}g (${Math.round((item.calories * item.weight) / 100)} kkal)\n`;
    });
    summary += `--------------------------\n`;
    summary += `TOTAL KALORI: ${Math.round(totals.calories)} kkal\n`;
    summary += `Protein: ${totals.protein.toFixed(1)}g\n`;
    summary += `Lemak: ${totals.fat.toFixed(1)}g\n`;
    summary += `Karbohidrat: ${totals.carbs.toFixed(1)}g\n`;
    summary += `Serat: ${totals.fiber.toFixed(1)}g\n`;
    summary += `--------------------------\n`;
    summary += `Dibuat dengan GIGIZI — Gizi di Ujung Jari`;

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `GIGIZI-${menuName || "Nutrisi"}.txt`;
    link.click();
    
    setShowToast("Ringkasan berhasil diunduh!");
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-text-dark text-background-warm px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-background-warm/10"
          >
            <CheckCircle className="w-5 h-5 text-secondary" />
            <span className="font-medium">{showToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark mb-4">
          Kalkulator <span className="text-primary italic">Nutrisi</span>
        </h1>
        <p className="text-text-dark/70 max-w-xl mx-auto italic">
          Tambahkan bahan makanan Anda untuk melihat total kalori dan
          makronutrien secara real-time.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="relative">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dark/40 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Cari bahan (cth: Nasi Goreng, Tempe, Rendang...)"
                className="w-full pl-12 pr-4 py-4 bg-background-warm border-2 border-text-dark/10 rounded-2xl focus:outline-none focus:border-primary transition-all text-lg shadow-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
              />
            </div>

            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 w-full mt-2 bg-background-warm border border-text-dark/10 rounded-2xl shadow-xl overflow-hidden max-h-80 overflow-y-auto"
                >
                  {searchResults.map((ingredient) => (
                    <button
                      key={ingredient.id}
                      onClick={() => addIngredient(ingredient)}
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-primary/5 transition-colors text-left border-b border-text-dark/5 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{ingredient.icon}</span>
                        <div>
                          <div className="font-bold text-text-dark">
                            {ingredient.name}
                          </div>
                          <div className="text-xs text-text-dark/50 uppercase tracking-wider font-space-mono">
                            {ingredient.category}
                          </div>
                        </div>
                      </div>
                      <Plus className="w-5 h-5 text-primary" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-playfair font-bold text-text-dark flex items-center gap-2">
                <CalcIcon className="w-5 h-5 text-primary" />
                Piring Anda
              </h3>
              {selectedIngredients.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsSaving(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors rounded-full text-sm font-bold"
                  >
                    <Save className="w-4 h-4" />
                    Simpan
                  </button>
                  <button
                    onClick={exportAsImage}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors rounded-full text-sm font-bold"
                  >
                    <Download className="w-4 h-4" />
                    Unduh
                  </button>
                </div>
              )}
            </div>

            {selectedIngredients.length === 0 ? (
              <div className="p-12 text-center bg-text-dark/5 rounded-[2.5rem] border-2 border-dashed border-text-dark/10">
                <p className="text-text-dark/50">
                  Belum ada bahan. Cari dan tambahkan untuk mulai menghitung.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {selectedIngredients.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white p-6 rounded-[2rem] shadow-sm border border-text-dark/5 flex flex-col md:flex-row md:items-center gap-6"
                    >
                      <div className="flex items-center gap-4 flex-grow">
                        <span className="text-4xl p-3 bg-background-warm rounded-2xl shadow-inner group-hover:rotate-6 transition-transform">
                          {item.icon}
                        </span>
                        <div>
                          <div className="font-bold text-lg text-text-dark">
                            {item.name}
                          </div>
                          <div className="text-xs text-text-dark/50 font-space-mono uppercase tracking-widest">
                            {item.calories} kkal / 100g
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-1 min-w-[100px]">
                          <label className="text-[10px] uppercase font-space-mono font-bold text-text-dark/40 tracking-wider">
                            Berat (gram)
                          </label>
                          <div className="relative group">
                            <input
                              type="number"
                              min="0"
                              max="5000"
                              value={item.weight === 0 ? "" : item.weight}
                              placeholder="0"
                              onChange={(e) =>
                                updateWeight(item.id, parseInt(e.target.value))
                              }
                              className="w-full bg-background-warm border-2 border-text-dark/5 rounded-xl px-3 py-2 text-text-dark font-bold focus:outline-none focus:border-primary transition-all text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[10px] font-bold text-text-dark/20 group-focus-within:text-primary transition-colors">
                              gr
                            </div>
                          </div>
                          <div className="flex gap-1 mt-1">
                            <button onClick={() => updateWeight(item.id, 50)} className="text-[10px] bg-background-warm hover:bg-primary/10 text-text-dark/50 px-2 py-0.5 rounded">0.5x</button>
                            <button onClick={() => updateWeight(item.id, 100)} className="text-[10px] bg-background-warm hover:bg-primary/10 text-text-dark/50 px-2 py-0.5 rounded">1x</button>
                            <button onClick={() => updateWeight(item.id, 200)} className="text-[10px] bg-background-warm hover:bg-primary/10 text-text-dark/50 px-2 py-0.5 rounded">2x</button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end min-w-[80px]">
                          <div className="text-xl font-bold text-text-dark">
                            {Math.round((item.calories * item.weight) / 100)}
                          </div>
                          <div className="text-[10px] uppercase font-space-mono text-text-dark/40 tracking-tighter">
                            Total kkal
                          </div>
                        </div>
                        <button
                          onClick={() => removeIngredient(item.id)}
                          className="p-2 text-text-dark/20 hover:text-accent transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <RecommendationEngine 
            currentItems={selectedIngredients.map(i => ({ id: i.id, weight: i.weight }))}
            totals={totals}
            onAdd={addIngredient}
          />

          {savedMenus.length > 0 && (
            <div className="pt-8 border-t border-text-dark/10">
              <h3 className="text-xl font-playfair font-bold text-text-dark mb-4">
                Menu Tersimpan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedMenus.map((menu) => (
                  <button
                    key={menu.id}
                    onClick={() => loadSavedMenu(menu)}
                    className="flex items-center justify-between p-4 bg-white/50 border border-text-dark/5 rounded-2xl hover:bg-white transition-all text-left group shadow-sm"
                  >
                    <div>
                      <div className="font-bold text-text-dark group-hover:text-primary transition-colors">
                        {menu.name}
                      </div>
                      <div className="text-xs text-text-dark/40 font-space-mono">
                        {menu.date} • {menu.totalCalories} kkal
                      </div>
                    </div>
                    <div
                      onClick={(e) => deleteSavedMenu(menu.id, e)}
                      className="p-2 opacity-0 group-hover:opacity-100 text-text-dark/20 hover:text-accent transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-8">
            <div className="bg-primary text-background-warm p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-2">
                    {getStatus(totals.calories, 'calories') && (
                        <div className={cn("px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1", getStatus(totals.calories, 'calories')?.color.replace('text-', 'text-'))}>
                            {getStatus(totals.calories, 'calories')?.icon}
                            {getStatus(totals.calories, 'calories')?.label}
                        </div>
                    )}
                </div>
                <h4 className="uppercase text-xs font-space-mono tracking-[0.3em] opacity-70 mb-2">
                  Total Kalori
                </h4>
                <div className="text-7xl md:text-8xl font-playfair font-bold mb-4 flex justify-center items-baseline gap-2">
                  {Math.round(totals.calories)}
                  <span className="text-xl font-space-mono opacity-50 uppercase">
                    kkal
                  </span>
                </div>
                <div className="h-1 w-20 bg-secondary mx-auto mb-6 rounded-full" />
                <p className="text-sm opacity-80 max-w-[200px] mx-auto italic leading-relaxed">
                  {totals.calories > 0
                    ? `Setara dengan ${Math.round(
                        totals.calories / 100
                      )} menit lari santai.`
                    : "Mulai tambahkan bahan untuk melihat hasilnya."}
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute top-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-xl" />
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-text-dark/5 shadow-sm space-y-8">
              <h3 className="text-xl font-playfair font-bold text-text-dark text-center">
                Rincian Nutrisi
              </h3>

              <div className="flex justify-around items-center h-48">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{
                          borderRadius: "1rem",
                          border: "none",
                          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center text-text-dark/20 italic text-sm">
                    <Info className="w-10 h-10 mb-2 opacity-10" />
                    Belum ada data visual
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Protein Card */}
                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 transition-all hover:shadow-md relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-[10px] uppercase font-space-mono text-primary font-bold tracking-widest">Protein</div>
                    {getStatus(totals.protein, 'protein') && (
                        <div className={cn("flex items-center gap-0.5 text-[8px] font-bold uppercase", getStatus(totals.protein, 'protein')?.color)}>
                            {getStatus(totals.protein, 'protein')?.icon}
                            {getStatus(totals.protein, 'protein')?.label}
                        </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-text-dark">
                    {totals.protein.toFixed(1)}g
                  </div>
                  <div className="absolute -bottom-2 -right-2 opacity-5 group-hover:opacity-10 transition-opacity">
                    <CalcIcon className="w-12 h-12" />
                  </div>
                </div>

                {/* Lemak Card */}
                <div className="bg-secondary/5 p-4 rounded-2xl border border-secondary/10 transition-all hover:shadow-md group">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-[10px] uppercase font-space-mono text-secondary font-bold tracking-widest">Lemak</div>
                    {getStatus(totals.fat, 'fat') && (
                        <div className={cn("flex items-center gap-0.5 text-[8px] font-bold uppercase", getStatus(totals.fat, 'fat')?.color)}>
                            {getStatus(totals.fat, 'fat')?.icon}
                            {getStatus(totals.fat, 'fat')?.label}
                        </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-text-dark">
                    {totals.fat.toFixed(1)}g
                  </div>
                </div>

                {/* Karbo Card */}
                <div className="bg-accent/5 p-4 rounded-2xl border border-accent/10 transition-all hover:shadow-md group">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-[10px] uppercase font-space-mono text-accent font-bold tracking-widest">Karbo</div>
                    {getStatus(totals.carbs, 'carbs') && (
                        <div className={cn("flex items-center gap-0.5 text-[8px] font-bold uppercase", getStatus(totals.carbs, 'carbs')?.color)}>
                            {getStatus(totals.carbs, 'carbs')?.icon}
                            {getStatus(totals.carbs, 'carbs')?.label}
                        </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-text-dark">
                    {totals.carbs.toFixed(1)}g
                  </div>
                </div>

                {/* Serat Card */}
                <div className="bg-text-dark/5 p-4 rounded-2xl border border-text-dark/10 transition-all hover:shadow-md group">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-[10px] uppercase font-space-mono text-text-dark/40 font-bold tracking-widest">Serat</div>
                    {getStatus(totals.fiber, 'fiber') && (
                        <div className={cn("flex items-center gap-0.5 text-[8px] font-bold uppercase", getStatus(totals.fiber, 'fiber')?.color)}>
                            {getStatus(totals.fiber, 'fiber')?.icon}
                            {getStatus(totals.fiber, 'fiber')?.label}
                        </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-text-dark">
                    {totals.fiber.toFixed(1)}g
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSaving && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSaving(false)}
              className="absolute inset-0 bg-text-dark/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-background-warm rounded-[2.5rem] p-8 shadow-2xl border border-text-dark/10"
            >
              <button
                onClick={() => setIsSaving(false)}
                className="absolute top-6 right-6 text-text-dark/40 hover:text-text-dark transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-playfair font-bold text-text-dark mb-2">
                Simpan Menu Ini
              </h3>
              <p className="text-text-dark/60 mb-6 italic text-sm">
                Beri nama untuk menu Anda agar mudah dicari kembali di tab "Menu Tersimpan".
              </p>
              <input
                autoFocus
                type="text"
                placeholder="cth: Makan Siang Rendang"
                className="w-full px-6 py-4 bg-white border border-text-dark/10 rounded-2xl focus:outline-none focus:border-primary transition-all mb-6 text-lg shadow-inner"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveMenu()}
              />
              <button
                onClick={handleSaveMenu}
                disabled={!menuName}
                className="w-full py-4 bg-primary text-background-warm rounded-full font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Konfirmasi Simpan
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Hidden Share Card for Export */}
      <div className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none" style={{ width: '600px' }}>
          <ExportCard 
            ref={shareCardRef}
            items={selectedIngredients.map(i => ({ name: i.name, weight: i.weight, calories: i.calories }))}
            totals={totals}
            menuName={menuName}
          />
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Memuat Dapur Digital...</div>}>
      <CalculatorContent />
    </Suspense>
  );
}
