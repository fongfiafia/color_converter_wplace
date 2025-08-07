// Navigation functionality
export function initNavigation() {
    // Mobile navigation toggle
    let isNavOpen = false;
    const navLinks = document.querySelector('.nav-links');
    
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
                navLinks.style.display = 'none';
                isNavOpen = false;
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
}