"use client";

import Link from "next/link";
import { Menu, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [remainingCal, setRemainingCal] = useState<number | null>(null);

  useEffect(() => {
    const updateCal = () => {
      const savedProfile = localStorage.getItem("gigizi_profile");
      const savedIntake = localStorage.getItem("gigizi_daily_intake");
      
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        let bmr = (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age);
        bmr = profile.gender === "male" ? bmr + 5 : bmr - 161;
        const tdee = Math.round(bmr * profile.activity);
        const intake = Number(savedIntake || 0);
        setRemainingCal(tdee - intake);
      }
    };

    updateCal();
    const interval = setInterval(updateCal, 2000); // Poll for changes
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "Kalkulator", href: "/calculator" },
    { name: "Kebutuhan Harian", href: "/kebutuhan-harian" },
    { name: "Database", href: "/database" },
    { name: "Battle Gizi", href: "/battle-gizi" },
    { name: "Apotek Alami", href: "/apotek-alami" },
    { name: "Komunitas", href: "/komunitas" },
    { name: "Tanya GIZI", href: "/tanya-gizi" },
    { name: "Tentang Kami", href: "/about" },
  ];

  return (
    <nav className="border-b border-text-dark/10 bg-background-warm/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="group-hover:rotate-12 transition-transform duration-500" size={48} />
            <span className="text-3xl font-playfair font-bold text-text-dark tracking-tighter">
              GIGIZI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-dark/70 hover:text-primary transition-colors font-bold text-[10px] uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
            
            {remainingCal !== null && (
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                <Flame className="w-3 h-3 text-primary animate-pulse" />
                <span className="text-[10px] font-bold text-primary uppercase font-space-mono">
                  Sisa: {remainingCal}
                </span>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            {remainingCal !== null && (
              <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                <Flame className="w-3 h-3 text-primary animate-pulse" />
                <span className="text-[10px] font-bold text-primary font-space-mono">
                  {remainingCal}
                </span>
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-text-dark hover:text-primary transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background-warm border-b border-text-dark/10 p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-text-dark/70 hover:text-primary transition-colors font-bold text-lg"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
