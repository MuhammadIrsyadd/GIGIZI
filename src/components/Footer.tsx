import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="bg-text-dark text-background-warm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <span className="text-2xl font-playfair font-bold tracking-tight">GIGIZI</span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed italic max-w-xs">
              "Gizi di Ujung Jari" — Membantu Anda memahami apa yang masuk ke
              tubuh dengan cara yang ramah, jujur, dan hangat.
            </p>
          </div>
          <div>
            <h4 className="font-playfair font-bold text-xl mb-6">Navigasi</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li>
                <a href="/" className="hover:text-secondary transition-colors font-medium">
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="/calculator"
                  className="hover:text-secondary transition-colors font-medium"
                >
                  Kalkulator Nutrisi
                </a>
              </li>
              <li>
                <a
                  href="/database"
                  className="hover:text-secondary transition-colors font-medium"
                >
                  Database Bahan
                </a>
              </li>
              <li>
                <a
                  href="/komunitas"
                  className="hover:text-secondary transition-colors font-medium"
                >
                  Pilihan Komunitas
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-playfair font-bold text-xl mb-6">Misi GIGIZI</h4>
            <p className="text-sm opacity-80 mb-4 leading-relaxed">
              Kami percaya hidup sehat dimulai dari kesadaran sederhana pada setiap porsi makan kita.
            </p>
            <p className="text-sm opacity-80">
              Dibuat dengan 🥗 untuk Indonesia Sehat.
            </p>
          </div>
        </div>
        <div className="border-t border-background-warm/10 mt-16 pt-8 text-center text-xs opacity-50 tracking-widest uppercase">
          <p>&copy; 2026 GIGIZI by Irsyad. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};
