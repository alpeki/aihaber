# Tech Context

## Technology stack

### Frontend (MVP)
- **HTML5**: Semantic markup
- **Tailwind CSS 3.x**: Utility-first CSS framework (CDN)
- **Vanilla JavaScript (ES6+)**: Tema toggle, mobil menü, form validasyonu
- **Google Fonts**: Space Grotesk font family
- **Material Symbols**: İkon kütüphanesi

### Hosting & Deployment (MVP)
- **GitHub Pages** veya **Netlify**: Statik site hosting (bedava)
- **Git**: Versiyon kontrol

### Gelecek Stack (v2+)
- **Backend**: Node.js + Express.js veya Python + FastAPI
- **Database**: PostgreSQL (ilişkisel) veya MongoDB (NoSQL)
- **CMS**: Headless CMS (Strapi, Sanity, Contentful)
- **API**: REST veya GraphQL
- **AI/ML**: OpenAI API (haber özetleme), RSS parser


## Integrations and services

### Mevcut (MVP)
- **Unsplash**: Ücretsiz stok görseller (placeholder)
- **LocalStorage API**: Tema tercihi saklama

### Planlanan (v2+)
- **RSS Feeds**: TechCrunch, Wired, MIT Tech Review (otomatik haber çekme)
- **OpenAI API**: Haber özetleme, çeviri
- **Email Service**: Mailchimp, SendGrid (newsletter)
- **Analytics**: Google Analytics veya Plausible (gizlilik odaklı)
- **Search**: Algolia veya Meilisearch (hızlı arama)
- **CDN**: Cloudflare (performans, güvenlik)


## Environments and deployment

### Development (Lokal)
- Dosyaları doğrudan tarayıcıda aç (`file://` veya Live Server)
- Git ile versiyon kontrol

### Production (Canlı)
- **GitHub Pages**: 
  - Repo: `username.github.io/ai-haber`
  - Otomatik deploy (push to main)
- **Netlify** (alternatif):
  - Drag & drop deployment
  - Custom domain desteği
  - Form handling (newsletter için)

### CI/CD (Gelecek)
- GitHub Actions: Otomatik test + deploy
- Lighthouse CI: Performans izleme


## Constraints

### Teknik Kısıtlar
- **Statik site**: Şu an backend yok, dinamik içerik yok
- **Manuel güncelleme**: Haberler HTML'e elle eklenmeli (CMS yok)
- **CDN bağımlılığı**: Tailwind, Google Fonts offline çalışmaz

### Performans Hedefleri
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Toplam sayfa boyutu**: < 500KB (ilk yükleme)

### Tarayıcı Desteği
- Chrome/Edge (son 2 versiyon)
- Firefox (son 2 versiyon)
- Safari (son 2 versiyon)
- Mobil: iOS Safari, Chrome Android

### Erişilebilirlik
- WCAG 2.1 Level AA uyumlu
- Klavye navigasyonu tam destek
- Ekran okuyucu uyumlu (NVDA, JAWS, VoiceOver)

