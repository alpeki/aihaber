# Backend + CMS Kurulum Rehberi

## 🚀 Strapi CMS Kurulumu

### Adım 1: Backend Klasörü Oluşturma

```bash
cd "c:\Users\idons\OneDrive\Masaüstü\ai.haber"

# Backend klasörü oluştur ve Strapi kur
npx create-strapi-app@latest backend --quickstart
```

Bu komut:
- ✅ Strapi'yi kurar
- ✅ SQLite database oluşturur (geliştirme için)
- ✅ Admin panelini başlatır
- ✅ Otomatik olarak tarayıcıda açar

### Adım 2: İlk Admin Kullanıcısı

Tarayıcıda açılan sayfada:
1. İsim: `Admin`
2. Email: `admin@aihaber.com`
3. Şifre: Güçlü bir şifre belirleyin
4. **Let's start** butonuna tıklayın

### Adım 3: Content Types Oluşturma

#### 3.1 Article (Haber) Content Type

Admin panelde:
1. **Content-Type Builder** → **Create new collection type**
2. Display name: `Article`
3. Alanları ekleyin:

```javascript
// Article Fields
{
  title: 'Text (Short text)', // Başlık
  slug: 'UID (attached to title)', // URL-friendly başlık
  excerpt: 'Text (Long text)', // Özet
  content: 'Rich text', // İçerik
  coverImage: 'Media (Single media)', // Kapak görseli
  category: 'Relation (Many to One with Category)', // Kategori
  author: 'Relation (Many to One with Author)', // Yazar
  tags: 'Relation (Many to Many with Tag)', // Etiketler
  publishedAt: 'DateTime', // Yayın tarihi
  readTime: 'Number (Integer)', // Okuma süresi (dakika)
  views: 'Number (Integer)', // Görüntülenme sayısı
  featured: 'Boolean', // Öne çıkan mı?
  aiSummary: 'Text (Long text)', // AI özeti
  seoTitle: 'Text (Short text)', // SEO başlık
  seoDescription: 'Text (Long text)', // SEO açıklama
}
```

#### 3.2 Category (Kategori) Content Type

```javascript
// Category Fields
{
  name: 'Text (Short text)', // Kategori adı
  slug: 'UID (attached to name)',
  description: 'Text (Long text)',
  icon: 'Text (Short text)', // Emoji veya icon class
  color: 'Text (Short text)', // Hex renk kodu
  articles: 'Relation (One to Many with Article)'
}
```

#### 3.3 Author (Yazar) Content Type

```javascript
// Author Fields
{
  name: 'Text (Short text)',
  slug: 'UID (attached to name)',
  bio: 'Text (Long text)',
  avatar: 'Media (Single media)',
  email: 'Email',
  twitter: 'Text (Short text)',
  linkedin: 'Text (Short text)',
  articles: 'Relation (One to Many with Article)'
}
```

#### 3.4 Tag (Etiket) Content Type

```javascript
// Tag Fields
{
  name: 'Text (Short text)',
  slug: 'UID (attached to name)',
  articles: 'Relation (Many to Many with Article)'
}
```

#### 3.5 Comment (Yorum) Content Type

```javascript
// Comment Fields
{
  content: 'Text (Long text)',
  author: 'Text (Short text)', // Yorum yapan kişi
  email: 'Email',
  article: 'Relation (Many to One with Article)',
  parentComment: 'Relation (Many to One with Comment)', // Yanıt için
  approved: 'Boolean', // Onaylandı mı?
  createdAt: 'DateTime'
}
```

### Adım 4: API Ayarları

1. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. İzinleri ayarlayın:

```
Article:
  ✅ find (tüm haberler)
  ✅ findOne (tek haber)
  ✅ count

Category:
  ✅ find
  ✅ findOne

Author:
  ✅ find
  ✅ findOne

Tag:
  ✅ find
  ✅ findOne

Comment:
  ✅ find
  ✅ create (yorum yapabilmek için)
```

### Adım 5: Örnek Veri Ekleme

Admin panelde **Content Manager** → **Article** → **Create new entry**

Örnek haber:
```
Title: "GPT-4 Turbo Tanıtıldı: Daha Hızlı ve Ucuz"
Excerpt: "OpenAI'ın yeni modeli GPT-4 Turbo, geliştiricilere daha uygun fiyatlarla sunuluyor."
Content: [Rich text ile tam içerik]
Category: "Yapay Zeka"
Author: "Dr. Sarah Chen"
Tags: ["AI", "GPT-4", "OpenAI"]
Featured: true
```

