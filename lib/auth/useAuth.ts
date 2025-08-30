/**
 * useAuth Custom Hook - Authentication İşlemleri
 * 
 * Bu hook NextAuth.js'in useSession hook'unu genişletir ve
 * authentication ile ilgili tüm işlemleri tek bir yerden yönetir.
 * 
 * Hook: React'te state ve logic paylaşımı için kullanılan fonksiyon
 * Custom Hook: Kendi yazdığımız hook'lar
 * 
 * 'use client' direktifi: Bu hook'un client-side'da çalışacağını belirtir
 */
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

/**
 * useAuth Hook
 * 
 * @returns Authentication ile ilgili tüm fonksiyonlar ve durumlar
 * 
 * Bu hook sayesinde component'ler authentication işlemlerini kolayca yapabilir
 */
export function useAuth() {
  // NextAuth.js'in useSession hook'u ile session bilgilerini al
  const { data: session, status } = useSession();

  /**
   * Login fonksiyonu - Kullanıcı girişi başlatır
   * 
   * @param provider - Kimlik doğrulama sağlayıcısı (varsayılan: 'auth0')
   * 
   * Bu fonksiyon Auth0 login sayfasına yönlendirir
   */
  const login = async (provider?: string) => {
    try {
      // signIn: NextAuth.js'in giriş başlatma fonksiyonu
      // callbackUrl: Giriş başarılı olduktan sonra yönlendirilecek sayfa
      await signIn(provider || 'auth0', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  /**
   * Logout fonksiyonu - Kullanıcı çıkışı yapar
   * 
   * Bu fonksiyon kullanıcıyı çıkarır ve ana sayfaya yönlendirir
   */
  const logout = async () => {
    try {
      // signOut: NextAuth.js'in çıkış fonksiyonu
      // callbackUrl: Çıkış sonrası yönlendirilecek sayfa
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  /**
   * hasRole fonksiyonu - Kullanıcının belirli bir role sahip olup olmadığını kontrol eder
   * 
   * @param role - Kontrol edilecek rol adı
   * @returns Kullanıcının o role sahip olup olmadığı (boolean)
   * 
   * Role-based Access Control (RBAC): Rol tabanlı erişim kontrolü
   */
  const hasRole = (role: string): boolean => {
    // session?.user?.roles: Optional chaining ile güvenli erişim
    // includes(role): Array'de belirtilen rol var mı kontrol eder
    return session?.user?.roles?.includes(role) || false;
  };

  /**
   * isAdmin fonksiyonu - Kullanıcının admin olup olmadığını kontrol eder
   * 
   * @returns Kullanıcının admin olup olmadığı (boolean)
   */
  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  /**
   * isUser fonksiyonu - Kullanıcının user olup olmadığını kontrol eder
   * 
   * @returns Kullanıcının user olup olmadığı (boolean)
   */
  const isUser = (): boolean => {
    return hasRole('user');
  };

  // Hook'tan döndürülecek değerler
  return {
    session, // Kullanıcı oturum bilgileri
    status, // Oturum durumu ('loading', 'authenticated', 'unauthenticated')
    login, // Giriş yapma fonksiyonu
    logout, // Çıkış yapma fonksiyonu
    hasRole, // Rol kontrol fonksiyonu
    isAdmin, // Admin kontrol fonksiyonu
    isUser, // User kontrol fonksiyonu
    isAuthenticated: !!session, // Kullanıcının giriş yapıp yapmadığı (boolean)
    isLoading: status === 'loading', // Yükleme durumu (boolean)
  };
}
