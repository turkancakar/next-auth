import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-config';

/**
 * Server-side session kontrolü
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Kullanıcının belirli bir role sahip olup olmadığını kontrol eder
 */
export function hasRole(userRoles: string[], requiredRole: string): boolean {
  return userRoles.includes(requiredRole);
}

/**
 * Kullanıcının admin olup olmadığını kontrol eder
 */
export function isAdmin(userRoles: string[]): boolean {
  return hasRole(userRoles, 'admin'); 
}

/**
 * Kullanıcının user olup olmadığını kontrol eder
 */
export function isUser(userRoles: string[]): boolean {
  return hasRole(userRoles, 'user');
}

/**
 * JWT token'ı decode eder
 */
export function decodeToken(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

/**
 * Token'ın geçerlilik süresini kontrol eder
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}
