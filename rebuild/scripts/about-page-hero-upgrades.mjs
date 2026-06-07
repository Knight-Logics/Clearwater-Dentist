const CDN = "/cdn/lirp/a227a250/dms3rep/multi/opt";

const FRONT_OFFICE =
  `${CDN}/clearwater-dentist-clearwater-fl-front--staff-1920w.jpg`;
const BARBIE_DOG = `${CDN}/clearwater-dentist-clearwater-fl-dog-Barbie-1920w.jpg`;
const BARBIE_SCREENSHOT = `${CDN}/Screenshot+2026-01-26+at+3.32.16-PM-1920w.png`;
const OFFICE_RENDER = `${CDN}/Copilot_20250924_161802-1920w.png`;
const SEDATION_CALM = `${CDN}/Sedation+Dentist.v2.0000000-1920w.jpg`;
const OFFICE_GALLERY = `${CDN}/2+copy-1920w.png`;
const NADIA_WITH_DOG = `${CDN}/ClearwaterDentist.ClearwaterFlorida.Dr.Nadia.Lady.in.front.of.food.truck.and.a.dog-1920w.jpeg`;

const PAGE_CONFIGS = {
  "meet-the-team": {
    relPath: "meet-the-team/index.html",
    bodyClass: "cw-about-hero-v2--meet-team",
    heroId: "cw-meet-team-page-hero",
    titleId: "cw-meet-team-title",
    heroRowId: "1655223790",
    title: "Meet The Team",
    subtitle:
      "The caring professionals who make every visit feel personal at Clearwater Dentist.",
    cta: { href: "/contact-us", text: "Book Now" },
    desktopPanels: [
      {
        pos: "left",
        src: `${CDN}/Clearwater-Dentists-Clearwater-FL-Ana-Yepez-736d609b-1920w.png`,
        focus: "center 18%",
        alt: "Ana Yepez — Lead Receptionist",
      },
      {
        pos: "bottom",
        src: `${CDN}/Untitled+design+%289%29-1920w.png`,
        focus: "center 22%",
        alt: "Jonathan Arn — Office Manager",
      },
      {
        pos: "top",
        src: `${CDN}/Clearwater-Dentists-Clearwater-FL-Jordyn-Stoneberg-06e4318b-1920w.png`,
        focus: "center 20%",
        alt: "Jordyn Stoneberg — Marketing Director",
      },
      {
        pos: "right",
        src: `${CDN}/Clearwater-Dentists-Clearwater-FL-Mikayla-Macchi-174c5509-1920w.png`,
        focus: "center 18%",
        alt: "Mikayla Macchi — Scheduling Coordinator",
      },
    ],
    mobilePanels: [
      {
        pos: "left",
        src: `${CDN}/IMG_0883-1456c474-1920w.jpg`,
        focus: "center 22%",
        alt: "Martha Morales — Periodontal Therapist",
      },
      {
        pos: "bottom",
        src: `${CDN}/Untitled+design-1920w.png`,
        focus: "center 22%",
        alt: "Katya Tkachenko — Lead Dental Assistant",
      },
    ],
  },
  "anti-anxiety-dentist-office": {
    relPath: "anti-anxiety-dentist-office/index.html",
    bodyClass: "cw-about-hero-v2--anti-anxiety",
    heroId: "cw-anti-anxiety-page-hero",
    titleId: "cw-anti-anxiety-title",
    heroRowId: "1243667655",
    title: "Anti-Anxiety Dentist Office in Clearwater",
    wrapTitle: true,
    subtitle:
      "A light-filled, open-concept dental studio in Clearwater designed for your comfort and your confidence.",
    cta: { href: "tel:+17272858132", text: "Book Your Calm Consultation" },
    desktopPanels: [
      {
        pos: "left",
        src: OFFICE_RENDER,
        focus: "center 42%",
        alt: "Bright, open Clearwater Dentist office",
      },
      {
        pos: "bottom",
        src: FRONT_OFFICE,
        focus: "center 20%",
        alt: "Welcoming Clearwater Dentist front desk",
      },
      {
        pos: "top",
        src: SEDATION_CALM,
        focus: "center 24%",
        alt: "Calm sedation dentistry at Clearwater Dentist",
      },
      {
        pos: "right",
        src: BARBIE_SCREENSHOT,
        focus: "center 30%",
        alt: "Barbie, therapy dog comfort ambassador",
      },
    ],
    mobilePanels: [
      {
        pos: "left",
        src: BARBIE_DOG,
        focus: "center 28%",
        alt: "Barbie, therapy dog comfort ambassador",
      },
      {
        pos: "bottom",
        src: SEDATION_CALM,
        focus: "center 22%",
        alt: "Gentle sedation dentistry for anxious patients",
      },
    ],
  },
  "dental-therapy-dogs-clearwater-fl": {
    relPath: "dental-therapy-dogs-clearwater-fl/index.html",
    bodyClass: "cw-about-hero-v2--therapy-dogs",
    heroId: "cw-therapy-dogs-page-hero",
    titleId: "cw-therapy-dogs-title",
    heroRowId: "1336524917",
    title: "Dental Therapy Dogs at Clearwater, FL",
    subtitle:
      "Trained comfort companions who help kids and adults feel calm, safe, and cared for.",
    cta: {
      href: "https://bookit.dentrixascend.com/soe/new/dental?pid=ASC2000000000940&mode=externalLink",
      text: "Book Now",
      external: true,
    },
    desktopPanels: [
      {
        pos: "left",
        src: BARBIE_DOG,
        focus: "center 28%",
        alt: "Barbie, lead therapy dog",
      },
      {
        pos: "bottom",
        src: `${CDN}/clearwater-dentist-clearwater-fl-therapy-dog-1-1920w.png`,
        focus: "center 30%",
        alt: "Therapy dog with patient",
      },
      {
        pos: "top",
        src: `${CDN}/clearwater-dentist-clearwater-fl-therapy-dog-2-1920w.png`,
        focus: "center 32%",
        alt: "Therapy dog at Clearwater Dentist",
      },
      {
        pos: "right",
        src: NADIA_WITH_DOG,
        focus: "center 32%",
        alt: "Dr. Nadia Pokrovskaya with therapy dog",
      },
    ],
    mobilePanels: [
      {
        pos: "left",
        src: BARBIE_DOG,
        focus: "center 28%",
        alt: "Barbie, lead therapy dog",
      },
      {
        pos: "bottom",
        src: `${CDN}/clearwater-dentist-clearwater-fl-therapy-dog-3-1920w.png`,
        focus: "center 30%",
        alt: "Therapy dog comforting a patient",
      },
    ],
  },
};

