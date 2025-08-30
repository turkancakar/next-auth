/**
 * Next.js Middleware - Sayfa Erişim Kontrolü
 * 
 * Middleware: Next.js'te sayfa yüklenmeden önce çalışan kod
 * Bu middleware authentication ve authorization kontrolü yapar
 * 
 * withAuth: NextAuth.js'in middleware wrapper'ı
 * NextResponse: Next.js'in response objesi
 */
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

/**
 * Middleware fonksiyonu - Her sayfa isteğinde çalışır
 * 
 * @param req - Gelen istek objesi
 * @returns Response objesi (yönlendirme veya devam)
 * 
 * Bu fonksiyon sayfa erişimlerini kontrol eder ve gerekirse yönlendirme yapar
 */
export default withAuth(
  function middleware(req) {
    // NextAuth.js token'ı (kullanıcı bilgileri)
    const token = req.nextauth.token;
    
    // Kullanıcının giriş yapıp yapmadığı
    const isAuth = !!token;
    
    // Sayfa türlerini belirle
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth'); // Giriş sayfaları
    const isProtectedPage = req.nextUrl.pathname.startsWith('/dashboard') || 
                           req.nextUrl.pathname.startsWith('/admin'); // Korumalı sayfalar
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin'); // Admin sayfaları

    // Korumalı sayfalara giriş yapmadan erişmeye çalışıyorsa giriş sayfasına yönlendir
    if (isProtectedPage && !isAuth) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // Giriş yapmış kullanıcı giriş sayfalarına erişmeye çalışıyorsa dashboard'a yönlendir
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Admin sayfalarına admin olmayan kullanıcı erişmeye çalışıyorsa dashboard'a yönlendir
    if (isAdminPage && token) {
      const userRoles = token.roles || [];
      if (!userRoles.includes('admin')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    // Tüm kontroller geçildi, sayfaya devam et
    return NextResponse.next();
  },
  {
    // withAuth konfigürasyonu
    callbacks: {
      // authorized callback: Middleware'nin çalışıp çalışmayacağını belirler
      // Burada token varsa middleware çalışır
      authorized: ({ token }) => !!token,
    },
  }
);

// Middleware'nin hangi sayfalarda çalışacağını belirler
// :path* - Alt sayfaları da dahil eder (örn: /dashboard/settings)
export const config = {
  matcher: [
    '/dashboard/:path*', // Dashboard ve alt sayfaları
    '/admin/:path*', // Admin paneli ve alt sayfaları
    '/auth/:path*', // Auth sayfaları (giriş, hata vb.)
  ],
};
