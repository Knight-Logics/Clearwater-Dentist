import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "site-config.json"), "utf8")
);
const LIVE_INVENTORY = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "live-route-inventory.json"), "utf8")
);

const NAV_LINKS = LIVE_INVENTORY.primaryNav;

const SOCIAL_LINKS = [
  {
    href: "https://facebook.com/Clearwaterdentist/",
    label: "Facebook",
    className: "dmSocialFacebook dm-social-icons-facebook",
  },
  {
    href: "https://instagram.com/clearwaterdentist",
    label: "Instagram",
    className: "dmSocialInstagram dm-social-icons-instagram",
  },
  {
    href: "https://youtube.com/Clearwater_Dentist",
    label: "YouTube",
    className: "dmSocialYoutube dm-social-icons-youtube",
  },
  {
    href: "https://pinterest.com/clearwater_dentist",
    label: "Pinterest",
    className: "dmSocialPinterest icon-pinterest",
  },
  {
    href: "https://www.tiktok.com/@clearwaterdentist",
    label: "TikTok",
    className: "dmSocialTiktok dm-social-icons-tiktok",
  },
];

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function caretSvg() {
  return `<svg class="cw-site-header__caret" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M5.2 7.3 10 12.1l4.8-4.8 1.1 1.1L10 14.3 4.1 8.4z"/></svg>`;
}

function navItemHtml(item, level = 0) {
  const children = item.children || [];
  const hasChildren = children.length > 0;
  const itemClass = `cw-site-header__nav-item${hasChildren ? " has-submenu" : ""}${level > 0 ? " is-nested" : ""}`;
  const linkClass = level > 0 ? "cw-site-header__submenu-link" : "cw-site-header__nav-link";
  const submenu = hasChildren
    ? `<ul class="cw-site-header__submenu cw-site-header__submenu--level-${level + 1}" aria-label="${esc(item.label)} submenu">${children
        .map((child) => navItemHtml(child, level + 1))
        .join("")}</ul>`
    : "";
  return `<li class="${itemClass}"><a href="${item.href}" class="${linkClass}"${hasChildren ? ' aria-haspopup="true" aria-expanded="false"' : ""}>${esc(item.label)}${hasChildren && level === 0 ? caretSvg() : ""}</a>${submenu}</li>`;
}

function navHtml() {
  return NAV_LINKS.map((l) => navItemHtml(l)).join("");
}

function socialIconHtml(className) {
  return `<span class="${className} oneIcon socialHubIcon style3 cw-header-social-icon" aria-hidden="true"></span>`;
}

function socialHtml() {
  return SOCIAL_LINKS.map(
    (s) =>
      `<a href="${s.href}" class="cw-site-header__social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">${socialIconHtml(s.className)}</a>`
  ).join("");
}

function mobileSocialHtml() {
  return SOCIAL_LINKS.map(
    (s) =>
      `<a href="${s.href}" class="cw-mobile-nav__social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">${socialIconHtml(s.className)}</a>`
  ).join("");
}

function mobileNavHtml() {
  const links = NAV_LINKS.map((l) => mobileNavItemHtml(l)).join("");
  const year = new Date().getFullYear();
  return `<div class="cw-mobile-nav" id="cw-mobile-nav" aria-hidden="true">
  <div class="cw-mobile-nav__overlay" data-cw-nav-close tabindex="-1"></div>
  <div class="cw-mobile-nav__panel" role="dialog" aria-modal="true" aria-label="Site menu">
    <div class="cw-mobile-nav__head">
      <div class="cw-mobile-nav__brand">
        <img class="cw-mobile-nav__logo" src="/cdn/irp/a227a250/dms3rep/multi/Clearwater-Dentist-Logo-466372.svg" alt="Clearwater Dentist">
        <strong class="cw-mobile-nav__title">Menu</strong>
      </div>
      <button type="button" class="cw-mobile-nav__close" data-cw-nav-close aria-label="Close menu">&times;</button>
    </div>
    <nav class="cw-mobile-nav__nav" aria-label="Mobile navigation">
      <ul class="cw-mobile-nav__list">${links}</ul>
    </nav>
    <div class="cw-mobile-nav__footer">
      <div class="cw-mobile-nav__actions">
        <a class="cw-mobile-nav__book" href="${CONFIG.bookingUrl}" target="_blank" rel="noopener noreferrer">Book Online</a>
        <a class="cw-mobile-nav__call" href="tel:${CONFIG.phoneTel}">Call Now · ${CONFIG.phoneDisplay}</a>
      </div>
      <div class="cw-mobile-nav__social" aria-label="Social media">${mobileSocialHtml()}</div>
      <hr class="cw-mobile-nav__divider" aria-hidden="true">
      <p class="cw-mobile-nav__copyright">&copy; ${year} Clearwater Dentist. All Rights Reserved.</p>
    </div>
  </div>
</div>`;
}

function mobileNavItemHtml(item, level = 0) {
  const children = item.children || [];
  const hasChildren = children.length > 0;
  const childList = hasChildren
    ? `<ul class="cw-mobile-nav__sublist cw-mobile-nav__sublist--level-${level + 1}">${children
        .map((child) => mobileNavItemHtml(child, level + 1))
        .join("")}</ul>`
    : "";
  return `<li class="cw-mobile-nav__item${hasChildren ? " has-submenu" : ""}"><a href="${item.href}" class="cw-mobile-nav__link cw-mobile-nav__link--level-${level}">${esc(item.label)}</a>${childList}</li>`;
}

export function customHeaderHtml() {
  const phoneIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8c1.5 2.9 3.7 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1L6.6 10.8z"/></svg>`;
  return `<header class="cw-site-header" id="cw-site-header" role="banner">
  <div class="cw-site-header__inner">
    <a class="cw-site-header__logo" href="/" aria-label="Clearwater Dentist home">
      <img src="/cdn/irp/a227a250/dms3rep/multi/Clearwater-Dentist-Logo-466372.svg" alt="Clearwater Dentist">
    </a>
    <nav class="cw-site-header__nav" aria-label="Primary navigation">
      <ul class="cw-site-header__nav-list">${navHtml()}</ul>
    </nav>
    <div class="cw-site-header__actions">
      <div class="cw-site-header__cta-stack">
        <div class="cw-site-header__ctas">
          <a class="cw-site-header__btn--book" href="${CONFIG.bookingUrl}" target="_blank" rel="noopener noreferrer">Book Online</a>
          <a class="cw-site-header__call" href="tel:${CONFIG.phoneTel}">
            <span class="cw-site-header__call-icon">${phoneIcon}</span>
            <span class="cw-site-header__call-text">
              <span class="cw-site-header__call-label">Call Now</span>
              <span class="cw-site-header__call-number">${CONFIG.phoneDisplay}</span>
            </span>
          </a>
        </div>
        <div class="cw-site-header__social" aria-label="Social media">${socialHtml()}</div>
      </div>
      <button type="button" class="cw-site-header__menu" id="cw-site-header-menu" aria-label="Open menu" aria-controls="cw-mobile-nav" aria-expanded="false">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/></svg>
      </button>
    </div>
  </div>
</header>${mobileNavHtml()}`;
}

export function injectCustomHeader($) {
  $("#cw-site-header").remove();
  $("#cw-mobile-nav").remove();
  $("#layout-drawer-hamburger, #hamburger-drawer").remove();
  $("body").prepend(customHeaderHtml());

  if (!$('script[src*="cw-header.js"]').length) {
    $("body").append('<script src="/js/cw-header.js" defer data-cw-upgrade="1"></script>');
  }
}
