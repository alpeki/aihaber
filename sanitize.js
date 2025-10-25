// Input Sanitization Utilities
// Prevents XSS attacks and ensures safe user input

const Sanitize = {
    /**
     * Sanitize HTML string to prevent XSS attacks
     * @param {string} html - Raw HTML string
     * @returns {string} - Sanitized HTML string
     */
    html: function(html) {
        if (!html) return '';
        
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    },

    /**
     * Sanitize and validate email address
     * @param {string} email - Email address
     * @returns {string|null} - Sanitized email or null if invalid
     */
    email: function(email) {
        if (!email) return null;
        
        // Remove whitespace
        email = email.trim().toLowerCase();
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return null;
        }
        
        // Additional security: limit length
        if (email.length > 254) {
            return null;
        }
        
        return email;
    },

    /**
     * Sanitize URL to prevent javascript: and data: protocols
     * @param {string} url - URL string
     * @returns {string|null} - Sanitized URL or null if invalid
     */
    url: function(url) {
        if (!url) return null;
        
        url = url.trim();
        
        // Block dangerous protocols
        const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
        const lowerUrl = url.toLowerCase();
        
        for (const protocol of dangerousProtocols) {
            if (lowerUrl.startsWith(protocol)) {
                return null;
            }
        }
        
        // Only allow http, https, and relative URLs
        if (!url.startsWith('http://') && 
            !url.startsWith('https://') && 
            !url.startsWith('/') &&
            !url.startsWith('./')) {
            return null;
        }
        
        return url;
    },

    /**
     * Sanitize text input (for titles, names, etc.)
     * @param {string} text - Text input
     * @param {number} maxLength - Maximum allowed length
     * @returns {string} - Sanitized text
     */
    text: function(text, maxLength = 500) {
        if (!text) return '';
        
        // Remove HTML tags
        text = this.html(text);
        
        // Trim whitespace
        text = text.trim();
        
        // Limit length
        if (text.length > maxLength) {
            text = text.substring(0, maxLength);
        }
        
        return text;
    },

    /**
     * Sanitize article content (allows some HTML but sanitizes it)
     * @param {string} content - Article content
     * @returns {string} - Sanitized content
     */
    articleContent: function(content) {
        if (!content) return '';
        
        // For now, we escape all HTML
        // In a real implementation, you might want to allow certain tags
        // using a library like DOMPurify
        return this.html(content);
    },

    /**
     * Sanitize category value
     * @param {string} category - Category name
     * @returns {string|null} - Sanitized category or null if invalid
     */
    category: function(category) {
        if (!category) return null;
        
        const allowedCategories = ['ai', 'tech', 'robotics', 'science'];
        category = category.toLowerCase().trim();
        
        if (!allowedCategories.includes(category)) {
            return null;
        }
        
        return category;
    },

    /**
     * Sanitize search query
     * @param {string} query - Search query
     * @returns {string} - Sanitized query
     */
    searchQuery: function(query) {
        if (!query) return '';
        
        // Remove HTML
        query = this.html(query);
        
        // Trim and limit length
        query = query.trim();
        if (query.length > 100) {
            query = query.substring(0, 100);
        }
        
        return query;
    },

    /**
     * Validate and sanitize article data
     * @param {Object} article - Article object
     * @returns {Object|null} - Sanitized article or null if invalid
     */
    article: function(article) {
        if (!article || typeof article !== 'object') {
            return null;
        }

        const sanitized = {
            id: article.id || Date.now(),
            title: this.text(article.title, 200),
            excerpt: this.text(article.excerpt, 300),
            content: this.articleContent(article.content),
            category: this.category(article.category),
            image: this.url(article.image),
            date: article.date || new Date().toISOString().split('T')[0],
            readTime: this.text(article.readTime, 20),
            popular: Boolean(article.popular)
        };

        // Validate required fields
        if (!sanitized.title || !sanitized.excerpt || !sanitized.content || !sanitized.category) {
            return null;
        }

        return sanitized;
    }
};

// Rate limiting utility
const RateLimit = {
    attempts: {},

    /**
     * Check if action is rate limited
     * @param {string} key - Unique key for the action
     * @param {number} maxAttempts - Maximum attempts allowed
     * @param {number} windowMs - Time window in milliseconds
     * @returns {boolean} - True if allowed, false if rate limited
     */
    check: function(key, maxAttempts = 3, windowMs = 60000) {
        const now = Date.now();
        
        if (!this.attempts[key]) {
            this.attempts[key] = [];
        }

        // Remove old attempts outside the time window
        this.attempts[key] = this.attempts[key].filter(time => now - time < windowMs);

        // Check if rate limit exceeded
        if (this.attempts[key].length >= maxAttempts) {
            return false;
        }

        // Add current attempt
        this.attempts[key].push(now);
        return true;
    },

    /**
     * Reset rate limit for a key
     * @param {string} key - Unique key for the action
     */
    reset: function(key) {
        delete this.attempts[key];
    }
};

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.Sanitize = Sanitize;
    window.RateLimit = RateLimit;
}
