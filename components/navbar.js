function initNavbarInteractions() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarLinks = document.querySelector('.navbar-links');

  if (menuToggle && navbarLinks) {
    menuToggle.addEventListener('click', function () {
      navbarLinks.classList.toggle('active');
      const spans = this.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });

    const navLinks = navbarLinks.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
      });
    });
  }

  // 设置当前页面对应的导航链接为激活状态
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initNavbarInteractions();
});

// 支持片段异步注入后再次初始化
window.initNavbarInteractions = initNavbarInteractions;