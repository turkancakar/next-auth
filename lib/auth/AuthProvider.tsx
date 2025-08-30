/**
 * AuthProvider Component - Authentication Context Provider
 * 
 * Bu component NextAuth.js'in SessionProvider'ını sarmalar ve tüm uygulamada
 * authentication bilgilerine erişim sağlar.
 * 
 * Context: React'te veri paylaşımı için kullanılan bir yapı
 * Provider: Context'i sağlayan component
 * 
 * 'use client' direktifi: Bu component'in client-side'da çalışacağını belirtir
 */
'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

// Props interface'i - TypeScript tip tanımı
interface AuthProviderProps {
  children: ReactNode; // Alt component'ler
}

/**
 * AuthProvider Component
 * 
 * @param children - Alt component'ler (sayfa içerikleri)
 * @returns SessionProvider ile sarılmış children
 * 
 * Bu component sayesinde tüm alt component'ler useSession hook'unu kullanabilir
 */
export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
