# Active Context

## Current work focus

- **MVP Tamamlama**: index.html oluşturuldu, test edilmeli
- **Proje yapısı kurulumu**: Klasörler (pages/, assets/) oluşturulacak
- **Memory Bank doldurma**: Tüm bağlam dosyaları güncelleniyor
- **Dokumantasyon**: README.md hazırlanacak


## Recent changes

- ✅ `index.html` oluşturuldu (mobil uyumlu, dark mode, form validasyonu)
- ✅ `AGENTS.md/` klasörü ve 6 dosya scaffold edildi
- ✅ `projectbrief.md` dolduruldu (hedefler, kitle, ton, kapsam)
- ✅ `productContext.md` dolduruldu (vizyon, problemler, UX)
- ✅ `systemPatterns.md` dolduruldu (mimari, standartlar, layout)
- ✅ `techContext.md` dolduruldu (stack, entegrasyonlar, kısıtlar)
- 🔄 `activeContext.md` güncelleniyor (bu dosya)
- ⏳ `progress.md` bekliyor


## Next steps

1. **İlk test**: `index.html` dosyasını tarayıcıda aç, mobil/desktop görünümü kontrol et
2. **Proje yapısı**: `pages/`, `assets/css/`, `assets/js/`, `assets/images/` klasörlerini oluştur
3. **README.md**: Proje tanıtımı, kurulum talimatları, kullanım kılavuzu
4. **Kategori sayfaları**: `pages/yapay-zeka.html`, `pages/teknoloji.html` vb. oluştur
5. **Haber detay template**: `pages/article-detail.html` template'i hazırla
6. **Git init**: Repo oluştur, ilk commit
7. **Deploy**: GitHub Pages veya Netlify'a yükle


## Active decisions and considerations

### Karar Verildi
- ✅ **Tailwind CDN**: Build süreci yerine CDN (MVP hızı için)
- ✅ **Statik site**: Backend'siz başlama (basitlik)
- ✅ **Dark mode default**: Kullanıcı tercihi localStorage'da
- ✅ **Türkçe öncelik**: Ana dil Türkçe, URL'ler Türkçe karaktersiz

### Bekleyen Kararlar
- ⏳ **Görsel stratejisi**: Unsplash placeholder mı, yoksa özel görseller mi?
- ⏳ **İçerik kaynağı**: Manuel ekleme mi, RSS otomasyonu mu (v2)?
- ⏳ **Domain**: Custom domain alınacak mı (aihaber.com gibi)?
- ⏳ **Analytics**: Google Analytics mı, Plausible mı, hiç mi?


## Important patterns and preferences

### Tasarım Tercihleri
- **Minimalizm**: Dikkat dağıtmayan, içerik odaklı
- **Dark mode first**: Varsayılan tema karanlık (teknoloji kitlesi tercihi)
- **Mavi vurgu**: Primary renk #4A90E2 (güven, teknoloji)
- **Bol boşluk**: Padding/margin cömert (okunabilirlik)

### Kod Tercihleri
- **Vanilla JS**: Framework yok (aşırı mühendislikten kaçınma)
- **Semantic HTML**: SEO + erişilebilirlik öncelikli
- **Mobile-first**: Küçük ekrandan büyüğe tasarım
- **Performans**: Lazy loading, CDN, minimal JS

### İçerik Tercihleri
- **Kısa ve öz**: Başlıklar 60 karakter max, açıklamalar 150 karakter
- **Görsel zengin**: Her haberde kaliteli görsel
- **Kategorizasyon**: Net kategori ayrımı (5 ana kategori)


## Learnings and project insights

### Teknik Öğrenimler
- **Tailwind CDN hızlı**: Prototip için ideal, production'da build'e geçilebilir
- **LocalStorage basit**: Tema tercihi için cookie'ye gerek yok
- **FOUC önleme**: `<head>`'de inline script ile tema yükleme kritik

### UX Öğrenimler
- **Mobil menü önemli**: Kullanıcıların %60+ mobil, hamburger menü şart
- **Sticky header**: Navigasyon her zaman erişilebilir olmalı
- **Form feedback**: Kullanıcı hemen sonuç görmeli (başarı/hata mesajı)

### Proje Yönetimi
- **Memory Bank etkili**: Her oturumda bağlam kaybetmemek için kritik
- **MVP odaklı yaklaşım**: Önce çalışan bir şey, sonra geliştirme
- **Dokumantasyon eş zamanlı**: Kod yazarken belgeleme (sonra unutulur)

