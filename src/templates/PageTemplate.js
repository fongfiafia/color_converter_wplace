// 可复用的页面模板类
export class PageTemplate {
  constructor(config) {
    this.config = {
      title: 'Wplace Pixel Tool',
      description: 'The ultimate pixel art converter for Wplace platform',
      keywords: 'wplace, pixel art, converter',
      canonicalUrl: 'https://www.wplace.wiki',
      lang: 'en',
      showNav: true,
      showFooter: true,
      customStyles: [],
      customScripts: [],
      ...config
    };
  }

  render() {
    return `<!DOCTYPE html>
<html lang="${this.config.lang}">
${this.renderHead()}
<body>
${this.config.showNav ? this.renderNav() : ''}
${this.renderContent()}
${this.config.showFooter ? this.renderFooter() : ''}
${this.renderScripts()}
</body>
</html>`;
  }

  renderHead() {
    return `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${this.config.description}">
  <meta name="keywords" content="${this.config.keywords}">
  <meta name="author" content="Wplace">
  <meta name="theme-color" content="#000000">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${this.config.title}">
  <meta property="og:description" content="${this.config.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${this.config.canonicalUrl}">
  
  <link rel="canonical" href="${this.config.canonicalUrl}">
  <title>${this.config.title}</title>
  
  <!-- Styles -->
  <link rel="stylesheet" href="main.css">
  ${this.config.customStyles.map(style => `<link rel="stylesheet" href="${style}">`).join('\n  ')}
  <link rel="shortcut icon" href="favicon.png" type="image/x-icon">
</head>`;
  }

  renderNav() {
    return `<nav class="main-nav">
  <div class="nav-container">
    <div class="nav-logo">
      <a href="/" class="logo-link">Wplace Tool</a>
    </div>
    <button class="nav-toggle" aria-label="Toggle navigation">
      <span class="hamburger"></span>
    </button>
    <div class="nav-content">
      <div class="nav-links">
        <a href="/#features" data-i18n="navFeatures">Features</a>
        <a href="/#colors" data-i18n="navColors">Colors</a>
        <a href="/plugins.html" data-i18n="navPlugins">Plugins</a>
        <a href="/#faq" data-i18n="navFaq">FAQ</a>
      </div>
      <div class="lang_select">
        <label for="lang-select">Language:</label>
        <select id="lang-select">
          <option value="en">🇺🇸 English</option>
          <option value="pt">🇵🇹 Português 🇧🇷</option>
          <option value="de">🇩🇪 Deutsch</option>
          <option value="es">🇪🇸 Español</option>
          <option value="fr">🇫🇷 Français</option>
          <option value="uk">🇺🇦 Українська</option>
          <option value="vi">🇻🇳 Tiếng Việt</option>
          <option value="pl">🇵🇱 Polski</option>
          <option value="ja">🇯🇵 日本語</option>
          <option value="de_CH">🇨🇭 Deutsch (Schweiz)</option>
          <option value="nl">🇳🇱 Nederlands</option>
          <option value="ru">🇷🇺 Русский</option>
          <option value="tr">🇹🇷 Türkçe</option>
        </select>
      </div>
    </div>
  </div>
</nav>`;
  }

  renderContent() {
    // 子类需要重写这个方法
    return this.config.content || '<main>Content goes here</main>';
  }

  renderFooter() {
    return `<footer style="margin-top: 60px; padding: 40px 20px; background: #1a1a1a; border-top: 1px solid #333; text-align: center;">
  <div style="margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; max-width: 1200px;">
    <div style="margin-bottom: 20px;">
      <h3 style="color: #ffffff; font-size: 1.2rem; margin-bottom: 16px;" data-i18n="footerTitle">Wplace Pixel Tool</h3>
      <p style="color: #cccccc; font-size: 0.9rem;" data-i18n="footerDescription">The ultimate pixel art converter for Wplace platform</p>
    </div>
    
    <div style="display: flex; gap: 40px;">
      <div>
        <h4 style="color: #ffffff; font-size: 1rem; margin-bottom: 12px;" data-i18n="linksTitle">Links</h4>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 8px;"><a href="https://wplace.live" style="color: #cccccc; text-decoration: none;">Wplace Platform</a></li>
          <li style="margin-bottom: 8px;"><a href="https://github.com/PEPOAFONSO/color_converter_wplace" style="color: #cccccc; text-decoration: none;">GitHub</a></li>
        </ul>
      </div>
      
      <div>
        <h4 style="color: #ffffff; font-size: 1rem; margin-bottom: 12px;" data-i18n="legalTitle">Legal</h4>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 8px;"><a href="/privacy.html" style="color: #cccccc; text-decoration: none;">Privacy Policy</a></li>
          <li style="margin-bottom: 8px;"><a href="/terms.html" style="color: #cccccc; text-decoration: none;">Terms of Service</a></li>
        </ul>
      </div>
    </div>
  </div>
  
  <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #333;">
    <p style="color: #888888; font-size: 0.9rem;" data-i18n="copyright">© 2025 Wplace Pixel Tool. All rights reserved.</p>
  </div>
</footer>`;
  }

  renderScripts() {
    return `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-KPG7QFTNP2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-KPG7QFTNP2');
</script>

<!-- Navigation Script -->
<script type="module" src="utils/nav.js"></script>
<script type="module">
  import { initNavigation } from './utils/nav.js';
  document.addEventListener('DOMContentLoaded', initNavigation);
</script>

<!-- Custom Scripts -->
${this.config.customScripts.map(script => `<script type="module" src="${script}"></script>`).join('\n')}`;
  }
}

// 专门的页面类型模板
export class StaticPageTemplate extends PageTemplate {
  constructor(config) {
    super(config);
  }

  renderContent() {
    return `<header style="text-align: center; padding: 40px 20px; margin-top: 60px;">
  <h1 style="color: #ffffff; font-size: 2.5rem; margin-bottom: 16px;">${this.config.pageTitle || this.config.title}</h1>
  ${this.config.subtitle ? `<p style="color: #cccccc; font-size: 1.2rem;">${this.config.subtitle}</p>` : ''}
</header>

<main style="max-width: 800px; margin: 0 auto; padding: 20px; color: #cccccc; line-height: 1.6;">
  ${this.config.sections ? this.renderSections() : this.config.content || ''}
</main>`;
  }

  renderSections() {
    return this.config.sections.map(section => `
<section style="margin-bottom: 40px;">
  <h2 style="color: #ffffff; margin-bottom: 20px; font-size: 1.5rem;">${section.title}</h2>
  ${section.content}
  ${section.list ? `<ul style="margin-left: 20px;">${section.list.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
</section>`).join('');
  }
}

// 主应用页面模板（带工具功能）
export class AppPageTemplate extends PageTemplate {
  constructor(config) {
    super(config);
  }

  renderContent() {
    return `<header>
  <h1 class="title" style="text-align: center; font-size: 3rem; font-weight: 700; letter-spacing: 0; margin-top: 5px; margin-bottom: 24px; color: #ffffff;" data-i18n="title">Wplace Pixel Tool</h1>
  <p class="subtitle" style="text-align: center; font-size: 1.2rem; font-weight: 500; letter-spacing: 0; margin-bottom: 16px; color: #ffffff;" data-i18n="subtitle">Create Perfect Pixel Art for Wplace</p>
  <p class="description" style="text-align: center; max-width: 600px; margin: 0 auto 32px; color: #cccccc;" data-i18n="description">Transform your images into pixel-perfect art with Wplace's professional pixel art converter. Precise color adjustments and powerful pixel tools.</p>
</header>

${this.config.content || ''}`;
  }
}