### Adım 6: Frontend Entegrasyonu

#### 6.1 API Client Oluşturma

```bash
# Frontend klasöründe
cd "c:\Users\idons\OneDrive\Masaüstü\ai.haber"
pnpm add axios
```

`api-client.js` dosyası oluşturun:

```javascript
// api-client.js
import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Articles
export const getArticles = async (params = {}) => {
  const response = await apiClient.get('/articles', {
    params: {
      populate: ['coverImage', 'category', 'author', 'tags'],
      sort: ['publishedAt:desc'],
      ...params,
    },
  });
  return response.data;
};

export const getArticle = async (slug) => {
  const response = await apiClient.get('/articles', {
    params: {
      filters: { slug: { $eq: slug } },
      populate: ['coverImage', 'category', 'author', 'tags', 'comments'],
    },
  });
  return response.data.data[0];
};

// Categories
export const getCategories = async () => {
  const response = await apiClient.get('/categories', {
    params: {
      populate: '*',
    },
  });
  return response.data;
};

// Comments
export const createComment = async (commentData) => {
  const response = await apiClient.post('/comments', {
    data: commentData,
  });
  return response.data;
};

export default apiClient;
```

#### 6.2 Script.js Güncelleme

`script.js` dosyasını güncelleyin:

```javascript
// script.js başına ekleyin
import { getArticles, getCategories } from './api-client.js';

// loadTrendingNews fonksiyonunu güncelleyin
async function loadTrendingNews() {
    try {
        const response = await getArticles({
            filters: { featured: { $eq: true } },
            pagination: { limit: 3 },
        });
        
        const trendingGrid = document.getElementById('trendingGrid');
        trendingGrid.innerHTML = response.data.map(article => {
            const imageUrl = article.attributes.coverImage?.data?.attributes?.url || '';
            const fullImageUrl = imageUrl.startsWith('http') 
                ? imageUrl 
                : `http://localhost:1337${imageUrl}`;
            
            return `
                <div class="news-card" data-id="${article.id}">
                    <div class="news-image">
                        <img src="${fullImageUrl}" alt="${article.attributes.title}" loading="lazy">
                    </div>
                    <div class="news-content">
                        <span class="news-category">${article.attributes.category?.data?.attributes?.name || 'Genel'}</span>
                        <h3>${article.attributes.title}</h3>
                        <p>${article.attributes.excerpt}</p>
                        <div class="news-meta">
                            <span>${article.attributes.author?.data?.attributes?.name || 'Anonim'}</span>
                            <span>${article.attributes.readTime} min read</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Haberler yüklenirken hata:', error);
        // Fallback: Mock data kullan
        loadTrendingNewsMock();
    }
}
```

### Adım 7: CORS Ayarları

Backend klasöründe `config/middlewares.js`:

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:5173', 'https://alpeki.github.io'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### Adım 8: Production Database (PostgreSQL)

#### 8.1 PostgreSQL Kurulumu

```bash
# Backend klasöründe
cd backend
pnpm add pg
```

#### 8.2 Database Config

`config/database.js`:

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'aihaber'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'password'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    debug: false,
  },
});
```

`.env` dosyası:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=aihaber
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
DATABASE_SSL=false
```

## 🚀 Çalıştırma

### Development

```bash
# Terminal 1: Backend
cd backend
pnpm develop

# Terminal 2: Frontend
cd ..
pnpm run dev
```

### Production Build

```bash
# Backend
cd backend
NODE_ENV=production pnpm build
NODE_ENV=production pnpm start

# Frontend
cd ..
pnpm run build
```

## 📝 Sonraki Adımlar

1. ✅ Strapi kurulumu
2. ✅ Content types oluşturma
3. ✅ API ayarları
4. ✅ Frontend entegrasyonu
5. ⏭️ RSS Feed Parser ekleme
6. ⏭️ AI Özetleme entegrasyonu
7. ⏭️ Algolia arama
8. ⏭️ Production deploy

## 🔗 Faydalı Linkler

- Strapi Docs: https://docs.strapi.io
- Strapi API Reference: https://docs.strapi.io/dev-docs/api/rest
- PostgreSQL: https://www.postgresql.org/
