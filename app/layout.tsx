/**
 * Root Layout - Uygulamanın Ana Düzeni
 * 
 * Bu dosya tüm sayfaların temel yapısını belirler:
 * - HTML ve body tag'leri
 * - Font tanımlamaları
 * - Global CSS
 * - Authentication Provider (tüm uygulamada auth erişimi için)
 * - Error Boundary (hata yakalama için)
 * 
 * Metadata: SEO ve browser tab başlığı için
 */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Geist Sans Font - Modern, okunabilir font ailesi
// variable: CSS custom property olarak tanımlar (--font-geist-sans)
// weight: Font kalınlık aralığı (100-900)
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

// Geist Mono Font - Monospace font (kod yazımı için)
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata: SEO ve browser tab bilgileri
// title: Browser tab'ında görünecek başlık
// description: Arama motorları için açıklama
export const metadata: Metadata = {
  title: "NextAuth with Auth0",
  description: "Authentication system with Auth0 and NextAuth.js",
};

/**
 * RootLayout Component - Tüm sayfaların ana container'ı
 * 
 * @param children - Sayfa içeriği (otomatik olarak Next.js tarafından geçirilir)
 * 
 * Component Hierarchy (yukarıdan aşağıya):
 * 1. ErrorBoundary: Hataları yakalar ve kullanıcı dostu mesaj gösterir
 * 2. AuthProvider: Tüm uygulamada authentication context'ini sağlar
 * 3. children: Gerçek sayfa içeriği
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // Font değişkenlerini CSS'e aktar ve antialiasing uygula
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Hata yakalama katmanı */}
        <ErrorBoundary>
          {/* Authentication context provider */}
          <AuthProvider>
            {/* Sayfa içeriği buraya render edilir */}
            {children}
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
