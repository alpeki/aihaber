# Lighthouse Audit Rehberi

## Lighthouse Nedir?
Google'ın web performansı, erişilebilirlik, SEO ve best practices'i test eden otomatik aracıdır.

## Nasıl Çalıştırılır?

### Yöntem 1: Chrome DevTools (Önerilen)
1. Chrome tarayıcıda siteyi açın: https://alpeki.github.io/aihaber/
2. `F12` veya `Ctrl+Shift+I` ile DevTools'u açın
3. **Lighthouse** sekmesine tıklayın
4. **Categories** seçin:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
5. **Device**: Desktop ve Mobile için ayrı ayrı test edin
6. **Analyze page load** butonuna tıklayın
7. Sonuçları bekleyin (30-60 saniye)

### Yöntem 2: PageSpeed Insights (Online)
1. https://pagespeed.web.dev/ adresine gidin
2. URL'yi girin: https://alpeki.github.io/aihaber/
3. **Analyze** butonuna tıklayın
4. Hem mobil hem desktop sonuçlarını inceleyin

### Yöntem 3: Lighthouse CLI
```bash
npm install -g lighthouse
lighthouse https://alpeki.github.io/aihaber/ --view
```

---

## Beklenen Skorlar

### Hedef Skorlar (100 üzerinden)
- 🎯 **Performance**: 90+
- 🎯 **Accessibility**: 95+
- 🎯 **Best Practices**: 95+
- 🎯 **SEO**: 100

---

## Olası Sorunlar ve Çözümler

### Performance İyileştirmeleri

#### 1. Görsel Optimizasyonu
**Sorun**: Büyük görsel dosyaları  
**Çözüm**:
- WebP formatı kullan
- Görselleri sıkıştır (TinyPNG, Squoosh)
- Lazy loading ekle (zaten var ✅)

#### 2. JavaScript Optimizasyonu
**Sorun**: Tailwind CDN yavaş olabilir  
**Çözüm**:
```bash
# Production build yap
npm install -D tailwindcss
npx tailwindcss -i ./input.css -o ./output.css --minify
```

#### 3. Font Optimizasyonu
**Sorun**: Google Fonts yüklemesi  
**Çözüm**:
```html
<!-- Preconnect ekle -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

#### 4. Caching
**Sorun**: Statik dosyalar cache'lenmiyor  
**Çözüm**: GitHub Pages otomatik cache yapıyor ✅

---

### Accessibility İyileştirmeleri

#### 1. Kontrast Oranları
**Kontrol**: Metin ve arka plan renkleri yeterli kontrast sağlıyor mu?  
**Hedef**: WCAG AA standardı (4.5:1)

#### 2. Alt Metinler
**Kontrol**: Tüm görsellerde `alt` attribute var mı?  
**Durum**: ✅ Var

#### 3. ARIA Labels
**Kontrol**: Butonlar ve linkler açıklayıcı mı?  
**Durum**: ✅ Material Icons kullanılıyor

#### 4. Klavye Navigasyonu
**Kontrol**: Tab ile tüm elemanlara erişilebiliyor mu?  
**Test**: Tab tuşuyla siteyi gezin

---

### SEO İyileştirmeleri

#### 1. Meta Tags ✅
- Title: ✅ Var
- Description: ✅ Var
- Open Graph: ✅ Var
- Twitter Cards: ✅ Var

#### 2. Sitemap ✅
- `sitemap.xml`: ✅ Oluşturuldu

#### 3. Robots.txt ✅
- `robots.txt`: ✅ Oluşturuldu

#### 4. Canonical URLs ✅
- Her sayfada canonical tag: ✅ Var

#### 5. Structured Data (Schema.org)
**Eksik**: NewsArticle schema markup  
**Çözüm**: JSON-LD ekle (opsiyonel)

---

### Best Practices

#### 1. HTTPS ✅
- GitHub Pages otomatik HTTPS: ✅

#### 2. Console Errors
**Kontrol**: Console'da hata var mı?  
**Test**: F12 > Console sekmesi

#### 3. Deprecated APIs
**Kontrol**: Eski API'ler kullanılıyor mu?  
**Durum**: ✅ Modern API'ler kullanılıyor

---

## Test Sonrası Yapılacaklar

### Skorlar 90+ ise ✅
- Harika! Proje production-ready
- Sadece minor iyileştirmeler yapılabilir

### Skorlar 70-90 arası ⚠️
- İyi ama iyileştirilebilir
- Önerilen düzeltmeleri uygula

### Skorlar 70'in altında ❌
- Ciddi sorunlar var
- Tüm önerileri incele ve uygula

---

## Lighthouse Raporu Kaydetme

1. Audit tamamlandıktan sonra
2. Sağ üstteki **⚙️** (ayarlar) ikonuna tıkla
3. **Save as HTML** seç
4. `lighthouse-report-YYYY-MM-DD.html` olarak kaydet
5. Raporları `docs/` klasörüne koy

---

## Otomatik Lighthouse CI (İleri Seviye)

GitHub Actions ile her commit'te otomatik test:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://alpeki.github.io/aihaber/
          uploadArtifacts: true
```

---

## Sonuç

Lighthouse audit'i çalıştırın ve sonuçları paylaşın!  
Skorlarınızı görmek isterim. 🚀

**Beklenen Sonuç**: Tüm kategorilerde 90+ skor ✨
