# AI Haber 🤖

> Yapay zeka, teknoloji ve bilim dünyasından güncel haberler - Türkçe

## 📋 Proje Hakkında

**AI Haber**, Türkiye'deki teknoloji meraklıları için yapay zeka, teknoloji ve bilim alanındaki güncel haberleri Türkçe olarak sunan bir haber platformudur.

### Özellikler

- ✅ **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- ✅ **Dark/Light Tema**: Kullanıcı tercihi LocalStorage'da saklanır
- ✅ **Mobil Menü**: Hamburger menü ile kolay navigasyon
- ✅ **Erişilebilirlik**: WCAG 2.1 AA standartlarına uygun
- ✅ **Hızlı**: Statik site, CDN kullanımı
- ✅ **SEO Dostu**: Semantic HTML, meta tags

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Modern bir web tarayıcısı (Chrome, Firefox, Safari, Edge)
- (Opsiyonel) Live Server veya benzeri lokal sunucu

### Kurulum

1. **Projeyi klonlayın veya indirin:**
   ```bash
   git clone https://github.com/kullaniciadi/ai-haber.git
   cd ai-haber
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
├── pages/                  # Kategori ve detay sayfaları
│   ├── yapay-zeka.html
│   ├── teknoloji.html
│   └── article-detail.html
├── assets/                 # Statik dosyalar
│   ├── css/               # Özel CSS (opsiyonel)
│   ├── js/                # Özel JavaScript (opsiyonel)
│   └── images/            # Görseller
├── AGENTS.md/             # Memory Bank (proje bağlamı)
│   ├── projectbrief.md
│   ├── productContext.md
│   ├── systemPatterns.md
│   ├── techContext.md
│   ├── activeContext.md
│   └── progress.md
└── README.md              # Bu dosya
```

## 🛠️ Teknoloji Stack

- **HTML5**: Semantic markup
- **Tailwind CSS 3.x**: Utility-first CSS (CDN)
- **Vanilla JavaScript (ES6+)**: Tema toggle, mobil menü, form validasyonu
- **Google Fonts**: Space Grotesk
- **Material Symbols**: İkon kütüphanesi

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
