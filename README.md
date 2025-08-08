python3 -m http.server 5501 --directory "/Users/mac/git/color_converter_wplace"

### 部署注意事项（Vercel 静态站点）

- 确保静态资源路径正确

  - 使用绝对路径并带目录前缀：例如 `"/blue-marble/styles.css"`、`"/blue-marble/lang-switcher.js"`，避免 `"./styles.css"` 在无尾斜杠路由下解析错误导致 404。
  - 推荐把静态文件放在 `public/` 下（如 `public/blue-marble/**`），线上地址即为 `"/blue-marble/**"`。

- 统一样式加载

  - 导航样式已在片段 `components/navbar.html` 内部引入：`<link rel="stylesheet" href="/navbar.css?v=4">`，任意页面注入该片段即可自动加载最新 navbar 样式。

- 本地模拟生产环境

  - 使用 `vercel dev` 在本地模拟 Vercel 路由/CDN 行为，访问如 `/blue-marble`（无尾斜杠）验证资源是否 200。
  - 或先 `build` 后用静态服务器（如 `serve`/`http-server`）预览，避免 dev server 的相对路径兜底掩盖问题。

- 快速自检清单（上线前）

  - 浏览器直接访问关键资源 URL，确认 200：
    - `"/navbar.css?v=4"`
    - `"/blue-marble/styles.css?v=1"`
    - `"/blue-marble/translations.js?v=2"`
    - `"/blue-marble/lang-switcher.js?v=3"`
  - 打开 Network 面板查看是否存在 404/跨域/CORS 预检失败。

- 缓存与版本号
  - 对 CSS/JS 使用查询参数做版本控制（例如 `?v=5`）以强制刷新 CDN/浏览器缓存。
  - 如仍受缓存影响，可在 `vercel.json` 针对关键文件设置 `Cache-Control: no-store`。
