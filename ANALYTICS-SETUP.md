# Google Analytics Kurulum Rehberi

## ✅ Analytics Kodu Eklendi!

Ana sayfaya Google Analytics tracking kodu eklendi. Şimdi sadece kendi Measurement ID'nizi almanız gerekiyor.

---

## 📊 Google Analytics Hesabı Oluşturma

### Adım 1: Google Analytics'e Kaydolun
1. https://analytics.google.com/ adresine gidin
2. Google hesabınızla giriş yapın
3. **Start measuring** butonuna tıklayın

### Adım 2: Hesap Oluşturun
1. **Account name**: "AI Haber" yazın
2. **Account data sharing settings**: İstediğiniz seçenekleri işaretleyin
3. **Next** butonuna tıklayın

### Adım 3: Property Oluşturun
1. **Property name**: "AI Haber Website" yazın
2. **Reporting time zone**: "Turkey" seçin
3. **Currency**: "Turkish Lira (TRY)" seçin
4. **Next** butonuna tıklayın

### Adım 4: İşletme Bilgileri
1. **Industry category**: "News & Media" seçin
2. **Business size**: "Small" seçin
3. **How you plan to use Google Analytics**: İlgili seçenekleri işaretleyin
4. **Create** butonuna tıklayın

### Adım 5: Veri Akışı Oluşturun
1. **Platform**: "Web" seçin
2. **Website URL**: `https://alpeki.github.io`
3. **Stream name**: "AI Haber"
4. **Create stream** butonuna tıklayın

### Adım 6: Measurement ID'yi Kopyalayın
1. Ekranda **Measurement ID** görünecek (örnek: `G-ABC123DEF4`)
2. Bu ID'yi kopyalayın
3. **NOT**: Bu ID'yi güvenli bir yerde saklayın

---

## 🔧 Measurement ID'yi Siteye Ekleme

### index.html'i Güncelleyin

Şu satırlardaki `G-XXXXXXXXXX` yerine kendi Measurement ID'nizi yazın:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ABC123DEF4'); <!-- Buraya kendi ID'nizi yazın -->
</script>
```

### Tüm Sayfalara Ekleyin

Aynı kodu şu sayfalara da ekleyin:
- ✅ `index.html` (Eklendi)
- ☐ `pages/yapay-zeka.html`
- ☐ `pages/teknoloji.html`
- ☐ `pages/bilim.html`
- ☐ `pages/robotik.html`
- ☐ `pages/gelecek.html`
- ☐ Tüm haber detay sayfaları
- ☐ `pages/hakkimizda.html`
- ☐ `pages/iletisim.html`
- ☐ `pages/gizlilik.html`
- ☐ `404.html`

---

## 📈 Analytics'i Test Etme

### 1. Real-Time Raporu
1. Google Analytics'te **Reports** > **Realtime** sekmesine gidin
2. Kendi sitenizi açın: https://alpeki.github.io/aihaber/
3. 10-20 saniye içinde Analytics'te kendinizi görmelisiniz
4. Sayfalar arası geçiş yapın, Analytics'te takip edin

### 2. DebugView (İleri Seviye)
```html
<!-- Debug mode için -->
<script>
  gtag('config', 'G-ABC123DEF4', {
    'debug_mode': true
  });
