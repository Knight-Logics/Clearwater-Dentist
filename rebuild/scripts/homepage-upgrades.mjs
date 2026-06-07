import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "site-config.json"), "utf8")
);

const FEATURED_THERAPY_DOG_VIDEO =
  "/cdn/vid/a227a250/videos/Clearwater-Dentist-Featured-Video-Therapy-Dog.mp4";

/** Exact slide data mirrored from clearwaterdentist.com SSR slider (#1559410236) */
const VIDEO_CAROUSEL_SLIDES = [
  {
    title: "Clearwater Dentist",
    desc: "Why Join Clearwater Dentist?",
    href: "/office",
    video: "/cdn/vid/a227a250/videos/wzdVza5YRoG6hu70ZYqP_Office+-v.mp4",
    poster:
      "/cdn/lirp/a227a250/dms3rep/multi/opt/wzdVza5YRoG6hu70ZYqP_Office+.v2.0000000-1920w.jpg",
  },
  {
    title: "Smile Makeover",
    desc: "What is Smile Makeover?",
    href: "/smile-makeover27d8297c",
    video: "/cdn/vid/a227a250/videos/Gru61QfTnm5YOvvXSQHN_smile+makeover-v.mp4",
    poster:
      "/cdn/lirp/a227a250/dms3rep/multi/opt/Gru61QfTnm5YOvvXSQHN_smile+makeover.v2.0000000-1920w.jpg",
  },
  {
    title: "Gum Disease",
    desc: "What is Gum Disease?",
    href: "/gum-disease",
    video: "/cdn/vid/a227a250/videos/General+-v.mp4",
    poster:
      "/cdn/lirp/a227a250/dms3rep/multi/opt/General+.v2.0000000-1920w.jpg",
  },
  {
    title: "Veneers",
    desc: "How Much Are Veneers?",
    href: "/veneers",
    video: "/cdn/vid/a227a250/videos/Veneers+Dentist-v.mp4",
    poster:
      "/cdn/lirp/a227a250/dms3rep/multi/opt/Veneers+Dentist.v2.0000000-1920w.jpg",
  },
  {
    title: "Sedation",
    desc: "How We Help Reduce Anxiety",
    href: "/sedation-dentist",
    video: "/cdn/vid/a227a250/videos/Sedation+Dentist-v.mp4",
    poster:
      "/cdn/lirp/a227a250/dms3rep/multi/opt/Sedation+Dentist.v2.0000000-1920w.jpg",
  },
  {
    title: "Dogs",
    desc: "Scared Of Dentist?",
    href: "/dog",
    video: "/cdn/vid/a227a250/videos/Scared+of+the+Dentist-v.mp4",
    poster:
      "/cdn/lirp/a227a250/dms3rep/multi/opt/Scared+of+the+Dentist.v2.0000000-1920w.jpg",
  },
  {
    title: "Dental Crown",
    desc: "Do You Need a Dental Crown?",
    href: "/crown-2",
    video: "/cdn/vid/a227a250/videos/Do+You+Need+a+Dental+Crown-v.mp4",
    poster:
      "/cdn/lirp/a227a250/dms3rep/multi/opt/Do+You+Need+a+Dental+Crown.v2.0000000-1920w.jpg",
  },
];

/** Meet-the-doctor photo column on homepage (#1153740631) */
const MEET_DOCTOR_HOME_PHOTO =
  "/cdn/lirp/a227a250/dms3rep/multi/opt/clearwater-dentist-clearwater-fl-dr-nadia-pokrovskaya-2-739bdcb2-1920w.jpg";

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

function fixWhyCareHeadings($, section) {
  section.find("#1990486408").remove();

  const textHeading = section.find("#1098745619, #1407409540").first();
  if (!textHeading.length) return;

  textHeading.find("span").each((_, span) => {
    const $span = $(span);
    const text = $span.text().replace(/\s+/g, " ").trim();
    if (text === "Individualized Care") {
      $span.remove();
      return;
    }
    if (text === "With an Artistic Touch" || text === "Why Come to Clearwater Dentist?") {
      $span.text("Why Come to Clearwater Dentist?");
      $span.attr("style", "display: initial; color: var(--color_10);");
      $span.addClass("m-font-size-34 font-size-42");
    }
  });

  textHeading.find("span").each((_, span) => {
    const $span = $(span);
    if (!$span.text().replace(/\s+/g, " ").trim() && !$span.find("br").length) {
      $span.remove();
    }
  });
}

