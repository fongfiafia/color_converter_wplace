import { PageTemplate, StaticPageTemplate, AppPageTemplate } from '../templates/PageTemplate.js';
import { PluginsPageTemplate, PluginDetailTemplate } from '../templates/PluginsTemplate.js';

/**
 * 页面构建器 - 用于创建和管理页面
 */
export class PageBuilder {
  constructor() {
    this.templates = new Map([
      ['static', StaticPageTemplate],
      ['app', AppPageTemplate],
      ['base', PageTemplate],
      ['plugins', PluginsPageTemplate],
      ['plugin-detail', PluginDetailTemplate]
    ]);
  }

  /**
   * 注册自定义模板
   * @param {string} name 模板名称
   * @param {Class} templateClass 模板类
   */
  registerTemplate(name, templateClass) {
    this.templates.set(name, templateClass);
  }

  /**
   * 创建页面
   * @param {Object} config 页面配置
   * @returns {string} HTML 字符串
   */
  createPage(config) {
    const templateType = config.template || 'static';
    const TemplateClass = this.templates.get(templateType);
    
    if (!TemplateClass) {
      throw new Error(`Template "${templateType}" not found`);
    }

    const template = new TemplateClass(config);
    return template.render();
  }

  /**
   * 创建静态页面的快捷方法
   * @param {Object} config 页面配置
   * @returns {string} HTML 字符串
   */
  createStaticPage(config) {
    return this.createPage({
      ...config,
      template: 'static'
    });
  }

  /**
   * 创建应用页面的快捷方法
   * @param {Object} config 页面配置
   * @returns {string} HTML 字符串
   */
  createAppPage(config) {
    return this.createPage({
      ...config,
      template: 'app'
    });
  }
}

// 导出单例实例
export const pageBuilder = new PageBuilder();