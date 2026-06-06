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

import { BodyAvatar } from "@/components/BodyAvatar";

export default function KebutuhanHarianPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [intake, setIntake] = useState<number>(0);
  const [isCalculated, setIsAddingProfile] = useState(false);
  
  // Weekly Challenge state
  const [challenges, setChallenges] = useState<{id: string, title: string, completed: boolean}[]>([
    { id: "c1", title: "7 Hari Tanpa Gorengan", completed: false },
    { id: "c2", title: "Makan Sayur di Setiap Piring", completed: false },
    { id: "c3", title: "Minum 8 Gelas Air Putih", completed: false },
  ]);

  // Load from LocalStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("gigizi_profile");
    const savedIntake = localStorage.getItem("gigizi_daily_intake");
    const savedDate = localStorage.getItem("gigizi_intake_date");
    const savedChallenges = localStorage.getItem("gigizi_challenges");
    
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

    if (savedChallenges) {
        setChallenges(JSON.parse(savedChallenges));
    }
  }, []);

  const toggleChallenge = (id: string) => {
    const updated = challenges.map(c => c.id === id ? { ...c, completed: !c.completed } : c);
    setChallenges(updated);
    localStorage.setItem("gigizi_challenges", JSON.stringify(updated));
  };


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
        // ... (profile setup UI remains the same)
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
        <div className="space-y-12">
          {/* Avatar & Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <BodyAvatar 
                intake={intake} 
                targets={calculateTargets} 
                protein={0} // We can enhance this later to track macros too
                fiber={0}
            />
            
            <div className="bg-primary text-background-warm p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center text-center md:text-left">
              <h4 className="uppercase text-[10px] font-space-mono tracking-[0.4em] opacity-70 mb-2">Asupan Hari Ini</h4>
              <div className="text-7xl font-playfair font-bold mb-2">{intake} <span className="text-xl font-space-mono opacity-50 uppercase">kkal</span></div>
              <div className="h-1 w-20 bg-secondary mb-6 rounded-full mx-auto md:mx-0" />
              <div className="flex items-center gap-2 text-sm font-bold opacity-90 justify-center md:justify-start">
                <Activity className="w-4 h-4" />
                Target: {calculateTargets.min} - {calculateTargets.max} kkal
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </div>
          </div>

          {/* 7-Day Challenges Section */}
          <div className="bg-white p-10 rounded-[3rem] border border-text-dark/5 shadow-sm">
            <h3 className="text-2xl font-playfair font-bold text-text-dark mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              Tantangan 7 Hari
            </h3>
            <div className="space-y-4">
              {challenges.map((c) => (
                <button
                  key={c.id}
                  onClick={() => toggleChallenge(c.id)}
                  className={cn(
                    "w-full p-6 rounded-2xl border flex items-center justify-between transition-all",
                    c.completed ? "bg-primary/5 border-primary/20 text-primary" : "bg-background-warm border-text-dark/5 text-text-dark/60 hover:border-primary/20"
                  )}
                >
                  <span className={cn("font-bold text-sm italic", c.completed && "line-through opacity-50")}>
                    {c.title}
                  </span>
                  {c.completed ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 border-2 border-current rounded-full opacity-20" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Input Panel */}
          <div className="bg-secondary/10 p-10 rounded-[3rem] border border-secondary/20">
            <h3 className="text-xl font-playfair font-bold text-text-dark mb-6 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-secondary" />
                Log Makanan Cepat
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[100, 250, 500, 750].map(val => (
                    <button 
                        key={val}
                        onClick={() => handleAddIntake(val)}
                        className="p-6 bg-white rounded-2xl border border-secondary/10 hover:shadow-md transition-all group"
                    >
                        <div className="text-[10px] font-space-mono text-text-dark/40 mb-1">TAMBAH</div>
                        <div className="text-2xl font-bold text-text-dark group-hover:text-secondary">+{val}</div>
                    </button>
                ))}
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
                <p className="text-xs text-text-dark/40 italic font-medium">Berapa kalori barusan?</p>
                <div className="flex-grow flex gap-2 w-full">
                    <input 
                        type="number" 
                        id="custom-intake"
                        placeholder="0"
                        className="bg-white border border-secondary/10 px-6 py-3 rounded-2xl focus:outline-none focus:border-secondary text-center font-bold w-full"
                    />
                    <button 
                        onClick={() => {
                            const el = document.getElementById('custom-intake') as HTMLInputElement;
                            if (el.value) handleAddIntake(Number(el.value));
                            el.value = '';
                        }}
                        className="px-8 py-3 bg-secondary text-text-dark rounded-2xl font-bold hover:bg-secondary/90 transition-all"
                    >
                        Simpan
                    </button>
                </div>
            </div>
            <div className="mt-6 flex justify-center">
                <button 
                    onClick={() => { setIntake(0); localStorage.setItem("gigizi_daily_intake", "0"); }}
                    className="text-[10px] uppercase font-bold text-text-dark/30 hover:text-accent transition-colors flex items-center gap-1"
                >
                    <RefreshCcw className="w-3 h-3" /> Reset Hari Ini
                </button>
            </div>
          </div>

          {/* Resep Sehat Irit Section */}
          <div className="bg-text-dark text-background-warm p-10 rounded-[3rem] shadow-xl overflow-hidden relative group">
            <div className="relative z-10">
                <h3 className="text-2xl font-playfair font-bold mb-6 flex items-center gap-3">
                <Flame className="w-6 h-6 text-secondary" />
                Resep Sehat Irit Irsyad
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/5 hover:bg-white/20 transition-all">
                        <h4 className="font-bold text-secondary mb-1 italic">Protein Booster 10rb</h4>
                        <p className="text-xs opacity-70">Nasi (3k) + Tempe (2k) + Telur Rebus (3k) + Kangkung (2k). Murah, sehat, bertenaga!</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/5 hover:bg-white/20 transition-all">
                        <h4 className="font-bold text-secondary mb-1 italic">Veggies Party 8rb</h4>
                        <p className="text-xs opacity-70">Sayur Lodeh (4k) + Tahu Goreng (2k) + Bakwan Jagung (2k). Serat tinggi untuk pencernaan lancar.</p>
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          </div>

          <div className="flex justify-center">
            <button 
                onClick={() => setIsAddingProfile(true)}
                className="text-sm font-bold text-text-dark/40 hover:text-primary transition-all flex items-center gap-2"
            >
                <Activity className="w-4 h-4" /> Edit Profil Fisik & Target Kalori
            </button>
          </div>
        </div>
      ) : (
        <p>Error in layout</p>
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
