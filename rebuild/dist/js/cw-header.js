/** Mark active nav link + mobile menu trigger */
(function () {
  var path = (window.location.pathname || "/").replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
  document.querySelectorAll(".cw-site-header__nav-link").forEach(function (a) {
    var href = (a.getAttribute("href") || "/").replace(/\/$/, "") || "/";
    if (href === path) a.classList.add("is-active");
  });

  var menuBtn = document.getElementById("cw-site-header-menu");
  var dudaMenu = document.getElementById("layout-drawer-hamburger");
  if (menuBtn && dudaMenu) {
    menuBtn.addEventListener("click", function () {
      dudaMenu.click();
    });
  }
})();
