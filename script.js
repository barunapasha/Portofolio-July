// Enhanced Portfolio Scripts

// Theme toggle functionality
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggleLightIcon.classList.remove('hidden');
        document.documentElement.classList.add('dark');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
        document.documentElement.classList.remove('dark');
    }
    
    themeToggleBtn.addEventListener('click', function() {
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');
        
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
    });
}

// Experience section functionality
function initExperienceSection() {
    const companyBtns = document.querySelectorAll('.company-btn');
    const jobContents = document.querySelectorAll('.job-content');

    // Set initial active state
    const firstBtn = companyBtns[0];
    const firstContent = document.querySelector(`.job-content[data-company="${firstBtn.getAttribute('data-company')}"]`);
    firstBtn.classList.add('active');
    firstContent.classList.add('active');
    firstContent.classList.remove('hidden');

    companyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const company = btn.getAttribute('data-company');
            
            // Do nothing if already active
            if (btn.classList.contains('active')) {
                return;
            }

            // Update button styles
            companyBtns.forEach(b => {
                b.classList.remove('text-brand-purple', 'border-brand-purple', 'active');
                b.classList.add('text-gray-400', 'dark:text-gray-500', 'border-gray-200', 'dark:border-gray-700');
            });
            btn.classList.remove('text-gray-400', 'dark:text-gray-500', 'border-gray-200', 'dark:border-gray-700');
            btn.classList.add('text-brand-purple', 'border-brand-purple', 'active');
            
            // Hide all job contents first
            jobContents.forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('active');
            });
            
            // Show target content
            const targetContent = document.querySelector(`.job-content[data-company="${company}"]`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                // Use a timeout to allow the DOM to update and CSS animations to trigger correctly
                setTimeout(() => {
                    targetContent.classList.add('active');
                }, 10);
            }
        });
    });
}

// Enhanced Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
                
                // Add staggered animation for child elements
                const staggerElements = entry.target.querySelectorAll('.stagger-child');
                staggerElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements with animations
    document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-slide-in-top, .animate-scale-in').forEach(el => {
        // Set initial state
        if (el.classList.contains('animate-fade-in-left')) {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-30px)';
        } else if (el.classList.contains('animate-fade-in-right')) {
            el.style.opacity = '0';
            el.style.transform = 'translateX(30px)';
        } else if (el.classList.contains('animate-slide-in-top')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(-20px)';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        }
        observer.observe(el);
    });

    // Special handling for experience section list items
    const experienceListItems = document.querySelectorAll('#experience .animate-fade-in-up');
    if (experienceListItems.length > 0) {
        const experienceSection = document.querySelector('#experience');
        const experienceObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate list items with staggered delay
                    experienceListItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animated');
                        }, index * 200); // 200ms delay between each item
                    });
                }
            });
        }, { threshold: 0.3 });
        
        experienceObserver.observe(experienceSection);
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Add hover effects to cards
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects to buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Typing animation effect
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '3px solid #6E00FF';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                element.style.borderRight = 'none';
            }
        };
        
        // Start typing animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Loading animation
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate elements on page load
        const loadElements = document.querySelectorAll('.load-animate');
        loadElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    
    if (mobileMenuBtn && mobileMenu) {
        // Open mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('active');
            mobileMenuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close mobile menu
        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        };
        
        // Close button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMenu);
        }
        
        // Close on link click
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close on overlay click
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMenu();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
}

// Cursor trail effect
function initCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #6E00FF, #9c66ff);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide cursor on mobile
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initExperienceSection();
    initAnimations();
    initSmoothScrolling();
    initHoverEffects();
    initParallax();
    initTypingAnimation();
    initLoadingAnimation();
    initMobileMenu();
    
    // Add loading class to body
    document.body.classList.add('js-loaded');
    
    // Initialize cursor trail (optional - can be removed for performance)
    // initCursorTrail();
});

// Performance optimization: Debounce scroll events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add CSS for loading state and mobile menu
const style = document.createElement('style');
style.textContent = `
    body:not(.js-loaded) {
        overflow: hidden;
    }
    
    .js-loaded .load-animate {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .mobile-menu {
        transition: all 0.3s ease;
    }
    
    .mobile-menu.active {
        display: block;
    }
    
    .mobile-menu.active .transform {
        transform: translateX(0) !important;
    }
    
    .mobile-menu-btn.active .hamburger-line:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active .hamburger-line:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active .hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .stagger-child {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease-out;
    }
    
    .cursor-trail {
        mix-blend-mode: difference;
    }
    
    @media (max-width: 768px) {
        .cursor-trail {
            display: none;
        }
    }
`;
document.head.appendChild(style); 