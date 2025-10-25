# System Patterns

## System architecture

### MVP Mimarisi (Statik Site)
```
index.html (ana sayfa)
├── Header (logo, nav, search, theme toggle)
├── Main
│   ├── Hero Article (büyük öne çıkan haber)
│   ├── Article Grid (4 kart)
│   └── Sidebar (trend haberler + newsletter)
└── Footer (linkler, sosyal medya)
```

### Dosya Yapısı
```
ai.haber/
├── index.html
├── pages/
│   ├── yapay-zeka.html
│   ├── teknoloji.html
│   └── article-detail.html (template)
├── assets/
│   ├── css/ (opsiyonel custom CSS)
│   ├── js/ (opsiyonel modular JS)
│   └── images/
├── AGENTS.md/ (memory bank)
└── README.md
```


## Key technical decisions

1. **Tailwind CDN**: Hızlı prototipleme, build süreci yok (MVP için ideal)
2. **Vanilla JS**: Framework yok, hafif ve hızlı (tema, mobil menü, form için yeterli)
3. **Google Fonts**: Space Grotesk (modern, okunabilir, teknoloji vurgusu)
4. **Material Symbols**: İkon seti (tutarlı, CDN üzerinden)
5. **LocalStorage**: Tema tercihi saklamak için (cookie'ye gerek yok)
6. **Semantic HTML**: SEO ve erişilebilirlik için (`<article>`, `<nav>`, `<aside>`)

### Gelecek Karar Noktaları (v2+)
- Backend: Node.js + Express veya Python + Flask
- CMS: Strapi, Sanity veya custom
- Veritabanı: PostgreSQL veya MongoDB
- Hosting: Vercel, Netlify veya AWS


## Coding standards

### HTML
- Semantic etiketler kullan (`<header>`, `<main>`, `<article>`, `<section>`)
- Her form input'una `<label>` ekle (erişilebilirlik)
- `alt` metinleri tüm görsellerde zorunlu
- ARIA etiketleri gerektiğinde (`aria-label`, `role`)

### CSS (Tailwind)
- Responsive-first: mobil önce, sonra `md:`, `lg:` breakpoint'ler
- Renk paleti: `primary` (#4A90E2), `background-dark` (#101022), `gray-*` tonları
- Spacing: Tailwind'in standart scale'i (4px birim)
- Dark mode: `dark:` prefix ile tüm bileşenler desteklemeli

### JavaScript
- ES6+ syntax (arrow functions, const/let, template literals)
- Event listener'lar `addEventListener` ile
- Try-catch ile localStorage hatalarını yönet
- Yorumlar sadece karmaşık mantık için

### Dosya İsimlendirme
- Keba-case: `article-detail.html`, `main-script.js`
- Türkçe karaktersiz: `yapay-zeka.html` (URL-friendly)


## Layout and UX patterns

### Responsive Grid
- **Mobil** (< 768px): 1 kolon, stack layout
- **Tablet** (768-1024px): 2 kolon grid
- **Desktop** (> 1024px): 3 kolon (2 içerik + 1 sidebar)

### Navigasyon
- **Desktop**: Horizontal nav bar (header'da)
- **Mobil**: Hamburger menü (açılır kapanır)
- Sticky header (scroll'da üstte sabit)

### Kartlar (Article Cards)
- Görsel (aspect-ratio 16:9)
- Başlık (1-2 satır, truncate)
- Kısa açıklama (2-3 satır)
- CTA button/link ("Devamını Oku")
- Hover efekti: hafif yükseltme (`-translate-y-1`)

### Renk Sistemi
- **Primary**: Mavi (#4A90E2) - linkler, butonlar, vurgular
- **Background Dark**: Koyu lacivert (#101022) - dark mode arkaplan
- **Gray Scale**: 300-900 arası (metin, border, hover)

### Tipografi
- **Başlıklar**: Space Grotesk, bold (text-2xl - text-4xl)
- **Gövde**: Space Grotesk, normal (text-sm - text-base)
- **Vurgu**: text-primary veya font-bold

