// Main JavaScript file for Abdulkareem Abdulqudus Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initAnimations();
    initProjectFilter();
    initContactForm();
    initSkillBars();
    initScrollEffects();
    initSmoothScroll();
    initThemeToggle();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navbarCollapse.classList.remove('show');
        }
    });
}

// Animation initialization
function initAnimations() {
    // Animate elements on page load
    const animatedElements = document.querySelectorAll('.hero-content, .page-hero-content, .section-header');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
}

// Project filter functionality
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn, .portfolio-filter .filter-btn');
    const projectItems = document.querySelectorAll('.project-item, .portfolio-grid-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectItems.forEach(item => {
                const categories = item.getAttribute('data-category') || item.classList.toString();
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Show loading state
                showLoading(true);
                
                // Simulate form submission
                setTimeout(() => {
                    showLoading(false);
                    showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                }, 2000);
            }
        });
    }
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.firstName || data.firstName.trim() === '') {
        errors.push('First name is required');
    }
    
    if (!data.lastName || data.lastName.trim() === '') {
        errors.push('Last name is required');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Valid email is required');
    }
    
    if (!data.subject || data.subject.trim() === '') {
        errors.push('Subject is required');
    }
    
    if (!data.message || data.message.trim() === '') {
        errors.push('Message is required');
    }
    
    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Loading state
function showLoading(show) {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    
    if (show) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
}

// Message display
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message alert alert-${type === 'success' ? 'success' : 'danger'}`;
    messageDiv.innerHTML = message;
    
    // Insert message
    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                
                skillBar.style.width = '0%';
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
                
                observer.unobserve(skillBar);
            }
        });
    };
    
    const skillObserver = new IntersectionObserver(animateSkillBars, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Scroll effects
function initScrollEffects() {
    const elements = document.querySelectorAll('.project-card, .service-card, .value-card, .tool-card, .blog-post-card');
    
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(element);
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Theme toggle (placeholder for future implementation)
function initThemeToggle() {
    // This can be expanded to add dark/light theme toggle
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for changes in user preference
    prefersDarkScheme.addEventListener('change', function() {
        // Handle theme change
        console.log('Theme preference changed:', prefersDarkScheme.matches ? 'dark' : 'light');
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Newsletter subscription
function subscribeNewsletter() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (isValidEmail(email)) {
                // Simulate subscription
                setTimeout(() => {
                    alert('Thank you for subscribing to my newsletter!');
                    this.reset();
                }, 1000);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Initialize newsletter subscription
document.addEventListener('DOMContentLoaded', subscribeNewsletter);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance optimization
function optimizePerformance() {
    // Optimize scroll events
    const optimizedScrollHandler = throttle(() => {
        // Handle scroll events
    }, 16);
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Optimize resize events
    const optimizedResizeHandler = debounce(() => {
        // Handle resize events
    }, 250);
    
    window.addEventListener('resize', optimizedResizeHandler);
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    // This can be expanded to include Google Analytics, GTM, etc.
    console.log('Event tracked:', eventName, eventData);
}

// Track page views
function trackPageView() {
    const page = window.location.pathname;
    trackEvent('page_view', { page });
}

// Track button clicks
function trackButtonClick(buttonName) {
    trackEvent('button_click', { button: buttonName });
}

// Add click tracking to important buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary-custom, .btn-outline-custom');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackButtonClick(buttonText);
        });
    });
});

// Initialize page tracking
document.addEventListener('DOMContentLoaded', trackPageView);

// Accessibility improvements
function initAccessibility() {
    // Add skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
            }
        });
    }
    
    // Keyboard navigation for custom elements
    const customButtons = document.querySelectorAll('[role="button"]');
    customButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// Print styles handling
function initPrintStyles() {
    window.addEventListener('beforeprint', function() {
        // Optimize content for printing
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        // Restore normal styles
        document.body.classList.remove('printing');
    });
}

// Initialize print handling
document.addEventListener('DOMContentLoaded', initPrintStyles);

// Local storage utilities
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Failed to get from localStorage:', e);
        return null;
    }
}

// Form data persistence
function initFormPersistence() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        const formId = 'contactForm';
        
        // Save form data on input
        form.addEventListener('input', function(e) {
            const formData = new FormData(form);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            saveToLocalStorage(formId, formObject);
        });
        
        // Restore form data on page load
        const savedData = getFromLocalStorage(formId);
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = savedData[key];
                }
            });
        }
        
        // Clear saved data on successful submission
        form.addEventListener('submit', function() {
            localStorage.removeItem(formId);
        });
    }
}

// Initialize form persistence
document.addEventListener('DOMContentLoaded', initFormPersistence);

// Device detection
function detectDevice() {
    const userAgent = navigator.userAgent;
    
    return {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
        isTablet: /iPad|Android/i.test(userAgent) && !/Mobile/i.test(userAgent),
        isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    };
}

// Optimize for different devices
function optimizeForDevice() {
    const device = detectDevice();
    
    if (device.isMobile) {
        document.body.classList.add('mobile-device');
        // Mobile-specific optimizations
    } else if (device.isTablet) {
        document.body.classList.add('tablet-device');
        // Tablet-specific optimizations
    } else {
        document.body.classList.add('desktop-device');
        // Desktop-specific optimizations
    }
}

// Initialize device optimization
document.addEventListener('DOMContentLoaded', optimizeForDevice);

// Cookie consent (placeholder for future implementation)
function initCookieConsent() {
    // This can be expanded to show cookie consent banner
    const cookieConsent = getFromLocalStorage('cookieConsent');
    
    if (!cookieConsent) {
        // Show cookie consent banner
        console.log('Cookie consent needed');
    }
}

// Initialize cookie consent
document.addEventListener('DOMContentLoaded', initCookieConsent);

// Social sharing
function initSocialSharing() {
    const socialButtons = document.querySelectorAll('.social-share-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                default:
                    return;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}

// Initialize social sharing
document.addEventListener('DOMContentLoaded', initSocialSharing);

// Export functions for external use
window.portfolioApp = {
    trackEvent,
    showMessage,
    saveToLocalStorage,
    getFromLocalStorage,
    detectDevice
};