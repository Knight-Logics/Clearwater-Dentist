/**
 * Live URL parity pages/endpoints for non-sitemap routes and aliases.
 *
 * The main rebuild mirrors the live sitemap via data/pages.json. This module
 * covers live internal routes that return 200 but are not in the sitemap, plus
 * lightweight feed endpoints and legacy aliases needed for a clean domain cutover.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderShell, breadcrumbSchema } from "./seo-footer-foundation.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "site-config.json"), "utf8")
);
const INVENTORY = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "live-route-inventory.json"), "utf8")
);

const DOMAIN = (CONFIG.business.domain || INVENTORY.domain).replace(/\/$/, "");

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function routeSlug(routePath) {
  return routePath.replace(/^\/+|\/+$/g, "");
}

function writePage(distDir, routePath, html) {
  const slug = routeSlug(routePath);
  const dir = path.join(distDir, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
}

function videoPageMain(route) {
  const targetLink = route.target
    ? `<p><a class="cw-doc__cta" href="${route.target}">View the related page</a></p>`
    : "";
  const video = route.video
    ? `<div class="cw-parity-video">
  <video controls playsinline preload="metadata"${route.poster ? ` poster="${route.poster}"` : ""}>
    <source src="${route.video}" type="video/mp4">
  </video>
</div>`
    : "";
  return `<header class="cw-doc__head">
  <p class="cw-doc__eyebrow">Clearwater Dentist</p>
  <h1 class="cw-doc__title">${esc(route.title)}</h1>
  <p class="cw-doc__intro">${esc(route.summary || "Clearwater Dentist page preserved from the live site.")}</p>
</header>
${video}
${targetLink}`;
}

function cherryMain() {
  return `<header class="cw-doc__head">
  <p class="cw-doc__eyebrow">Financing</p>
  <h1 class="cw-doc__title">Cherry Dental Financing in Clearwater, FL</h1>
  <p class="cw-doc__intro">Cherry helps patients split dental treatment costs into manageable payments, so needed care can start sooner.</p>
</header>
<section class="cw-doc__section">
  <h2>Flexible Dental Payment Options</h2>
  <p>Clearwater Dentist preserves this financing page because it is part of the live site's Financing dropdown. Our team can help you review available payment options before treatment begins.</p>
  <ul>
    <li>Apply for financing before your appointment.</li>
    <li>Ask our team how Cherry compares with Sunbit, CareCredit, and Alphaeon.</li>
    <li>Use financing for eligible dental services when approved by the financing provider.</li>
  </ul>
  <p><a class="cw-doc__cta" href="/financing">View All Financing Options</a></p>
</section>`;
}

function aliasMain(route) {
  return `<header class="cw-doc__head">
  <p class="cw-doc__eyebrow">Clearwater Dentist</p>
  <h1 class="cw-doc__title">${esc(route.title)}</h1>
  <p class="cw-doc__intro">${esc(route.summary || "This live route is preserved for continuity after the site migration.")}</p>
</header>
<section class="cw-doc__section">
  <h2>Continue to the Current Page</h2>
  <p>This URL existed on the live Clearwater Dentist website. It remains available so existing links, bookmarks, and embedded video routes continue to resolve after launch.</p>
  <p><a class="cw-doc__cta" href="${route.target || route.canonical}">Open ${esc(route.title)}</a></p>
</section>
${route.video ? `<div class="cw-parity-video"><video controls playsinline preload="metadata"><source src="${route.video}" type="video/mp4"></video></div>` : ""}`;
}

function pageHtml(route) {
  const canonicalPath = route.canonical || route.path;
  const title = `${route.title} | ${CONFIG.business.name}`;
  const description =
    route.summary ||
    `${route.title} page preserved from the live Clearwater Dentist website.`;
  let main;

  if (route.path === "/financing/cherry") {
    main = cherryMain();
  } else if (route.type === "popup-video" || route.video) {
    main = videoPageMain(route);
  } else {
    main = aliasMain(route);
  }

  const schema = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: route.title, path: route.path },
    ]),
  ];

  return renderShell({
    title,
    description,
    canonicalPath,
    bodyClass: "cw-parity-page",
    main,
    schema,
  });
}

function writeFeed(distDir, feed) {
  const dir = path.join(distDir, routeSlug(feed.path));
  fs.mkdirSync(dir, { recursive: true });
  const updated = new Date().toUTCString();
  let content;
  if (feed.type === "atom") {
    content = `<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom">\n  <title>${CONFIG.business.name}</title>\n  <link href="${DOMAIN}/"/>\n  <updated>${new Date().toISOString()}</updated>\n  <id>${DOMAIN}/</id>\n  <subtitle>Latest dental care resources from ${CONFIG.business.name}.</subtitle>\n</feed>\n`;
    fs.writeFileSync(path.join(dir, "index.xml"), content, "utf8");
    fs.writeFileSync(path.join(dir, "index.html"), content, "utf8");
    return;
  }
  content = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${CONFIG.business.name}</title>\n    <link>${DOMAIN}/</link>\n    <description>Latest dental care resources from ${CONFIG.business.name}.</description>\n    <lastBuildDate>${updated}</lastBuildDate>\n  </channel>\n</rss>\n`;
  fs.writeFileSync(path.join(dir, "index.xml"), content, "utf8");
  fs.writeFileSync(path.join(dir, "index.html"), content, "utf8");
}

export function generateLiveParityPages(distDir) {
  let count = 0;
  for (const route of INVENTORY.extraLiveRoutes) {
    writePage(distDir, route.path, pageHtml(route));
    count++;
  }
  for (const feed of INVENTORY.feedEndpoints || []) {
    writeFeed(distDir, feed);
    count++;
  }
  return count;
}

export function liveParityRoutePaths() {
  return [
    ...(INVENTORY.liveSitemapRoutes || []),
    ...(INVENTORY.extraLiveRoutes || []).map((r) => r.path),
    ...(INVENTORY.feedEndpoints || []).map((r) => r.path),
  ];
}
