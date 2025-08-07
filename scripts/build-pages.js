import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

/**
 * 动态导入页面构建器和配置
 */
async function buildPages() {
  try {
    // 动态导入模块
    const { pageBuilder } = await import('../src/utils/PageBuilder.js');
    const { privacyPageConfig } = await import('../src/pages/privacy-config.js');
    const { aboutPageConfig } = await import('../src/pages/about-config.js');
    const { pluginsPageConfig, createPluginDetailConfig } = await import('../src/pages/plugins-config.js');
    
    console.log('🚀 开始构建页面...');
    
    // 定义要构建的页面
    const pages = [
      { config: privacyPageConfig, filename: 'privacy.html', name: '隐私政策', method: 'createStaticPage' },
      { config: aboutPageConfig, filename: 'about.html', name: '关于我们', method: 'createStaticPage' },
      { config: pluginsPageConfig, filename: 'plugins.html', name: '插件列表', method: 'createPage' }
    ];
    
    // 构建所有页面
    for (const page of pages) {
      const html = page.method === 'createStaticPage' 
        ? pageBuilder.createStaticPage(page.config)
        : pageBuilder.createPage(page.config);
      const outputPath = path.join(projectRoot, 'src', page.filename);
      fs.writeFileSync(outputPath, html, 'utf8');
      console.log(`✅ ${page.name}页面已生成:`, outputPath);
    }

    // 构建插件详情页面
    const pluginsDir = path.join(projectRoot, 'src', 'plugins');
    if (!fs.existsSync(pluginsDir)) {
      fs.mkdirSync(pluginsDir, { recursive: true });
    }

    for (const plugin of pluginsPageConfig.plugins) {
      const detailConfig = createPluginDetailConfig(plugin);
      const detailHtml = pageBuilder.createPage(detailConfig);
      const detailPath = path.join(pluginsDir, `${plugin.id}.html`);
      fs.writeFileSync(detailPath, detailHtml, 'utf8');
      console.log(`✅ 插件详情页面已生成: ${plugin.name} ->`, detailPath);
    }
    
    console.log('🎉 所有页面构建完成!');
    
  } catch (error) {
    console.error('❌ 构建页面时出错:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  buildPages();
}

export { buildPages };