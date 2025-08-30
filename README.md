# NextAuth with Auth0 - Authentication System

Modern bir kimlik doğrulama ve yetkilendirme sistemi, Next.js 14+, Auth0 ve NextAuth.js kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **OAuth 2.0 Authentication**: Auth0 ile güvenli kimlik doğrulama
- **JWT Token Management**: Stateless session yönetimi
- **Role-Based Authorization**: Admin ve user rol yönetimi
- **Middleware Protection**: Next.js middleware ile sayfa koruması
- **SOLID Principles**: Temiz kod mimarisi
- **12 Factor App**: Modern uygulama geliştirme prensipleri
- **TypeScript**: Tip güvenliği
- **TailwindCSS**: Modern UI tasarımı
- **Docker Support**: Containerization desteği

## 🛠️ Teknolojiler

- **Next.js 14+** (App Router)
- **Auth0** (OAuth Provider)
- **NextAuth.js** (Authentication Framework)
- **TypeScript**
- **TailwindCSS**
- **Docker**

## 📋 Gereksinimler

- Node.js 18+
- npm veya yarn
- Auth0 hesabı

## 🚀 Kurulum

### 1. Repository'yi klonlayın

```bash
git clone https://github.com/your-username/next-auth.git
cd next-auth
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Environment Variables

`.env.local` dosyası oluşturun:

```bash
cp env.example .env.local
```

Auth0 konfigürasyonu için gerekli değerleri doldurun:

```env
# Auth0 Configuration
AUTH0_SECRET='your-auth0-secret-key-here'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-tenant.auth0.com'
AUTH0_CLIENT_ID='your-auth0-client-id'
AUTH0_CLIENT_SECRET='your-auth0-client-secret'

# NextAuth Configuration
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='your-nextauth-secret-key-here'

# Application Configuration
NODE_ENV='development'
```

### 4. Auth0 Kurulumu

1. [Auth0 Dashboard](https://manage.auth0.com/)'a gidin
2. Yeni bir Application oluşturun
3. Application Type: "Single Page Application" seçin
4. Allowed Callback URLs: `http://localhost:3000/api/auth/callback/auth0`
5. Allowed Logout URLs: `http://localhost:3000`
6. Client ID ve Client Secret'ı kopyalayın

### 5. Development Server'ı başlatın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📁 Proje Yapısı

```
my-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   └── protected/
│   │       └── user/
│   │           └── route.ts
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   └── error/
│   │       └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── admin/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── auth/
│       ├── AuthProvider.tsx
│       └── useAuth.ts
├── types/
│   └── next-auth.d.ts
├── middleware.ts
├── Dockerfile
├── .dockerignore
├── next.config.mjs
├── package.json
└── README.md
```

## 🔐 Authentication Flow

1. **Login**: Kullanıcı `/auth/signin` sayfasından Auth0 ile giriş yapar
2. **Callback**: Auth0'dan gelen callback NextAuth.js tarafından işlenir
3. **JWT Token**: Kullanıcı bilgileri JWT token olarak saklanır
4. **Session**: Client-side session yönetimi
5. **Authorization**: Middleware ile sayfa erişimi kontrol edilir

## 🛡️ Güvenlik

- **JWT Tokens**: Stateless session yönetimi
- **Role-Based Access**: Admin ve user rolleri
- **Middleware Protection**: Sayfa seviyesinde koruma
- **Environment Variables**: Hassas bilgiler güvenli şekilde saklanır

## 🐳 Docker ile Çalıştırma

### Build Image

```bash
docker build -t next-auth-app .
```

### Run Container

```bash
docker run -p 3000:3000 --env-file .env.local next-auth-app
```

## 📝 API Endpoints

### Protected Routes

- `GET /api/protected/user` - Kullanıcı bilgilerini döndürür (Authentication gerekli)

### Auth Routes

- `GET /api/auth/signin` - Giriş sayfası
- `GET /api/auth/signout` - Çıkış
- `GET /api/auth/session` - Session bilgisi

## 🎨 Sayfalar

- **Home** (`/`) - Ana sayfa
- **Sign In** (`/auth/signin`) - Giriş sayfası
- **Dashboard** (`/dashboard`) - Kullanıcı paneli (Authentication gerekli)
- **Admin Panel** (`/admin`) - Admin paneli (Admin rolü gerekli)
- **Error** (`/auth/error`) - Hata sayfası

## 🔧 SOLID Prensipleri

- **Single Responsibility**: Her component tek bir sorumluluğa sahip
- **Open/Closed**: Yeni provider'lar kolayca eklenebilir
- **Liskov Substitution**: Interface'ler tutarlı şekilde kullanılır
- **Interface Segregation**: Küçük, özel interface'ler
- **Dependency Inversion**: Bağımlılıklar abstraction'lara dayalı

## 📋 12 Factor App Uyumluluğu

1. **Codebase**: Tek repository
2. **Dependencies**: Explicit dependency declaration
3. **Config**: Environment variables
4. **Backing Services**: Auth0 service
5. **Build, Release, Run**: Docker ile ayrım
6. **Processes**: Stateless processes
7. **Port Binding**: Port 3000
8. **Concurrency**: Horizontal scaling
9. **Disposability**: Graceful shutdown
10. **Dev/Prod Parity**: Docker ile tutarlılık
11. **Logs**: Console logging
12. **Admin Processes**: Admin panel

## 🧪 Test

```bash
# Lint kontrolü
npm run lint

# Build test
npm run build
```

## 📦 Production Deployment

### Vercel

```bash
npm run build
vercel --prod
```

### Docker

```bash
docker build -t next-auth-app .
docker run -p 3000:3000 --env-file .env.production next-auth-app
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🆘 Destek

Herhangi bir sorun yaşarsanız, lütfen issue açın veya iletişime geçin.

## 🔄 Changelog

### v1.0.0
- İlk sürüm
- Auth0 entegrasyonu
- NextAuth.js konfigürasyonu
- Role-based authorization
- Docker desteği
- SOLID prensipleri uygulaması
- 12 Factor App uyumluluğu
