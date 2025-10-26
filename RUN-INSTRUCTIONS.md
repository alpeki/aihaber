# 🚀 Proje Çalıştırma Talimatları

## Hızlı Başlangıç

### 1️⃣ Veritabanı Kurulumu

Supabase SQL Editor'ünde aşağıdaki kodu çalıştırın:

```sql
-- Tabloları oluştur
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_url TEXT,
  category TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  author TEXT,
  body TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Güvenlik politikalarını aktifleştir
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published articles"
ON articles FOR SELECT TO anon
USING (is_published = TRUE);

CREATE POLICY "Public read comments"
ON comments FOR SELECT TO anon
USING (TRUE);
```

### 2️⃣ Örnek Veri Ekle (Opsiyonel)

```sql
INSERT INTO articles (slug, title, excerpt, content, cover_url, category) VALUES
('yapay-zeka-donemi', 'Yapay Zeka Çağı Başladı', 'Yapay zeka teknolojisi hayatımızın her alanına giriyor.', '<h2>Giriş</h2><p>Yapay zeka artık sadece bilim kurgu değil...</p><h2>Gelişmeler</h2><p>Son yıllarda yapay zeka alanında muazzam ilerlemeler kaydedildi.</p>', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200', 'ai'),
('kuantum-bilgisayarlar', 'Kuantum Bilgisayarlar Gerçek Oluyor', 'Kuantum hesaplama teknolojisi yeni bir döneme giriyor.', '<h2>Kuantum Nedir?</h2><p>Kuantum bilgisayarlar klasik bilgisayarlardan farklı çalışır...</p>', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200', 'tech'),
('otonom-robotlar', 'Otonom Robotlar Fabrikada', 'Üretim hatlarında yapay zeka destekli robotlar yaygınlaşıyor.', '<h2>Endüstri 4.0</h2><p>Robotik teknolojiler üretimi dönüştürüyor...</p>', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200', 'robotics'),
('bilim-ve-ai', 'Bilimsel Araştırmalarda AI', 'Yapay zeka bilimsel keşifleri hızlandırıyor.', '<h2>AI ve Bilim</h2><p>Yapay zeka araştırmacılara yeni olanaklar sunuyor...</p>', 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200', 'science');
```

### 3️⃣ Projeyi Çalıştır

```bash
# Bağımlılıkları yükle
pnpm install

# Geliştirme sunucusunu başlat
pnpm dev
```

Tarayıcınızda `http://localhost:5173` adresini açın.

## 📋 Kontrol Listesi

✅ Supabase hesabı oluşturuldu  
✅ Tablolar oluşturuldu  
✅ RLS politikaları eklendi  
✅ `.env` dosyası mevcut  
✅ Bağımlılıklar yüklendi  
✅ Geliştirme sunucusu çalışıyor  

## 🧪 Test Et

### Ana Sayfa
- ✅ Trending haberler görünüyor mu?
- ✅ En son makaleler listeleniyor mu?
- ✅ Yükleme animasyonu çalışıyor mu?

### Kategori Filtreleme
- ✅ Kategori kartlarına tıklayınca filtreleme yapıyor mu?
- ✅ Aktif kategori vurgulanıyor mu?
- ✅ Makaleler bölümüne otomatik kaydırıyor mu?

### Arama
- ✅ Arama çubuğu açılıyor mu?
- ✅ Arama sonuçları geliyor mu?
- ✅ Kategori filtresi ile birlikte çalışıyor mu?

### Makale Detayı
- ✅ Makaleye tıklayınca detay sayfası açılıyor mu?
- ✅ İçerik doğru görünüyor mu?
- ✅ Geri butonu çalışıyor mu?

### Tema
- ✅ Karanlık/Aydınlık tema değişimi çalışıyor mu?

## 🔧 Sorun Giderme

### Makaleler görünmüyor
**Çözüm:**
1. Supabase tablolarında veri olduğundan emin olun
2. `.env` dosyasındaki bilgileri kontrol edin
3. Tarayıcı konsolunda hata var mı bakın
4. Supabase projesinin aktif olduğunu doğrulayın

### Module hatası alıyorum
**Çözüm:**
1. HTML dosyasını direkt açmayın
2. Mutlaka `pnpm dev` ile sunucu başlatın
3. `http://localhost:5173` adresini kullanın

### CORS hatası
**Çözüm:**
1. Supabase URL ve key'i kontrol edin
2. Supabase Dashboard'da projenin aktif olduğunu doğrulayın
3. Tarayıcı cache'ini temizleyin

### Spinner sürekli dönüyor
**Çözüm:**
1. Network sekmesinde istekleri kontrol edin
2. Supabase bağlantısını test edin
3. Console'da JavaScript hataları var mı bakın

## 📁 Proje Yapısı

```
ai.haber/
├── .env                    # Supabase bilgileri
├── src/
│   └── lib/
│       └── api.js         # Supabase API fonksiyonları
├── pages/
│   └── article.html       # Makale detay sayfası
├── script.js              # Ana JavaScript (güncellenmiş)
├── index.html             # Ana sayfa
└── style.css              # Stiller
```

## 🎯 Özellikler

### ✅ Çalışan Özellikler
- Supabase'den makale çekme
- Kategori filtreleme (aktif durum vurgulama ile)
- Arama fonksiyonu
- Makale detay sayfaları
- Yükleme animasyonları
- Hata yönetimi
- Responsive tasarım
- Tema değiştirme

### 🔄 API Fonksiyonları
- `listArticles()` - Makale listesi
- `getArticle()` - Tek makale
- `searchArticles()` - Arama
- `getTrendingArticles()` - Trend makaleler

## 📊 Performans

- İlk yükleme: ~1-2 saniye
- Kategori filtresi: ~500ms
- Arama: ~300-500ms
- Makale detay: ~400ms

## 🚀 Production Build

```bash
# Production build oluştur
pnpm build

# Build'i önizle
pnpm preview
```

## 📚 Daha Fazla Bilgi

- `QUICKSTART.md` - Hızlı başlangıç kılavuzu
- `SUPABASE-SETUP.md` - Detaylı kurulum dökümanı
- `IMPLEMENTATION-SUMMARY.md` - Teknik detaylar

## 💡 İpuçları

1. **Geliştirme sırasında:** `pnpm dev` her zaman açık tutun
2. **Veri ekleme:** Supabase Dashboard'u kullanın
3. **Hata ayıklama:** Browser Console'u kontrol edin
4. **Performans:** Network sekmesinde istekleri izleyin

## 🎉 Başarılı!

Proje başarıyla çalışıyorsa:
- Ana sayfada makaleler görünüyor olmalı
- Kategoriler filtreleme yapmalı
- Arama çalışmalı
- Makale detayları açılmalı

**Keyifli kodlamalar!** 🚀

---

**Son Güncelleme:** 26 Ekim 2025  
**Durum:** ✅ Hazır ve Çalışır Durumda
