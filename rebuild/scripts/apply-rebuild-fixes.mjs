/**
 * Post-build fixes for Clearwater Dentist rebuild.
 * Applies P0/P1 fixes from VISUAL-AUDIT + quick GROWTH-ROADMAP wins.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "site-config.json"), "utf8")
);

const PHONE_DISPLAY = CONFIG.phoneDisplay;
const PHONE_TEL = CONFIG.phoneTel;
const BOOKING_URL = CONFIG.bookingUrl;
const GOOGLE_REVIEW_URL = CONFIG.googleReviewUrl;

const PHONE_PATTERNS = [
  /\(\s*727\s*\)\s*797[\s-]*8444/gi,
  /727[\s.-]*797[\s.-]*8444/gi,
  /\+1[\s.-]*727[\s.-]*797[\s.-]*8444/gi,
  /\(\s*727\s*\)\s*758[\s-]*0243/gi,
  /727[\s.-]*758[\s.-]*0243/gi,
  /\(\s*727\s*\)\s*591[\s-]*4577/gi,
  /727[\s.-]*591[\s.-]*4577/gi,
  /\(\s*727\s*\)\s*610[\s-]*7702/gi,
  /727[\s.-]*610[\s.-]*7702/gi,
  /\(\s*727\s*\)\s*300[\s-]*0253/gi,
  /727[\s.-]*300[\s.-]*0253/gi,
];

const CANONICAL_PHONE_REGEX =
  /\(\s*727\s*\)\s*285[\s-]*8132|727[\s.-]*285[\s.-]*8132/gi;

function walkHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name === "index.html") out.push(full);
  }
  return out;
}

function normalizePhoneText(text) {
  let out = text;
  for (const re of PHONE_PATTERNS) {
    out = out.replace(re, PHONE_DISPLAY);
  }
  return out;
}

function normalizeTelHref(href) {
  if (!href || !href.startsWith("tel:")) return href;
  return `tel:${PHONE_TEL}`;
}

function isInternalHref(href) {
  if (!href) return false;
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))
    return true;
  if (href.startsWith("http")) {
    try {
      const u = new URL(href);
      return (
        u.hostname.includes("clearwaterdentist.com") ||
        u.hostname.includes("knight-logics.github.io") ||
        u.hostname === "localhost"
      );
    } catch {
      return false;
    }
  }
  return href.startsWith("/") || !href.includes("://");
}

function isBookingHref(href) {
  if (!href) return false;
  return (
    href.includes("getweave.com") ||
    href.includes("bookit.dentrixascend.com") ||
    /book\s*online|schedule|appointment/i.test(href)
  );
}

function fixLinks($) {
  $("a[href]").each((_, el) => {
    const $a = $(el);
    let href = $a.attr("href") || "";

    if (href.includes("getweave.com")) {
      href = BOOKING_URL;
      $a.attr("href", href);
    }

    if (isBookingHref(href) || href.includes("bookit.dentrixascend.com")) {
      $a.attr("target", "_blank");
      $a.attr("rel", "noopener noreferrer");
    } else if (isInternalHref(href)) {
      $a.removeAttr("target");
      $a.removeAttr("rel");
    }

    if (href.startsWith("tel:")) {
      $a.attr("href", normalizeTelHref(href));
    }
  });
}

function removeGhostPhoneBlocks($) {
  $("[style*='opacity:0'], [style*='opacity: 0'], [style*='color:transparent'], [style*='color: transparent']")
    .filter((_, el) => {
      const t = $(el).text();
      return /727[\s.-]?\d{3}[\s.-]?\d{4}/.test(t);
    })
    .remove();

  $("p, div, span").each((_, el) => {
    const $el = $(el);
    const style = ($el.attr("style") || "").toLowerCase();
    const text = $el.text();
    if (
      /727[\s.-]*(591|610|300|758)[\s.-]?\d{4}/.test(text) &&
      (style.includes("opacity:0") ||
        style.includes("font-size:0") ||
        style.includes("height:0") ||
        style.includes("display:none"))
    ) {
      $el.remove();
    }
  });
}

function fixGalleryCaptions($) {
  for (const [oldText, newText] of Object.entries(CONFIG.galleryCaptions)) {
    $(".caption-title, .caption-text, h3, h4, p, span").each((_, el) => {
      const $el = $(el);
      if ($el.children().length === 0 && $el.text().trim() === oldText) {
        $el.text(newText);
      }
    });
  }

  $("a.caption-button, .caption-button a").each((_, el) => {
    const $el = $(el);
    const label = $el.text().trim();
    if (label === "Button" || label === "") {
      $el.remove();
    }
  });
}

function fixBrokenMeta($) {
  $('meta[property="og:title"], meta[name="twitter:title"]').each((_, el) => {
    const $m = $(el);
    const c = $m.attr("content");
    if (c && c.includes("Don") && !c.includes("Don't")) {
      $m.attr("content", c.replace(/Don(?=t)/g, "Don't"));
    }
  });
}

function fixSchema($) {
  $('script[type="application/ld+json"]').each((_, el) => {
    const $s = $(el);
    let raw = $s.html();
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      const patch = (node) => {
        if (!node || typeof node !== "object") return;
        if (node.telephone) node.telephone = PHONE_DISPLAY;
        if (Array.isArray(node)) node.forEach(patch);
        else Object.values(node).forEach(patch);
      };
      patch(data);
      $s.text(JSON.stringify(data));
    } catch {
      let fixed = normalizePhoneText(raw);
      fixed = fixed.replace(/"telephone"\s*:\s*"[^"]*"/g, `"telephone":"${PHONE_DISPLAY}"`);
      $s.text(fixed);
    }
  });
}

function fixTherapyDogLink($) {
  $('a[href*="signaturehealthinc.org"]').each((_, el) => {
    const $a = $(el);
    $a.replaceWith($a.text());
  });
}

function markDuplicateReviewBlocks($) {
  const seen = new Set();
  $(".dmNewParagraph, .text-align-left, .dmRespCol").each((_, el) => {
    const $el = $(el);
    const text = $el.text().replace(/\s+/g, " ").trim();
    if (text.length < 80) return;
    if (/Lyndsay|hygienist|fear of dentists/i.test(text)) {
      const key = text.slice(0, 120);
      if (seen.has(key)) {
        $el.addClass("cw-reviews-replaced");
        $el.closest(".dmRespRow").addClass("cw-reviews-replaced");
      } else {
        seen.add(key);
      }
    }
  });
}

function injectAssets($, relPath) {
  const head = $("head");
  if (!head.length) return;

  if (!$('link[href*="knight-upgrades.css"]').length) {
    head.append(
      '<link rel="stylesheet" href="/css/knight-upgrades.css" data-cw-upgrade="1">'
    );
  }

  if (!$('script[src*="knight-upgrades.js"]').length) {
    $("body").append(
      '<script src="/js/knight-upgrades.js" defer data-cw-upgrade="1"></script>'
    );
  }

  $("html").attr("lang", "en");
}

function normalizeHtmlString(html) {
  let out = html;
  for (const re of PHONE_PATTERNS) {
    out = out.replace(re, PHONE_DISPLAY);
  }
  out = out.replace(/tel:\+?1?7277978444/gi, `tel:${PHONE_TEL}`);
  out = out.replace(/tel:\+?1?7277580243/gi, `tel:${PHONE_TEL}`);
  out = out.replace(/tel:\+?1?7275914577/gi, `tel:${PHONE_TEL}`);
  out = out.replace(
    /https?:\/\/book2\.getweave\.com[^"'\s]*/gi,
    BOOKING_URL
  );
  return out;
}

function processFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  html = normalizeHtmlString(html);

  const $ = cheerio.load(html, { decodeEntities: false });
  const rel = path.relative(DIST, filePath).replace(/\\/g, "/");

  fixLinks($);
  removeGhostPhoneBlocks($);
  fixGalleryCaptions($);
  fixBrokenMeta($);
  fixSchema($);
  fixTherapyDogLink($);
  markDuplicateReviewBlocks($);
  injectAssets($, rel);

  let out = $.html();
  out = normalizeHtmlString(out);
  fs.writeFileSync(filePath, out, "utf8");
}

function updateSiteJson() {
  const sitePath = path.join(ROOT, "data", "site.json");
  if (!fs.existsSync(sitePath)) return;
  const site = JSON.parse(fs.readFileSync(sitePath, "utf8"));
  site.phone = PHONE_DISPLAY;
  site.phoneTel = PHONE_TEL;
  site.bookingUrl = BOOKING_URL;
  site.googleReviewUrl = GOOGLE_REVIEW_URL;
  fs.writeFileSync(sitePath, JSON.stringify(site, null, 2) + "\n", "utf8");
}

export function applyRebuildFixes(distDir = DIST) {
  const publicCss = path.join(ROOT, "public", "css", "knight-upgrades.css");
  const publicJs = path.join(ROOT, "public", "js", "knight-upgrades.js");
  fs.mkdirSync(path.join(distDir, "css"), { recursive: true });
  fs.mkdirSync(path.join(distDir, "js"), { recursive: true });
  if (fs.existsSync(publicCss)) {
    fs.copyFileSync(publicCss, path.join(distDir, "css", "knight-upgrades.css"));
  }
  if (fs.existsSync(publicJs)) {
    fs.copyFileSync(publicJs, path.join(distDir, "js", "knight-upgrades.js"));
  }

  const files = walkHtml(distDir);
  let changed = 0;
  for (const f of files) {
    processFile(f);
    changed++;
  }
  updateSiteJson();
  console.log(`apply-rebuild-fixes: processed ${changed} HTML files`);
  return changed;
}

import { pathToFileURL } from "node:url";

const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMain) {
  applyRebuildFixes();
}
