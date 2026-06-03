"use client";

import Link from "next/link";
import { Salad, Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Kalkulator", href: "/calculator" },
    { name: "Database", href: "/database" },
    { name: "Komunitas", href: "/komunitas" },
    { name: "Tanya GIZI", href: "/tanya-gizi" },
    { name: "Tentang Kami", href: "/about" },
  ];

  return (
    <nav className="border-b border-text-dark/10 bg-background-warm/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <Salad className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-playfair font-bold text-text-dark tracking-tight">
              GIGIZI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-dark/70 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
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
        <div className="lg:hidden bg-background-warm border-b border-text-dark/10 p-4 space-y-4">
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
