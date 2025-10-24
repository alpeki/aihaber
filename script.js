// Main JavaScript file for AI News website
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI News website loaded!');
    
    // Initialize all functionality
    initScrollAnimations();
    initSmoothScroll();
    initNewsletterForm();
    initMobileMenu();
    initThemeToggle();
    initSearchFunctionality();
    initCategoryFiltering();
    
    // Load initial content
    loadTrendingNews();
    loadLatestArticles();
});

// Mock data for articles
const mockArticles = [
    {
        id: 1,
        title: "Revolutionary AI Model Achieves Human-Level Reasoning",
        excerpt: "Scientists at leading tech companies have developed an AI system that demonstrates unprecedented reasoning capabilities.",
        category: "ai",
        author: "Dr. Sarah Chen",
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
        author: "Prof. Michael Rodriguez",
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
        author: "Emily Watson",
        date: "2024-10-22",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
        popular: false
    },
    {
        id: 4,
        title: "AI-Powered Climate Models Predict Weather with 99% Accuracy",
        excerpt: "New machine learning algorithms are transforming meteorology.",
        category: "data",
        author: "Dr. James Liu",
        date: "2024-10-21",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop",
        popular: true
    }
];

let currentTheme = localStorage.getItem('theme') || 'dark';
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

// Search Functionality
function initSearchFunctionality() {
    const searchToggle = document.getElementById('searchToggle');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    
    searchToggle?.addEventListener('click', function() {
        searchContainer.classList.toggle('active');
        searchToggle.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            setTimeout(() => searchInput.focus(), 300);
        }
    });
    
    searchInput?.addEventListener('input', function() {
        performSearch();
    });
    
    document.getElementById('categoryFilter')?.addEventListener('change', performSearch);
    document.getElementById('sortFilter')?.addEventListener('change', performSearch);
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    filteredArticles = mockArticles.filter(article => {
        const matchesSearch = !searchTerm || 
            article.title.toLowerCase().includes(searchTerm) ||
            article.excerpt.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || article.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    
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
    const articlesToShow = filteredArticles.length > 0 ? filteredArticles : mockArticles;
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
                    <span>${article.author}</span>
                    <span>${article.readTime}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Latest Articles
function loadLatestArticles() {
    const articlesList = document.getElementById('articlesList');
    const articlesToShow = filteredArticles.length > 0 ? filteredArticles : mockArticles;
    
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
                    <span>${article.author}</span>
                    <span>${formatDate(article.date)}</span>
                    <span>${article.readTime}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        'ai': 'AI & Machine Learning',
        'tech': 'Technology',
        'robotics': 'Robotics',
        'data': 'Data Science',
        'future': 'Future Tech',
        'business': 'AI Business'
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
        const email = emailInput.value.trim();
        
        if (isValidEmail(email)) {
            alert('Thank you for subscribing!');
            emailInput.value = '';
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

// Make scrollToSection globally available
window.scrollToSection = scrollToSection;
