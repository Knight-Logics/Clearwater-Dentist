const CDN = "/cdn/lirp/a227a250/dms3rep/multi/opt";

/* Distinct Dr. Nadia shots — studio portrait, interview still, testimony still, community */
const DESKTOP_PANELS = [
  {
    pos: "left",
    src: `${CDN}/clearwater-dentist-clearwater-fl-dr-nadia-pokrovskaya-2-739bdcb2-1920w.jpg`,
    focus: "center 12%",
    alt: "Dr. Nadia Pokrovskaya portrait",
  },
  {
    pos: "bottom",
    src: `${CDN}/E3MSq9uRTaHssy3tQ3Kg_Dr+Nadia+Interview+2024+Edited.v2.0000000-1920w.jpg`,
    focus: "center 18%",
    alt: "Dr. Nadia Pokrovskaya interview",
  },
  {
    pos: "top",
    src: `${CDN}/clearwater-dentist-clearwater-fl-front--staff-1920w.jpg`,
    focus: "center 18%",
    alt: "Clearwater Dentist front office with Dr. Nadia Pokrovskaya",
  },
  {
    pos: "right",
    src: `${CDN}/ClearwaterDentist.ClearwaterFlorida.Dr.Nadia.Lady.in.front.of.food.truck.and.a.dog-1920w.jpeg`,
    focus: "center 32%",
    alt: "Dr. Nadia Pokrovskaya with therapy dog",
  },
];

const MOBILE_PANELS = [
  {
    pos: "left",
    src: `${CDN}/UrpldxkQiWFQgZNLUJv4_Clearwater+Dentistry-Dr.+Nadia-2024+Testimony+Video+Edited+2.v2.0000000-1920w.jpg`,
    focus: "center 22%",
    alt: "Dr. Nadia Pokrovskaya patient testimony",
  },
  {
    pos: "bottom",
    src: `${CDN}/clearwater-dentist-clearwater-fl-dr-nadia-pokrovskaya-2-739bdcb2-1920w.jpg`,
    focus: "center 12%",
    alt: "Dr. Nadia Pokrovskaya portrait",
  },
];

function panelHtml({ pos, src, focus, alt = "Dr. Nadia Pokrovskaya" }) {
  return `<div class="cw-meet-doctor-hero__panel cw-meet-doctor-hero__panel--${pos}"><img src="${src}" alt="${alt}" loading="eager" decoding="async" style="object-position:${focus}"></div>`;
}

function heroSectionHtml() {
  return `<section class="cw-page-hero-gallery cw-meet-doctor-page-hero cw-meet-doctor-hero" id="cw-meet-doctor-page-hero"><div class="cw-meet-doctor-hero__bg cw-meet-doctor-hero__bg--grid cw-meet-doctor-hero__bg--desktop" aria-hidden="true">${DESKTOP_PANELS.map(panelHtml).join("")}</div><div class="cw-meet-doctor-hero__bg cw-meet-doctor-hero__bg--grid cw-meet-doctor-hero__bg--mobile" aria-hidden="true">${MOBILE_PANELS.map(panelHtml).join("")}</div><div class="cw-meet-doctor-hero__overlay" aria-hidden="true"></div><div class="cw-meet-doctor-hero__content"><h1 class="cw-meet-doctor-hero__title"><span class="cw-meet-doctor-glimmer" id="cw-meet-doctor-title">Meet Dr. Nadia Pokrovskaya, D.M.D</span></h1><p class="cw-meet-doctor-hero__subtitle">Concierge dentistry with an artistic touch — serving Clearwater, FL and Tampa Bay.</p></div></section>`;
}

const BIO_PHOTO_SRC = `${CDN}/clearwater-dentist-clearwater-fl-dr-nadia-pokrovskaya-95753606-42cce6b4-739h.jpg`;

function bioPhotoHtml() {
  return `<img class="cw-meet-doctor-bio-photo" src="${BIO_PHOTO_SRC}" alt="Dr. Nadia Pokrovskaya, D.M.D" loading="lazy" decoding="async">`;
}

