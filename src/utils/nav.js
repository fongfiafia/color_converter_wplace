// Navigation functionality
export function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navContent = document.querySelector('.nav-content');
    let isNavOpen = false;

    // Toggle mobile navigation
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            isNavOpen = !isNavOpen;
            navToggle.classList.toggle('active');
            navContent.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isNavOpen ? 'hidden' : '';
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Close mobile nav if open
            if (isNavOpen && window.innerWidth <= 768) {
                isNavOpen = false;
                navToggle.classList.remove('active');
                navContent.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Handle scroll events for nav styling
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.main-nav');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.backgroundColor = '#1a1a1a';
            nav.style.backdropFilter = 'none';
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isNavOpen) {
            isNavOpen = false;
            navToggle.classList.remove('active');
            navContent.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}