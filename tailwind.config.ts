/**
 * TailwindCSS Konfigürasyonu
 * 
 * Bu dosya TailwindCSS'in nasıl çalışacağını belirler:
 * - Hangi dosyalarda CSS sınıfları aranacağı
 * - Tema renkleri ve boyutları
 * - Plugin'ler
 * 
 * TailwindCSS: Utility-first CSS framework
 * Utility-first: Önce utility sınıfları, sonra custom CSS yaklaşımı
 */
import type { Config } from "tailwindcss";

const config: Config = {
  // Content: TailwindCSS'in hangi dosyalarda CSS sınıfları arayacağı
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Pages klasörü
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Components klasörü
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // App Router klasörü
    "./lib/**/*.{js,ts,jsx,tsx,mdx}", // Lib klasörü
  ],
  
  // Theme: TailwindCSS'in tema ayarları
  theme: {
    extend: {
      // Renk paleti genişletmesi
      colors: {
        background: "var(--background)", // CSS değişkeni kullanımı
        foreground: "var(--foreground)", // CSS değişkeni kullanımı
      },
    },
  },
  
  // Plugin'ler: TailwindCSS'e ek özellikler eklemek için
  plugins: [],
};

export default config;
