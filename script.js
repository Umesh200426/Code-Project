
    document.addEventListener('DOMContentLoaded', function() {
        // Mobile navigation toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    
        // Hide navbar on scroll down, show on scroll up
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;
        const scrollThreshold = 100; // How far to scroll before navbar reacts
    
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Always show navbar when at top of page
            if (currentScroll <= 0) {
                navbar.classList.remove('scrolled');
                navbar.style.top = '0';
                return;
            }
    
            // Scrolling down
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                navbar.style.top = `-${navbar.offsetHeight}px`;
            } 
            // Scrolling up
            else if (currentScroll < lastScroll) {
                navbar.style.top = '0';
                navbar.classList.add('scrolled');
            }
    
            lastScroll = currentScroll;
        });
    
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    
        // Animate skill circles on scroll
        const skillItems = document.querySelectorAll('.skill-item');
        
        function animateSkills() {
            skillItems.forEach(item => {
                const circle = item.querySelector('.progress-circle-fill');
                const value = item.querySelector('.skill-progress').getAttribute('data-value');
                circle.style.setProperty('--value', value);
            });
        }
    
        // Intersection Observer for skill animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
    
        document.querySelectorAll('.skills').forEach(section => {
            observer.observe(section);
        });
    
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });