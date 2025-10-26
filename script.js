// Main JavaScript file for AI News website
import { listArticles, getArticle, searchArticles, getTrendingArticles } from './src/lib/api.js';

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
let currentCategory = '';
let isLoading = false;
let hasError = false;

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

async function performSearch() {
    let searchTerm = document.getElementById('searchInput').value;
    
    // Sanitize search query
    if (typeof Sanitize !== 'undefined') {
        searchTerm = Sanitize.searchQuery(searchTerm);
    }
    
    searchTerm = searchTerm.trim();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    if (searchTerm) {
        // Use Supabase search
        showLoading('articlesList');
        try {
            filteredArticles = await searchArticles(searchTerm, { category: categoryFilter });
            
            // Track search
            if (typeof window.analytics !== 'undefined') {
                window.analytics.trackSearch(searchTerm, filteredArticles.length);
            }
        } catch (error) {
            showError('articlesList', 'Search failed. Please try again.');
            return;
        }
    } else {
        // Just filter by category
        currentCategory = categoryFilter;
        filteredArticles = [];
    }
    
    articlesLoaded = 0;
    document.getElementById('articlesList').innerHTML = '';
    await loadLatestArticles();
    await loadTrendingNews();
}

// Category Filtering
function initCategoryFiltering() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', async function() {
            const category = this.getAttribute('data-category');
            
            // Update active state
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Update current category
            currentCategory = category;
            document.getElementById('categoryFilter').value = category;
            filteredArticles = [];
            
            // Reload articles
            await performSearch();
            scrollToSection('articles');
        });
    });
}

// Load Trending News
async function loadTrendingNews() {
    const trendingGrid = document.getElementById('trendingGrid');
    
    if (!trendingGrid) return;
    
    showLoading('trendingGrid');
    
    try {
        let trending;
        
        if (filteredArticles.length > 0) {
            trending = filteredArticles.slice(0, 3);
        } else {
            trending = await getTrendingArticles(3);
        }
        
        if (trending.length === 0) {
            trendingGrid.innerHTML = '<p class="text-center text-gray-400">No trending articles found.</p>';
            return;
        }
        
        trendingGrid.innerHTML = trending.map(article => `
            <div class="news-card" data-id="${article.id}" onclick="navigateToArticle('${article.slug}')" style="cursor: pointer;">
                <div class="news-image">
                    <img src="${article.cover_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop'}" alt="${escapeHtml(article.title)}" loading="lazy">
                </div>
                <div class="news-content">
                    <span class="news-category">${getCategoryName(article.category)}</span>
                    <h3>${escapeHtml(article.title)}</h3>
                    <p>${escapeHtml(article.excerpt || '')}</p>
                    <div class="news-meta">
                        <span>${formatDate(article.published_at)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading trending news:', error);
        showError('trendingGrid', 'Failed to load trending news.');
    }
}

// Load Latest Articles
async function loadLatestArticles() {
    const articlesList = document.getElementById('articlesList');
    
    if (!articlesList) return;
    
    showLoading('articlesList');
    
    try {
        let articles;
        
        if (filteredArticles.length > 0) {
            articles = filteredArticles;
        } else {
            articles = await listArticles({ category: currentCategory, page: 1, limit: 9 });
        }
        
        if (articles.length === 0) {
            articlesList.innerHTML = '<p class="text-center text-gray-400 py-8">No articles found.</p>';
            return;
        }
        
        articlesList.innerHTML = articles.map(article => `
            <div class="article-item" data-id="${article.id}" onclick="navigateToArticle('${article.slug}')" style="cursor: pointer;">
                <div class="article-image">
                    <img src="${article.cover_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop'}" alt="${escapeHtml(article.title)}" loading="lazy">
                </div>
                <div class="article-content">
                    <span class="article-category">${getCategoryName(article.category)}</span>
                    <h3>${escapeHtml(article.title)}</h3>
                    <p>${escapeHtml(article.excerpt || '')}</p>
                    <div class="article-meta">
                        <span>${formatDate(article.published_at)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading articles:', error);
        showError('articlesList', 'Failed to load articles. Please try again later.');
    }
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
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show loading state
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    isLoading = true;
    element.innerHTML = `
        <div class="loading-state" style="display: flex; justify-content: center; align-items: center; padding: 3rem;">
            <div class="spinner" style="border: 3px solid rgba(74, 144, 226, 0.3); border-top: 3px solid #4A90E2; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div>
        </div>
    `;
}

// Show error state
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    hasError = true;
    element.innerHTML = `
        <div class="error-state" style="text-align: center; padding: 3rem; color: #ff6b6b;">
            <p>${escapeHtml(message)}</p>
            <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--accent-primary); color: white; border: none; border-radius: 5px; cursor: pointer;">Retry</button>
        </div>
    `;
}

// Navigate to article detail page
function navigateToArticle(slug) {
    window.location.href = `./pages/article.html?slug=${slug}`;
}

// Make functions globally available
window.navigateToArticle = navigateToArticle;

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
