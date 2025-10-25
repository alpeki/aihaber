// Configuration file for AI News
// This file contains all configuration settings for the application

const CONFIG = {
    // Site Information
    site: {
        name: 'AI News',
        url: 'https://alpeki.github.io/aihaber/',
        description: 'Yapay zeka ve teknoloji haberleri',
        author: 'AI News Team',
        language: 'tr',
        defaultLanguage: 'tr',
        supportedLanguages: ['tr', 'en']
    },
    
    // API Configuration (for future backend integration)
    api: {
        // DO NOT put API keys here in production!
        // Use environment variables or secure backend proxy
        baseUrl: 'https://your-backend-api.com/api',
        timeout: 10000,
        retryAttempts: 3
    },
    
    // Storage Configuration
    storage: {
        type: 'localStorage', // 'localStorage' or 'sessionStorage'
        prefix: 'ainews_', // Prefix for all storage keys
        articlesKey: 'articles',
        settingsKey: 'settings',
        themeKey: 'theme',
        langKey: 'lang'
    },
    
    // Content Configuration
    content: {
        articlesPerPage: 10,
        trendingCount: 3,
        excerptLength: 150,
        readingSpeed: 200, // words per minute
        categories: [
            { id: 'ai', name: 'Yapay Zeka', icon: 'cpu' },
            { id: 'tech', name: 'Teknoloji', icon: 'monitor' },
            { id: 'robotics', name: 'Robotik', icon: 'robot' },
            { id: 'science', name: 'Bilim', icon: 'atom' }
        ]
    },
    
    // SEO Configuration
    seo: {
        sitemap: '/sitemap.xml',
        robots: '/robots.txt',
        defaultImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
        twitterHandle: '@ainews'
    },
    
    // Analytics Configuration
    analytics: {
        enabled: true,
        googleAnalyticsId: 'G-XXXXXXXXXX', // Replace with your GA4 ID
        trackPageViews: true,
        trackEvents: true,
        trackErrors: true
    },
    
    // Performance Configuration
    performance: {
        lazyLoadImages: true,
        lazyLoadThreshold: '200px',
        enableServiceWorker: false, // Set to true when implementing PWA
        cacheStrategy: 'networkFirst'
    },
    
    // Security Configuration
    security: {
        // Content Security Policy
        csp: {
            'default-src': ["'self'"],
            'script-src': ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com', 'https://www.googletagmanager.com'],
            'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            'img-src': ["'self'", 'data:', 'https:', 'https://images.unsplash.com'],
            'font-src': ["'self'", 'https://fonts.gstatic.com'],
            'connect-src': ["'self'", 'https://www.google-analytics.com']
        },
        // Rate limiting for form submissions
        rateLimit: {
            newsletter: {
                maxAttempts: 3,
                windowMs: 60000 // 1 minute
            }
        }
    },
    
    // Feature Flags
    features: {
        newsletter: true,
        search: true,
        darkMode: true,
        multiLanguage: true,
        comments: false, // Future feature
        socialSharing: true,
        adminPanel: true
    },
    
    // Social Media Links
    social: {
        twitter: '#',
        linkedin: '#',
        github: 'https://github.com/alpeki/aihaber',
        facebook: '#'
    },
    
    // Image Configuration
    images: {
        defaultArticleImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
        placeholderColor: '#1a1a1a',
        formats: ['webp', 'jpg', 'png'],
        sizes: {
            thumbnail: { width: 400, height: 250 },
            medium: { width: 800, height: 500 },
            large: { width: 1200, height: 630 }
        }
    }
};

// Freeze configuration to prevent modifications
Object.freeze(CONFIG);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Make available globally
window.CONFIG = CONFIG;
