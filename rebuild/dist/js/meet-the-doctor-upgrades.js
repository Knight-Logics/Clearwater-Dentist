(function () {
  "use strict";

  function fitMeetDoctorTitle() {
    var title = document.getElementById("cw-meet-doctor-title");
    var content = document.querySelector(".cw-meet-doctor-hero__content");
    if (!title || !content) return;

    /* Measure against the text container, not the full hero — content has side padding */
    var available = content.clientWidth - 28;
    if (available < 1) return;

    var max = Math.min(56, Math.max(12, window.innerWidth / 14.5));
    var min = 9;
    var size = max;

    function applySize(px) {
      var val = px + "px";
      content.style.setProperty("--cw-meet-title-size", val);
      title.style.setProperty("font-size", val, "important");
    }

    applySize(size);

    /* Drop-shadow / glimmer can extend past scrollWidth — use both metrics */
    function tooWide() {
      return (
        title.scrollWidth > available ||
        title.getBoundingClientRect().width > available
      );
    }

    while (tooWide() && size > min) {
      size -= 0.5;
      applySize(size);
    }

    /* Final safety pass after layout settles */
    if (tooWide() && size > min) {
      size = min;
      applySize(size);
    }
  }

  function initHeroPanels() {
    var hero = document.querySelector(".cw-meet-doctor-page-hero");
    if (!hero || hero.dataset.panelsInit) return;
    hero.dataset.panelsInit = "1";
    requestAnimationFrame(function () {
      hero.classList.add("cw-meet-doctor-hero--ready", "cw-page-hero-gallery--ready");
    });
  }

  /* Photo sizing is governed entirely by CSS (fixed aspect-ratio), so we only
     need to clear any inline heights left over from older builds. */
  function fitBioPhotoLayout() {
    var photoCol = document.getElementById("1018585677");
    var photo = document.querySelector(".cw-meet-doctor-bio-photo");
    if (photoCol) photoCol.style.minHeight = "";
    if (photo) photo.style.height = "";
  }

  function init() {
    initHeroPanels();
    fitMeetDoctorTitle();
    fitBioPhotoLayout();
    window.addEventListener("resize", function () {
      fitMeetDoctorTitle();
      fitBioPhotoLayout();
    });
    window.addEventListener("load", function () {
      fitMeetDoctorTitle();
      fitBioPhotoLayout();
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        fitMeetDoctorTitle();
        fitBioPhotoLayout();
      });
    }

    if (typeof ResizeObserver !== "undefined") {
      var content = document.querySelector(".cw-meet-doctor-hero__content");
      if (content) {
        new ResizeObserver(fitMeetDoctorTitle).observe(content);
      }

      var textCol = document.getElementById("1666161237");
      if (textCol) {
        new ResizeObserver(fitBioPhotoLayout).observe(textCol);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
