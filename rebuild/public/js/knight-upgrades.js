(function () {
  "use strict";

  var CONFIG = {
    phoneDisplay: "(727) 285-8132",
    phoneTel: "+17272858132",
    bookingUrl:
      "https://bookit.dentrixascend.com/soe/new/dental?pid=ASC2000000000940&mode=externalLink",
    googleReviewUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJddsi0kbuwogRVbiZCHZSQ3s",
    reviews: [
      {
        name: "Verified Google Patient",
        text:
          "I have a fear of dentists due to past experiences. The doctor was very nice and knowledgeable, explaining everything and making me feel comfortable. Lyndsay the hygienist was absolutely amazing — gentle, patient, and thorough.",
        stars: 5,
      },
      {
        name: "Dennis C.",
        text:
          "Several damaged and missing teeth repaired with natural-looking crowns and bridges. After restoring the foundation, they brightened my smile with professional whitening.",
        stars: 5,
      },
      {
        name: "Jackie A.",
        text:
          "My smile was rebuilt with crowns, bridges, and fillings. Extractions and deep cleanings supported long-term health. Every restoration looks natural and feels comfortable.",
        stars: 5,
      },
      {
        name: "Susan C.",
        text:
          "Multiple teeth restored with natural-looking crowns. Each crown was custom-shaped and color-matched for a consistent, confident look.",
        stars: 5,
      },
    ],
  };

  function stars(n) {
    return "★★★★★".slice(0, n);
  }

  function buildReviewsHtml() {
    var cards = CONFIG.reviews
      .map(function (r) {
        return (
          '<article class="cw-reviews__card">' +
          "<strong>" +
          r.name +
          "</strong>" +
          '<div class="cw-reviews__stars" aria-hidden="true">' +
          stars(r.stars) +
          "</div>" +
          "<p>" +
          r.text +
          "</p>" +
          "</article>"
        );
      })
      .join("");

    return (
      '<section class="cw-reviews" aria-label="Patient reviews">' +
      '<div class="cw-reviews__head">' +
      "<h2>What Our Patients Say</h2>" +
      '<div class="cw-reviews__stars">★★★★★ Google Reviews</div>' +
      "</div>" +
      '<div class="cw-reviews__track-wrap">' +
      '<div class="cw-reviews__track" data-cw-track>' +
      cards +
      "</div>" +
      "</div>" +
      '<div class="cw-reviews__nav">' +
      '<button type="button" data-cw-prev aria-label="Previous reviews">‹</button>' +
      '<button type="button" data-cw-next aria-label="Next reviews">›</button>' +
      "</div>" +
      '<p class="cw-reviews__cta"><a href="' +
      CONFIG.googleReviewUrl +
      '" target="_blank" rel="noopener noreferrer">Read more reviews on Google →</a></p>' +
      "</section>"
    );
  }

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

  function injectReviews() {
    if (document.querySelector(".cw-reviews")) return;

    var isHome =
      document.body.classList.contains("dm-home-page") ||
      location.pathname === "/" ||
      /\/index\.html?$/.test(location.pathname) ||
      location.pathname.endsWith("/Clearwater-Dentist/");

    var isKeyService =
      /emergency|cosmetic|implant|invisalign|meet-the-team|about|therapy-dog|clearwater-dentist/i.test(
        location.pathname
      );

    if (!isHome && !isKeyService) return;

    var html = buildReviewsHtml();
    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    var section = wrap.firstElementChild;

    var main =
      document.querySelector("#dmContent, .dmContent, main, .dmBody") ||
      document.body;

    if (isHome) {
      var gallery = document.querySelector(
        '[class*="photo_gallery"], [class*="PhotoGallery"], .dmPhotoGallery'
      );
      var target =
        gallery && gallery.closest(".dmRespRow")
          ? gallery.closest(".dmRespRow")
          : main.querySelector(".dmRespRow:nth-of-type(3)");
      if (target && target.parentNode) {
        target.parentNode.insertBefore(section, target);
      } else {
        main.prepend(section);
      }
    } else {
      var hero = main.querySelector(
        ".dmInnerPage .dmRespRow, .dmInnerPage .dmRespCol"
      );
      if (hero && hero.parentNode) {
        hero.parentNode.insertBefore(section, hero.nextSibling);
      } else {
        main.prepend(section);
      }
    }

    initCarousel(section);
  }

  function initCarousel(root) {
    var track = root.querySelector("[data-cw-track]");
    if (!track) return;
    var cards = track.querySelectorAll(".cw-reviews__card");
    if (cards.length <= 1) return;

    var index = 0;
    var perView = window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
    var max = Math.max(0, cards.length - perView);

    function update() {
      perView = window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
      max = Math.max(0, cards.length - perView);
      if (index > max) index = max;
      var pct = (100 / perView) * index;
      track.style.transform = "translateX(-" + pct + "%)";
    }

    root.querySelector("[data-cw-prev]")?.addEventListener("click", function () {
      index = index <= 0 ? max : index - 1;
      update();
    });
    root.querySelector("[data-cw-next]")?.addEventListener("click", function () {
      index = index >= max ? 0 : index + 1;
      update();
    });
    window.addEventListener("resize", update);
    update();
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
    injectReviews();
    injectLeadForm();
  });
})();
