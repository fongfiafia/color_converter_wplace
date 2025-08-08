class LanguageSwitcher {
  constructor() {
    console.log('🌐 LanguageSwitcher: Initializing...');
    // Ensure translations are available before detecting language
    this.translations = window.translations || {};
    this.currentLang = this.detectLanguage();
    console.log('🌐 LanguageSwitcher: Current lang:', this.currentLang);
    console.log('🌐 LanguageSwitcher: Available translations:', Object.keys(this.translations));
    this.init();
  }

  detectLanguage() {
    console.log('🌐 LanguageSwitcher: Detecting language...');
    // Defensive: ensure translations object exists
    if (!this || typeof this !== 'object') {
      return 'en';
    }
    if (!this.translations || typeof this.translations !== 'object') {
      this.translations = {};
    }
    const translations = this.translations;
    
    // 1. Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    console.log('🌐 LanguageSwitcher: URL lang:', urlLang);
    if (urlLang && this.isValidLanguage(urlLang)) {
      console.log('🌐 LanguageSwitcher: Using URL lang:', urlLang);
      return urlLang;
    }

    // 2. Check localStorage
    const savedLang = localStorage.getItem('bluemarble-lang');
    console.log('🌐 LanguageSwitcher: Saved lang:', savedLang);
    if (savedLang && this.isValidLanguage(savedLang)) {
      console.log('🌐 LanguageSwitcher: Using saved lang:', savedLang);
      return savedLang;
    }

    // 3. Check browser language
    const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    console.log('🌐 LanguageSwitcher: Browser lang:', browserLang);
    
    // First try full match (e.g. "pt-BR")
    if (translations[browserLang]) {
      console.log('🌐 LanguageSwitcher: Using full browser lang:', browserLang);
      return browserLang;
    }
    
    // Then try first two letters (e.g. "pt-BR" → "pt")
    const shortLang = browserLang.split('-')[0];
    console.log('🌐 LanguageSwitcher: Short browser lang:', shortLang);
    if (translations[shortLang]) {
      console.log('🌐 LanguageSwitcher: Using short browser lang:', shortLang);
      return shortLang;
    }

    // Default to English
    console.log('🌐 LanguageSwitcher: Using default lang: en');
    return 'en';
  }

  isValidLanguage(lang) {
    return this.translations && this.translations[lang];
  }

  init() {
    this.setupLanguageSelector();
    this.translatePage();
    this.updateMetaTags();
    this.updateURL();
  }

  setupLanguageSelector() {
    console.log('🌐 LanguageSwitcher: Setting up language selector...');
    const select = document.getElementById('lang-select');
    if (!select) {
      console.error('🌐 LanguageSwitcher: Language selector not found!');
      return;
    }

    console.log('🌐 LanguageSwitcher: Language selector found:', select);
    
    // Set current language as selected
    select.value = this.currentLang;
    console.log('🌐 LanguageSwitcher: Set selector value to:', this.currentLang);

    // Add event listener
    select.addEventListener('change', (e) => {
      console.log('🌐 LanguageSwitcher: Language changed to:', e.target.value);
      this.switchLanguage(e.target.value);
    });
  }

  switchLanguage(lang) {
    if (!this.isValidLanguage(lang)) return;

    this.currentLang = lang;
    localStorage.setItem('bluemarble-lang', lang);
    
    this.translatePage();
    this.updateMetaTags();
    this.updateURL();
  }

  translatePage() {
    const t = this.translations[this.currentLang];
    if (!t) return;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (t[key]) {
        element.textContent = t[key];
      }
    });

    // Update HTML content for elements with data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      if (t[key]) {
        element.innerHTML = t[key];
      }
    });
  }

  updateMetaTags() {
    const t = this.translations[this.currentLang];
    if (!t) return;

    // Update title
    if (t.pageTitle) {
      document.title = t.pageTitle;
    }

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t.metaDescription) {
      metaDesc.setAttribute('content', t.metaDescription);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && t.metaKeywords) {
      metaKeywords.setAttribute('content', t.metaKeywords);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && t.pageTitle) {
      ogTitle.setAttribute('content', t.pageTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && t.metaDescription) {
      ogDesc.setAttribute('content', t.metaDescription);
    }

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle && t.pageTitle) {
      twitterTitle.setAttribute('content', t.pageTitle);
    }

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc && t.metaDescription) {
      twitterDesc.setAttribute('content', t.metaDescription);
    }
  }

  updateURL() {
    const url = new URL(window.location);
    url.searchParams.set('lang', this.currentLang);
    window.history.replaceState({}, '', url);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (window.translations) {
    new LanguageSwitcher();
  }
});