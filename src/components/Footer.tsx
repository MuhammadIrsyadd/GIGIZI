import { Salad } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-text-dark text-background-warm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Salad className="w-6 h-6 text-primary" />
              <span className="text-xl font-playfair font-bold">GIGIZI</span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed italic">
              "Gizi di Ujung Jari" — Dibuat oleh <strong>Irsyad</strong> untuk
              membantu anak kos dan kita semua mengatur gizi dengan jujur dan hangat.
            </p>
          </div>
          <div>
            <h4 className="font-playfair font-bold text-lg mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="/" className="hover:text-secondary transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="/calculator"
                  className="hover:text-secondary transition-colors"
                >
                  Kalkulator Nutrisi
                </a>
              </li>
              <li>
                <a
                  href="/database"
                  className="hover:text-secondary transition-colors"
                >
                  Database Bahan
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-playfair font-bold text-lg mb-4">Kontak</h4>
            <p className="text-sm opacity-80 mb-2">
              Email: halo@gigizi.id
            </p>
            <p className="text-sm opacity-80">
              Dibuat dengan 🥗 oleh Irsyad untuk Indonesia Sehat.
            </p>
          </div>
        </div>
        <div className="border-t border-background-warm/10 mt-12 pt-8 text-center text-xs opacity-60">
          <p>&copy; {new Date().getFullYear()} GIGIZI by Irsyad. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};
