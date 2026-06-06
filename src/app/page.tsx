"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Leaf, Zap, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";

const NUTRITION_FACTS = [
  "Tahukah kamu? Tempe memiliki kandungan protein yang hampir setara dengan daging sapi.",
  "Serat dari sayuran hijau membantu tubuh kenyang lebih lama dan melancarkan pencernaan.",
  "Nasi merah memiliki indeks glikemik lebih rendah dibanding nasi putih, baik untuk gula darah.",
  "Minum air putih sebelum makan dapat membantu mengontrol porsi makan Anda.",
  "Satu buah telur mengandung protein berkualitas tinggi dan hampir semua vitamin yang dibutuhkan tubuh.",
];

export default function Home() {
  const [fact, setFact] = useState("");

  useEffect(() => {
    setFact(NUTRITION_FACTS[Math.floor(Math.random() * NUTRITION_FACTS.length)]);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Daily Fact Banner */}
      <AnimatePresence>
        {fact && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/10 border-b border-primary/20 py-3 px-4 text-center"
          >
            <p className="text-sm font-medium text-primary flex items-center justify-center gap-2 italic">
              <Sparkles className="w-4 h-4" />
              Fakta Gizi: {fact}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-8">
                <Logo size={120} className="drop-shadow-2xl animate-bounce-slow" />
            </div>
            <h1 className="text-5xl md:text-8xl font-playfair font-bold text-text-dark mb-6 leading-tight">
              Gizi di <span className="text-primary italic underline decoration-secondary decoration-wavy underline-offset-8">Ujung Jari</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-dark/80 max-w-3xl mx-auto mb-12 leading-relaxed font-dm-sans italic">
              Selamat datang di Dapur Digital Anda. Pahami nutrisi setiap suapan
              dengan cara yang simpel, jujur, dan hangat.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center px-10 py-5 bg-primary text-background-warm rounded-full font-bold text-xl hover:bg-primary/90 transition-all group shadow-xl hover:scale-105 active:scale-95"
              >
                Mulai Hitung Gizi
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-10 py-5 bg-secondary text-text-dark rounded-full font-bold text-xl hover:bg-secondary/90 transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                Pelajari Filosofi
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-text-dark/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-8 bg-background-warm rounded-[3rem] shadow-sm border border-text-dark/5 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-background-warm transition-colors">
                <Leaf className="w-10 h-10 text-primary group-hover:text-background-warm" />
              </div>
              <h3 className="text-3xl font-playfair font-bold text-text-dark mb-4">
                Bahan Lokal
              </h3>
              <p className="text-text-dark/70 leading-relaxed text-lg italic">
                Database lengkap mulai dari Tempe, Rendang, hingga Kangkung.
                Disesuaikan dengan lidah Indonesia.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 bg-background-warm rounded-[3rem] shadow-sm border border-text-dark/5 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-secondary/10 rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-text-dark transition-colors">
                <Zap className="w-10 h-10 text-secondary group-hover:text-text-dark" />
              </div>
              <h3 className="text-3xl font-playfair font-bold text-text-dark mb-4">
                Real-Time
              </h3>
              <p className="text-text-dark/70 leading-relaxed text-lg italic">
                Hitung kalori dan makronutrien secara instan saat Anda menambahkan
                bahan ke piring digital.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-background-warm rounded-[3rem] shadow-sm border border-text-dark/5 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-accent/10 rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-background-warm transition-colors">
                <Heart className="w-10 h-10 text-accent group-hover:text-background-warm" />
              </div>
              <h3 className="text-3xl font-playfair font-bold text-text-dark mb-4">
                Ramah & Jujur
              </h3>
              <p className="text-text-dark/70 leading-relaxed text-lg italic">
                Desain yang hangat seperti di rumah sendiri. Tanpa istilah medis
                yang rumit, hanya gizi yang jujur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-primary text-background-warm relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-10 leading-tight">
            Siap untuk mengenal makananmu lebih dekat?
          </h2>
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center px-12 py-6 bg-background-warm text-primary rounded-full font-bold text-2xl hover:bg-secondary transition-all hover:text-text-dark shadow-2xl hover:scale-110 active:scale-95"
          >
            Buka Kalkulator Sekarang
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
      </section>
    </div>
  );
}
