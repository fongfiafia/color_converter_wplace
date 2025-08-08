python3 -m http.server 5501 --directory "/Users/mac/git/color_converter_wplace"

### 部署注意事项（Vercel 静态站点）

- 确保静态资源路径正确

  - 使用绝对路径并带目录前缀：例如 `"/blue-marble/styles.css"`、`"/blue-marble/lang-switcher.js"`，避免 `"./styles.css"` 在无尾斜杠路由下解析错误导致 404。
  - 推荐把静态文件放在 `public/` 下（如 `public/blue-marble/**`），线上地址即为 `"/blue-marble/**"`。

- 统一样式加载

  - 导航样式已在片段 `components/navbar.html` 内部引入：`<link rel="stylesheet" href="/navbar.css?v=4">`，任意页面注入该片段即可自动加载最新 navbar 样式。
