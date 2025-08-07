# 可复用页面模板系统

## 🎯 已完成的功能

### ✅ 第一步：可复用的页面模板

我们已经成功实现了一个强大的页面模板系统，具有以下特性：

#### 📁 文件结构

```
src/
├── templates/
│   ├── PageTemplate.js      # 基础页面模板
│   └── README.md           # 使用说明文档
├── utils/
│   └── PageBuilder.js      # 页面构建器
├── pages/
│   ├── privacy-config.js   # 隐私政策页面配置
│   └── about-config.js     # 关于页面配置
└── scripts/
    └── build-pages.js      # 页面构建脚本
```

#### 🔧 核心功能

1. **三种模板类型**：

   - `PageTemplate` - 基础模板
   - `StaticPageTemplate` - 静态页面模板
   - `AppPageTemplate` - 应用页面模板

2. **页面构建器**：

   - 统一的页面创建接口
   - 支持模板注册和扩展
   - 快捷方法支持

3. **配置驱动**：
   - JSON 配置定义页面内容
   - 支持 SEO 元数据配置
   - 结构化的内容组织

#### 🚀 使用方法

1. **创建新页面**：

   ```javascript
   // 1. 创建配置文件
   export const newPageConfig = {
     title: "New Page | Wplace Tool",
     pageTitle: "New Page",
     sections: [
       /* 内容配置 */
     ],
   };

   // 2. 添加到构建脚本
   // 3. 运行 npm run build:pages
   ```

2. **构建命令**：
   ```bash
   npm run build:pages      # 构建所有页面
   npm run dev:pages        # 构建页面 + 启动开发服务器
   ```

#### ✨ 优势

- **高度复用**：模板可在多个页面间共享
- **易于维护**：配置与模板分离，修改简单
- **SEO 友好**：自动生成完整的 meta 标签
- **响应式设计**：集成现有的导航和样式系统
- **扩展性强**：支持自定义模板和组件

## 🔄 下一步计划

### 第二步：增强的 i18n 系统

- [ ] 嵌套翻译支持
- [ ] 参数插值
- [ ] 动态语言加载
- [ ] 翻译文件管理

### 第三步：组件化系统

- [ ] 可复用组件库
- [ ] 组件注册系统
- [ ] 事件绑定管理
- [ ] 状态管理

## 📝 示例页面

目前已生成的页面：

- `/privacy.html` - 隐私政策页面
- `/about.html` - 关于我们页面

## 🛠️ 技术栈

- **模板引擎**：原生 JavaScript + 模板字符串
- **构建工具**：Node.js + ES 模块
- **开发服务器**：Vite
- **样式系统**：现有的 CSS + 响应式设计

## 📖 使用文档

详细使用说明请参考：`src/templates/README.md`
