"use client";

import { useState, useRef, useEffect } from "react";
import { Salad, Send, Sparkles, User, Bot, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const KNOWLEDGE_BASE = [
  {
    keywords: ["kalori", "hitung", "berapa"],
    answer: "Untuk menghitung kalori, Anda bisa menggunakan fitur Kalkulator kami. Masukkan bahan makanan dan beratnya, GIGIZI akan menghitung total kalori dan makronutriennya secara instan!",
  },
  {
    keywords: ["protein", "sumber", "hewan", "nabati"],
    answer: "Sumber protein hebat ada dua: Hewani (seperti Dada Ayam, Ikan, Telur) dan Nabati (seperti Tempe, Tahu, dan Kacang-kacangan). Tempe adalah primadona protein nabati lokal kita!",
  },
  {
    keywords: ["diet", "sehat", "turun", "berat"],
    answer: "Diet sehat bukan berarti tidak makan, tapi mengatur porsi. Gunakan perbandingan 1/2 piring sayur, 1/4 karbohidrat, dan 1/4 protein. GIGIZI membantu Anda memantau agar tidak kelebihan kalori.",
  },
  {
    keywords: ["rendang", "santai", "lemak"],
    answer: "Rendang memang lezat tapi tinggi lemak karena santannya. Sebaiknya konsumsi 1 potong saja (sekitar 50g) dan imbangi dengan banyak sayuran hijau seperti Sawi atau Kangkung.",
  },
  {
    keywords: ["serat", "sayur", "buah"],
    answer: "Serat sangat penting untuk pencernaan. Anda bisa mendapatkan serat tinggi dari Bayam, Brokoli, Pepaya, dan Alpukat. Pastikan ada sayuran di setiap piring Anda!",
  },
  {
    keywords: ["halo", "hi", "siapa"],
    answer: "Halo! Saya adalah asisten virtual GIGIZI. Saya siap membantu menjawab pertanyaan Anda seputar nutrisi dan cara menggunakan aplikasi ini. Ada yang bisa saya bantu?",
  },
];

const SUGGESTIONS = [
  "Berapa kalori 1 porsi rendang?",
  "Apa sumber protein nabati terbaik?",
  "Bagaimana cara diet yang sehat?",
  "Kenapa serat itu penting?",
];

export default function TanyaGiziPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Selamat datang di Tanya GIZI! Ada yang ingin Anda tanyakan seputar nutrisi hari ini?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Bot Response Logic
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let botAnswer = "Maaf, saya belum memahami pertanyaan tersebut. Coba gunakan kata kunci seperti 'protein', 'kalori', atau 'diet'.";

      for (const entry of KNOWLEDGE_BASE) {
        if (entry.keywords.some((key) => lowerText.includes(key))) {
          botAnswer = entry.answer;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botAnswer,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-[calc(100vh-160px)] flex flex-col">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <Salad className="w-6 h-6 text-background-warm" />
          </div>
          <div>
            <h1 className="text-2xl font-playfair font-bold text-text-dark">Tanya GIZI</h1>
            <div className="text-xs text-primary font-bold flex items-center gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Online
            </div>
          </div>
        </div>
        <Link href="/calculator" className="text-text-dark/40 hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Kalkulator
        </Link>
      </header>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto mb-6 space-y-6 pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                  msg.sender === "user" ? "bg-secondary text-white" : "bg-primary text-white"
                }`}>
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === "user" 
                  ? "bg-secondary text-white rounded-tr-none" 
                  : "bg-white text-text-dark rounded-tl-none border border-text-dark/5"
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length < 3 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="text-xs bg-white border border-text-dark/10 px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-all text-text-dark/60 italic"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="relative">
        <input
          type="text"
          placeholder="Tanyakan sesuatu..."
          className="w-full pl-6 pr-16 py-5 bg-white border-2 border-text-dark/5 rounded-[2rem] focus:outline-none focus:border-primary transition-all shadow-xl text-text-dark"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
        />
        <button
          onClick={() => handleSend(input)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-background-warm rounded-full flex items-center justify-center hover:bg-primary/90 transition-all shadow-md group"
        >
          <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
      <p className="text-[10px] text-center mt-4 text-text-dark/30 font-space-mono uppercase">
        GIGIZI Assistant — Bukan saran medis profesional.
      </p>
    </div>
  );
}
