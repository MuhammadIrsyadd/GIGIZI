import Link from "next/link";
import { ArrowRight, Leaf, Zap, Heart } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-8">
                <Logo size={120} className="drop-shadow-2xl animate-bounce-slow" />
            </div>
            <h1 className="text-5xl md:text-8xl font-playfair font-bold text-foreground mb-6 leading-tight">
              Gizi di <span className="text-primary italic underline decoration-secondary decoration-wavy underline-offset-8">Ujung Jari</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-12 leading-relaxed font-dm-sans italic">
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
                className="inline-flex items-center justify-center px-10 py-5 bg-secondary text-foreground rounded-full font-bold text-xl hover:bg-secondary/90 transition-all shadow-xl hover:scale-105 active:scale-95"
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
              <h3 className="text-3xl font-playfair font-bold text-foreground mb-4">
                Bahan Lokal
              </h3>
              <p className="text-foreground/70 leading-relaxed text-lg italic">
                Database lengkap mulai dari Tempe, Rendang, hingga Kangkung.
                Disesuaikan dengan lidah Indonesia.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 bg-background-warm rounded-[3rem] shadow-sm border border-text-dark/5 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-secondary/10 rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-foreground transition-colors">
                <Zap className="w-10 h-10 text-secondary group-hover:text-foreground" />
              </div>
              <h3 className="text-3xl font-playfair font-bold text-foreground mb-4">
                Real-Time
              </h3>
              <p className="text-foreground/70 leading-relaxed text-lg italic">
                Hitung kalori dan makronutrien secara instan saat Anda menambahkan
                bahan ke piring digital.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-background-warm rounded-[3rem] shadow-sm border border-text-dark/5 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-accent/10 rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-background-warm transition-colors">
                <Heart className="w-10 h-10 text-accent group-hover:text-background-warm" />
              </div>
              <h3 className="text-3xl font-playfair font-bold text-foreground mb-4">
                Ramah & Jujur
              </h3>
              <p className="text-foreground/70 leading-relaxed text-lg italic">
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
            className="inline-flex items-center justify-center px-12 py-6 bg-background-warm text-primary rounded-full font-bold text-2xl hover:bg-secondary transition-all hover:text-foreground shadow-2xl hover:scale-110 active:scale-95"
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
