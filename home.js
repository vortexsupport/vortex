// Counter Animation for Stats
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (target === 99 ? '' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    };

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Hero Section Parallax Effect
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        });
    }
});

// Service Cards Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Testimonials Slider (if needed for future enhancement)
class TestimonialSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-card');
        this.init();
    }
    
    init() {
        if (this.slides.length <= 3) return; // Don't initialize if 3 or fewer slides
        
        // Add navigation buttons and auto-slide functionality here if needed
        this.autoSlide();
    }
    
    autoSlide() {
        setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    nextSlide() {
        // Implementation for sliding functionality
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlides();
    }
    
    updateSlides() {
        // Update slide positions
        this.slides.forEach((slide, index) => {
            const offset = (index - this.currentSlide) * 100;
            slide.style.transform = `translateX(${offset}%)`;
        });
    }
}

// Industries Grid Animation
document.addEventListener('DOMContentLoaded', function() {
    const industryItems = document.querySelectorAll('.industry-item');
    
    industryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Client Logos Infinite Scroll (if needed)
document.addEventListener('DOMContentLoaded', function() {
    const partnersContainer = document.querySelector('.partners-logos');
    
    if (partnersContainer) {
        // Add subtle animation to partner logos
        const logos = partnersContainer.querySelectorAll('.partner-logo');
        
        logos.forEach((logo, index) => {
            logo.style.animationDelay = `${index * 0.2}s`;
            
            logo.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            logo.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
});

// CTA Button Effects
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});