function stripDudaHeroPageStyles($) {
  const scrubCss = (css) => {
    let cleaned = css.replace(
      /\*#dm \*\.dmBody div\.u_1942217575\s*\{[^}]*\}/g,
      ""
    );
    cleaned = cleaned.replace(
      /\*#dm \*\.dmBody div\.u_1713525553\s*\{[^}]*\}/g,
      ""
    );
    cleaned = cleaned.replace(
      /(?:\*#dm \*\.dmBody div\.|div\.)?u_1545178753\s*\{[^}]*\}/g,
      ""
    );
    cleaned = cleaned.replace(
      /(?:\*#dm \*\.dmBody div\.|div\.)?u_1018585677\s*\{[^}]*\}/g,
      ""
    );
    cleaned = cleaned.replace(
      /(?:\*#dm \*\.dmBody div\.|div\.)?u_MeetDrNadiaPokrovskaya\s*\{[^}]*\}/g,
      ""
    );
    cleaned = cleaned.replace(
      /(?:\*#dm \*\.dmBody div\.|div\.)?u_1930240602\s*\{[^}]*\}/g,
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

function upgradeBioPhotoColumn($) {
  const photoCol = $("#1018585677").first();
  if (!photoCol.length) return;

  photoCol.removeAttr("data-gallery-bg");
  photoCol.removeClass("dmSectionNoParallax");
  photoCol.removeAttr("style");
  $("#1545178753").remove();
  photoCol.empty();
  photoCol.append(bioPhotoHtml());
}

/* Turn the four intro paragraphs into a 2×2 highlight-card grid.
   The Duda markup interleaves real paragraphs with empty "&nbsp;" / "." spacers. */
function upgradeBioIntroCards($) {
  const intro = $("#1352914219").first();
  if (!intro.length) return;

  intro.children("p").each((_, p) => {
    const $p = $(p);
    const txt = ($p.text() || "").replace(/\u00a0/g, " ").trim();
    if (txt === "" || txt === ".") {
      $p.remove();
    }
  });

  intro.removeAttr("style");
  intro.addClass("cw-bio-cards");
}

function moveRowAfter($, $row, $anchor) {
  if (!$row.length || !$anchor.length) return;
  const anchorId = $anchor.attr("id");
  if ($row.prev().attr("id") === anchorId) return;
  const rowHtml = $.html($row);
  $row.remove();
  $anchor.after(rowHtml);
}

export function upgradeMeetTheDoctor($) {
  const isMeetPage =
    ($("body").attr("data-page-alias") || "") === "meet-the-doctor" ||
    $("#1904767910").length > 0;

  if (!isMeetPage) return;

  stripDudaHeroPageStyles($);
  $("#stickyHeaderSpacer").remove();
  $("#1942217575").remove();
  $("#1829243923").remove();

  $("#site_content > .p_hfcontainer").remove();
  const siteContentInner = $("#site_content .site_content").first();
  if (siteContentInner.length) {
    // Strip the duplicate header chrome but KEEP the page content shell, the
    // floating-widgets container, and the site footer.
    siteContentInner
      .children()
      .not("#dmFirstContainer, .dmFooterContainer, #1831196333")
      .remove();
  }
  $("#dm-outer-wrapper").removeClass(
    "hasStickyHeader inMiniHeaderMode dmFreeHeader stickyHeaderFix"
  );

  const insertAfter = $("#cw-mobile-nav").last().length
    ? $("#cw-mobile-nav").last()
    : $("#cw-site-header").first();

  $("#cw-meet-doctor-page-hero").remove();
  if (insertAfter.length) {
    insertAfter.after(heroSectionHtml());
  } else {
    $("body").prepend(heroSectionHtml());
  }

  const hero = $("#cw-meet-doctor-page-hero").first();
  let quoteRow = $("#1704507619").first();
  if (hero.length && quoteRow.length) {
    quoteRow.addClass("cw-meet-doctor-lead-quote");
    quoteRow.removeAttr("style");
    $("#1178010041").removeAttr("style");
    if (quoteRow.prev().attr("id") !== "cw-meet-doctor-page-hero") {
      moveRowAfter($, quoteRow, hero);
    }
    quoteRow = $("#1704507619").first();
  }

  // Duda shell must not reserve viewport height above the bio block.
  $("#1716942098").removeAttr("style");
  $("#dm_content").removeAttr("style");
  $("#allWrapper").removeAttr("style");
  $("#1666161237").removeAttr("style");

  upgradeBioPhotoColumn($);
  upgradeBioIntroCards($);

  const bioRow = $("#MeetDrNadiaPokrovskaya").first();
  if (bioRow.length) {
    bioRow.addClass("cw-meet-doctor-bio-row");
    bioRow.removeAttr("style");
    const bioAnchor = quoteRow.length ? quoteRow : hero;
    moveRowAfter($, bioRow, bioAnchor);
  }

  let bioRowLive = $("#MeetDrNadiaPokrovskaya").first();
  const continuationRow = $("#1930240602").first();
  if (continuationRow.length && bioRowLive.length) {
    continuationRow.addClass("cw-meet-doctor-bio-continuation");
    continuationRow.removeAttr("style");
    $("#1132997094").removeAttr("style");
    moveRowAfter($, continuationRow, bioRowLive);
  }

  // The hero/quote/bio rows were relocated to the top of the DOM, leaving the
  // Duda content shell (#dmFirstContainer) empty. Collapse it so the footer
  // that lives just below it sits flush instead of behind a tall blank gap.
  const firstContainer = $("#dmFirstContainer").first();
  if (firstContainer.length && firstContainer.text().trim().length === 0) {
    firstContainer.addClass("cw-empty-shell");
  }

  $("body").addClass("cw-meet-doctor-v2");

  if (!$('script[src*="meet-the-doctor-upgrades.js"]').length) {
    $("body").append(
      '<script src="/js/meet-the-doctor-upgrades.js" defer data-cw-upgrade="1"></script>'
    );
  }
}
