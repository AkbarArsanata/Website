import { logError } from './utils.js';

// Initialize shared components
export function initComponents() {
    try {
        console.log('Initializing shared components...');
        
        // Contact Form Submission
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const name = document.getElementById('name')?.value.trim() || '';
                const email = document.getElementById('email')?.value.trim() || '';
                const subject = document.getElementById('subject')?.value.trim() || '';
                const message = document.getElementById('message')?.value.trim() || '';
                
                console.log('Form submission:', { name, email, subject, message });
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            });
        }

        // Timeline Animation Observer
        const timelineItems = document.querySelectorAll('.timeline-container');
        if (timelineItems.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            timelineItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transition = 'all 0.5s ease';
                item.style.transform = item.classList.contains('left') ? 'translateX(-50px)' : 'translateX(50px)';
                observer.observe(item);
            });
        }
        
        console.log('Shared components initialized successfully');
    } catch (error) {
        logError('Error initializing shared components', error);
    }
}