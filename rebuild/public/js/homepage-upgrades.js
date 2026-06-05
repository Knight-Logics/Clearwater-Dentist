(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
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
