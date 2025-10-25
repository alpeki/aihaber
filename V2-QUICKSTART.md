# 🚀 AI Haber V2 - Hızlı Başlangıç Rehberi

## ⚠️ Ön Gereksinimler

### 1. Node.js Kurulumu

**Adım 1:** Node.js İndirin
- 🔗 https://nodejs.org/
- **LTS (Long Term Support)** versiyonunu indirin (önerilen)
- Kurulum dosyasını çalıştırın
- Tüm varsayılan ayarları kabul edin
- **Bilgisayarı yeniden başlatın**

**Adım 2:** Kurulumu Doğrulayın
```powershell
# PowerShell'de çalıştırın
node --version
# Çıktı: v18.x.x veya v20.x.x

npm --version
# Çıktı: 9.x.x veya 10.x.x
```

### 2. pnpm Kurulumu

```powershell
npm install -g pnpm
pnpm --version
```

## 🎯 V2 Geliştirme Seçenekleri

### Seçenek A: Tam Backend (Strapi) - Gelişmiş

**Avantajları:**
- ✅ Tam kontrol
- ✅ Özelleştirilebilir
- ✅ Kendi sunucunuzda

**Dezavantajları:**
- ❌ Daha karmaşık
- ❌ Sunucu maliyeti
- ❌ Bakım gerektirir

**Kurulum:**
```powershell
cd "c:\Users\idons\OneDrive\Masaüstü\ai.haber"
npx create-strapi-app@latest backend --quickstart
```

### Seçenek B: Headless CMS (Strapi Cloud) - Önerilen

**Avantajları:**
- ✅ Kolay kurulum
- ✅ Ücretsiz plan
- ✅ Otomatik yedekleme
- ✅ Bakım gerektirmez

**Adımlar:**
1. 🔗 https://cloud.strapi.io adresine gidin
2. GitHub ile giriş yapın
3. "Create new project" tıklayın
4. Proje adı: `ai-haber-cms`
5. Region: Europe (en yakın)
6. Plan: Free (başlangıç için yeterli)
7. API URL'i kopyalayın (örn: `https://ai-haber-cms.strapiapp.com`)

### Seçenek C: Supabase (Backend as a Service) - En Kolay

**Avantajları:**
- ✅ En kolay kurulum
- ✅ Ücretsiz plan (500MB)
- ✅ PostgreSQL database
- ✅ Otomatik API
- ✅ Real-time özellikler

**Adımlar:**
1. 🔗 https://supabase.com adresine gidin
2. GitHub ile giriş yapın
3. "New project" oluşturun
4. Database şemasını oluşturun
5. Auto-generated API kullanın

### Seçenek D: Firebase (Google) - Alternatif

**Avantajları:**
- ✅ Google altyapısı
- ✅ Ücretsiz plan
- ✅ Real-time database
- ✅ Authentication dahil

## 🎨 Önerilen Yaklaşım: Hybrid (Aşamalı)

### Faz 1: Headless CMS ile Başla (1 Hafta)

1. **Strapi Cloud** kullan (ücretsiz)
2. Content types oluştur
3. Frontend'i API'ye bağla
4. Temel özellikleri test et

### Faz 2: RSS Feed Ekle (1 Hafta)

Serverless function kullan:

**Netlify Functions:**
```javascript
// netlify/functions/fetch-rss.js
const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async (event, context) => {
  try {
    const feed = await parser.parseURL('https://techcrunch.com/feed/');
    
    return {
      statusCode: 200,
      body: JSON.stringify(feed.items.slice(0, 10))
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### Faz 3: AI Özetleme Ekle (1 Hafta)

**Netlify/Vercel Function:**
```javascript
// netlify/functions/ai-summarize.js
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

exports.handler = async (event, context) => {
  const { content } = JSON.parse(event.body);
  
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'Sen bir haber özetleyicisisin. Kısa ve öz özetler yap.'
      },
      {
        role: 'user',
        content: `Bu haberi özetle: ${content}`
      }
    ],
    max_tokens: 150
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      summary: response.data.choices[0].message.content
    })
  };
};
```

### Faz 4: Algolia Arama Ekle (3 Gün)

```bash
pnpm add algoliasearch instantsearch.js
```

```javascript
// search.js
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';

