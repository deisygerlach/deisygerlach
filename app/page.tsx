'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { InlineWidget } from 'react-calendly';
import './home.css';

// Import JSON data
import testimonialsData from '@/components/data/testimonials.json';
import paymentMethodsData from '@/components/data/paymentMethods.json';

// Import translations
import espLocale from '@/components/locales/esp.json';
import engLocale from '@/components/locales/eng.json';
import porLocale from '@/components/locales/por.json';

type Locale = 'esp' | 'eng' | 'por';

const locales = {
  esp: espLocale,
  eng: engLocale,
  por: porLocale,
};

export default function Home() {
  const [currentLocale, setCurrentLocale] = useState<Locale>("esp");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [expandedTestimonials, setExpandedTestimonials] = useState(false)

  // Identify language from localStorage
  useEffect(() => {
    const lang = localStorage.getItem("langDGerlach") as Locale | null;
    if (lang) setCurrentLocale(lang);
    else setCurrentLocale("esp"); // default si no hay guardado
  }, []);


  if (!currentLocale) return null;

const t = locales[currentLocale];

  useEffect(() => {
    // Apply dark mode class to body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Setup menu links
    const setupMenuLinks = () => {
      const links = document.querySelectorAll('.nav-links a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          const navLinks = document.getElementById('navLinks');
          if (navLinks) {
            navLinks.classList.remove('active');
          }
        });
      });
    };

    // Setup smooth scroll
    const setupSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
          e.preventDefault();
          const href = this.getAttribute('href');
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
    };

    setupMenuLinks();
    setupSmoothScroll();

    // Auto-advance slider
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
      navLinks.classList.toggle('active');
    }
  };

  const goToSlide = (n: number) => {
    setCurrentSlide(n);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if reCAPTCHA is completed
    if (typeof (window as any).grecaptcha !== 'undefined') {
      const recaptchaResponse = (window as any).grecaptcha.getResponse();
      if (recaptchaResponse.length === 0) {
        alert(currentLocale === 'esp' ? 'Por favor, completa el reCAPTCHA' :
          currentLocale === 'eng' ? 'Please complete the reCAPTCHA' :
            'Por favor, complete o reCAPTCHA');
        return;
      }
    }

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    console.log('Form data:', data);

    const successMessage = currentLocale === 'esp' ? '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.' :
      currentLocale === 'eng' ? 'Thank you for your message! We will contact you soon.' :
        'Obrigado pela sua mensagem! Entraremos em contato em breve.';

    alert(successMessage);
    event.currentTarget.reset();

    if (typeof (window as any).grecaptcha !== 'undefined') {
      (window as any).grecaptcha.reset();
    }
  };

  // Expand testimonials - only the one with the id
  const toggleExpandTestimonials = (id: number) => {
    setExpandedTestimonials(!expandedTestimonials);
  };

  const imageAlt = 'Deisy Gerlach';
  const imagePath = "/images/d_g.png";
  const prevPath = "/deisygerlach";

  // Save language in localStorage
  const changeLanguage = (lang: Locale) => {
    setCurrentLocale(lang);
    localStorage.setItem('langDGerlach', lang);
  };

  return (
    <>
      <Script src="https://www.google.com/recaptcha/api.js" async defer />

      {/* Header */}
      <header>
        <nav>
          <div className="logo">{t.header.logo}</div>
          <div className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className="nav-links" id="navLinks">
            <li><a href="#inicio">{t.header.nav.home}</a></li>
            <li><a href="#servicios">{t.header.nav.services}</a></li>
            <li><a href="#problemas">{t.header.nav.issues}</a></li>
            <li><a href="#testimonios">{t.header.nav.testimonials}</a></li>
            <li><a href="#agendar">{t.header.nav.booking}</a></li>
          </ul>
          <div className="header-controls">
            <button
              className="theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <div className="language-selector">
              <select
                value={currentLocale}
                onChange={(e) => changeLanguage(e.target.value as Locale)}
                aria-label="Select Language"
              >
                <option value="esp" style={{ color: 'black' }}>🇪🇸 ES</option>
                <option value="eng" style={{ color: 'black' }}>🇺🇸 EN</option>
                <option value="por" style={{ color: 'black' }}>🇧🇷 PT</option>
              </select>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero">
        <div className="rainbow-bg"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>{t.hero.title}</h1>
            {/* IMAGE ONLY FOR MOBILE */}
            <div className="hero-image-mobile">
              <img
                className="hero-image-img"
                src={prevPath + imagePath || ""}
                alt={imageAlt}
                style={{ width: "100%", height: "auto", borderRadius: "20px", boxShadow: "0 5px 25px rgba(0,0,0,0.15)" }}
              />
            </div>
            <p>{t.hero.description}</p>
            <a href="#agendar" className="cta-button">{t.hero.cta}</a>
          </div>
          <div className="hero-image">
            <img
              className="hero-image-img"
              src={prevPath + imagePath || ""}
              alt={imageAlt}
              style={{ width: "100%", height: "auto", borderRadius: "20px", boxShadow: "0 5px 25px rgba(0,0,0,0.15)" }}
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios">
        <h2 className="section-title">{t.services.title}</h2>
        <div className="services-grid">
          {t.services.items.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Issues We Treat */}
      <section id="problemas">
        <h2 className="section-title">{t.issues.title}</h2>
        <div className="services-grid">
          {t.issues.items.map((issue, index) => (
            <div key={index} className="service-card">
              <div className="issue-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {issue.icon}
              </div>
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Psychology Rainbow Section */}
      <section className="psychology-rainbow-section">
        <h2 className="section-title">{t.psychologyRainbow.title}</h2>
        <p className="rainbow-subtitle">{t.psychologyRainbow.subtitle}</p>
        <div className="rainbow-container">
          {/* Linear Rainbow Bars */}
          <div className="rainbow-bars">
            <div className="rainbow-bar" style={{ backgroundColor: '#FF6B6B' }}></div>
            <div className="rainbow-bar" style={{ backgroundColor: '#FF9F43' }}></div>
            <div className="rainbow-bar" style={{ backgroundColor: '#FFD93D' }}></div>
            <div className="rainbow-bar" style={{ backgroundColor: '#6BCB77' }}></div>
            <div className="rainbow-bar" style={{ backgroundColor: '#4D96FF' }}></div>
            <div className="rainbow-bar" style={{ backgroundColor: '#6A4C93' }}></div>
            <div className="rainbow-bar" style={{ backgroundColor: '#B06AB3' }}></div>
          </div>

          {/* Psychology Concepts positioned on the rainbow */}
          <div className="concept-bubbles">
            {t.psychologyRainbow.concepts.map((concept, index) => (
              <div
                key={index}
                className="concept-bubble"
              >
                {concept}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonios" className="testimonials">
        <h2 className="section-title">{t.testimonials.title}</h2>

        <div className="slider-container">
          <div
            className="slider"
            id="slider"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonialsData.map((testimonial) => {
              const isExpanded = expandedTestimonials;

              return (
                <div key={testimonial.id} className="slide">
                  <p className={isExpanded ? "expanded" : "collapsed"}>
                    "{testimonial.text[currentLocale]}"
                  </p>

                  <button
                    className="read-more"
                    onClick={() => toggleExpandTestimonials(testimonial.id)}
                  >
                    {isExpanded ? t.testimonials.readLess : t.testimonials.readMore}
                  </button>

                  <h4>— {testimonial.author[currentLocale]}</h4>
                </div>
              );
            })}
          </div>

          <div className="slider-dots">
            {testimonialsData.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section id="metodos-pago" className="payment-methods">
        <h2 className="section-title">{t.paymentMethods.title}</h2>
        <div className="payment-grid">
          {paymentMethodsData.map((method) => (
            <div key={method.id} className="payment-card">
              <div className="icon" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80px'
              }}>
                <img
                  src={prevPath + method.logo}
                  alt={method.name[currentLocale]}
                  style={{
                    borderRadius: '4px',
                    maxWidth: '100%',
                    maxHeight: '60px',
                    display: 'block',
                    margin: '0 auto',
                    filter: method.id === 3 && isDarkMode ? "invert(1)" : "none"
                  }}
                />
              </div>
              <h4 style={{
                margin: '10px 0',
                minHeight: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>{method.name[currentLocale]}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Calendly Booking Section */}
      <section id="agendar" className="booking-section">
        <h2 className="section-title">{t.booking.title}</h2>
        <p className="booking-description">{t.booking.description}</p>
        <div className="calendly-container">
          <InlineWidget
            url={`https://calendly.com/deisy-gerlach/20min?lang=en`}
            styles={{
              height: '700px',
              minWidth: '320px',
            }}
          />
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>{t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
        <p>{t.footer.tagline}</p>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/${"5555984017198"}?text=${encodeURIComponent(t.whatsapp.message)}`}
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp.aria}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </>
  );
}
