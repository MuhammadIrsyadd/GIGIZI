"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Target, 
  Flame, 
  Utensils, 
  Info, 
  RefreshCcw, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Activity,
  Smile,
  Frown,
  Meh
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UserProfile {
  gender: "male" | "female";
  age: number;
  weight: number;
  height: number;
  activity: number;
}

export default function KebutuhanHarianPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [intake, setIntake] = useState<number>(0);
  const [isCalculated, setIsAddingProfile] = useState(false);

  // Form State
  const [form, setForm] = useState<UserProfile>({
    gender: "male",
    age: 21,
    weight: 65,
    height: 170,
    activity: 1.2,
  });

  // Load from LocalStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("gigizi_profile");
    const savedIntake = localStorage.getItem("gigizi_daily_intake");
    const savedDate = localStorage.getItem("gigizi_intake_date");
    
    const today = new Date().toLocaleDateString();

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    
    if (savedDate === today && savedIntake) {
      setIntake(Number(savedIntake));
    } else {
      localStorage.setItem("gigizi_intake_date", today);
      localStorage.setItem("gigizi_daily_intake", "0");
    }
  }, []);

  // BMR Calculation (Mifflin-St Jeor Equation)
  const calculateTargets = useMemo(() => {
    if (!profile) return { min: 1800, max: 2200 };
    
    let bmr = (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age);
    bmr = profile.gender === "male" ? bmr + 5 : bmr - 161;
    
    const tdee = Math.round(bmr * profile.activity);
    
    return {
      min: tdee - 300, // Defisit ringan/aman
      max: tdee + 200, // Maintenance/suplemen energi
      exact: tdee
    };
  }, [profile]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    localStorage.setItem("gigizi_profile", JSON.stringify(form));
    setIsAddingProfile(false);
  };

  const handleAddIntake = (amount: number) => {
    const newIntake = intake + amount;
    setIntake(newIntake);
    localStorage.setItem("gigizi_daily_intake", newIntake.toString());
  };

  const getStatus = () => {
    const { min, max } = calculateTargets;
    if (intake === 0) return { 
        type: "neutral", 
        label: "Belum Ada Data", 
        color: "text-text-dark/40", 
        icon: <Meh />, 
        advice: "Ayo mulai hari ini dengan sarapan yang bergizi!" 
    };
    
    if (intake < min) return { 
        type: "low", 
        label: "Kurang Energi", 
        color: "text-secondary", 
        icon: <Frown />, 
        advice: "Tubuhmu butuh bahan bakar! Tambahkan protein atau karbohidrat sehat agar tidak lemas saat beraktivitas." 
    };
    
    if (intake >= min && intake <= max) return { 
        type: "ideal", 
        label: "Porsi Juara!", 
        color: "text-primary", 
        icon: <Smile />, 
        advice: "Pertahankan! Asupanmu hari ini sangat pas. Pastikan diimbangi dengan minum air putih yang cukup." 
    };
    
    return { 
        type: "high", 
        label: "Over Budget", 
        color: "text-accent", 
        icon: <AlertCircle />, 
        advice: "Kalori hari ini sudah berlebih. Coba kurangi camilan manis atau lakukan olahraga ringan selama 30 menit." 
    };
  };

  const status = getStatus();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark mb-4">
          Status <span className="text-primary italic">Nutrisi Harian</span>
        </h1>
        <p className="text-text-dark/60 italic">
          "Pahami batasmu, kenali kebutuhan tubuhmu."
        </p>
      </header>

      {!profile ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[3rem] border-2 border-dashed border-primary/20 text-center"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-playfair font-bold text-text-dark mb-4">Halo! Sepertinya Anda Baru di Sini</h2>
          <p className="text-text-dark/60 mb-8 max-w-md mx-auto italic">
            Mari hitung berapa kalori yang sebenarnya dibutuhkan tubuh Anda berdasarkan usia, berat, dan aktivitas sehari-hari.
          </p>
          <button 
            onClick={() => setIsAddingProfile(true)}
            className="px-10 py-5 bg-primary text-background-warm rounded-full font-bold text-lg hover:shadow-xl transition-all"
          >
            Mulai Hitung Sekarang
          </button>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {/* Main Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary text-background-warm p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
              <h4 className="uppercase text-[10px] font-space-mono tracking-[0.4em] opacity-70 mb-2">Asupan Hari Ini</h4>
              <div className="text-7xl font-playfair font-bold mb-2">{intake} <span className="text-xl font-space-mono opacity-50 uppercase">kkal</span></div>
              <div className="h-1 w-20 bg-secondary mb-6 rounded-full" />
              <div className="flex items-center gap-2 text-sm font-bold opacity-90">
                <Activity className="w-4 h-4" />
                Target: {calculateTargets.min} - {calculateTargets.max} kkal
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </div>

            <div className={cn(
              "p-10 rounded-[3rem] border-2 flex flex-col justify-center transition-all",
              status.type === "ideal" ? "bg-primary/5 border-primary/20" : 
              status.type === "high" ? "bg-accent/5 border-accent/20" : 
              "bg-secondary/5 border-secondary/20"
            )}>
              <div className="flex items-center gap-4 mb-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-white", status.color)}>
                  {status.icon}
                </div>
                <div>
                  <h4 className="uppercase text-[10px] font-space-mono tracking-[0.3em] text-text-dark/40">Status Gizi</h4>
                  <div className={cn("text-2xl font-bold font-playfair", status.color)}>{status.label}</div>
                </div>
              </div>
              <p className="text-text-dark/70 italic text-sm leading-relaxed">
                {status.advice}
              </p>
              <button 
                onClick={() => { setIntake(0); localStorage.setItem("gigizi_daily_intake", "0"); }}
                className="mt-6 text-[10px] uppercase font-bold text-text-dark/30 hover:text-text-dark transition-colors flex items-center gap-1"
              >
                <RefreshCcw className="w-3 h-3" /> Reset Data Hari Ini
              </button>
            </div>
          </div>

          {/* Quick Input Panel */}
          <div className="bg-white p-8 rounded-[3rem] border border-text-dark/5 shadow-sm">
            <h3 className="text-xl font-playfair font-bold text-text-dark mb-6 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" />
                Input Kalori Cepat
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[100, 250, 500, 750].map(val => (
                    <button 
                        key={val}
                        onClick={() => handleAddIntake(val)}
                        className="p-6 bg-background-warm rounded-[2rem] border border-text-dark/5 hover:border-primary hover:shadow-md transition-all group"
                    >
                        <div className="text-[10px] font-space-mono text-text-dark/40 mb-1">TAMBAH</div>
                        <div className="text-2xl font-bold text-text-dark group-hover:text-primary">+{val}</div>
                    </button>
                ))}
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
                <p className="text-xs text-text-dark/40 italic">Atau masukkan angka spesifik:</p>
                <div className="flex-grow flex gap-2">
                    <input 
                        type="number" 
                        id="custom-intake"
                        placeholder="0"
                        className="bg-background-warm border border-text-dark/5 px-6 py-3 rounded-2xl focus:outline-none focus:border-primary text-center font-bold w-full"
                    />
                    <button 
                        onClick={() => {
                            const el = document.getElementById('custom-intake') as HTMLInputElement;
                            if (el.value) handleAddIntake(Number(el.value));
                            el.value = '';
                        }}
                        className="px-6 py-3 bg-primary text-background-warm rounded-2xl font-bold hover:bg-primary/90 transition-all"
                    >
                        Simpan
                    </button>
                </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
                onClick={() => setIsAddingProfile(true)}
                className="text-sm font-bold text-text-dark/40 hover:text-primary transition-all flex items-center gap-2"
            >
                <Activity className="w-4 h-4" /> Edit Profil Fisik & Target
            </button>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      <AnimatePresence>
        {isCalculated && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingProfile(false)}
              className="absolute inset-0 bg-text-dark/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-background-warm rounded-[3rem] p-10 shadow-2xl border border-text-dark/10"
            >
              <button 
                onClick={() => setIsAddingProfile(false)}
                className="absolute top-8 right-8 text-text-dark/40 hover:text-text-dark"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-3xl font-playfair font-bold text-text-dark mb-2">Profil Fisik</h2>
              <p className="text-text-dark/60 italic text-sm mb-8">Data ini digunakan untuk menghitung TDEE (Total Daily Energy Expenditure) Anda.</p>
              
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-bold uppercase text-text-dark/40 font-space-mono ml-2">Jenis Kelamin</label>
                        <select 
                            className="w-full bg-white border border-text-dark/5 p-4 rounded-2xl focus:outline-none focus:border-primary font-bold"
                            value={form.gender}
                            onChange={e => setForm({...form, gender: e.target.value as any})}
                        >
                            <option value="male">Laki-laki</option>
                            <option value="female">Perempuan</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase text-text-dark/40 font-space-mono ml-2">Usia</label>
                        <input 
                            type="number" 
                            className="w-full bg-white border border-text-dark/5 p-4 rounded-2xl focus:outline-none focus:border-primary font-bold"
                            value={form.age}
                            onChange={e => setForm({...form, age: Number(e.target.value)})}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-bold uppercase text-text-dark/40 font-space-mono ml-2">Berat (kg)</label>
                        <input 
                            type="number" 
                            className="w-full bg-white border border-text-dark/5 p-4 rounded-2xl focus:outline-none focus:border-primary font-bold"
                            value={form.weight}
                            onChange={e => setForm({...form, weight: Number(e.target.value)})}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase text-text-dark/40 font-space-mono ml-2">Tinggi (cm)</label>
                        <input 
                            type="number" 
                            className="w-full bg-white border border-text-dark/5 p-4 rounded-2xl focus:outline-none focus:border-primary font-bold"
                            value={form.height}
                            onChange={e => setForm({...form, height: Number(e.target.value)})}
                        />
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-bold uppercase text-text-dark/40 font-space-mono ml-2">Tingkat Aktivitas</label>
                    <select 
                        className="w-full bg-white border border-text-dark/5 p-4 rounded-2xl focus:outline-none focus:border-primary font-bold"
                        value={form.activity}
                        onChange={e => setForm({...form, activity: Number(e.target.value)})}
                    >
                        <option value="1.2">Sedentary (Jarang olahraga)</option>
                        <option value="1.375">Ringan (1-3 hari/minggu)</option>
                        <option value="1.55">Moderat (3-5 hari/minggu)</option>
                        <option value="1.725">Sangat Aktif (Setiap hari)</option>
                    </select>
                </div>

                <button 
                    type="submit"
                    className="w-full py-5 bg-primary text-background-warm rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg"
                >
                    Simpan & Hitung Target
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ className }: { className?: string }) {
    return <Utensils className={className} style={{ transform: 'rotate(45deg)' }} />;
}
