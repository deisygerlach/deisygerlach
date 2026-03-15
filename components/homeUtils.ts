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

// Initialize all scripts
export function initializeHomePage() {
    setupMenuLinks();
    
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

