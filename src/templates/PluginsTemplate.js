import { PageTemplate } from './PageTemplate.js';

/**
 * 插件列表页面模板
 */
export class PluginsPageTemplate extends PageTemplate {
  constructor(config) {
    super(config);
  }

  renderContent() {
    return `<header style="text-align: center; padding: 60px 20px 40px; margin-top: 60px;">
  <h1 style="color: #ffffff; font-size: 2.5rem; margin-bottom: 16px; font-weight: 700;">${this.config.pageTitle}</h1>
  <p style="color: #cccccc; font-size: 1.2rem; max-width: 600px; margin: 0 auto;">${this.config.subtitle}</p>
</header>

<main style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
  ${this.renderPluginGrid()}
</main>`;
  }

  renderPluginGrid() {
    const plugins = this.config.plugins || [];
    
    return `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; margin-bottom: 60px;">
  ${plugins.map(plugin => this.renderPluginCard(plugin)).join('')}
</div>`;
  }

  renderPluginCard(plugin) {
    const statusColors = {
      active: '#10b981',
      beta: '#f59e0b', 
      'coming-soon': '#6b7280'
    };

    const statusColor = statusColors[plugin.status] || '#6b7280';

    return `<div style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 24px; transition: all 0.2s ease; cursor: pointer;" 
             onclick="window.location.href='/plugins/${plugin.id}.html'"
             onmouseover="this.style.borderColor='#444'; this.style.transform='translateY(-2px)'"
             onmouseout="this.style.borderColor='#333'; this.style.transform='translateY(0)'">
    
    <!-- Plugin Header -->
    <div style="display: flex; align-items: center; margin-bottom: 16px;">
      <span style="font-size: 2rem; margin-right: 12px;">${plugin.icon}</span>
      <div style="flex: 1;">
        <h3 style="color: #ffffff; font-size: 1.25rem; margin: 0 0 4px 0; font-weight: 600;">${plugin.name}</h3>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="background: ${statusColor}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 500; text-transform: uppercase;">${plugin.status.replace('-', ' ')}</span>
          <span style="color: #888; font-size: 0.875rem;">v${plugin.version}</span>
        </div>
      </div>
    </div>
    
    <!-- Plugin Description -->
    <p style="color: #cccccc; margin: 0 0 16px 0; line-height: 1.5;">${plugin.description}</p>
    
    <!-- Plugin Category -->
    <div style="margin-bottom: 16px;">
      <span style="background: #2d2d2d; color: #ccc; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem;">${plugin.category}</span>
    </div>
    
    <!-- Plugin Features Preview -->
    <div style="margin-bottom: 20px;">
      <h4 style="color: #ffffff; font-size: 0.875rem; margin: 0 0 8px 0; font-weight: 500;">Key Features:</h4>
      <ul style="margin: 0; padding-left: 16px; color: #ccc;">
        ${plugin.features.slice(0, 3).map(feature => 
          `<li style="font-size: 0.875rem; margin-bottom: 4px;">${feature}</li>`
        ).join('')}
        ${plugin.features.length > 3 ? '<li style="font-size: 0.875rem; color: #888;">+ more features...</li>' : ''}
      </ul>
    </div>
    
    <!-- Plugin Compatibility -->
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; gap: 6px;">
        ${plugin.compatibility.map(browser => 
          `<span style="background: #2d2d2d; color: #ccc; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">${browser}</span>`
        ).join('')}
      </div>
      <span style="color: #888; font-size: 0.75rem;">Click to learn more →</span>
    </div>
  </div>`;
  }
}

/**
 * 插件详情页面模板
 */
export class PluginDetailTemplate extends PageTemplate {
  constructor(config) {
    super(config);
  }

  renderContent() {
    const plugin = this.config.plugin;
    
    return `<header style="text-align: center; padding: 60px 20px 40px; margin-top: 60px;">
  <div style="display: inline-block; font-size: 3rem; margin-bottom: 16px;">${plugin.icon}</div>
  <h1 style="color: #ffffff; font-size: 2.5rem; margin-bottom: 8px; font-weight: 700;">${plugin.name}</h1>
  <p style="color: #cccccc; font-size: 1.2rem; max-width: 600px; margin: 0 auto 24px;">${plugin.description}</p>
  
  <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 32px;">
    <a href="${plugin.downloadUrl}" target="_blank" 
       style="background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; transition: background 0.2s;"
       onmouseover="this.style.background='#059669'"
       onmouseout="this.style.background='#10b981'">
      Download Plugin
    </a>
    <a href="${plugin.githubUrl}" target="_blank"
       style="background: #1a1a1a; border: 1px solid #333; color: #ccc; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; transition: all 0.2s;"
       onmouseover="this.style.borderColor='#444'; this.style.color='#fff'"
       onmouseout="this.style.borderColor='#333'; this.style.color='#ccc'">
      View on GitHub
    </a>
  </div>
  
  <div style="display: flex; justify-content: center; gap: 24px; font-size: 0.875rem; color: #888;">
    <span>Version ${plugin.version}</span>
    <span>•</span>
    <span>By ${plugin.author}</span>
    <span>•</span>
    <span>Updated ${plugin.lastUpdated}</span>
  </div>
</header>

<main style="max-width: 800px; margin: 0 auto; padding: 0 20px;">
  ${this.renderPluginDetails(plugin)}
</main>`;
  }

  renderPluginDetails(plugin) {
    return `<!-- Features Section -->
<section style="margin-bottom: 48px;">
  <h2 style="color: #ffffff; font-size: 1.5rem; margin-bottom: 24px; font-weight: 600;">Features</h2>
  <div style="display: grid; gap: 12px;">
    ${plugin.features.map(feature => `
      <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; display: flex; align-items: center;">
        <span style="color: #10b981; margin-right: 12px; font-size: 1.2rem;">✓</span>
        <span style="color: #cccccc;">${feature}</span>
      </div>
    `).join('')}
  </div>
</section>

<!-- Compatibility Section -->
<section style="margin-bottom: 48px;">
  <h2 style="color: #ffffff; font-size: 1.5rem; margin-bottom: 24px; font-weight: 600;">Browser Compatibility</h2>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    ${plugin.compatibility.map(browser => `
      <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px 20px; text-align: center;">
        <div style="color: #ffffff; font-weight: 500; margin-bottom: 4px;">${browser}</div>
        <div style="color: #10b981; font-size: 0.875rem;">Supported</div>
      </div>
    `).join('')}
  </div>
</section>

<!-- Installation Section -->
<section style="margin-bottom: 48px;">
  <h2 style="color: #ffffff; font-size: 1.5rem; margin-bottom: 24px; font-weight: 600;">Installation</h2>
  <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 24px;">
    <ol style="margin: 0; padding-left: 20px; color: #cccccc; line-height: 1.6;">
      <li style="margin-bottom: 8px;">Click the "Download Plugin" button above</li>
      <li style="margin-bottom: 8px;">Follow the installation instructions for your browser</li>
      <li style="margin-bottom: 8px;">Navigate to Wplace platform</li>
      <li>Enjoy the enhanced features!</li>
    </ol>
  </div>
</section>

<!-- Back to Plugins -->
<div style="text-align: center; margin: 48px 0;">
  <a href="/plugins.html" 
     style="color: #10b981; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 8px;"
     onmouseover="this.style.color='#059669'"
     onmouseout="this.style.color='#10b981'">
    ← Back to all plugins
  </a>
</div>`;
  }
}