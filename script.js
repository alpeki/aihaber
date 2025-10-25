// Main JavaScript file for AI News website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initSmoothScroll();
    initNewsletterForm();
    initMobileMenu();
    initThemeToggle();
    initLanguageToggle();
    initSearchFunctionality();
    initCategoryFiltering();
    initDynamicYear();
    initActiveMenuLinks();
    
    // Load initial content
    loadTrendingNews();
    loadLatestArticles();
});

// Mock data for articles (fallback if localStorage is empty)
const mockArticles = [
    {
        id: 1,
        title: "Revolutionary AI Model Achieves Human-Level Reasoning",
        excerpt: "Scientists at leading tech companies have developed an AI system that demonstrates unprecedented reasoning capabilities.",
        category: "ai",
        date: "2024-10-24",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
        popular: true
    },
    {
        id: 2,
        title: "Quantum Computing Breakthrough Promises Faster AI Training",
        excerpt: "Researchers have successfully demonstrated quantum-enhanced machine learning algorithms.",
        category: "tech",
        date: "2024-10-23",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
        popular: true
    },
    {
        id: 3,
        title: "Autonomous Robots Begin Mass Deployment in Manufacturing",
        excerpt: "Major automotive companies are implementing AI-powered robots across their production lines.",
        category: "robotics",
        date: "2024-10-22",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
        popular: false
    },
    {
        id: 4,
        title: "AI-Powered Climate Models Predict Weather with 99% Accuracy",
        excerpt: "New machine learning algorithms are transforming meteorology.",
        category: "science",
        date: "2024-10-21",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop",
        popular: true
    }
];

// Get articles from localStorage or use mock data
function getArticles() {
    const stored = localStorage.getItem('articles');
    if (stored) {
        const articles = JSON.parse(stored);
        return articles.length > 0 ? articles : mockArticles;
    }
    return mockArticles;
}

let currentTheme = localStorage.getItem('theme') || 'dark';
let currentLang = localStorage.getItem('lang') || 'en';
let filteredArticles = [];
let articlesLoaded = 0;

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    document.body.setAttribute('data-theme', currentTheme);
    
    themeToggle?.addEventListener('click', function() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
}

// Language Toggle
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    const langText = document.getElementById('langText');
    
    // Set initial language
    langText.textContent = currentLang.toUpperCase();
    applyTranslations(currentLang);
    
    langToggle?.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'tr' : 'en';
        langText.textContent = currentLang.toUpperCase();
        localStorage.setItem('lang', currentLang);
        
        // Apply translations
        applyTranslations(currentLang);
        
        // Update category cards
        updateCategoryCards();
        
        // Show notification
        showNotification(`Language changed to ${currentLang === 'en' ? 'English' : 'Türkçe'}`);
    });
}

// Update category cards with translations
function updateCategoryCards() {
    const categories = ['ai', 'tech', 'robotics', 'science'];
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach((card, index) => {
        const category = categories[index];
        const title = card.querySelector('h3');
        const desc = card.querySelector('p');
        
        if (title && desc) {
            title.textContent = t(`categories.${category}.title`, currentLang);
            desc.textContent = t(`categories.${category}.desc`, currentLang);
        }
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--accent-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Search Functionality
function initSearchFunctionality() {
    const searchToggle = document.getElementById('searchToggle');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    
    searchToggle?.addEventListener('click', function(e) {
        e.stopPropagation();
        searchContainer.classList.toggle('active');
        searchToggle.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            setTimeout(() => searchInput.focus(), 300);
        }
    });
    
    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (searchContainer.classList.contains('active')) {
            if (!searchContainer.contains(e.target) && e.target !== searchToggle) {
                searchContainer.classList.remove('active');
                searchToggle.classList.remove('active');
            }
        }
    });
    
    // Prevent closing when clicking inside search container
    searchContainer?.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    searchInput?.addEventListener('input', function() {
        performSearch();
    });
    
    document.getElementById('categoryFilter')?.addEventListener('change', performSearch);
    document.getElementById('sortFilter')?.addEventListener('change', performSearch);
}

function performSearch() {
    let searchTerm = document.getElementById('searchInput').value;
    
    // Sanitize search query
    if (typeof Sanitize !== 'undefined') {
        searchTerm = Sanitize.searchQuery(searchTerm);
    }
    
    searchTerm = searchTerm.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const allArticles = getArticles();
    
    filteredArticles = allArticles.filter(article => {
        const matchesSearch = !searchTerm || 
            article.title.toLowerCase().includes(searchTerm) ||
            article.excerpt.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || article.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    
    // Track search
    if (typeof window.analytics !== 'undefined' && searchTerm) {
        window.analytics.trackSearch(searchTerm, filteredArticles.length);
    }
    
    articlesLoaded = 0;
    document.getElementById('articlesList').innerHTML = '';
    loadLatestArticles();
    loadTrendingNews();
}

// Category Filtering
function initCategoryFiltering() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('categoryFilter').value = category;
            performSearch();
            scrollToSection('articles');
        });
    });
}

// Load Trending News
function loadTrendingNews() {
    const trendingGrid = document.getElementById('trendingGrid');
    const articlesToShow = filteredArticles.length > 0 ? filteredArticles : getArticles();
    const trending = articlesToShow.filter(a => a.popular).slice(0, 3);
    
    trendingGrid.innerHTML = trending.map(article => `
        <div class="news-card" data-id="${article.id}">
            <div class="news-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            </div>
            <div class="news-content">
                <span class="news-category">${getCategoryName(article.category)}</span>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <div class="news-meta">
                    <span>${formatDate(article.date)}</span>
                    <span>${article.readTime}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Latest Articles
function loadLatestArticles() {
    const articlesList = document.getElementById('articlesList');
    const articlesToShow = filteredArticles.length > 0 ? filteredArticles : getArticles();
    
    articlesList.innerHTML = articlesToShow.map(article => `
        <div class="article-item" data-id="${article.id}">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            </div>
            <div class="article-content">
                <span class="article-category">${getCategoryName(article.category)}</span>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <div class="article-meta">
                    <span>${formatDate(article.date)}</span>
                    <span>${article.readTime}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        'ai': 'AI',
        'tech': 'Technology',
        'robotics': 'Robotics',
        'science': 'Science'
    };
    return names[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Newsletter Form
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('email');
    
    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Rate limiting check
        if (typeof RateLimit !== 'undefined' && !RateLimit.check('newsletter', 3, 60000)) {
            alert('Too many attempts. Please wait a minute.');
            return;
        }
        
        const rawEmail = emailInput.value.trim();
        
        // Sanitize email
        const email = typeof Sanitize !== 'undefined' ? Sanitize.email(rawEmail) : rawEmail;
        
        if (email && isValidEmail(email)) {
            alert('Thank you for subscribing!');
            emailInput.value = '';
            
            // Track newsletter signup
            if (typeof window.analytics !== 'undefined') {
                window.analytics.trackNewsletterSignup(email);
            }
        } else {
            alert('Please enter a valid email address');
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Mobile Menu
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle?.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'var(--bg-modal)';
        nav.style.backdropFilter = 'blur(15px)';
    } else {
        nav.style.background = 'var(--bg-modal)';
        nav.style.backdropFilter = 'blur(10px)';
    }
});

// Dynamic Year in Footer
function initDynamicYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Active Menu Links
function initActiveMenuLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Make scrollToSection globally available
window.scrollToSection = scrollToSection;
