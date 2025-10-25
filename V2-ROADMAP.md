# AI Haber V2 - Geliştirme Yol Haritası

## 🎯 Hedef: Tam Özellikli AI Haber Platformu

### Mimari Değişiklikler

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Mevcut)                     │
│              Vite + Vanilla JS + TailwindCSS            │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Backend (Yeni)                        │
│         Node.js + Express + Strapi CMS                  │
│         PostgreSQL / MongoDB                             │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  Dış Servisler                           │
│  • RSS Feed Parser                                       │
│  • OpenAI API (Özetleme)                                │
│  • Algolia (Arama)                                       │
│  • Cloudinary (Görseller)                               │
└─────────────────────────────────────────────────────────┘
```

## 📋 Detaylı Görev Listesi

### Faz 1: Backend + CMS Kurulumu (2-3 Hafta)

#### 1.1 Strapi CMS Kurulumu
- [ ] Yeni `backend` klasörü oluştur
- [ ] Strapi kurulumu (`npx create-strapi-app@latest backend`)
- [ ] PostgreSQL veya MongoDB bağlantısı
- [ ] Admin paneli yapılandırması
- [ ] Content Types oluşturma:
  - Articles (Haberler)
  - Categories (Kategoriler)
  - Authors (Yazarlar)
  - Tags (Etiketler)
  - Comments (Yorumlar)

#### 1.2 API Geliştirme
- [ ] RESTful API endpoints
- [ ] GraphQL endpoint (opsiyonel)
- [ ] JWT authentication
- [ ] Role-based access control
- [ ] API rate limiting
- [ ] CORS yapılandırması

#### 1.3 Frontend Entegrasyonu
- [ ] API client oluşturma
- [ ] State management (Zustand/Pinia)
- [ ] Dinamik içerik yükleme
- [ ] Pagination ve infinite scroll
- [ ] Loading states ve error handling

### Faz 2: RSS Feed Parser (1-2 Hafta)

#### 2.1 RSS Parser Servisi
- [ ] RSS feed reader kütüphanesi (`rss-parser`)
- [ ] Cron job kurulumu (günlük/saatlik)
- [ ] Feed kaynakları yapılandırması
- [ ] Duplicate detection
- [ ] Content normalization

#### 2.2 Otomatik İçerik İşleme
- [ ] Görselleri otomatik indirme ve optimize etme
- [ ] Metadata extraction
- [ ] Kategori otomatik atama (ML/AI)
- [ ] Yayın zamanlaması

#### 2.3 Feed Kaynakları
```javascript
const feedSources = [
  'https://techcrunch.com/feed/',
  'https://www.theverge.com/rss/index.xml',
  'https://www.wired.com/feed/rss',
  'https://www.technologyreview.com/feed/',
  // Türkçe kaynaklar
  'https://www.webtekno.com/rss.xml',
  'https://shiftdelete.net/feed'
];
```

### Faz 3: AI Özetleme (1 Hafta)

#### 3.1 OpenAI Entegrasyonu
- [ ] OpenAI API key yapılandırması
- [ ] GPT-4 veya GPT-3.5-turbo kullanımı
- [ ] Prompt engineering
- [ ] Token optimizasyonu
- [ ] Maliyet takibi

#### 3.2 Özetleme Özellikleri
- [ ] Otomatik haber özetleme
- [ ] Çoklu dil desteği (TR/EN)
- [ ] Anahtar kelime çıkarma
- [ ] Sentiment analysis
- [ ] Benzer haber önerileri

#### 3.3 Örnek Implementasyon
```javascript
// backend/services/ai-summarizer.js
const { Configuration, OpenAIApi } = require('openai');

async function summarizeArticle(content) {
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Sen bir AI haber özetleyicisisin. Haberleri kısa ve öz şekilde özetle.'
      },
      {
        role: 'user',
        content: `Bu haberi özetle: ${content}`
      }
    ],
    max_tokens: 150
  });
  
  return response.data.choices[0].message.content;
}
```

### Faz 4: Gelişmiş Arama (Algolia) (1 Hafta)

#### 4.1 Algolia Kurulumu
- [ ] Algolia hesabı oluşturma
- [ ] Index yapılandırması
- [ ] Strapi-Algolia entegrasyonu
- [ ] Otomatik senkronizasyon

#### 4.2 Arama Özellikleri
- [ ] Instant search (anlık arama)
- [ ] Faceted search (filtreleme)
- [ ] Typo tolerance (yazım hatası toleransı)
- [ ] Highlighting (vurgulama)
- [ ] Search analytics

#### 4.3 Frontend Arama UI
- [ ] Search bar component
- [ ] Search results page
- [ ] Filters ve facets
- [ ] Search suggestions
- [ ] Recent searches

### Faz 5: Çoklu Dil Desteği (1-2 Hafta)

#### 5.1 i18n Kurulumu
- [ ] i18next kütüphanesi
- [ ] Dil dosyaları (TR/EN)
- [ ] Dil seçici component
- [ ] URL yapısı (/tr/, /en/)
- [ ] SEO için hreflang tags

#### 5.2 İçerik Çevirisi
- [ ] Manuel çeviri arayüzü (Strapi)
- [ ] Otomatik çeviri (Google Translate API)
- [ ] AI çeviri (OpenAI)
- [ ] Çeviri kalite kontrolü

#### 5.3 Çeviri Dosyaları
```javascript
// locales/tr.json
{
  "nav": {
    "home": "Ana Sayfa",
    "categories": "Kategoriler",
    "about": "Hakkımızda"
  },
  "article": {
    "readMore": "Devamını Oku",
    "author": "Yazar",
    "date": "Tarih"
  }
}

