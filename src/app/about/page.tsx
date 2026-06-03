import { Salad, Heart, Coffee, Leaf, Sparkles } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <header className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-3xl mb-6 shadow-inner">
          <Logo size={64} />
        </div>
        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-text-dark mb-6">
          Tentang <span className="text-primary italic">GIGIZI</span>
        </h1>
        <p className="text-xl text-text-dark/70 italic font-dm-sans leading-relaxed">
          "Gizi di Ujung Jari — Membantu Anda memahami apa yang masuk ke tubuh
          dengan cara yang ramah, jujur, dan hangat."
        </p>
      </header>

      <div className="prose prose-lg max-w-none text-text-dark/80 leading-relaxed space-y-12">
        {/* Logo Philosophy Section */}
        <section className="bg-white p-10 rounded-[3rem] border border-text-dark/5 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Logo size={200} />
          </div>
          
          <h2 className="text-3xl font-playfair font-bold text-text-dark mb-8 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary" />
            Filosofi Logo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary font-space-mono">1</div>
                <div>
                  <h4 className="font-bold text-text-dark mb-1">Mangkuk Nutrisi</h4>
                  <p className="text-sm opacity-80">Garis melengkung di bawah melambangkan wadah atau piring — simbol dari aksi makan itu sendiri dan kesiapan untuk menampung gizi terbaik.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary font-space-mono">2</div>
                <div>
                  <h4 className="font-bold text-text-dark mb-1">Daun Hijau Utama</h4>
                  <p className="text-sm opacity-80">Simbol kesegaran, bahan pangan lokal alami, dan pertumbuhan kesehatan yang dimulai dari apa yang kita konsumsi.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center font-bold text-secondary font-space-mono">3</div>
                <div>
                  <h4 className="font-bold text-text-dark mb-1">Uap Oranye (Warmth)</h4>
                  <p className="text-sm opacity-80">Garis di atas melambangkan kehangatan masakan rumah dan kenyamanan, menekankan bahwa diet tidak harus dingin dan kaku.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center font-bold text-accent font-space-mono">4</div>
                <div>
                  <h4 className="font-bold text-text-dark mb-1">Titik Merah (Energi)</h4>
                  <p className="text-sm opacity-80">Mewakili semangat, energi yang didapat dari makanan, serta detail terkecil namun krusial dalam keseimbangan gizi harian.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/10 p-10 rounded-[3rem] border border-secondary/20">
          <h2 className="text-3xl font-playfair font-bold text-text-dark mb-4 flex items-center gap-3">
            <Coffee className="w-6 h-6 text-secondary" />
            Asal Muasal: Kisah Anak Kos
          </h2>
          <p>
            GIGIZI lahir dari realita kehidupan seorang <strong>anak kos</strong>. Terbatasnya pilihan makanan, budget yang harus diatur, namun tetap memiliki keinginan kuat untuk <strong>hidup sehat</strong> adalah tantangan sehari-hari.
          </p>
          <p>
            Aplikasi ini dirancang untuk membantu siapa saja yang ingin mulai hidup sehat namun bingung harus mulai dari mana. Apakah menu warteg tadi sudah cukup protein? Berapa kalori dadar jagung yang baru dimakan? Pertanyaan-pertanyaan inilah yang memicu lahirnya GIGIZI — sebuah alat yang membantu siapa saja untuk mengatur pola gizi mereka tanpa rasa takut atau bingung.
          </p>
        </section>

        <section className="bg-white p-10 rounded-[3rem] border border-text-dark/5 shadow-sm">
          <h2 className="text-3xl font-playfair font-bold text-text-dark mb-4 flex items-center gap-3">
            <Leaf className="w-6 h-6 text-primary" />
            Filosofi Nama
          </h2>
          <p>
            GIZI berasal dari Bahasa Indonesia yang berarti nutrisi. GI juga merupakan singkatan dari Gigit — aksi paling mendasar dari makan. GIGIZI adalah pengulangan yang bersemangat, seperti semangat kita menjaga kesehatan setiap hari.
          </p>
          <p>
            Website ini menjawab pertanyaan sederhana: <strong>"Saya sudah makan apa hari ini, dan apa dampaknya untuk tubuh saya?"</strong>
          </p>
        </section>

        <section className="bg-primary text-background-warm p-12 rounded-[3rem] text-center shadow-xl">
          <h2 className="text-3xl font-playfair font-bold mb-4 italic">
            "Sehat itu dimulai dari piring Anda hari ini."
          </h2>
          <p className="opacity-90 max-w-2xl mx-auto">
            GIGIZI percaya bahwa keterbatasan bukan penghalang untuk hidup sehat. Mari kita mulai perjalanan gizi ini, satu gigitan pada satu waktu.
          </p>
        </section>
      </div>
    </div>
  );
}