const searchClient = algoliasearch(
  'YOUR_APP_ID',
  'YOUR_SEARCH_API_KEY'
);

const search = instantsearch({
  indexName: 'articles',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div class="hit">
          <h3>{{title}}</h3>
          <p>{{excerpt}}</p>
        </div>
      `,
    },
  }),
]);

search.start();
```

## 📦 Proje Yapısı (V2)

```
ai.haber/
├── frontend/                 # Mevcut site
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── api-client.js        # YENİ
│
├── backend/                 # Strapi CMS (opsiyonel)
│   ├── config/
│   ├── src/
│   │   └── api/
│   │       ├── article/
│   │       ├── category/
│   │       └── author/
│   └── package.json
│
├── functions/              # Serverless functions
│   ├── fetch-rss.js
│   ├── ai-summarize.js
│   └── send-newsletter.js
│
├── .env                    # Environment variables
├── netlify.toml           # Netlify config
└── package.json
```

## 🔧 Environment Variables

`.env` dosyası oluşturun:

```env
# Strapi
VITE_STRAPI_URL=https://your-project.strapiapp.com
VITE_STRAPI_TOKEN=your-api-token

# OpenAI
OPENAI_API_KEY=sk-...

# Algolia
VITE_ALGOLIA_APP_ID=your-app-id
VITE_ALGOLIA_SEARCH_KEY=your-search-key
ALGOLIA_ADMIN_KEY=your-admin-key

# Supabase (alternatif)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🚀 Hızlı Başlangıç Komutları

### Strapi Cloud ile:

```powershell
# 1. Frontend'i güncelle
cd "c:\Users\idons\OneDrive\Masaüstü\ai.haber"
pnpm add axios

# 2. API client oluştur
# (BACKEND-SETUP.md'deki api-client.js'i kopyala)

# 3. .env dosyası oluştur
echo "VITE_STRAPI_URL=https://your-project.strapiapp.com" > .env

# 4. Çalıştır
pnpm run dev
```

### Supabase ile:

```powershell
# 1. Supabase client kur
pnpm add @supabase/supabase-js

# 2. Client oluştur
# supabase-client.js dosyası oluştur

# 3. Çalıştır
pnpm run dev
```

## 📊 Maliyet Karşılaştırması

| Servis | Ücretsiz Plan | Ücretli Plan | Önerilen |
|--------|---------------|--------------|----------|
| **Strapi Cloud** | 1 proje, 1GB | $99/ay | ⭐ Başlangıç |
| **Supabase** | 500MB, 2GB transfer | $25/ay | ⭐⭐ Önerilen |
| **Firebase** | 1GB storage | $25/ay | ⭐ Alternatif |
| **Self-hosted** | Sunucu maliyeti | $5-50/ay | ⭐⭐⭐ İleri seviye |

## 🎯 Hangi Seçeneği Seçmeliyim?

### Yeni Başlıyorsanız:
→ **Supabase** (en kolay, ücretsiz, güçlü)

### CMS istiyorsanız:
→ **Strapi Cloud** (admin panel, kolay yönetim)

### Tam kontrol istiyorsanız:
→ **Self-hosted Strapi** (karmaşık ama esnek)

### Hızlı prototip için:
→ **Firebase** (Google ekosistemi)

## 📝 Sonraki Adımlar

1. **Node.js kurun** (eğer yoksa)
2. **Bir backend seçin** (Supabase öneriyorum)
3. **API entegrasyonu yapın**
4. **RSS feed ekleyin**
5. **AI özetleme ekleyin**
6. **Production'a deploy edin**

## 🆘 Yardım

Hangi seçeneği tercih etmek istersiniz?

A) Strapi Cloud (CMS, kolay)
B) Supabase (Database, en kolay)
C) Self-hosted Strapi (tam kontrol)
D) Önce frontend'i geliştir, backend sonra

Seçiminizi söyleyin, ona göre devam edelim! 🚀
