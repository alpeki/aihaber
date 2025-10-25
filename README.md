# AI Haber 🤖

> Yapay zeka, teknoloji ve bilim dünyasından güncel haberler - Türkçe

## 📋 Proje Hakkında

**AI Haber**, Türkiye'deki teknoloji meraklıları için yapay zeka, teknoloji ve bilim alanındaki güncel haberleri Türkçe olarak sunan bir haber platformudur.

### Özellikler

- ✅ **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- ✅ **Dark/Light Tema**: Kullanıcı tercihi LocalStorage'da saklanır
- ✅ **Çok Dilli Destek**: Türkçe ve İngilizce
- ✅ **Admin Paneli**: LocalStorage tabanlı içerik yönetimi
- ✅ **Arama ve Filtreleme**: Kategori ve anahtar kelime bazlı
- ✅ **3D Animasyonlar**: Three.js ile modern görsel efektler
- ✅ **SEO Optimizasyonu**: Meta tags, sitemap, structured data
- ✅ **Analytics Entegrasyonu**: Google Analytics 4 desteği
- ✅ **Performans**: Lazy loading, preconnect, optimized assets

## 🌐 Canlı Demo

- **Ana Sayfa**: https://alpeki.github.io/aihaber/
- **Admin Paneli**: https://alpeki.github.io/aihaber/admin.html

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Modern bir web tarayıcısı (Chrome, Firefox, Safari, Edge)
- (Opsiyonel) Live Server veya benzeri lokal sunucu

### Kurulum

1. **Projeyi klonlayın veya indirin:**
   ```bash
   git clone https://github.com/alpeki/aihaber.git
   cd aihaber
   ```

2. **index.html dosyasını açın:**
   - **Yöntem 1**: Dosyaya çift tıklayın (tarayıcıda açılır)
   - **Yöntem 2**: VS Code'da Live Server ile açın
   - **Yöntem 3**: Terminal'de:
     ```bash
     # Python 3
     python -m http.server 8000
     # Tarayıcıda: http://localhost:8000
     ```

3. **Tarayıcınızda görüntüleyin:**
   - Masaüstü: Normal boyutta
   - Mobil: F12 > Device Toolbar (Chrome) veya tarayıcıyı küçültün

## 📁 Proje Yapısı

```
ai.haber/
├── index.html              # Ana sayfa
├── admin.html              # Admin paneli
├── style.css               # Ana stil dosyası
├── script.js               # Ana JavaScript dosyası
├── i18n.js                 # Çok dilli destek
├── analytics.js            # Google Analytics entegrasyonu
├── config.js               # Konfigürasyon ayarları
├── parallax.js             # Parallax efektleri
├── category-3d.js          # 3D kategori animasyonları
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Arama motoru direktifleri
├── .htaccess               # Apache yapılandırması
├── DEPLOYMENT.md           # Deployment rehberi
├── PERFORMANCE.md          # Performans optimizasyonları
└── README.md               # Bu dosya
```

## 🛠️ Teknoloji Stack

- **HTML5**: Semantic markup, structured data
- **CSS3**: Custom properties, animations, responsive design
- **Vanilla JavaScript (ES6+)**: Modular architecture
- **Three.js**: 3D graphics and animations
- **Google Fonts**: Inter, Space Grotesk
- **LocalStorage**: Client-side data persistence
- **Google Analytics 4**: Usage tracking and analytics

## 🎨 Tasarım

### Renk Paleti

- **Primary**: `#4A90E2` (Mavi - linkler, butonlar)
- **Background Dark**: `#101022` (Koyu lacivert - dark mode)
- **Gray Scale**: Tailwind'in 300-900 tonları

### Tipografi

- **Font**: Space Grotesk (Google Fonts)
- **Başlıklar**: Bold, 2xl-4xl
- **Gövde**: Normal, sm-base

### Responsive Breakpoints

- **Mobil**: < 768px (1 kolon)
- **Tablet**: 768px - 1024px (2 kolon)
- **Desktop**: > 1024px (3 kolon: 2 içerik + 1 sidebar)

## 📝 Kullanım

### Tema Değiştirme

- Header'daki güneş/ay ikonuna tıklayın
- Tercih otomatik olarak kaydedilir (LocalStorage)

### Mobil Menü

- Mobil cihazlarda hamburger menü (☰) ikonuna tıklayın
- Kategoriler açılır menüde görünür

### E-posta Aboneliği

- Sidebar'daki formu doldurun
- Geçerli e-posta adresi girin
- "Abone Ol" butonuna tıklayın
- (Not: Şu an sadece frontend validasyon, backend entegrasyonu gelecek)

## 🚧 Geliştirme Yol Haritası

### MVP (Mevcut) ✅
- [x] Statik ana sayfa
- [x] Responsive tasarım
- [x] Dark/Light tema
- [x] Mobil menü
- [x] Form validasyonu

### v2 (Planlanan)
- [ ] Kategori sayfaları
- [ ] Haber detay sayfası
- [ ] Backend + CMS
- [ ] RSS feed entegrasyonu
- [ ] AI destekli haber özetleme
- [ ] Kullanıcı yorumları
- [ ] Arama fonksiyonu
- [ ] Analytics

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## 📧 İletişim

- **Proje Sahibi**: [Adınız]
- **E-posta**: [email@example.com]
- **GitHub**: [github.com/kullaniciadi]

## 🙏 Teşekkürler

- [Tailwind CSS](https://tailwindcss.com/)
- [Google Fonts](https://fonts.google.com/)
- [Material Symbols](https://fonts.google.com/icons)
- [Unsplash](https://unsplash.com/) (görseller için)

---

**Not**: Bu proje aktif geliştirme aşamasındadır. Önerileriniz ve katkılarınız için GitHub Issues kullanabilirsiniz.
