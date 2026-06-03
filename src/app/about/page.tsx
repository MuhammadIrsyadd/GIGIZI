import { Salad, Heart, Coffee, Leaf, User } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <header className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl mb-6">
          <Salad className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-text-dark mb-6">
          Tentang <span className="text-primary italic">GIGIZI</span>
        </h1>
        <p className="text-xl text-text-dark/70 italic font-dm-sans leading-relaxed">
          "Gizi di Ujung Jari — Membantu Anda memahami apa yang masuk ke tubuh
          dengan cara yang ramah, jujur, dan hangat."
        </p>
      </header>

      <div className="prose prose-lg max-w-none text-text-dark/80 leading-relaxed space-y-8">
        <section className="bg-white p-10 rounded-[3rem] border border-text-dark/5 shadow-sm">
          <h2 className="text-3xl font-playfair font-bold text-text-dark mb-4 flex items-center gap-3">
            <User className="w-6 h-6 text-primary" />
            Sosok di Balik GIGIZI
          </h2>
          <p>
            GIGIZI dirancang dan dibangun oleh <strong>Irsyad</strong>. Proyek ini bukan sekadar tugas teknis, melainkan sebuah misi pribadi untuk membawa kesadaran kesehatan ke tengah masyarakat Indonesia melalui teknologi yang sederhana namun bermakna.
          </p>
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
            Irsyad menyadari bahwa banyak rekan sesama anak kos yang ingin mulai hidup sehat namun bingung harus mulai dari mana. Apakah menu warteg tadi sudah cukup protein? Berapa kalori dadar jagung yang baru dimakan? Pertanyaan-pertanyaan inilah yang memicu lahirnya GIGIZI — sebuah alat yang membantu siapa saja, terutama anak kos, untuk mengatur pola gizi mereka tanpa rasa takut atau bingung.
          </p>
        </section>

        <section className="bg-white p-10 rounded-[3rem] border border-text-dark/5 shadow-sm">
          <h2 className="text-3xl font-playfair font-bold text-text-dark mb-4 flex items-center gap-3">
            <Leaf className="w-6 h-6 text-primary" />
            Filosofi Kami
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
            "Sehat itu dimulai dari piring anak kos."
          </h2>
          <p className="opacity-90 max-w-2xl mx-auto">
            GIGIZI percaya bahwa keterbatasan bukan penghalang untuk hidup sehat. Bersama Irsyad, mari kita mulai perjalanan gizi ini, satu gigitan pada satu waktu.
          </p>
        </section>
      </div>
    </div>
  );
}
