import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "site-config.json"), "utf8")
);

const SOCIAL_LINKS = [
  { href: "https://facebook.com/Clearwaterdentist/", label: "facebook", className: "dmSocialFacebook dm-social-icons-facebook" },
  { href: "https://instagram.com/clearwaterdentist", label: "instagram", className: "dmSocialInstagram dm-social-icons-instagram" },
  { href: "https://youtube.com/Clearwater_Dentist", label: "youtube", className: "dmSocialYoutube dm-social-icons-youtube" },
  { href: "https://pinterest.com/clearwater_dentist", label: "pinterest", className: "dmSocialPinterest icon-pinterest" },
  { href: "https://www.tiktok.com/@clearwaterdentist", label: "tiktok", className: "dmSocialTiktok dm-social-icons-tiktok" },
];

/** Duplicate / legacy homepage rows to remove */
const REMOVE_HOME_ROWS = [
  "1072143702",
  "1748548572",
  "1711636777",
  "1062403903",
  "1481910915",
  "1529605023",
  "1677171215", // duplicate "Welcome to Clearwater Dentist" intro block
  "1200127636", // "Call Now to Book Your Appointment" navy CTA block
];

function socialIconsHtml(styleClass = "style3") {
  return SOCIAL_LINKS.map(
    (s) =>
      `<a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">` +
      `<span class="${s.className} oneIcon socialHubIcon ${styleClass}" aria-hidden="true"></span></a>`
  ).join("\n");
}

function heroPanelsInnerHtml() {
  return `<div class="cw-hero-panels-wrap">
  <div class="cw-hero-panel cw-hero-panel--form">
    <p class="cw-hero-panel__eyebrow">Same-day emergencies welcome</p>
    <h2 class="cw-hero-panel__title">Request an Appointment</h2>
    <form class="cw-hero-form" data-cw-hero-form action="#" method="post">
      <input name="name" type="text" placeholder="Your name" required autocomplete="name">
      <input name="phone" type="tel" placeholder="Phone" required autocomplete="tel">
      <input name="email" type="email" placeholder="Email (optional)" autocomplete="email">
      <button type="submit" class="cw-hero-form__submit">Send Request</button>
    </form>
    <p class="cw-hero-panel__fine">Or call <a href="tel:${CONFIG.phoneTel}">${CONFIG.phoneDisplay}</a></p>
  </div>
  <div class="cw-hero-panel cw-hero-panel--offer">
    <p class="cw-hero-panel__eyebrow">New patients</p>
    <h2 class="cw-hero-panel__title">Free Consultation*</h2>
    <p class="cw-hero-panel__fine cw-hero-panel__fine--disclaimer">*One per person. Cannot be combined with other offers.</p>
    <ul class="cw-hero-panel__checks">
      <li>Book online in under 2 minutes</li>
      <li>Same-day &amp; emergency visits welcome</li>
      <li>Anti-anxiety care &amp; therapy dogs</li>
      <li>Flexible financing options available</li>
    </ul>
    <a class="cw-btn cw-btn--primary cw-hero-panel__cta" href="${CONFIG.bookingUrl}" target="_blank" rel="noopener noreferrer"><span class="cw-btn__label">Book Appointment</span></a>
  </div>
</div>`;
}

function unifiedHeroHtml() {
  return `<div class="dmRespColsWrapper" id="1592745827">
  <div class="u_1772677688 dmRespCol small-12 medium-12 large-12 cw-hero-unified-col" id="1772677688">
    <div class="cw-hero-unified">
      <div class="cw-hero-unified__shell">
        <div class="cw-hero-unified__intro">
          <h1 class="cw-hero-welcome cw-welcome-glimmer">Welcome to the Office of Dr. Nadia</h1>
          <p class="cw-hero-smile cw-smile-glimmer">You Deserve a Beautiful Smile</p>
          <p class="cw-hero-unified__title cw-sr-only">Clearwater Dentist</p>
        </div>
        <div class="u_1040893572 dmRespRow cw-hero-unified__panels-row" id="1040893572">
          ${heroPanelsInnerHtml()}
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function demoteExtraH1($) {
  $("h1").each((_, el) => {
    const $h = $(el);
    if ($h.hasClass("cw-hero-welcome") || $h.hasClass("cw-sr-only")) return;
    const $replacement = $("<h2></h2>")
      .html($h.html() || "")
      .attr("class", `${$h.attr("class") || ""} cw-demoted-h1`.trim());
    $h.replaceWith($replacement);
  });
}

export function upgradeHomepage($) {
  $("#1277585000").remove();

  for (const id of REMOVE_HOME_ROWS) {
    $(`#${id}`).remove();
  }

  /* Single video hero — all viewports */
  const primaryHero = $("#1300582767");
  if (primaryHero.length) {
    primaryHero.removeClass("hide-for-small hide-for-medium");
    primaryHero.find("> .dmRespColsWrapper").first().replaceWith(unifiedHeroHtml());
  }

  /* Move Google reviews directly under hero */
  const reviews = $("#1619377659").first();
  if (reviews.length && primaryHero.length) {
    const moved = reviews.clone();
    reviews.remove();
    primaryHero.after(moved);
  }

  /* Header + footer social — full icon set */
  $(".dmSocialHub .socialHubInnerDiv, .u_1467801161 .socialHubInnerDiv").each((_, el) => {
    const style = $(el).find(".socialHubIcon").first().attr("class")?.match(/style\d+/)?.[0] || "style3";
    $(el).html(socialIconsHtml(style));
  });

  demoteExtraH1($);

  $("body").addClass("cw-home-v2");
}

export function injectDesignFonts($) {
  const head = $("head");
  if (head.find('link[data-cw-fonts="1"]').length) return;
  head.append('<link rel="preconnect" href="https://fonts.googleapis.com" data-cw-fonts="1">');
  head.append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin data-cw-fonts="1">');
  head.append(
    '<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam:wght@400;500;600;700&family=Epilogue:wght@600;700&display=swap" rel="stylesheet" data-cw-fonts="1">'
  );
}

const DESIGN_CSS = [
  "/css/design-system.css",
  "/css/cw-header.css",
  "/css/typography-fx.css",
];

export function injectDesignAssets($, { homepage = false } = {}) {
  injectDesignFonts($);
  const head = $("head");

  for (const href of DESIGN_CSS) {
    if (!head.find(`link[href*="${path.basename(href)}"]`).length) {
      head.append(`<link rel="stylesheet" href="${href}" data-cw-upgrade="1">`);
    }
  }

  if (homepage && !head.find('link[href*="homepage-upgrades.css"]').length) {
    head.append(
      '<link rel="stylesheet" href="/css/homepage-upgrades.css" data-cw-upgrade="1">'
    );
  }

  if (homepage && !$('script[src*="homepage-upgrades.js"]').length) {
    $("body").append(
      '<script src="/js/homepage-upgrades.js" defer data-cw-upgrade="1"></script>'
    );
  }

  $("html").addClass("clearwater-replica");
  $("body").addClass("cw-design-v2");
}