function panelHtml({ pos, src, focus, alt }) {
  return `<div class="cw-about-hero__panel cw-about-hero__panel--${pos}"><img src="${src}" alt="${alt}" loading="eager" decoding="async" style="object-position:${focus}"></div>`;
}

function ctaHtml(cta) {
  if (!cta) return "";
  const rel = cta.external ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a class="cw-about-hero__cta" href="${cta.href}"${rel}>${cta.text}</a>`;
}

function heroSectionHtml(config) {
  const desktop = config.desktopPanels.map(panelHtml).join("");
  const mobile = config.mobilePanels.map(panelHtml).join("");
  const titleClass = config.wrapTitle
    ? "cw-about-hero__title cw-about-hero__title--wrap cw-about-hero-glimmer"
    : "cw-about-hero__title cw-about-hero-glimmer";
  return `<section class="cw-page-hero-gallery cw-about-page-hero cw-about-hero ${config.bodyClass}" id="${config.heroId}"><div class="cw-about-hero__bg cw-about-hero__bg--grid cw-about-hero__bg--desktop" aria-hidden="true">${desktop}</div><div class="cw-about-hero__bg cw-about-hero__bg--grid cw-about-hero__bg--mobile" aria-hidden="true">${mobile}</div><div class="cw-about-hero__overlay" aria-hidden="true"></div><div class="cw-about-hero__content"><h1 class="${titleClass}" id="${config.titleId}" data-cw-hero-title="1">${config.title}</h1><p class="cw-about-hero__subtitle">${config.subtitle}</p>${ctaHtml(config.cta)}</div></section>`;
}

function stripDudaHeroRowStyles($, heroRowId) {
  const scrubCss = (css) => {
    let cleaned = css.replace(
      new RegExp(
        `(?:\\*#dm \\*\\.dmBody div\\.|#dm \\.dmBody div\\.|div\\.)?u_${heroRowId}\\s*\\{[^}]*\\}`,
        "g"
      ),
      ""
    );
    return cleaned;
  };

  $("style").each((_, el) => {
    const css = $(el).html() || "";
    const cleaned = scrubCss(css);
    if (cleaned !== css) {
      $(el).html(cleaned);
    }
  });
}

