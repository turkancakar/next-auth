/**
 * Next.js Konfigürasyonu
 * 
 * Bu dosya Next.js'in nasıl çalışacağını belirler:
 * - Build ayarları
 * - Experimental özellikler
 * - Plugin'ler
 * 
 * Next.js: React tabanlı full-stack web framework
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output: Build çıktısı türü
  // standalone: Bağımsız çalışabilir build (Docker için ideal)
  output: 'standalone',
  
  // Experimental: Deneysel özellikler
  experimental: {
    // Server Components External Packages: Server component'lerde kullanılacak external paketler
    // @auth0/nextjs-auth0: Auth0 SDK'sı
    serverComponentsExternalPackages: ['@auth0/nextjs-auth0'],
  },
};

export default nextConfig;