function reorganizeHomepageLayout($) {
  const existingSection = $(".cw-why-care-section#AboutUs").first();
  const headingRow = $("#1785342196");
  const videoRow = $("#1653077566");

  if (existingSection.length && !headingRow.length && !videoRow.length) {
    fixWhyCareHeadings($, existingSection);
    return;
  }

  const aboutSection = $("div.u_AboutUs#AboutUs").not(".cw-why-care-section").first();
  const desktopAboutRow = $("#1744574570");

  let textHeadingEl = desktopAboutRow.find("#1098745619").first();
  let textBodyEl = desktopAboutRow.find("#1615093046").first();
  if (!textHeadingEl.length) {
    textHeadingEl = aboutSection.find("#1098745619, #1407409540").first();
  }
  if (!textBodyEl.length) {
    textBodyEl = aboutSection.find("#1615093046").first();
  }

  if (!headingRow.length && !videoRow.length) return;

  const whyHeadingText =
    headingRow.find("#1990486408").text().replace(/\s+/g, " ").trim() ||
    "Why Come to Clearwater Dentist?";

  const section = $(
    '<div class="dmRespRow cw-why-care-section u_AboutUs" id="AboutUs" data-anchor="About Us"></div>'
  );
  const colsWrapper = $('<div class="dmRespColsWrapper cw-why-care-wrapper"></div>');
  const fullCol = $('<div class="dmRespCol small-12 medium-12 large-12"></div>');
  const grid = $('<div class="cw-why-care-grid"></div>');

  const videoCol = $('<div class="cw-why-care-video"></div>');

  const videoContent = videoRow.find("#1538174920").first();
  if (videoContent.length) {
    videoRow.find(".empty-column").remove();
    videoContent
      .removeClass("large-8 medium-8")
      .addClass("cw-why-care-video-inner large-12 medium-12");
    videoCol.append(videoContent);
  }

  const textCol = $('<div class="cw-why-care-text"></div>');
  if (textHeadingEl.length) {
    textHeadingEl.find("span").each((_, span) => {
      const $span = $(span);
      const text = $span.text().replace(/\s+/g, " ").trim();
      if (text === "Individualized Care") {
        $span.remove();
        return;
      }
      if (text === "With an Artistic Touch") {
        $span.text(whyHeadingText);
        $span.attr("style", "display: initial; color: var(--color_10);");
      }
    });
    textCol.append(textHeadingEl);
  }
  if (textBodyEl.length) {
    textBodyEl.find(".ql-cursor").remove();
    textCol.append(textBodyEl);
  }

  grid.append(videoCol);
  grid.append(textCol);
  fullCol.append(grid);
  colsWrapper.append(fullCol);
  section.append(colsWrapper);

  if (headingRow.length) {
    headingRow.replaceWith(section);
  } else if (videoRow.length) {
    videoRow.replaceWith(section);
  }

  videoRow.remove();
  aboutSection.remove();

  fixWhyCareHeadings($, section);
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

function fixHomepageButtonLabels($) {
  const buttons = [
    { link: "#1258890617", text: "#1484044619" },
    { link: "#1803396438", text: "#1816819293" },
  ];

  for (const { link, text } of buttons) {
    const $link = $(link);
    const $text = $(text);
    if (!$link.length) continue;

    $link.attr(
      "style",
      `${$link.attr("style") || ""};--btn-text-color:#fff!important;color:#fff!important;`
        .replace(/^;/, "")
    );
    if ($text.length) {
      $text.attr(
        "style",
        `${$text.attr("style") || ""};color:#fff!important;-webkit-text-fill-color:#fff!important;`
          .replace(/^;/, "")
      );
    }
  }
}

function featuredVideoBgPayload() {
  return Buffer.from(
    JSON.stringify({
      src: FEATURED_THERAPY_DOG_VIDEO,
      id: FEATURED_THERAPY_DOG_VIDEO,
      provider: "cdn",
      embed: FEATURED_THERAPY_DOG_VIDEO,
      ratio: 0.5625,
      supportBgOnMobile: true,
      supportBgLoop: true,
    })
  ).toString("base64");
}

function videoMuteButtonHtml() {
  return `<button type="button" class="cw-video-mute-toggle" aria-pressed="true" aria-label="Unmute video">
  <span class="cw-video-mute-toggle__icon cw-video-mute-toggle__off" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <line x1="23" y1="9" x2="17" y2="15"></line>
      <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>
  </span>
  <span class="cw-video-mute-toggle__icon cw-video-mute-toggle__on" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
  </span>
</button>`;
}

function videoSpotlightHtml({ eyebrow, title, intro, points, linkHref, linkLabel }) {
  const list = points.map((p) => `<li>${p}</li>`).join("");
  const link = linkHref
    ? `<a class="cw-video-spotlight__link" href="${linkHref}">${linkLabel}</a>`
    : "";
  return `<div class="cw-video-spotlight">
  <p class="cw-video-spotlight__eyebrow">${eyebrow}</p>
  <h3 class="cw-video-spotlight__title">${title}</h3>
  <p class="cw-video-spotlight__intro">${intro}</p>
  <ul class="cw-video-spotlight__points">${list}</ul>
  ${link}
</div>`;
}

function parseVideoBgSrc($col) {
  const raw = $col.attr("data-video-bg");
  if (!raw) return "";
  try {
    const data = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
    return data.src || data.embed || data.id || "";
  } catch {
    return "";
  }
}

function normalizeVideoSrc(src) {
  if (!src) return "";
  if (src.startsWith("/cdn/")) return src;

  const aliases = {
    "oMxQQ7D4RHycPqcdz2c3_2024+Edited+Patient+Testimonial+Video-v.mp4":
      "ywmR4ZpSfW700HOBQ1fQ_Julia+Patient+Testimonial-v.mp4",
  };

  try {
    const u = new URL(src);
    const name = decodeURIComponent(u.pathname.split("/videos/").pop() || "");
    const mapped = aliases[name] || name;
    const fsPath = path.join(ROOT, "dist", "cdn", "vid", "a227a250", "videos", mapped);
    if (fs.existsSync(fsPath)) {
      return `/cdn/vid/a227a250/videos/${mapped}`;
    }
  } catch {
    /* keep remote URL */
  }
  return src;
}

function carouselFullscreenBtnHtml(src, title) {
  const safeTitle = String(title || "Video").replace(/"/g, "&quot;");
  return `<button type="button" class="cw-fullscreen-btn" data-cw-modal-trigger="1" data-cw-video-src="${src}" data-cw-video-title="${safeTitle}" aria-label="Watch ${safeTitle} in full screen">
  <svg viewBox="0 0 36 36" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"></path><path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"></path><path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"></path><path d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"></path></svg>
</button>`;
}

function enhanceVideoColumn($, colId, { replaceSrc, title, removeWatchButton = false } = {}) {
  const col = $(`#${colId}`).first();
  if (!col.length) return;

  col.addClass("cw-home-video-block");
  col.find(".dmShape").remove();
  col.find(".bgExtraLayerOverlay").remove();

  if (removeWatchButton) {
    col.find("#1258890617, a.dmButtonLink[link_type=popup], a.dmButtonLink[popup_target]").remove();
  }

  const videoSrc = normalizeVideoSrc(replaceSrc || parseVideoBgSrc(col));
  const videoTitle = title || "Video";

  if (videoSrc) {
    col.find("video.videobgframe").each((_, el) => {
      const $video = $(el);
      $video.attr("src", videoSrc);
      $video.removeAttr("poster");
    });
  }

  if (!col.find(".cw-video-mute-toggle").length) {
    col.append(videoMuteButtonHtml());
  }

  if (videoSrc && !col.find(".cw-fullscreen-btn").length) {
    col.append(carouselFullscreenBtnHtml(videoSrc, videoTitle));
  }
}

/** Featured + interview video rows — summaries, mute controls, no popup overlays */
function upgradeHomepageVideoSections($) {
  const therapyCopy = videoSpotlightHtml({
    eyebrow: "Featured Video",
    title: "Therapy Dogs at Clearwater Dentist",
    intro:
      "No transcript is bundled with this clip, but it highlights our therapy dog program — the calm, friendly support that helps anxious patients feel at ease before treatment even begins.",
    points: [
      "Meet Barbie and our trained therapy dogs who greet patients with comfort and companionship",
      "Reduces dental anxiety so you can relax in a spa-like, anti-anxiety environment",
      "A signature part of the Clearwater Dentist experience — watch with sound on",
    ],
    linkHref: "/dental-therapy-dogs-clearwater-fl",
    linkLabel: "Learn about our therapy dogs",
  });

  const interviewCopy = videoSpotlightHtml({
    eyebrow: "Dr. Nadia Pokrovskaya, D.M.D",
    title: "Why She Built Clearwater Dentist",
    intro:
      "In this interview clip, Dr. Nadia shares her path from Tufts-trained Boston dentistry to opening a boutique, concierge practice in Clearwater — and why individualized, artistic care matters.",
    points: [
      "Her philosophy on gentle dentistry and helping patients smile with confidence again",
      "Building a team-focused practice rooted in compassion, precision, and patient comfort",
      "What makes Clearwater Dentist different for Tampa Bay families",
    ],
    linkHref: "/meet-the-doctor",
    linkLabel: "Read Dr. Nadia's full story",
  });

  const therapyTextCol = $("#1557923542").first();
  if (therapyTextCol.length) {
    therapyTextCol.empty().append(therapyCopy);
  }

  const interviewTextCol = $("#1328870701").first();
  if (interviewTextCol.length) {
    interviewTextCol.empty().append(interviewCopy);
  }

  enhanceVideoColumn($, "1612736229", {
    replaceSrc: FEATURED_THERAPY_DOG_VIDEO,
    title: "Therapy Dogs at Clearwater Dentist",
  });
  const therapyCol = $("#1612736229").first();
  if (therapyCol.length) {
    therapyCol.attr("data-video-bg", featuredVideoBgPayload());
    therapyCol.attr("data-video-init", "true");
  }

  enhanceVideoColumn($, "1715478901", {
    replaceSrc:
      "/cdn/vid/a227a250/videos/E3MSq9uRTaHssy3tQ3Kg_Dr+Nadia+Interview+2024+Edited-v.mp4",
    title: "Dr. Nadia Interview",
  });
}

/** Why-care + testimonial background videos — mute + fullscreen modal controls */
function upgradeWhyCareVideoColumns($) {
  enhanceVideoColumn($, "1821726643", {
    replaceSrc: "/cdn/vid/a227a250/videos/wzdVza5YRoG6hu70ZYqP_Office+-v.mp4",
    title: "Why Join Clearwater Dentist",
    removeWatchButton: true,
  });
  enhanceVideoColumn($, "1790943733", {
    replaceSrc:
      "/cdn/vid/a227a250/videos/UrpldxkQiWFQgZNLUJv4_Clearwater+Dentistry-Dr.+Nadia-2024+Testimony+Video+Edited+2-v.mp4",
    title: "Patient Testimony",
  });
  enhanceVideoColumn($, "1104982601", {
    replaceSrc:
      "/cdn/vid/a227a250/videos/ywmR4ZpSfW700HOBQ1fQ_Julia+Patient+Testimonial-v.mp4",
    title: "Patient Testimonial",
  });
}

export function upgradeBeforeAfterSliders($) {
  $(".dmBeforeAndAfter.baf__container").each((_, el) => {
    $(el).addClass("dmBeforeAndAfter--always-show cw-before-after-ready");
  });
}

export function injectBeforeAfterAssets($) {
  if (!$(".dmBeforeAndAfter").length) return;
  const head = $("head");
  if (!head.find('link[href*="cw-before-after.css"]').length) {
    head.append(
      '<link rel="stylesheet" href="/css/cw-before-after.css" data-cw-upgrade="1">'
    );
  }
  if (!$('script[src*="cw-before-after.js"]').length) {
    $("body").append(
      '<script src="/js/cw-before-after.js" defer data-cw-upgrade="1"></script>'
    );
  }
}

function ensureHomepageVideoModal($) {
  if (!$("#cw-video-modal").length) {
    $("body").append(carouselModalHtml());
  }
}

function upgradeMeetDoctorHomePhoto($) {
  if (!$("#1153740631").length) return;
  if ($("#cw-meet-doctor-home-photo").length) return;

  $("head").append(`<style id="cw-meet-doctor-home-photo">
body.cw-home-v2 #dm .dmBody div.u_1153740631,
body.cw-home-v2 #1153740631.u_1153740631 {
  background-image: url("${MEET_DOCTOR_HOME_PHOTO}") !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center 22% !important;
}
</style>`);
}

function carouselSlideMuteHtml() {
  return `<button type="button" class="cw-slide-mute" aria-pressed="true" aria-label="Unmute video">
  <span class="cw-slide-mute__icon cw-slide-mute__off" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
  </span>
  <span class="cw-slide-mute__icon cw-slide-mute__on" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
  </span>
</button>`;
}

function carouselArrowsHtml() {
  return `<button type="button" class="cw-carousel-arrow cw-carousel-arrow--prev" aria-label="Previous videos">
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
</button>
<button type="button" class="cw-carousel-arrow cw-carousel-arrow--next" aria-label="Next videos">
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
</button>`;
}

function carouselTabsHtml() {
  const tabs = VIDEO_CAROUSEL_SLIDES.map(
    (s, i) =>
      `<button type="button" class="cw-carousel-tab${i === 0 ? " is-active" : ""}" data-cw-tab="${i}" role="tab" aria-selected="${i === 0 ? "true" : "false"}">
    <span class="cw-carousel-tab__dot" aria-hidden="true"></span>
    <span class="cw-carousel-tab__label">${s.title}</span>
  </button>`
  ).join("\n");
  return `<div class="cw-carousel-tabs" role="tablist" aria-label="Choose a video to watch">
${tabs}
</div>`;
}

function carouselModalHtml() {
  return `<div class="cw-video-modal" id="cw-video-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Video player">
  <div class="cw-video-modal__backdrop" data-cw-modal-close></div>
  <div class="cw-video-modal__dialog" role="document">
    <button type="button" class="cw-video-modal__close" data-cw-modal-close aria-label="Close video">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <div class="cw-video-modal__frame">
      <video class="cw-video-modal__video" controls playsinline preload="auto"></video>
    </div>
    <h3 class="cw-video-modal__title"></h3>
  </div>
</div>`;
}

/** Footer video carousel (#1132180075) — all slides + arrows, labeled tabs, per-card audio, modal player */
function upgradeHomepageVideoCarousel($) {
  const widget = $("#1559410236");
  if (!widget.length) return;

  widget.attr("data-cw-video-carousel", "1");
  const row = widget.closest(".u_1132180075");
  row.addClass("cw-home-video-carousel");

  const slots = widget.find('[data-auto^="slideSlot"]');
  if (!slots.length) return;

  slots.each((i, el) => {
    const data = VIDEO_CAROUSEL_SLIDES[i % VIDEO_CAROUSEL_SLIDES.length];
    const $slot = $(el);
    $slot.attr("data-cw-slide", String(i % VIDEO_CAROUSEL_SLIDES.length));
    const $container = $slot.find('[data-grab="slide-media-container"]').first();
    if (!$container.length) return;

    /* Drop any placeholder media (empty .eHyebB / .hqwaXB divs) */
    $container.find('[data-grab="slide-media"]').not("video").remove();

    let $video = $container.find("video[data-grab='slide-media'], video").first();
    if (!$video.length) {
      $video = $(
        '<video data-grab="slide-media" class="sc-aXZVg jNgzFo"></video>'
      );
      $container.prepend($video);
    }

    $video.attr({
      src: data.video,
      poster: data.poster,
      autoplay: "",
      loop: "",
      muted: "",
      playsinline: "",
      preload: "auto",
      "webkit-playsinline": "",
    });

    /* Per-card audio toggle (bottom-left) */
    if (!$container.find(".cw-slide-mute").length) {
      $container.append(carouselSlideMuteHtml());
    }

    /* Fullscreen icon (bottom-right) — opens the full-control modal player */
    if (!$container.find(".cw-fullscreen-btn").length) {
      $container.append(carouselFullscreenBtnHtml(data.video, data.title));
    }

    /* Caption text; drop the old text "Watch Video" popup link */
    const $content = $slot.find('[data-grab="slideContentContainer"]').first();
    if ($content.length) {
      $content.find('[data-grab="title"]').first().text(data.title);
      $content
        .find('[data-grab="description"]')
        .first()
        .html(`<p>${data.desc}</p>`);
      $content.find('[data-grab="button-root"]').remove();
    }
  });

  /* Side navigation arrows */
  if (!widget.find(".cw-carousel-arrow").length) {
    widget.append(carouselArrowsHtml());
  }

  /* Labeled tab strip below the carousel */
  if (!row.find(".cw-carousel-tabs").length) {
    widget.after(carouselTabsHtml());
  }

  /* One shared modal player */
  ensureHomepageVideoModal($);
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

  patchDudaHeroInlineCss($);

  /* Move Google reviews directly under hero */
  const reviews = $("#1619377659").first();
  if (reviews.length && primaryHero.length) {
    const moved = reviews.clone();
    reviews.remove();
    primaryHero.after(moved);
  }

  reorganizeHomepageLayout($);
  upgradeHomepageVideoSections($);
  upgradeWhyCareVideoColumns($);
  upgradeMeetDoctorHomePhoto($);
  ensureHomepageVideoModal($);
  upgradeHomepageVideoCarousel($);
  fixHomepageButtonLabels($);

  /* Header + footer social — full icon set */
  $(".dmSocialHub .socialHubInnerDiv, .u_1467801161 .socialHubInnerDiv").each((_, el) => {
    const style = $(el).find(".socialHubIcon").first().attr("class")?.match(/style\d+/)?.[0] || "style3";
    $(el).html(socialIconsHtml(style));
  });

  demoteExtraH1($);

  $("body").removeClass("addCanvasBorder").addClass("cw-home-v2");
  $("#dm-outer-wrapper").removeClass("rows-1200");
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
  "/css/cw-page-hero-gallery.css",
];

function patchDudaHeroInlineCss($) {
  $("style").each((_, el) => {
    let css = $(el).html() || "";
    if (!css.includes("u_1300582767")) return;
    css = css.replace(
      /#dm\s+\.dmBody\s+div\.u_1300582767\s*\{[^}]*padding:\s*49px[^}]+\}/g,
      "#dm .dmBody div.u_1300582767{padding-top:clamp(1rem,3vh,2.5rem)!important;padding-bottom:clamp(1rem,3vh,2rem)!important;padding-left:0!important;padding-right:0!important}"
    );
    css = css.replace(
      /#dm\s+\.dmBody\s+div\.u_1300582767\s*\{[^}]*padding:49px[^}]+\}/g,
      "#dm .dmBody div.u_1300582767{padding-top:clamp(1rem,3vh,2.5rem)!important;padding-bottom:clamp(1rem,3vh,2rem)!important;padding-left:0!important;padding-right:0!important}"
    );
    css = css.replace(
      /width:\s*auto\s*!important/g,
      "width:100%!important"
    );
    css = css.replace(
      /(div\.u_1300582767[^}]*?)max-width:\s*100%\s*!important/g,
      "$1max-width:none!important"
    );
    $(el).html(css);
  });
}

export function injectLateFullBleed($, { homepage = false, meetDoctor = false } = {}) {
  if (!homepage && !meetDoctor) return;
  if ($('link[href*="cw-fullbleed-overrides.css"]').length) return;
  $("body").append(
    '<link rel="stylesheet" href="/css/cw-fullbleed-overrides.css" data-cw-upgrade="late">'
  );
}

export function injectDesignAssets($, { homepage = false, meetDoctor = false } = {}) {
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

  if (homepage && !$("body").find("#cw-fullbleed-fix").length) {
    $("body").append(`<style id="cw-fullbleed-fix">
html.clearwater-replica { padding: 0 !important; margin: 0 !important; }
body.cw-home-v2 #dm .dmBody div.u_1300582767,
body.cw-home-v2 #1300582767.u_1300582767 {
  width: 100% !important;
  max-width: none !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
body.cw-home-v2 #1300582767 .videobgwrapper,
body.cw-home-v2 #1300582767 .videobgframe {
  width: 100% !important;
  min-width: 100% !important;
  left: 0 !important;
  right: 0 !important;
}
</style>`);
  }

  if (homepage && !$("body").find("#cw-button-fix").length) {
    $("body").append(`<style id="cw-button-fix">
#dm div.dmInner #site_content a#1258890617.dmWidget,
#dm div.dmInner #site_content a#1803396438.dmWidget {
  --btn-text-color: #fff !important;
  color: #fff !important;
}
#dm div.dmInner #site_content a#1258890617.dmWidget span.text,
#dm div.dmInner #site_content a#1258890617.dmWidget span#1484044619,
#dm div.dmInner #site_content a#1803396438.dmWidget span.text,
#dm div.dmInner #site_content a#1803396438.dmWidget span#1816819293 {
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
}
#dm div.dmInner #site_content a#1803396438.dmWidget:hover span.text,
#dm div.dmInner #site_content a#1803396438.dmWidget:hover span#1816819293 {
  color: #c07a2e !important;
  -webkit-text-fill-color: #c07a2e !important;
}
</style>`);
  }

  injectLateFullBleed($, { homepage, meetDoctor });

  if (homepage && !$('script[src*="homepage-upgrades.js"]').length) {
    $("body").append(
      '<script src="/js/homepage-upgrades.js" defer data-cw-upgrade="1"></script>'
    );
  }

  $("html").addClass("clearwater-replica");
  $("body").addClass("cw-design-v2");
}
