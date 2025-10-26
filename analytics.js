// Analytics and Error Tracking
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics ID

// Google Analytics 4
(function() {
    const GA_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID
    
    // Only load analytics in production
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        // Load GA4
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA_ID, {
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=None;Secure'
        });
        
        // Track page views
        window.gtag = gtag;
        
        // Track custom events
        window.trackEvent = function(category, action, label, value) {
            gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'value': value
            });
        };
    } else {
        // Mock functions for development
        window.gtag = function() {
            console.log('Analytics (dev mode):', arguments);
        };
        window.trackEvent = function(category, action, label, value) {
            console.log('Event tracked (dev mode):', {category, action, label, value});
        };
    }
})();

// Error Tracking
window.addEventListener('error', function(e) {
    // Ignore module-related errors during development
    if (e.error?.message?.includes('import statement') || 
        e.error?.message?.includes('module')) {
        return;
    }
    
    console.error('Global error:', e.error);
    
    // Track error in analytics
    if (window.gtag) {
        gtag('event', 'exception', {
            'description': e.error?.message || 'Unknown error',
            'fatal': false
        });
    }
    
    // You can also send to a logging service here
    // Example: Sentry, LogRocket, etc.
});

// Track unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    
    if (window.gtag) {
        gtag('event', 'exception', {
            'description': e.reason?.message || 'Unhandled promise rejection',
            'fatal': false
        });
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Wait for performance data to be available
    setTimeout(function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('Performance metrics:', {
            pageLoadTime,
            connectTime,
            renderTime
        });
        
        // Track performance in analytics
        if (window.gtag && pageLoadTime > 0) {
            gtag('event', 'timing_complete', {
                'name': 'page_load',
                'value': pageLoadTime,
                'event_category': 'Performance'
            });
        }
    }, 0);
});

// Track article views
function trackArticleView(articleId, articleTitle, category) {
    if (window.gtag) {
        gtag('event', 'view_item', {
            'event_category': 'Article',
            'event_label': articleTitle,
            'value': articleId,
            'content_type': category
        });
    }
}

// Track search queries
function trackSearch(searchTerm, resultsCount) {
    if (window.gtag) {
        gtag('event', 'search', {
            'search_term': searchTerm,
            'results_count': resultsCount
        });
    }
}

// Track newsletter signups
function trackNewsletterSignup(email) {
    if (window.gtag) {
        gtag('event', 'sign_up', {
            'method': 'newsletter',
            'event_category': 'Engagement'
        });
    }
}

// Track category clicks
function trackCategoryClick(category) {
    if (window.gtag) {
        gtag('event', 'select_content', {
            'content_type': 'category',
            'item_id': category
        });
    }
}

// Export functions for use in other scripts
window.analytics = {
    trackArticleView,
    trackSearch,
    trackNewsletterSignup,
    trackCategoryClick
};
