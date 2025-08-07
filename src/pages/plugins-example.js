// 插件配置示例 - 展示如何添加更多插件
export const pluginsPageConfigExpanded = {
  title: "Plugins | Wplace Pixel Tool",
  description: "Discover powerful plugins to enhance your Wplace pixel art creation workflow",
  keywords: "wplace plugins, pixel art tools, browser extensions, productivity tools",
  canonicalUrl: "https://www.wplace.wiki/plugins.html",
  pageTitle: "Plugins",
  subtitle: "Enhance your pixel art workflow",
  template: "plugins",
  
  // 插件数据 - 可以轻松添加更多插件
  plugins: [
    {
      id: "wplace-helper-extension",
      name: "Wplace Helper Extension",
      description: "Browser extension that adds helpful features to Wplace platform",
      version: "1.2.0",
      category: "Browser Extension",
      status: "active",
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
    },
    
    // 示例：第二个插件 (即将推出)
    {
      id: "pixel-art-studio",
      name: "Pixel Art Studio",
      description: "Advanced pixel art editor with layers and animation support",
      version: "2.0.0",
      category: "Desktop App",
      status: "coming-soon",
      icon: "🎨",
      features: [
        "Multi-layer editing",
        "Frame-by-frame animation",
        "Advanced brush tools",
        "Export to Wplace format",
        "Color palette management"
      ],
      compatibility: ["Windows", "macOS", "Linux"],
      downloadUrl: "#",
      githubUrl: "https://github.com/example/pixel-art-studio",
      author: "Pixel Art Team",
      lastUpdated: "2025-01-15"
    },
    
    // 示例：第三个插件 (测试版)
    {
      id: "wplace-mobile-companion",
      name: "Wplace Mobile Companion",
      description: "Mobile app to manage your Wplace projects on the go",
      version: "0.9.0",
      category: "Mobile App",
      status: "beta",
      icon: "📱",
      features: [
        "Project synchronization",
        "Mobile-friendly interface",
        "Offline project viewing",
        "Push notifications",
        "Community features"
      ],
      compatibility: ["iOS", "Android"],
      downloadUrl: "https://testflight.apple.com/example",
      githubUrl: "https://github.com/example/wplace-mobile",
      author: "Mobile Dev Team",
      lastUpdated: "2024-12-20"
    }
  ]
};

// 使用说明：
// 1. 要添加新插件，只需在 plugins 数组中添加新对象
// 2. 运行 npm run build:pages 重新构建页面
// 3. 插件详情页面会自动生成在 /src/plugins/ 目录下