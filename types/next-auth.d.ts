/**
 * NextAuth.js TypeScript Type Extensions
 * 
 * Bu dosya NextAuth.js'in varsayılan tiplerini genişletir
 * Böylece custom alanlar (roles, accessToken vb.) TypeScript tarafından tanınır
 * 
 * Module Augmentation: TypeScript'te mevcut modüllerin tiplerini genişletme
 */
import NextAuth from 'next-auth';

// NextAuth.js Session modülünü genişlet
declare module 'next-auth' {
  // Session interface'ini genişlet
  interface Session {
    accessToken?: string; // API çağrıları için access token
    user: {
      id: string; // Kullanıcı ID'si
      name?: string | null; // Kullanıcı adı
      email?: string | null; // Kullanıcı email'i
      image?: string | null; // Profil resmi URL'i
      roles: string[]; // Kullanıcı rolleri (admin, user vb.)
    };
  }

  // User interface'ini genişlet
  interface User {
    id: string; // Kullanıcı ID'si
    name?: string | null; // Kullanıcı adı
    email?: string | null; // Kullanıcı email'i
    image?: string | null; // Profil resmi URL'i
    roles: string[]; // Kullanıcı rolleri
  }
}

// NextAuth.js JWT modülünü genişlet
declare module 'next-auth/jwt' {
  // JWT interface'ini genişlet
  interface JWT {
    accessToken?: string; // API çağrıları için access token
    refreshToken?: string; // Token yenileme için refresh token
    expiresAt?: number; // Token'ın ne zaman sona ereceği (timestamp)
    roles?: string[]; // Kullanıcı rolleri
  }
}
