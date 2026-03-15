// Mobile Menu Toggle
export function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Close menu when clicking on a link
export function setupMenuLinks() {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.getElementById('navLinks');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        });
    });
}

// Testimonials Slider
export class TestimonialsSlider {
    private currentSlide: number = 0;
    private slides: NodeListOf<Element>;
    private dots: NodeListOf<Element>;
    private intervalId: number | null = null;

    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
    }

    goToSlide(n: number) {
        this.currentSlide = n;
        this.updateSlider();
    }

    updateSlider() {
        const slider = document.getElementById('slider');
        if (slider) {
            slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        }
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoAdvance(interval: number = 5000) {
        this.intervalId = window.setInterval(() => {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.updateSlider();
        }, interval);
    }

    stopAutoAdvance() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Form Submission Handler
export function handleFormSubmit(event: Event) {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    
    // Check if reCAPTCHA is completed (if grecaptcha is available)
    if (typeof grecaptcha !== 'undefined') {
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            alert('Por favor, completa el reCAPTCHA');
            return;
        }
    }
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your server
    console.log('Form data:', data);
    
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    form.reset();
    
    if (typeof grecaptcha !== 'undefined') {
        grecaptcha.reset();
    }
}

// Smooth scroll with offset for fixed header
export function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = (this as HTMLAnchorElement).getAttribute('href');
            if (href) {
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Initialize all scripts
export function initializeHomePage() {
    setupMenuLinks();
    setupSmoothScroll();
    
    const slider = new TestimonialsSlider();
    slider.startAutoAdvance();
    
    // Make slider globally accessible for dot clicks
    (window as any).testimonialsSlider = slider;
}

// Global function for dot clicks (called from HTML)
(window as any).goToSlide = function(n: number) {
    if ((window as any).testimonialsSlider) {
        (window as any).testimonialsSlider.goToSlide(n);
    }
};

