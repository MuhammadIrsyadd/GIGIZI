import Link from "next/link";
import { ArrowRight, Leaf, Zap, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-text-dark mb-6 leading-tight">
              Gizi di <span className="text-primary italic">Ujung Jari</span>
            </h1>
            <p className="text-xl text-text-dark/80 max-w-2xl mx-auto mb-10 leading-relaxed font-dm-sans">
              Selamat datang di Dapur Digital Anda. Pahami nutrisi setiap suapan
              dengan cara yang simpel, jujur, dan hangat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-background-warm rounded-full font-bold text-lg hover:bg-primary/90 transition-all group"
              >
                Mulai Hitung Gizi
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-text-dark rounded-full font-bold text-lg hover:bg-secondary/90 transition-all"
              >
                Pelajari Filosofi
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </section>

      {/* Features/Philosophy Brief */}
      <section className="py-20 bg-text-dark/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-6 bg-background-warm rounded-3xl shadow-sm border border-text-dark/5">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-text-dark mb-4">
                Bahan Lokal
              </h3>
              <p className="text-text-dark/70 leading-relaxed">
                Database lengkap mulai dari Tempe, Rendang, hingga Kangkung.
                Disesuaikan dengan lidah Indonesia.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-background-warm rounded-3xl shadow-sm border border-text-dark/5">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-text-dark mb-4">
                Real-Time
              </h3>
              <p className="text-text-dark/70 leading-relaxed">
                Hitung kalori dan makronutrien secara instan saat Anda menambahkan
                bahan ke piring digital.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-background-warm rounded-3xl shadow-sm border border-text-dark/5">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-text-dark mb-4">
                Ramah & Jujur
              </h3>
              <p className="text-text-dark/70 leading-relaxed">
                Desain yang hangat seperti di rumah sendiri. Tanpa istilah medis
                yang rumit, hanya gizi yang jujur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bottom */}
      <section className="py-24 bg-primary text-background-warm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-8">
            Siap untuk mengenal makananmu lebih dekat?
          </h2>
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center px-10 py-5 bg-background-warm text-primary rounded-full font-bold text-xl hover:bg-secondary transition-all hover:text-text-dark"
          >
            Buka Kalkulator Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
