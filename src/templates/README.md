# 页面模板系统使用指南

## 概述

这个模板系统提供了可复用的页面模板，让您可以快速创建一致的网页，同时支持良好的维护性和扩展性。

## 模板类型

### 1. PageTemplate (基础模板)

- 最基础的模板，包含完整的 HTML 结构
- 包括导航栏、页脚、脚本等通用部分
- 适合需要完全自定义内容的页面

### 2. StaticPageTemplate (静态页面模板)

- 继承自 PageTemplate
- 适合文档类页面（如隐私政策、条款等）
- 支持结构化的章节内容
- 自动生成标题、列表等元素

### 3. AppPageTemplate (应用页面模板)

- 继承自 PageTemplate
- 适合包含应用功能的页面
- 包含应用特定的头部样式

## 快速开始

### 1. 创建页面配置

```javascript
// src/pages/your-page-config.js
export const yourPageConfig = {
  title: "Your Page Title",
  description: "Page description for SEO",
  keywords: "keyword1, keyword2, keyword3",
  canonicalUrl: "https://www.wplace.wiki/your-page.html",
  pageTitle: "Display Title",
  template: "static", // 或 'app', 'base'

  sections: [
    {
      title: "Section Title",
      content: "Section content...",
      list: ["Item 1", "Item 2", "Item 3"], // 可选
    },
  ],
};
```

### 2. 构建页面

```bash
# 构建所有页面
npm run build:pages

# 开发模式（构建页面 + 启动开发服务器）
npm run dev:pages
```

### 3. 手动创建页面

```javascript
import { pageBuilder } from "../utils/PageBuilder.js";
import { yourPageConfig } from "../pages/your-page-config.js";

// 创建静态页面
const html = pageBuilder.createStaticPage(yourPageConfig);

// 或者指定模板类型
const html = pageBuilder.createPage({
  ...yourPageConfig,
  template: "static",
});
```

## 配置选项

### 基础配置

- `title`: 页面标题 (必需)
- `description`: SEO 描述
- `keywords`: SEO 关键词
- `canonicalUrl`: 规范 URL
- `lang`: 页面语言 (默认: 'en')

### 显示选项

- `showNav`: 是否显示导航栏 (默认: true)
- `showFooter`: 是否显示页脚 (默认: true)
- `pageTitle`: 页面显示标题
- `subtitle`: 页面副标题

### 自定义资源

- `customStyles`: 额外的 CSS 文件数组
- `customScripts`: 额外的 JS 文件数组

### 内容配置 (StaticPageTemplate)

- `sections`: 章节数组，每个章节包含：
  - `title`: 章节标题
  - `content`: 章节内容
  - `list`: 可选的列表项数组

## 扩展模板

### 创建自定义模板

```javascript
import { PageTemplate } from "./PageTemplate.js";

export class CustomPageTemplate extends PageTemplate {
  constructor(config) {
    super(config);
  }

  renderContent() {
    return `
      <main class="custom-layout">
        <h1>${this.config.pageTitle}</h1>
        <div class="custom-content">
          ${this.config.content}
        </div>
      </main>
    `;
  }
}
```

### 注册自定义模板

```javascript
import { pageBuilder } from "../utils/PageBuilder.js";
import { CustomPageTemplate } from "./CustomPageTemplate.js";

pageBuilder.registerTemplate("custom", CustomPageTemplate);

// 使用自定义模板
const html = pageBuilder.createPage({
  template: "custom",
  // ... 其他配置
});
```

## 最佳实践

1. **配置分离**: 将页面配置放在 `src/pages/` 目录中
2. **模板复用**: 尽可能使用现有模板，只在必要时创建自定义模板
3. **SEO 优化**: 确保每个页面都有合适的 title、description 和 keywords
4. **一致性**: 保持相似页面使用相同的模板类型
5. **可维护性**: 使用结构化的配置而不是硬编码内容

## 示例

查看以下示例文件：

- `src/pages/privacy-config.js` - 隐私政策页面
- `src/pages/about-config.js` - 关于我们页面
- `scripts/build-pages.js` - 构建脚本示例

## 故障排除

### 常见问题

1. **模块导入错误**: 确保 package.json 中 `type` 设置为 `"module"`
2. **路径错误**: 检查相对路径是否正确
3. **模板未找到**: 确保模板名称正确注册

### 调试技巧

```javascript
// 在构建脚本中添加调试信息
console.log("Generated HTML:", html.substring(0, 200) + "...");
```
