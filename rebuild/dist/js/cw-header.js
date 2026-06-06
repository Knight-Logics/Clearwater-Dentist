/** Custom header — active nav + mobile drawer + fixed header offset */
(function () {
  "use strict";

  function syncHeaderOffset() {
    var header = document.getElementById("cw-site-header");
    if (!header) return;
    document.documentElement.style.setProperty(
      "--cw-header-offset",
      header.offsetHeight + "px"
    );
  }

  var path = (window.location.pathname || "/")
    .replace(/\/index\.html$/, "/")
    .replace(/\/$/, "") || "/";

  document.querySelectorAll(".cw-site-header__nav-link, .cw-mobile-nav__link").forEach(function (a) {
    var href = (a.getAttribute("href") || "/").replace(/\/$/, "") || "/";
    if (href === path) a.classList.add("is-active");
  });

  var menuBtn = document.getElementById("cw-site-header-menu");
  var mobileNav = document.getElementById("cw-mobile-nav");

  if (menuBtn && mobileNav) {
  var panel = mobileNav.querySelector(".cw-mobile-nav__panel");
  var lastFocus = null;

  function setOpen(open) {
    mobileNav.classList.toggle("is-open", open);
    mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("cw-nav-open", open);

    if (open) {
      lastFocus = document.activeElement;
      var first = mobileNav.querySelector(".cw-mobile-nav__close, .cw-mobile-nav__link");
      if (first) first.focus();
    } else if (lastFocus && lastFocus.focus) {
      lastFocus.focus();
    }
  }

  menuBtn.addEventListener("click", function () {
    setOpen(!mobileNav.classList.contains("is-open"));
  });

  mobileNav.querySelectorAll("[data-cw-nav-close]").forEach(function (el) {
    el.addEventListener("click", function () {
      setOpen(false);
    });
  });

  mobileNav.querySelectorAll(".cw-mobile-nav__link").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
      setOpen(false);
    }
  });

  if (panel) {
    panel.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !mobileNav.classList.contains("is-open")) return;
      var focusable = panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }
  }

  syncHeaderOffset();
  window.addEventListener("resize", syncHeaderOffset);
  window.addEventListener("load", syncHeaderOffset);
  if (typeof ResizeObserver !== "undefined") {
    var headerEl = document.getElementById("cw-site-header");
    if (headerEl) {
      new ResizeObserver(syncHeaderOffset).observe(headerEl);
    }
  }
})();
