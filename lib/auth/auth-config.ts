/**
 * NextAuth.js Konfigürasyonu
 * 
 * Bu dosya NextAuth.js'in nasıl çalışacağını belirler:
 * - Hangi provider'ları kullanacağı (Auth0)
 * - JWT token'ları nasıl işleyeceği
 * - Session bilgilerini nasıl yöneteceği
 * - Callback fonksiyonları (giriş sonrası işlemler)
 * 
 * Provider: Kimlik doğrulama sağlayıcısı (Auth0, Google, GitHub vb.)
 * JWT: JSON Web Token - Güvenli, şifrelenmiş kullanıcı bilgileri
 * Session: Oturum bilgileri (client-side'da kullanılır)
 */
import { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import { Account, Profile } from 'next-auth';

// NextAuth.js ana konfigürasyon objesi
export const authOptions: NextAuthOptions = {
  // Kimlik doğrulama sağlayıcıları listesi
  providers: [
    // Auth0 provider'ı - OAuth 2.0 tabanlı kimlik doğrulama
    Auth0Provider({
      // Auth0 application bilgileri (environment variables'dan alınır)
      clientId: process.env.AUTH0_CLIENT_ID!, // Auth0 application ID'si
      clientSecret: process.env.AUTH0_CLIENT_SECRET!, // Auth0 application secret'ı
      issuer: process.env.AUTH0_ISSUER_BASE_URL, // Auth0 domain'i (https://your-tenant.auth0.com)
    }),
  ],
  // Callback fonksiyonları - Kimlik doğrulama sürecinde çalışır
  callbacks: {
    /**
     * JWT Callback - JWT token'ı oluştururken/güncellerken çalışır
     * 
     * @param token - Mevcut JWT token
     * @param account - Auth0'dan gelen hesap bilgileri (ilk girişte mevcut)
     * @param profile - Auth0'dan gelen kullanıcı profil bilgileri
     * 
     * Bu callback JWT token'a özel bilgiler eklemek için kullanılır
     */
    async jwt({ token, account, profile }: { token: JWT; account: Account | null; profile?: Profile }) {
      // İlk giriş sırasında (account bilgisi mevcut)
      if (account) {
        // Auth0'dan gelen token bilgilerini JWT'ye ekle
        token.accessToken = account.access_token; // API çağrıları için access token
        token.refreshToken = account.refresh_token; // Token yenileme için
        token.expiresAt = account.expires_at; // Token'ın ne zaman sona ereceği
      }

      // Auth0 profil bilgilerini JWT'ye ekle
      if (profile) {
        token.sub = profile.sub; // Unique user ID
        token.email = profile.email; // Kullanıcı email'i
        token.name = profile.name; // Kullanıcı adı
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.picture = (profile as any).picture; // Profil resmi
        
        // Auth0'da tanımlı custom roller varsa JWT'ye ekle
        // Custom namespace: Auth0'da tanımladığınız özel alan
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((profile as any)['https://your-namespace/roles']) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          token.roles = (profile as any)['https://your-namespace/roles'];
        }
      }

      return token;
    },
    /**
     * Session Callback - Client-side session bilgilerini oluşturur
     * 
     * @param session - Client-side'da kullanılacak session objesi
     * @param token - JWT token'dan gelen bilgiler
     * 
     * Bu callback JWT'deki bilgileri client-side session'a aktarır
     */
    async session({ session, token }: { session: Session; token: JWT }) {
      // JWT'deki bilgileri client-side session'a aktar
      session.accessToken = token.accessToken; // API çağrıları için
      session.user.id = token.sub || ''; // Kullanıcı ID'si
      session.user.roles = token.roles || ['user']; // Kullanıcı rolleri (varsayılan: user)
      
      return session;
    },
  },
  // Session stratejisi: JWT tabanlı (stateless)
  // Stateless: Server'da session saklanmaz, tüm bilgiler JWT'de
  session: {
    strategy: 'jwt' as const,
  },
  
  // Özel sayfa yolları
  pages: {
    signIn: '/auth/signin', // Giriş sayfası
    error: '/auth/error', // Hata sayfası
  },
  
  // NextAuth.js secret key - JWT'leri imzalamak için
  // Bu key environment variable'dan alınır
  secret: process.env.NEXTAUTH_SECRET,
};