/** Duda exports desktop absolute positioning into global CSS — breaks mobile layout. */
function scrubDudaAntiAnxietyLayoutCss(css) {
  return css
    .replace(
      /width:\s*calc\(100%\s*-\s*\d+(?:\.\d+)?px\)\s*!important/gi,
      "width:100% !important"
    )
    .replace(/margin-left:\s*\d+(?:\.\d+)?px\s*!important/gi, "margin-left:0 !important")
    .replace(/margin-right:\s*\d+(?:\.\d+)?px\s*!important/gi, "margin-right:0 !important")
    .replace(
      /margin-top:\s*(?:[1-9]\d|\d{3,})(?:\.\d+)?px\s*!important/gi,
      "margin-top:0 !important"
    )
    .replace(
      /max-width:\s*\d+(?:\.\d+)?px\s*!important/gi,
      "max-width:100% !important"
    )
    .replace(
      /padding-top:\s*(?:[3-9]\d|\d{3,})(?:\.\d+)?px\s*!important/gi,
      "padding-top:0 !important"
    )
    .replace(
      /padding-bottom:\s*(?:[3-9]\d|\d{3,})(?:\.\d+)?px\s*!important/gi,
      "padding-bottom:0 !important"
    )
    .replace(/min-width:\s*25px\s*!important/gi, "min-width:0 !important");
}

function stripAntiAnxietyDudaLayout($) {
  $("style").each((_, el) => {
    const css = $(el).html() || "";
    if (!css.includes("dmBody") && !css.includes("u_")) return;
    const cleaned = scrubDudaAntiAnxietyLayoutCss(css);
    if (cleaned !== css) {
      $(el).html(cleaned);
    }
  });

  const content = $('[id="1716942098"]');
  if (!content.length) return;

  content.find("[style]").each((_, el) => {
    const $el = $(el);
    let style = $el.attr("style") || "";
    style = style
      .replace(/line-height:\s*2;?/gi, "line-height:1.5;")
      .replace(/text-align:\s*left;?/gi, "")
      .replace(/display:\s*block;?/gi, "")
      .replace(/transition:[^;]+;?/gi, "")
      .replace(/;\s*;/g, ";")
      .trim();
    if (style) $el.attr("style", style);
    else $el.removeAttr("style");
  });

  content.find("img[width]").each((_, el) => {
    $(el).removeAttr("width").removeAttr("height");
  });
}

function fixAntiAnxietyViewport($) {
  $('meta[name="viewport"], meta#view[name="viewport"]').attr(
    "content",
    "width=device-width, initial-scale=1, viewport-fit=cover"
  );
}

function neutralizeAntiAnxietyGlobalFontSizes($) {
  const gfs = $("#globalFontSizeStyle");
  if (!gfs.length) return;
  let css = gfs.html() || "";
  css = css
    .replace(/\.font-size-24[^{]*\{[^}]*\}/g, "")
    .replace(/\.size-24[^{]*\{[^}]*\}/g, "")
    .replace(/\.m-font-size-19[^{]*\{[^}]*\}/g, "")
    .replace(/\.m-size-19[^{]*\{[^}]*\}/g, "");
  gfs.html(css);
}

function fixAntiAnxietyHeadDevice($) {
  $("script").each((_, el) => {
    const src = $(el).html() || "";
    if (!src.includes("window._currentDevice = 'desktop'")) return;
    $(el).html(
      src.replace(
        "window._currentDevice = 'desktop';",
        "window._currentDevice=window.matchMedia('(max-width:767px)').matches?'mobile':'desktop';"
      )
    );
  });
}