</script>
```

---

## 📊 Takip Edilecek Metrikler

### Temel Metrikler
- **Users**: Kaç kişi ziyaret etti?
- **Sessions**: Kaç oturum gerçekleşti?
- **Pageviews**: Kaç sayfa görüntülendi?
- **Bounce Rate**: Tek sayfa görüp çıkanların oranı
- **Average Session Duration**: Ortalama oturum süresi

### Sayfa Bazlı Metrikler
- En çok görüntülenen haberler
- En çok okunan kategoriler
- Ortalama okuma süresi

### Trafik Kaynakları
- **Organic Search**: Google'dan gelenler
- **Direct**: Doğrudan URL yazanlar
- **Social**: Sosyal medyadan gelenler
- **Referral**: Diğer sitelerden gelenler

### Cihaz Bazlı
- Desktop vs Mobile vs Tablet
- İşletim sistemi
- Tarayıcı

### Coğrafi Veriler
- Hangi şehirlerden ziyaret ediliyor?
- Hangi ülkelerden trafik geliyor?

---

## 🎯 Özel Event Tracking (İleri Seviye)

### Haber Okuma Süresi
```javascript
// Haber detay sayfalarında
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
  let duration = Math.round((Date.now() - startTime) / 1000);
  gtag('event', 'article_read', {
    'article_title': document.title,
    'read_duration': duration
  });
});
```

### Paylaşım Butonları
```javascript
// Paylaşım butonlarına ekle
function trackShare(platform) {
  gtag('event', 'share', {
    'method': platform,
    'content_type': 'article',
    'item_id': window.location.pathname
  });
}

// Kullanım
<button onclick="trackShare('twitter'); shareToTwitter();">Twitter</button>
```

### Newsletter Aboneliği
```javascript
// Form submit'te
form.addEventListener('submit', (e) => {
  gtag('event', 'newsletter_signup', {
    'method': 'footer_form'
  });
});
```

### Arama Kullanımı
```javascript
// Arama yapıldığında
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    gtag('event', 'search', {
      'search_term': searchInput.value
    });
  }
});
```

---

## 🔒 Gizlilik ve GDPR

### Cookie Consent Banner (Opsiyonel)

Türkiye'de KVKK uyumluluğu için cookie banner ekleyebilirsiniz:

```html
<!-- Basit Cookie Banner -->
<div id="cookie-banner" style="position:fixed;bottom:0;left:0;right:0;background:#1f2937;color:white;padding:20px;text-align:center;display:none;">
  <p>Bu site, deneyiminizi iyileştirmek için çerezler kullanır. 
    <a href="/pages/gizlilik.html" style="color:#4A90E2;">Gizlilik Politikası</a>
  </p>
  <button onclick="acceptCookies()" style="background:#4A90E2;color:white;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;">
    Kabul Et
  </button>
</div>

<script>
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  document.getElementById('cookie-banner').style.display = 'none';
}

// Sayfa yüklendiğinde kontrol et
if (!localStorage.getItem('cookieConsent')) {
  document.getElementById('cookie-banner').style.display = 'block';
}
</script>
```

---

## 📱 Alternatif: Plausible Analytics

Google Analytics'e alternatif, gizlilik odaklı, basit bir seçenek:

### Avantajları
- ✅ GDPR uyumlu (cookie banner gerektirmez)
- ✅ Çok hafif (< 1KB)
- ✅ Basit ve anlaşılır dashboard
- ✅ Açık kaynak

### Kurulum
1. https://plausible.io/ adresine kaydolun
2. Site ekleyin: `alpeki.github.io/aihaber`
3. Tracking script'i kopyalayın:

```html
<script defer data-domain="alpeki.github.io" src="https://plausible.io/js/script.js"></script>
```

### Fiyatlandırma
- İlk 30 gün ücretsiz
- Sonra $9/ay (10K pageview'a kadar)

---

## ✅ Checklist

- [ ] Google Analytics hesabı oluşturuldu
- [ ] Measurement ID alındı
- [ ] ID tüm sayfalara eklendi
- [ ] Real-time test yapıldı
- [ ] Çalıştığı doğrulandı
- [ ] Gizlilik politikası güncellendi (Analytics kullanımı belirtildi)
- [ ] (Opsiyonel) Cookie banner eklendi
- [ ] (Opsiyonel) Özel event tracking eklendi

---

## 🎓 Kaynaklar

- [Google Analytics Docs](https://support.google.com/analytics)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Plausible Analytics](https://plausible.io/)
- [KVKK Rehberi](https://kvkk.gov.tr/)

---

**Sonraki Adım**: Measurement ID'yi alıp tüm sayfalara ekleyin! 🚀
