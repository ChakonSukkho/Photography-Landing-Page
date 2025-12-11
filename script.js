// ============================================
// SOFIA PHOTOGRAPHY PORTFOLIO - JAVASCRIPT
// ============================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('menu');
    const menuLinks = document.querySelectorAll('.menu a');

    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
            
            // Update ARIA attribute
            const isExpanded = menu.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking menu links
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                menu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = menu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                menu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ============================================
    // 2. SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ============================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // 3. BACK TO TOP BUTTON
    // ============================================
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Scroll to top when button is clicked
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 4. FORM VALIDATION & SUBMISSION
    // ============================================
    const bookingForm = document.getElementById('bookingForm');
    const successMessage = document.getElementById('successMessage');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                package: document.querySelector('input[name="package"]:checked')?.value,
                firstName: document.getElementById('fname').value,
                lastName: document.getElementById('lname').value,
                email: document.getElementById('email').value,
                comment: document.getElementById('comment').value
            };

            // Validate form
            if (!formData.package) {
                alert('Please select a package');
                return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Log form data (In production, send to server)
            console.log('Form submitted:', formData);

            // Show success message
            successMessage.style.display = 'block';
            bookingForm.style.display = 'none';

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Optional: Reset form after 5 seconds
            setTimeout(function() {
                bookingForm.reset();
                successMessage.style.display = 'none';
                bookingForm.style.display = 'flex';
            }, 5000);

            // TODO: Send form data to server
            // Example using Fetch API:
            /*
            fetch('your-form-handler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Show success message
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
            */
        });
    }

    // ============================================
    // 5. LAZY LOADING IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(function(img) {
            img.classList.add('loaded');
        });
    }

    // ============================================
    // 6. SCROLL REVEAL ANIMATIONS
    // ============================================
    if (typeof ScrollReveal !== 'undefined') {
        // Initialize ScrollReveal
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            delay: 200,
            easing: 'ease-in-out',
            reset: false, // Set to false for better performance
            mobile: true,
            opacity: 0
        });

        // Reveal home section
        sr.reveal('.home-wrapper', {
            origin: 'top',
            delay: 300
        });

        // Reveal social media icons
        sr.reveal('.socmed', {
            delay: 500
        });

        // Reveal about section
        sr.reveal('.aboutHeader', {
            delay: 200
        });

        sr.reveal('.about-box', {
            delay: 400
        });

        // Reveal gallery title
        sr.reveal('.projects-detail h2', {
            delay: 200
        });

        // Reveal gallery images with interval
        sr.reveal('.img-wrapper', {
            interval: 50,
            delay: 100,
            distance: '30px'
        });

        // Reveal footer sections
        sr.reveal('.socialmedia', {
            delay: 200
        });

        sr.reveal('.contact', {
            delay: 300
        });

        sr.reveal('.quote', {
            delay: 400
        });
    }

    // ============================================
    // 7. ACTIVE NAVIGATION HIGHLIGHT
    // ============================================
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.menu a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // 8. GALLERY LIGHTBOX (Optional Enhancement)
    // ============================================
    const galleryImages = document.querySelectorAll('.projectPic img');
    
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 0 50px rgba(0, 0, 0, 0.8);
            `;
            
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            
            // Close lightbox on click
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            // Close lightbox on ESC key
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape' && document.getElementById('lightbox')) {
                    document.body.removeChild(document.getElementById('lightbox'));
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
        });
    });

    // ============================================
    // 9. FORM INPUT ANIMATIONS
    // ============================================
    const formInputs = document.querySelectorAll('.form input, .form textarea');
    
    formInputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', function() {
            this.style.borderColor = 'rgb(230, 173, 31)';
            this.style.boxShadow = '0 0 10px rgba(230, 173, 31, 0.3)';
        });
        
        // Remove focus animation
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ccc';
            this.style.boxShadow = 'none';
        });
    });

    // ============================================
    // 10. PERFORMANCE OPTIMIZATION
    // ============================================
    
    // Debounce function for scroll events
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

    // Apply debounce to scroll events
    const debouncedScroll = debounce(function() {
        // Your scroll handler code here
        console.log('Scroll event fired (debounced)');
    }, 100);

    // ============================================
    // 11. ACCESSIBILITY ENHANCEMENTS
    // ============================================
    
    // Keyboard navigation for gallery
    galleryImages.forEach((img, index) => {
        img.setAttribute('tabindex', '0');
        
        img.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ============================================
    // 12. CONSOLE MESSAGE
    // ============================================
    console.log('%c Sofia Photography Studio ', 'background: #e6ad1f; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Website loaded successfully! ', 'background: #4CAF50; color: white; font-size: 14px; padding: 5px;');
    console.log('Made with ❤️ for Sofia Photography Studio');

});

// ============================================
// ANALYTICS TRACKING (Optional)
// ============================================
// Add Google Analytics or other tracking here
/*
// Example: Track form submissions
function trackFormSubmission(packageName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
            'event_category': 'booking',
            'event_label': packageName
        });
    }
}
*/

// ============================================
// SERVICE WORKER FOR PWA (Optional)
// ============================================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
*/