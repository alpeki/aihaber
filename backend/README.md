# AI Haber Backend API

Modern haber platformu için Express.js tabanlı backend API.

## 🚀 Özellikler

- ✅ **Articles API** - Haber CRUD işlemleri
- ✅ **RSS Feed Parser** - Otomatik haber çekme (4 kaynak, saatlik güncelleme)
- ✅ **AI Integration** - OpenAI ile özetleme ve anahtar kelime çıkarma
- ✅ **Comments System** - Yorum ve yanıt sistemi
- ✅ **Advanced Search** - Filtreleme, sıralama, autocomplete
- ✅ **i18n Support** - Çoklu dil desteği (TR/EN)
- ✅ **CORS Support** - Frontend entegrasyonu
- ✅ **Error Handling** - Merkezi hata yönetimi

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env dosyası oluştur
cp .env.example .env

# .env dosyasını düzenle ve API anahtarlarını ekle
```

## 🔧 Kullanım

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server `http://localhost:3000` adresinde çalışacak.

## 📡 API Endpoints

### Articles
- `GET /api/articles` - Tüm haberleri listele
- `GET /api/articles/:id` - Tek haber detayı
- `GET /api/articles/meta/categories` - Kategorileri listele

**Query Parameters:**
- `category` - Kategoriye göre filtrele
- `limit` - Sayfa başına kayıt sayısı (varsayılan: 10)
- `page` - Sayfa numarası (varsayılan: 1)

### RSS Feeds
- `GET /api/rss/feeds` - RSS kaynaklarını listele
- `GET /api/rss/parse?url=<feed_url>` - Belirli bir RSS feed'i parse et
- `GET /api/rss/all` - Tüm kaynaklardan haberleri çek

### AI Features
- `POST /api/ai/summarize` - Haber özetleme
  ```json
  {
    "content": "Haber içeriği...",
    "language": "tr"
  }
  ```
- `POST /api/ai/keywords` - Anahtar kelime çıkarma
  ```json
  {
    "content": "Haber içeriği...",
    "count": 5
  }
  ```
- `GET /api/ai/health` - OpenAI bağlantı durumu

### Comments
- `GET /api/comments/article/:articleId` - Makale yorumlarını getir
- `POST /api/comments` - Yeni yorum ekle
- `PUT /api/comments/:commentId/like` - Yorumu beğen
- `DELETE /api/comments/:commentId` - Yorumu sil
- `GET /api/comments/stats/:articleId` - Yorum istatistikleri

### Search
- `GET /api/search?q=query&category=...&limit=20` - Gelişmiş arama
- `GET /api/search/suggest?q=query` - Arama önerileri (autocomplete)
- `GET /api/search/popular` - Popüler aramalar
- `GET /api/search/analytics` - Arama analitiği

### i18n (Internationalization)
- `GET /api/i18n` - Desteklenen diller
- `GET /api/i18n/:lang` - Dil çevirileri (tr/en)
- `GET /api/i18n/:lang/:section/:key` - Belirli çeviri

## 🔑 Environment Variables

```env
PORT=3000
OPENAI_API_KEY=sk-...
ALLOWED_ORIGINS=http://localhost:5173
```

## 📚 Teknolojiler

- **Express.js** - Web framework
- **RSS Parser** - RSS feed parsing
- **OpenAI** - AI özetleme ve analiz
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 🔄 Sonraki Adımlar

- [ ] Database entegrasyonu (PostgreSQL/MongoDB)
- [ ] Authentication & Authorization
- [ ] Rate limiting
- [ ] Caching (Redis)
- [ ] WebSocket support (real-time updates)
- [ ] File upload (images)
- [ ] Search functionality (Algolia/Meilisearch)

## 📝 Notlar

- OpenAI API kullanımı için `OPENAI_API_KEY` gereklidir
- RSS feed parsing gerçek zamanlı çalışır
- Şu an için veriler memory'de tutuluyor (articles.js)
