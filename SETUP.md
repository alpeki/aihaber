# AI News - Kurulum Rehberi

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js (v18 veya üzeri)
- pnpm paket yöneticisi

### Kurulum Adımları

#### 1. Node.js Kurulumu (Eğer kurulu değilse)
```powershell
# Node.js'i şu adresten indirin:
# https://nodejs.org/
```

#### 2. pnpm Kurulumu
```powershell
# PowerShell'de çalıştırın:
npm install -g pnpm
```

#### 3. Proje Bağımlılıklarını Yükleyin
```powershell
cd "c:\Users\idons\OneDrive\Masaüstü\ai.haber"
pnpm install
```

#### 4. Geliştirme Sunucusunu Başlatın
```powershell
pnpm run dev
```

Tarayıcınızda otomatik olarak açılacak veya şu adresi ziyaret edin:
**http://localhost:5173**

### Diğer Komutlar

```powershell
# Production build oluşturma
pnpm run build

# Build önizlemesi
pnpm run preview
```

## 📁 Proje Yapısı

```
ai.haber/
├── index.html          # Ana HTML dosyası
├── style.css           # CSS stilleri
├── script.js           # JavaScript kodu
├── public/             # Statik dosyalar
│   └── images/         # Görseller
├── config.yaml         # Build yapılandırması
├── package.json        # Paket yapılandırması
└── pnpm-lock.yaml      # Bağımlılık kilidi
```

## ✨ Özellikler

- ✅ Modern ve responsive tasarım
- ✅ Dark/Light tema desteği
- ✅ Arama ve filtreleme
- ✅ Kategori bazlı içerik
- ✅ Newsletter formu
- ✅ Smooth scroll animasyonları
- ✅ SEO dostu yapı

## 🎨 Tema Değiştirme

Sağ üst köşedeki güneş/ay ikonuna tıklayarak tema değiştirebilirsiniz.

## 🔍 Arama

Arama butonuna tıklayarak makalelerde arama yapabilir ve kategorilere göre filtreleyebilirsiniz.

## 📱 Mobil Uyumluluk

Site tamamen responsive olup tüm cihazlarda sorunsuz çalışır.

---

**Geliştirici:** AI News Team
**Versiyon:** 1.0.0
**Teknoloji:** Vite + Vanilla JS
