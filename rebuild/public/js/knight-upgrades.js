(function () {
  "use strict";

  var CONFIG = {
    phoneDisplay: "(727) 285-8132",
    phoneTel: "+17272858132",
    bookingUrl:
      "https://bookit.dentrixascend.com/soe/new/dental?pid=ASC2000000000940&mode=externalLink",
  };

  function buildLeadFormHtml() {
    return (
      '<section class="cw-lead-strip" id="request-appointment">' +
      '<div class="cw-lead-strip__grid">' +
      "<div>" +
      "<h2>Request an Appointment</h2>" +
      "<p>Call us at <a href=\"tel:" +
      CONFIG.phoneTel +
      '" style="color:#fff;font-weight:700">' +
      CONFIG.phoneDisplay +
      "</a> or send a message — our team responds quickly.</p>" +
      '<p><a href="' +
      CONFIG.bookingUrl +
      '" target="_blank" rel="noopener noreferrer" style="color:#f5d4a8;font-weight:700">Book online with Dentrix →</a></p>' +
      "</div>" +
      '<form class="cw-lead-form" data-cw-lead-form action="#" method="post">' +
      "<label>Name<input name=\"name\" type=\"text\" required autocomplete=\"name\"></label>" +
      "<label>Phone<input name=\"phone\" type=\"tel\" required autocomplete=\"tel\"></label>" +
      "<label>Email<input name=\"email\" type=\"email\" autocomplete=\"email\"></label>" +
      '<label>How can we help?<textarea name="message" rows="3" placeholder="Cleaning, emergency, cosmetic consult…"></textarea></label>' +
      '<button type="submit">Send Request</button>' +
      '<p class="cw-lead-form__note">Please do not include medical details. For emergencies, call ' +
      CONFIG.phoneDisplay +
      ".</p>" +
      "</form>" +
      "</div>" +
      "</section>"
    );
  }

  function injectLeadForm() {
    if (document.querySelector(".cw-lead-strip")) return;
    if (document.body.classList.contains("dm-home-page")) return;

    var path = location.pathname.toLowerCase();
    var shouldInject =
      document.querySelector(".dmInnerPage") &&
      /emergency|meet-the-team|cosmetic|implant|invisalign|therapy-dog|about|clearwater-dentist|services|dentist-clearwater|family-dentist|sedation|root-canal|whitening|veneers|crowns|bridges|dentures|periodont|wisdom|pediatric|senior|new-patient|contact/i.test(
        path
      );

    if (!shouldInject) return;

    var html = buildLeadFormHtml();
    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    var section = wrap.firstElementChild;

    var inner = document.querySelector(".dmInnerPage");
    var rows = inner ? inner.querySelectorAll(".dmRespRow") : [];
    var insertAfter = null;

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var hasBg = (row.getAttribute("style") || "").includes("background-image");
      var isTall =
        row.classList.contains("hasBackgroundOverlay") ||
        row.classList.contains("fullBleedMode");
      if (isTall && !hasBg && row.textContent.trim().length < 80) {
        insertAfter = row;
        break;
      }
    }

    if (insertAfter && insertAfter.parentNode) {
      insertAfter.parentNode.insertBefore(section, insertAfter.nextSibling);
    } else if (inner) {
      inner.prepend(section);
    }

    var form = section.querySelector("[data-cw-lead-form]");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(form);
        var msg =
          "Thanks! We'll contact you soon at " +
          (fd.get("phone") || "the number provided") +
          ".";
        form.innerHTML =
          '<p style="color:#fff;font-weight:700;padding:1rem 0">' + msg + "</p>";
      });
    }
  }

  function normalizeBookingLinks() {
    document.querySelectorAll('a[href*="getweave"]').forEach(function (a) {
      a.href = CONFIG.bookingUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    normalizeBookingLinks();
    injectLeadForm();
  });
})();
