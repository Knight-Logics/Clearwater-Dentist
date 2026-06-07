(function () {
  "use strict";

  function syncAntiAnxietyDevice() {
    var body = document.body;
    if (!body || !body.classList.contains("cw-about-hero-v2--anti-anxiety")) return;
    var mobile = window.matchMedia("(max-width:767px)").matches;
    document.documentElement.classList.toggle("cw-ax-mobile", mobile);
    body.classList.toggle("dmMobileBody", mobile);
    body.classList.toggle("dmDesktopBody", !mobile);
    window._currentDevice = mobile ? "mobile" : "desktop";
  }

  function fitHeroTitle(title) {
    var content = title.closest(".cw-about-hero__content");
    var hero = title.closest(".cw-about-page-hero");
    if (!content) return;

    var availableW = content.clientWidth - 20;
    if (availableW < 1) return;

    var allowWrap = title.classList.contains("cw-about-hero__title--wrap");
    var isNarrow = window.matchMedia("(max-width:767px)").matches;
    var isPhone = window.matchMedia("(max-width:420px)").matches;
    var max = allowWrap
      ? Math.min(
          isPhone ? 22 : isNarrow ? 26 : 42,
          Math.max(12, availableW / (isPhone ? 11.5 : isNarrow ? 10.2 : 9.2))
        )
      : Math.min(56, Math.max(12, window.innerWidth / 14.5));
    var min = allowWrap ? (isPhone ? 11.5 : isNarrow ? 12.5 : 15) : 9;
    var size = max;

    function applySize(px) {
      var val = px + "px";
      content.style.setProperty("--cw-about-title-size", val);
      title.style.setProperty("font-size", val, "important");
    }

    function applySubtitleSize(px) {
      if (!allowWrap) return;
      var sub = content.querySelector(".cw-about-hero__subtitle");
      if (!sub) return;
      var ratio = isPhone ? 0.34 : isNarrow ? 0.36 : 0.38;
      var subSize = Math.max(10.5, Math.min(15, px * ratio));
      content.style.setProperty("--cw-about-subtitle-size", subSize + "px");
      sub.style.setProperty("font-size", subSize + "px", "important");
    }

    applySize(size);
    applySubtitleSize(size);

    if (allowWrap) {
      var maxLines = isPhone ? 5 : isNarrow ? 4 : 3;
      var maxHeroShare = isPhone ? 0.56 : isNarrow ? 0.52 : 0.44;

      while (size > min) {
        var lineHeight = size * 1.12;
        var lines = title.scrollHeight / lineHeight;
        var tooTall =
          hero &&
          title.getBoundingClientRect().height > hero.clientHeight * maxHeroShare;
        var tooWide = title.scrollWidth > availableW + 4;

        if (lines <= maxLines && !tooTall && !tooWide) break;
        size -= 0.5;
        applySize(size);
        applySubtitleSize(size);
      }
      return;
    }

    function tooWide() {
      return (
        title.scrollWidth > availableW ||
        title.getBoundingClientRect().width > availableW
      );
    }

    while (tooWide() && size > min) {
      size -= 0.5;
      applySize(size);
    }

    if (tooWide() && size > min) {
      applySize(min);
    }
  }

  function fitAllHeroTitles() {
    document.querySelectorAll("[data-cw-hero-title]").forEach(fitHeroTitle);
  }

  function initHeroPanels() {
    document.querySelectorAll(".cw-about-page-hero").forEach(function (hero) {
      if (hero.dataset.panelsInit) return;
      hero.dataset.panelsInit = "1";
      requestAnimationFrame(function () {
        hero.classList.add("cw-about-hero--ready", "cw-page-hero-gallery--ready");
      });
    });
  }

  function init() {
    syncAntiAnxietyDevice();
    initHeroPanels();
    fitAllHeroTitles();

    window.addEventListener("resize", function () {
      syncAntiAnxietyDevice();
      fitAllHeroTitles();
    });
    window.addEventListener("load", function () {
      syncAntiAnxietyDevice();
      fitAllHeroTitles();
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        syncAntiAnxietyDevice();
        fitAllHeroTitles();
      });
    }

    if (typeof ResizeObserver !== "undefined") {
      document.querySelectorAll(".cw-about-hero__content").forEach(function (content) {
        new ResizeObserver(fitAllHeroTitles).observe(content);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
