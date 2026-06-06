"use client";

import { useMemo } from "react";
import { Smile, Frown, Meh, Zap, Moon, Battery, BatteryLow, BatteryFull } from "lucide-react";

interface BodyAvatarProps {
  intake: number;
  targets: { min: number; max: number };
  protein: number;
  fiber: number;
}

export const BodyAvatar = ({ intake, targets, protein, fiber }: BodyAvatarProps) => {
  const state = useMemo(() => {
    if (intake === 0) return {
      icon: <Battery className="w-20 h-20 text-text-dark/20" />,
      label: "Siap Beraksi?",
      desc: "Tubuhmu masih kosong. Ayo isi dengan nutrisi terbaik!",
      color: "bg-text-dark/5"
    };

    if (intake < targets.min) return {
      icon: <BatteryLow className="w-20 h-20 text-secondary" />,
      label: "Butuh Tenaga",
      desc: "Energimu masih di bawah batas minimal. Kamu mungkin merasa lemas.",
      color: "bg-secondary/10"
    };

    if (intake > targets.max) return {
      icon: <Moon className="w-20 h-20 text-accent" />,
      label: "Ngantuk / Food Coma",
      desc: "Kalori berlebih bisa membuatmu cepat mengantuk. Waspada!",
      color: "bg-accent/10"
    };

    // If intake is ideal, check for balance
    if (protein >= 20 && fiber >= 5) return {
      icon: <Zap className="w-20 h-20 text-primary animate-pulse" />,
      label: "Super Energetik!",
      desc: "Nutrisi seimbang! Kamu siap menaklukkan hari dengan fokus maksimal.",
      color: "bg-primary/10"
    };

    return {
      icon: <BatteryFull className="w-20 h-20 text-primary" />,
      label: "Terisi Cukup",
      desc: "Kalori sudah pas, tapi coba tingkatkan serat agar lebih segar.",
      color: "bg-primary/5"
    };
  }, [intake, targets, protein, fiber]);

  return (
    <div className={`p-8 rounded-[3rem] ${state.color} flex flex-col items-center text-center transition-all duration-500`}>
      <div className="mb-6 p-6 bg-white rounded-full shadow-sm">
        {state.icon}
      </div>
      <h3 className="text-2xl font-playfair font-bold text-text-dark mb-2">{state.label}</h3>
      <p className="text-sm text-text-dark/60 italic leading-relaxed max-w-[200px]">
        {state.desc}
      </p>
    </div>
  );
};
