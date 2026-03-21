# Deisy Gerlach

A modern, multilingual website for a professional therapy practice with support for Spanish, English, and Portuguese.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Multilingual Support**: Available in Spanish (ES), English (EN), and Portuguese (PT)
- **Modern UI**: Beautiful gradient design with smooth animations
- **Interactive Elements**: Testimonial slider, smooth scrolling, mobile menu
- **Contact Form**: Integrated contact form with reCAPTCHA validation
- **WhatsApp Integration**: Floating WhatsApp button for easy communication
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📁 Project Structure

```
deisygerlach/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles
├── script.js               # JavaScript functionality
├── config.example.js       # Configuration template
├── lang/                   # Language files
│   ├── es.json            # Spanish translations
│   ├── en.json            # English translations
│   └── pt.json            # Portuguese translations
└── README.md              # This file
```

## 🚀 Setup Instructions

### 1. Configuration

1. Copy `config.example.js` to `config.js`:
   ```bash
   copy config.example.js config.js
   ```

2. Edit `config.js` and update the values:
   ```javascript
   const CONFIG = {
       whatsappNumber: 'YOUR_WHATSAPP_NUMBER',
       recaptchaSiteKey: 'YOUR_RECAPTCHA_SITE_KEY',
       defaultLanguage: 'es'  // es, en, or pt
   };
   ```

3. **Important**: Add `config.js` to your `.gitignore` to keep your configuration private:
   ```
   config.js
   ```

### 2. Google reCAPTCHA Setup

1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Register your site
3. Get your Site Key
4. Update the Site Key in:
   - `config.js` (if using)
   - `index.html` line 160: `data-sitekey="YOUR_RECAPTCHA_SITE_KEY_HERE"`

### 3. WhatsApp Configuration

1. Update your WhatsApp number in `config.js`
2. The format should be: country code + number (no + sign, spaces, or dashes)
   - Example: `573001234567` for Colombia
   - Example: `5511999999999` for Brazil

### 4. Deploy

Simply upload all files to your web server:
- `index.html`
- `styles.css`
- `script.js`
- `lang/` folder with all JSON files

## 🌐 Language System

### How It Works

The website uses a JSON-based internationalization system:

1. **Language Files**: Each language has its own JSON file in the `lang/` folder
2. **Data Attributes**: HTML elements use `data-i18n` attributes to mark translatable content
3. **Dynamic Loading**: JavaScript loads the appropriate language file and updates content

### Adding a New Language

1. Create a new JSON file in the `lang/` folder (e.g., `fr.json`)
2. Copy the structure from an existing language file
3. Translate all text values
4. Add a language button in `index.html`:
   ```html
   <button data-lang="fr">FR</button>
   ```

### Editing Translations

Simply edit the JSON files in the `lang/` folder. The structure is:

```json
{
  "section": {
    "subsection": {
      "key": "Translated text"
    }
  }
}
```

## 📧 Contact Form Integration

The current setup logs form submissions to the console. To actually send emails:

### Option 1: Backend Service

Create a backend endpoint (PHP, Node.js, etc.) to handle form submissions:

```javascript
// In script.js, modify handleSubmit function:
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

### Option 2: Third-Party Services

Use services like:
- [Formspree](https://formspree.io/)
- [EmailJS](https://www.emailjs.com/)
- [Netlify Forms](https://www.netlify.com/products/forms/)

## 🎨 Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #6B46C1;
    --secondary: #9333EA;
    --accent: #EC4899;
    --dark: #1F2937;
    --light: #F9FAFB;
}
```

### Services

Edit the services in the language JSON files under `services` section.

### Testimonials

Edit testimonials in the language JSON files under `testimonials.items` array.

## 🔧 Development

### Prerequisites

- A modern web browser
- A text editor (VS Code, Sublime Text, etc.)
- Optional: Local web server (Live Server extension, XAMPP, etc.)

### Testing Locally

Use a local web server to test:

1. **VS Code**: Install "Live Server" extension
2. **Python**: Run `python -m http.server 8000`
3. **Node.js**: Run `npx http-server`

Then open `http://localhost:8000` in your browser.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Language not switching

1. Check browser console for errors
2. Ensure JSON files are in the `lang/` folder
3. Verify JSON syntax is valid
4. Check that `script.js` is loaded

### Form not submitting

1. Verify reCAPTCHA is configured
2. Check browser console for errors
3. Ensure form validation is passing

### Styles not loading

1. Verify `styles.css` path in `index.html`
2. Clear browser cache
3. Check for CSS syntax errors

## 📄 License

All rights reserved © 2025 Bienestar

## 👥 Support

For support or questions, contact us through:
- WhatsApp: [Your WhatsApp Number]
- Email: [Your Email]

---

**Note**: Remember to update your contact information and configuration before deploying to production!
