// 插件页面配置
export const pluginsPageConfig = {
  title: "Plugins | Wplace Pixel Tool",
  description: "Discover powerful plugins to enhance your Wplace pixel art creation workflow",
  keywords: "wplace plugins, pixel art tools, browser extensions, productivity tools",
  canonicalUrl: "https://www.wplace.wiki/plugins.html",
  pageTitle: "Plugins",
  subtitle: "Enhance your pixel art workflow",
  template: "plugins",
  
  // 插件数据
  plugins: [
    {
      id: "wplace-helper-extension",
      name: "Wplace Helper Extension",
      description: "Browser extension that adds helpful features to Wplace platform",
      version: "1.2.0",
      category: "Browser Extension",
      status: "active", // active, beta, coming-soon
      icon: "🧩",
      features: [
        "Auto-refresh canvas",
        "Pixel coordinate display", 
        "Color palette shortcuts",
        "Quick zoom controls",
        "Template overlay system"
      ],
      compatibility: ["Chrome", "Firefox", "Edge"],
      downloadUrl: "https://github.com/example/wplace-helper",
      githubUrl: "https://github.com/example/wplace-helper",
      author: "Wplace Community",
      lastUpdated: "2025-01-01"
    }
    // 可以添加更多插件
  ]
};

// 插件详情页面配置生成器
export function createPluginDetailConfig(plugin) {
  return {
    title: `${plugin.name} | Wplace Plugins`,
    description: `${plugin.description} - Download and learn more about this Wplace plugin`,
    keywords: `${plugin.name}, wplace plugin, ${plugin.category.toLowerCase()}`,
    canonicalUrl: `https://www.wplace.wiki/plugins/${plugin.id}.html`,
    pageTitle: plugin.name,
    subtitle: plugin.description,
    template: "plugin-detail",
    plugin: plugin
  };
}