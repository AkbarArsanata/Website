import { logError } from './utils.js';

// Setup all navigation-related functionality
export function setupNavigation() {
    try {
        console.log('Setting up navigation...');
        
        // Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('is-active'); // Tambahan untuk ikon hamburger
            });
            
            // Close mobile menu when a link is clicked
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('is-active'); // Pastikan ikon juga reset
                });
            });
        }

        // Smooth Scrolling for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                // Validasi targetId tidak hanya #
                if (targetId === '#') return;
                
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const offset = 80; // Sesuaikan dengan tinggi header Anda
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        
                        window.scrollTo({
                            top: targetPosition - offset,
                            behavior: 'smooth'
                        });
                        
                        // Update URL tanpa reload halaman (optional)
                        if (history.pushState) {
                            history.pushState(null, null, targetId);
                        }
                    }
                } catch (error) {
                    logError(`Error scrolling to ${targetId}`, error);
                }
            });
        });
        
        console.log('Navigation setup completed successfully');
    } catch (error) {
        logError('Error setting up navigation', error);
    }
}