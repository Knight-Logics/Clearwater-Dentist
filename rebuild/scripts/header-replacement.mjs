import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "site-config.json"), "utf8")
);

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/meet-the-doctor", label: "About Us" },
  { href: "/cosmetic-dentistry", label: "Services" },
  { href: "/before-and-after", label: "Before & Afters" },
  { href: "/financing", label: "Financing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact Us" },
];

const SOCIAL_LINKS = [
  {
    href: "https://facebook.com/Clearwaterdentist/",
    label: "Facebook",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h2.8l.2-3H13v-2c0-.6.4-1 1-1z"/></svg>',
  },
  {
    href: "https://instagram.com/clearwaterdentist",
    label: "Instagram",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A5.5 5.5 0 1 0 16.5 13 5.5 5.5 0 0 0 12 7.5zm6.2-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z"/></svg>',
  },
  {
    href: "https://youtube.com/Clearwater_Dentist",
    label: "YouTube",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C17.8 5 12 5 12 5s-5.8 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C6.2 19 12 19 12 19s5.8 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.5v-7l6 3.5z"/></svg>',
  },
  {
    href: "https://pinterest.com/clearwater_dentist",
    label: "Pinterest",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3a9 9 0 0 0-3.2 17.4c-.1-.8-.2-2 .1-3s1.3-2.2 1.3-2.2.3-.8.2-1.1c-.1-.4-.7-.3-.7-.3-1.5.3-2.4 1.8-2.4 3.4 0 2.2 1.6 3.9 4.2 3.9 2.2 0 3.9-1.4 3.9-4.1 0-2.2-1.1-3.7-2.8-3.7-1.1 0-1.9.8-1.9 1.8 0 1 .4 1.7.4 1.7s-1.2 5.1-1.4 6c-.4 1.6-.1 3.6 0 4.1A9 9 0 1 0 12 3z"/></svg>',
  },
  {
    href: "https://www.tiktok.com/@clearwaterdentist",
    label: "TikTok",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.5 3c.3 2.2 1.5 3.9 3.8 4.1v3.1c-1.4 0-2.7-.4-3.8-1.1v6.8a5.8 5.8 0 1 1-5.1-5.7v3.2a2.6 2.6 0 1 0 1.8 2.5V3h2.3z"/></svg>',
  },
];

function navHtml() {
  return NAV_LINKS.map(
    (l) =>
      `<li><a href="${l.href}" class="cw-site-header__nav-link">${l.label}</a></li>`
  ).join("");
}

function socialHtml() {
  return SOCIAL_LINKS.map(
    (s) =>
      `<a href="${s.href}" class="cw-site-header__social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">${s.svg}</a>`
  ).join("");
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
      <div class="cw-site-header__social" aria-label="Social media">${socialHtml()}</div>
      <div class="cw-site-header__ctas">
        <a class="cw-site-header__btn--book" href="${CONFIG.bookingUrl}" target="_blank" rel="noopener noreferrer">Book Online</a>
        <a class="cw-site-header__call" href="tel:${CONFIG.phoneTel}">
          <span class="cw-site-header__call-icon">${phoneIcon}</span>
          <span class="cw-site-header__call-text">
            <span class="cw-site-header__call-label">Call or Text</span>
            <span class="cw-site-header__call-number">${CONFIG.phoneDisplay}</span>
          </span>
        </a>
      </div>
      <button type="button" class="cw-site-header__menu" id="cw-site-header-menu" aria-label="Open menu" aria-controls="hamburger-drawer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/></svg>
      </button>
    </div>
  </div>
</header>`;
}

export function injectCustomHeader($) {
  $("#cw-site-header").remove();
  $("body").prepend(customHeaderHtml());

  if (!$('script[src*="cw-header.js"]').length) {
    $("body").append('<script src="/js/cw-header.js" defer data-cw-upgrade="1"></script>');
  }
}
