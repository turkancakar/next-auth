/**
 * PostCSS Konfigürasyonu
 * 
 * PostCSS: CSS'i işlemek için kullanılan bir araç
 * Bu dosya CSS'in nasıl işleneceğini belirler
 * 
 * Plugin'ler:
 * - tailwindcss: TailwindCSS'i işler
 * - autoprefixer: Vendor prefix'leri otomatik ekler
 */
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // TailwindCSS plugin'i
    autoprefixer: {}, // Autoprefixer plugin'i (CSS vendor prefix'leri için)
  },
};

export default config;
