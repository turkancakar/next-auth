/**
 * Ana Sayfa (Home Page)
 * 
 * Bu sayfa uygulamanın giriş noktasıdır. Kullanıcılar buradan:
 * - Uygulama hakkında bilgi alabilir
 * - Giriş yapabilir (eğer giriş yapmamışsa)
 * - Dashboard'a gidebilir (eğer giriş yapmışsa)
 * 
 * 'use client' direktifi: Bu component'in client-side'da çalışacağını belirtir
 * (browser'da JavaScript ile interaktif olacak)
 */
'use client';

import { useAuth } from '@/lib/auth/useAuth';
import Link from 'next/link';

export default function Home() {
  // useAuth hook'u ile authentication durumunu alıyoruz
  // session: Kullanıcının oturum bilgileri (null ise giriş yapmamış)
  // login: Giriş yapma fonksiyonu
  // isAuthenticated: Kullanıcının giriş yapıp yapmadığını kontrol eden boolean
  const { session, login, isAuthenticated } = useAuth();

  return (
    // min-h-screen: Minimum yükseklik ekran boyutu kadar olsun
    // bg-gradient-to-br: Sağ alt köşeye doğru gradient (blue-50'den indigo-100'e)
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Bar - Üst menü çubuğu */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                NextAuth with Auth0
              </h1>
            </div>
            {/* Sağ taraftaki butonlar - Kullanıcı durumuna göre değişir */}
            <div className="flex items-center space-x-4">
              {/* Conditional Rendering: Kullanıcı giriş yapmışsa dashboard linki, yapmamışsa giriş butonu göster */}
              {isAuthenticated ? (
                <>
                  {/* Hoş geldin mesajı */}
                  <span className="text-sm text-gray-700">
                    Welcome, {session?.user.name}!
                  </span>
                  {/* Dashboard'a git butonu */}
                  <Link
                    href="/dashboard"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                /* Giriş yap butonu - Auth0 ile giriş başlatır */
                <button
                  onClick={() => login()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Secure Authentication</span>
            <span className="block text-blue-600">with Auth0 & NextAuth</span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A modern authentication system built with Next.js, Auth0, and NextAuth.js. 
            Featuring JWT-based session management and role-based authorization.
          </p>
          
          <div className="mt-10 flex justify-center space-x-4">
            {!isAuthenticated ? (
              <button
                onClick={() => login()}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Get Started
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Go to Dashboard
              </Link>
            )}
            
            <a
              href="https://github.com/your-username/next-auth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Secure Authentication</h3>
                    <p className="text-sm text-gray-500">OAuth 2.0 with Auth0 provider</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Role-Based Access</h3>
                    <p className="text-sm text-gray-500">Admin and user role management</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">JWT Tokens</h3>
                    <p className="text-sm text-gray-500">Stateless session management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