// locales/en.json
{
  "nav": {
    "home": "Home",
    "categories": "Categories",
    "about": "About"
  },
  "article": {
    "readMore": "Read More",
    "author": "Author",
    "date": "Date"
  }
}
```

### Faz 6: Yorum Sistemi (1 Hafta)

#### 6.1 Backend Yorum Sistemi
- [ ] Comment model (Strapi)
- [ ] Nested comments (yanıtlar)
- [ ] Moderation sistemi
- [ ] Spam filtreleme
- [ ] Email bildirimleri

#### 6.2 Frontend Yorum UI
- [ ] Yorum formu
- [ ] Yorum listesi
- [ ] Yanıtlama özelliği
- [ ] Beğeni/beğenmeme
- [ ] Moderasyon arayüzü

#### 6.3 Alternatif: Disqus/Commento
- [ ] Disqus entegrasyonu (kolay)
- [ ] Commento (açık kaynak, privacy-focused)

## 🛠️ Teknoloji Stack (V2)

### Backend
- **CMS:** Strapi v4
- **Database:** PostgreSQL (üretim) / SQLite (geliştirme)
- **Runtime:** Node.js 18+
- **Framework:** Express.js (Strapi içinde)

### AI & ML
- **Özetleme:** OpenAI GPT-4
- **Çeviri:** OpenAI / Google Translate API
- **Kategorizasyon:** TensorFlow.js / OpenAI

### Arama
- **Search Engine:** Algolia
- **Alternatif:** Meilisearch (self-hosted)

### Hosting & Deploy
- **Frontend:** Netlify / Vercel
- **Backend:** Railway / Render / DigitalOcean
- **Database:** Supabase / Railway
- **Media:** Cloudinary

### Monitoring & Analytics
- **Analytics:** Plausible / Google Analytics
- **Error Tracking:** Sentry
- **Uptime:** UptimeRobot

## 📊 Tahmini Maliyet (Aylık)

| Servis | Ücretsiz Plan | Ücretli Plan |
|--------|---------------|--------------|
| Strapi Hosting | - | $7-15/ay |
| PostgreSQL | ✅ (Supabase) | $25/ay |
| OpenAI API | - | $10-50/ay |
| Algolia | ✅ (10K req) | $1/1K req |
| Cloudinary | ✅ (25GB) | $89/ay |
| **Toplam** | **~$0** | **$50-200/ay** |

## 📅 Zaman Çizelgesi

```
Hafta 1-3:  Backend + CMS Kurulumu
Hafta 4-5:  RSS Feed Parser
Hafta 6:    AI Özetleme
Hafta 7:    Gelişmiş Arama
Hafta 8-9:  Çoklu Dil
Hafta 10:   Yorum Sistemi
Hafta 11:   Testing & Bug Fixes
Hafta 12:   Production Deploy

Toplam: ~3 Ay
```

## 🚀 Hızlı Başlangıç

### Seçenek 1: Tam Stack (Önerilen)
```bash
# Backend klasörü oluştur
npx create-strapi-app@latest backend --quickstart

# Frontend'i güncelle
cd ..
npm install axios zustand
```

### Seçenek 2: Headless CMS (Hızlı)
- Strapi Cloud kullan (managed)
- Sadece frontend'i güncelle
- API entegrasyonu yap

### Seçenek 3: Hybrid (Aşamalı)
1. Önce Strapi'yi local'de çalıştır
2. Frontend'i API'ye bağla
3. Özellikleri tek tek ekle
4. Production'a deploy et

## 📝 Sonraki Adımlar

1. **Karar Ver:** Hangi özellikleri öncelikli yapacağız?
2. **Backend Kur:** Strapi kurulumu yap
3. **API Tasarla:** Content types ve endpoints belirle
4. **Frontend Güncelle:** API entegrasyonu
5. **Test Et:** Her özelliği test et
6. **Deploy Et:** Production'a al

## 🤔 Sorular

- Backend'i nerede host etmek istersiniz? (Railway/Render/DigitalOcean)
- Database tercihiniz? (PostgreSQL/MongoDB)
- Hangi özellikle başlamak istersiniz?
- Bütçe limiti var mı?

---

**Not:** Bu roadmap esnek bir plandır. İhtiyaçlara göre öncelikler değiştirilebilir.
