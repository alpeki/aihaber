// Parallax Scroll Effect
function initParallax() {
    const sections = document.querySelectorAll('.hero, .trending, .categories, .articles, .newsletter');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrolled;
            const sectionHeight = section.offsetHeight;
            
            // Calculate parallax offset
            const offset = (scrolled - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);
            
            if (offset >= 0 && offset <= 1) {
                // Apply different parallax speeds for different sections
                const speed = index % 2 === 0 ? 0.5 : 0.3;
                const yPos = -(scrolled - sectionTop) * speed;
                
                // Apply transform
                const canvas = section.querySelector('canvas');
                if (canvas) {
                    canvas.style.transform = `translateY(${yPos}px)`;
                }
                
                // Background parallax
                const background = section.querySelector('.hero-background, .newsletter-background');
                if (background) {
                    background.style.transform = `translateY(${yPos * 0.5}px)`;
                }
            }
        });
        
        // Parallax for category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const windowCenter = window.innerHeight / 2;
            const distance = cardCenter - windowCenter;
            const parallaxAmount = distance * 0.05;
            
            card.style.transform = `translateY(${parallaxAmount}px)`;
        });
    });
    
    // Smooth scroll reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.trending, .categories, .articles, .newsletter').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallax);
} else {
    initParallax();
}
