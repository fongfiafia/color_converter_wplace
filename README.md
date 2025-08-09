python3 -m http.server 5501 --directory "/Users/mac/git/color_converter_wplace"

### 部署注意事项（Vercel 静态站点）

- 确保静态资源路径正确

  - 使用绝对路径并带目录前缀：例如 `"/blue-marble/styles.css"`、`"/blue-marble/lang-switcher.js"`，避免 `"./styles.css"` 在无尾斜杠路由下解析错误导致 404。
  - 推荐把静态文件放在 `public/` 下（如 `public/blue-marble/**`），线上地址即为 `"/blue-marble/**"`。

- 统一样式加载

  - 导航样式已在片段 `components/navbar.html` 内部引入：`<link rel="stylesheet" href="/navbar.css?v=4">`，任意页面注入该片段即可自动加载最新 navbar 样式。

- 统一 Footer（强制规范）

  - 所有页面必须通过片段方式引入统一的 `components/footer.html`，不得各自复制粘贴 footer 结构。
  - 首页内链锚点要求：主页需提供以下锚点，便于 SEO 与站内链接统一指向：
    - `#what-is-wplace`（What is Wplace.live 组件容器）
    - `#wip-rules-title`（Wplace.live rules 标题）
    - `#faq`（FAQ 区域容器）
    - `#wplace-color-palettes`（色板标题）
  - 引入示例：

    ```html
    <div id="footer-container"></div>
    <script>
      async function injectFragment(containerSelector, url) {
        const el = document.querySelector(containerSelector);
        if (!el) return;
        const res = await fetch(url, { cache: "no-store" });
        el.innerHTML = await res.text();
      }
      document.addEventListener("DOMContentLoaded", async () => {
        await injectFragment("#footer-container", "/components/footer.html");
      });
    </script>
    ```

  - Footer 链接应包含：
    - `/`（Wplace Pixel Art Converter）
    - `/geocode`（Wplace Finder / Lat/Long Locator）
    - `/blue-marble`（Blue Marble Plugins）
    - `/#what-is-wplace`（What is Wplace.live）
    - `/#wip-rules-title`（Wplace.live rules）
    - `/#faq`（Frequently Asked Questions）
    - `/#wplace-color-palettes`（Wplace Color Palettes）
    - `https://github.com/PEPOAFONSO/color_converter_wplace`（Open Source on GitHub）
