# Görsel Optimizasyonu Rehberi

## Mevcut Durum
Şu an Unsplash CDN üzerinden görseller kullanılıyor. Bu geliştirme aşaması için uygundur.

## Production İçin Öneriler

### 1. WebP Formatına Çevirme
```bash
# ImageMagick ile
convert input.jpg -quality 85 output.webp

# Online araçlar
- https://squoosh.app/
- https://tinypng.com/
```

### 2. Boyut Optimizasyonu
**Önerilen boyutlar:**
- Hero image: 1200x630px (OG image için)
- Haber kartları: 600x400px
- Thumbnail: 300x200px

### 3. Lazy Loading
Tüm sayfalarda zaten aktif:
```html
<img loading="lazy" ... />
```

### 4. Responsive Images
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="...">
</picture>
```

### 5. CDN Kullanımı
- Cloudflare Images
- Imgix
- Cloudinary

## Gelecek Adımlar
1. Özel görseller oluştur (Canva, Figma)
2. WebP formatına çevir
3. Bu klasöre yükle
4. HTML'de path'leri güncelle

## Performans Hedefleri
- Görsel boyutu: < 100KB
- Total page size: < 500KB
- Lighthouse Performance: 90+