function tagAntiAnxietyContentRoot($) {
  const content = $('[id="1716942098"]');
  if (!content.length) return;
  content.addClass("cw-ax-content");
}

function injectAntiAnxietyMobileBootstrap($) {
  fixAntiAnxietyViewport($);
  neutralizeAntiAnxietyGlobalFontSizes($);
  fixAntiAnxietyHeadDevice($);
  tagAntiAnxietyContentRoot($);
  $("#cw-anti-anxiety-late-fix").remove();
  $('body link[href*="anti-anxiety-page.css"]').remove();

  const bootstrap = `(function(){var m=window.matchMedia("(max-width:767px)").matches,e=document.documentElement,b=document.body;e.classList.toggle("cw-ax-mobile",m);if(b){b.classList.toggle("dmMobileBody",m);b.classList.toggle("dmDesktopBody",!m);}window._currentDevice=m?"mobile":"desktop";})();`;

  if (!$("#cw-anti-anxiety-bootstrap").length) {
    $("head").append(
      `<script id="cw-anti-anxiety-bootstrap" data-cw-upgrade="instant">${bootstrap}</script>`
    );
  }

  if (!$('head link[href*="anti-anxiety-page.css"]').length) {
    $("head").append(
      '<link rel="stylesheet" href="/css/anti-anxiety-page.css" data-cw-upgrade="1">'
    );
  }
}

function prepareAboutPageShell($) {
  $("#stickyHeaderSpacer").remove();
  $("#site_content > .p_hfcontainer").remove();
  const siteContentInner = $("#site_content .site_content").first();
  if (siteContentInner.length) {
    siteContentInner
      .children()
      .not("#dmFirstContainer, .dmFooterContainer, #1831196333")
      .remove();
  }
  $("#dm-outer-wrapper").removeClass(
    "hasStickyHeader inMiniHeaderMode dmFreeHeader stickyHeaderFix"
  );
}

function upgradeAboutPageHero($, pageAlias) {
  const config = PAGE_CONFIGS[pageAlias];
  if (!config) return false;

  const isPage =
    ($("body").attr("data-page-alias") || "") === pageAlias ||
    $(`#${config.heroRowId}`).length > 0;
  if (!isPage) return false;

  stripDudaHeroRowStyles($, config.heroRowId);
  if (pageAlias === "anti-anxiety-dentist-office") {
    stripAntiAnxietyDudaLayout($);
  }
  prepareAboutPageShell($);
  $(`#${config.heroRowId}`).remove();
  $(`#${config.heroId}`).remove();

  const insertAfter = $("#cw-mobile-nav").last().length
    ? $("#cw-mobile-nav").last()
    : $("#cw-site-header").first();

  if (insertAfter.length) {
    insertAfter.after(heroSectionHtml(config));
  } else {
    $("body").prepend(heroSectionHtml(config));
  }

  $('[id="1716942098"]').removeAttr("style").addClass("cw-ax-content");
  $("#dm_content").removeAttr("style");
  $("#allWrapper").removeAttr("style");

  $("body").addClass("cw-about-hero-v2").addClass(config.bodyClass);

  if (pageAlias === "anti-anxiety-dentist-office") {
    injectAntiAnxietyMobileBootstrap($);
  }

  if (!$('script[src*="about-page-hero-upgrades.js"]').length) {
    $("body").append(
      '<script src="/js/about-page-hero-upgrades.js" defer data-cw-upgrade="1"></script>'
    );
  }

  return true;
}

export function upgradeAboutPageHeros($, relPath = "") {
  let upgraded = false;
  for (const pageAlias of Object.keys(PAGE_CONFIGS)) {
    if (relPath && PAGE_CONFIGS[pageAlias].relPath !== relPath) continue;
    if (upgradeAboutPageHero($, pageAlias)) upgraded = true;
  }
  return upgraded;
}

export const ABOUT_HERO_REL_PATHS = Object.values(PAGE_CONFIGS).map(
  (cfg) => cfg.relPath
);
