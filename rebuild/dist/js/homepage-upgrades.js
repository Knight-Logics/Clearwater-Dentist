(function () {
  "use strict";

  function syncMapRowHeights() {
    var row = document.querySelector("[data-cw-map-row]");
    if (!row) return;

    var mapCard = row.querySelector(".map-card");
    var photo = row.querySelector("[data-cw-map-photo]");
    if (!mapCard || !photo) return;

    function apply() {
      var height = Math.round(mapCard.getBoundingClientRect().height);
      if (height > 0) {
        photo.style.minHeight = height + "px";
      }
    }

    apply();

    if (typeof ResizeObserver !== "undefined") {
      var observer = new ResizeObserver(apply);
      observer.observe(mapCard);
      observer.observe(photo);
    }

    window.addEventListener("resize", apply);
    row.querySelector(".map-card iframe")?.addEventListener("load", apply);
  }

  document.addEventListener("DOMContentLoaded", function () {
    syncMapRowHeights();

    document.querySelectorAll("[data-cw-hero-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(form);
        var phone = fd.get("phone") || "you";
        form.innerHTML =
          '<p class="cw-hero-panel__fine" style="padding:0.75rem 0;font-weight:700;color:#0f3f55">Thanks! We\'ll contact ' +
          phone +
          " shortly.</p>";
      });
    });
  });
})();
