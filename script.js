// Enhanced Portfolio Scripts

// Theme toggle functionality
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    
    // Periksa tema yang tersimpan di localStorage atau preferensi sistem
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
        document.documentElement.classList.add('dark');
    } else {
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
        document.documentElement.classList.remove('dark');
    }
    
    // Tambahkan event listener untuk tombol toggle tema
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.toggle('hidden');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.toggle('hidden');
            
            // Toggle tema berdasarkan state saat ini
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        });
    }
}

// Experience section functionality
function initExperienceSection() {
    const companyBtns = document.querySelectorAll('.company-btn');
    const jobContents = document.querySelectorAll('.job-content');

    if (companyBtns.length > 0 && jobContents.length > 0) {
        const firstBtn = companyBtns[0];
        const company = firstBtn.getAttribute('data-company');
        const firstContent = document.querySelector(`.job-content[data-company="${company}"]`);

        // Reset all buttons to inactive state
        companyBtns.forEach(b => {
            b.classList.remove('text-brand-purple', 'border-brand-purple');
            b.classList.add('text-gray-400', 'dark:text-gray-500', 'border-gray-200', 'dark:border-gray-700');
        });
        // Set the first button to active
        firstBtn.classList.add('text-brand-purple', 'border-brand-purple');
        firstBtn.classList.remove('text-gray-400', 'dark:text-gray-500', 'border-gray-200', 'dark:border-gray-700');

        // Hide all job contents
        jobContents.forEach(content => {
            content.classList.add('hidden');
        });
        // Show the first job content
        if(firstContent) {
          firstContent.classList.remove('hidden');
        }

        // Add click listener to all buttons
        companyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const company = btn.getAttribute('data-company');
                
                companyBtns.forEach(b => {
                    b.classList.remove('text-brand-purple', 'border-brand-purple');
                    b.classList.add('text-gray-400', 'dark:text-gray-500', 'border-gray-200', 'dark:border-gray-700');
                });
                btn.classList.add('text-brand-purple', 'border-brand-purple');
                btn.classList.remove('text-gray-400', 'dark:text-gray-500', 'border-gray-200', 'dark:border-gray-700');
                
                jobContents.forEach(content => {
                    content.classList.add('hidden');
                });
                
                const targetContent = document.querySelector(`.job-content[data-company="${company}"]`);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                }
            });
        });
    }
}

// Enhanced Intersection Observer for animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-slide-in-top, .animate-scale-in');
    
    if(!animatedElements || animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            try {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (error) {
                console.error("Smooth scroll failed:", error);
            }
        });
    });
}

// Mobile menu functionality (Robust version)
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuPanel = document.querySelector('.mobile-menu > div'); // The sliding panel

    if (!mobileMenuBtn || !mobileMenu || !mobileMenuPanel) {
        return; // Exit if essential elements are not found
    }

    const openMenu = () => {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.classList.add('active');
        setTimeout(() => {
            mobileMenu.classList.add('active');
            mobileMenuPanel.style.transform = 'translateX(0)';
        }, 10);
        // CRITICAL FIX: Only hide body scroll on mobile viewports
        if (window.innerWidth < 768) { // Tailwind's 'md' breakpoint is 768px
            document.body.style.overflow = 'hidden';
        }
    };

    const closeMenu = () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenuPanel.style.transform = 'translateX(100%)';
        mobileMenu.classList.remove('active');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            // CRITICAL FIX: Always restore scroll
            document.body.style.overflow = '';
        }, 300); // This duration should match the CSS transition duration
    };

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileMenu.classList.contains('hidden')) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }
    
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
        }
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initExperienceSection();
    initAnimations();
    initSmoothScrolling();
    initMobileMenu();
});
