"use client";

import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeProvider";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Kalkulator", href: "/calculator" },
    { name: "Database", href: "/database" },
    { name: "Komunitas", href: "/komunitas" },
    { name: "Tanya GIZI", href: "/tanya-gizi" },
    { name: "Tentang Kami", href: "/about" },
  ];

  return (
    <nav className="border-b border-text-dark/10 bg-background-warm/80 backdrop-blur-md sticky top-0 z-50 dark:bg-zinc-900/80 dark:border-zinc-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="group-hover:rotate-12 transition-transform duration-500" size={48} />
            <span className="text-3xl font-playfair font-bold text-text-dark tracking-tighter dark:text-zinc-100">
              GIGIZI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-dark/70 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest dark:text-zinc-400 dark:hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {theme === "light" ? <Moon className="w-5 h-5 text-text-dark" /> : <Sun className="w-5 h-5 text-zinc-100" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {theme === "light" ? <Moon className="w-5 h-5 text-text-dark" /> : <Sun className="w-5 h-5 text-zinc-100" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-text-dark hover:text-primary transition-colors dark:text-zinc-100"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background-warm border-b border-text-dark/10 p-4 space-y-4 dark:bg-zinc-900 dark:border-zinc-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-text-dark/70 hover:text-primary transition-colors font-bold text-lg dark:text-zinc-300 dark:hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
