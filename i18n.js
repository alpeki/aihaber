// i18n Translation System
const translations = {
    en: {
        nav: {
            home: "Home",
            trending: "Trending",
            categories: "Categories",
            latest: "Latest",
            newsletter: "Newsletter"
        },
        hero: {
            title: "The Future of AI is Here",
            subtitle: "Discover the latest breakthroughs, insights, and innovations shaping tomorrow's world through artificial intelligence.",
            button: "Explore News"
        },
        sections: {
            trending: "Trending Now",
            categories: "Explore Categories",
            latest: "Latest Articles"
        },
        categories: {
            ai: {
                title: "AI",
                desc: "Latest developments in artificial intelligence"
            },
            tech: {
                title: "Technology",
                desc: "Cutting-edge technology trends and innovations"
            },
            robotics: {
                title: "Robotics",
                desc: "Robotic engineering and automation"
            },
            science: {
                title: "Science",
                desc: "Scientific breakthroughs and research"
            }
        },
        newsletter: {
            title: "Stay Updated",
            subtitle: "Get the latest AI news and insights delivered directly to your inbox. Join thousands of professionals staying ahead of the curve.",
            placeholder: "Enter your email address",
            button: "Subscribe",
            disclaimer: "We respect your privacy. Unsubscribe at any time."
        },
        footer: {
            description: "Your trusted source for artificial intelligence news, insights, and analysis. Stay informed about the technologies shaping our future.",
            quickLinks: "Quick Links",
            resources: "Resources",
            about: "About Us",
            contact: "Contact",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            copyright: "© 2024 AI News. All rights reserved. Built with passion for the future of technology."
        },
        search: {
            placeholder: "Search articles, topics, or keywords...",
            allCategories: "All Categories",
            newest: "Newest First",
            oldest: "Oldest First",
            popular: "Most Popular"
        },
        article: {
            readTime: "min read"
        }
    },
    tr: {
        nav: {
            home: "Ana Sayfa",
            trending: "Trend",
            categories: "Kategoriler",
            latest: "Son Haberler",
            newsletter: "Bülten"
        },
        hero: {
            title: "Yapay Zekanın Geleceği Burada",
            subtitle: "Yapay zeka aracılığıyla yarının dünyasını şekillendiren en son atılımları, içgörüleri ve yenilikleri keşfedin.",
            button: "Haberleri Keşfet"
        },
        sections: {
            trending: "Trend Haberler",
            categories: "Kategorileri Keşfet",
            latest: "Son Haberler"
        },
        categories: {
            ai: {
                title: "Yapay Zeka",
                desc: "Yapay zekadaki en son gelişmeler"
            },
            tech: {
                title: "Teknoloji",
                desc: "En son teknoloji trendleri ve yenilikler"
            },
            robotics: {
                title: "Robotik",
                desc: "Robot mühendisliği ve otomasyon"
            },
            science: {
                title: "Bilim",
                desc: "Bilimsel atılımlar ve araştırmalar"
            }
        },
        newsletter: {
            title: "Güncel Kalın",
            subtitle: "En son yapay zeka haberlerini ve içgörülerini doğrudan gelen kutunuza alın. Eğrinin önünde kalan binlerce profesyonele katılın.",
            placeholder: "E-posta adresinizi girin",
            button: "Abone Ol",
            disclaimer: "Gizliliğinize saygı duyuyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz."
        },
        footer: {
            description: "Yapay zeka haberleri, içgörüleri ve analizleri için güvenilir kaynağınız. Geleceğimizi şekillendiren teknolojiler hakkında bilgi sahibi olun.",
            quickLinks: "Hızlı Bağlantılar",
            resources: "Kaynaklar",
            about: "Hakkımızda",
            contact: "İletişim",
            privacy: "Gizlilik Politikası",
            terms: "Hizmet Şartları",
            copyright: "© 2024 AI News. Tüm hakları saklıdır. Teknolojinin geleceği için tutkuyla inşa edildi."
        },
        search: {
            placeholder: "Makale, konu veya anahtar kelime ara...",
            allCategories: "Tüm Kategoriler",
            newest: "En Yeni",
            oldest: "En Eski",
            popular: "En Popüler"
        },
        article: {
            readTime: "dk okuma"
        }
    }
};

// Translation function
function t(key, lang = 'en') {
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return key; // Return key if translation not found
        }
    }
    
    return value;
}

// Apply translations to the page
function applyTranslations(lang) {
    // Navigation
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key, lang);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, t, applyTranslations };
}
