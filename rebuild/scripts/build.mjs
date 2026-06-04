import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');

const site = JSON.parse(await fs.readFile(path.join(ROOT, 'data/site.json'), 'utf8'));
const pages = JSON.parse(await fs.readFile(path.join(ROOT, 'data/pages.json'), 'utf8'));
const manifest = JSON.parse(
  await fs.readFile(path.join(ROOT, 'data/asset-manifest.json'), 'utf8').catch(() => '{"urlMap":{}}')
);

const BASE = site.domain;
const CDN_HOSTS = ['irp.cdn-website.com', 'lirp.cdn-website.com', 'static.cdn-website.com', 'vid.cdn-website.com'];

function urlToLocal(url) {
  if (manifest.urlMap?.[url]) return manifest.urlMap[url];
  try {
    const u = new URL(url);
    if (CDN_HOSTS.includes(u.hostname)) {
      const host = u.hostname.replace('.cdn-website.com', '');
      return `/cdn/${host}${u.pathname}${u.search || ''}`;
    }
    if (u.hostname.includes('clearwaterdentist.com')) return u.pathname + (u.search || '');
  } catch {}
  return url;
}

function rewriteAttr(val) {
  if (!val) return val;
  let out = val.replace(/&amp;/g, '&');
  for (const [remote, local] of Object.entries(manifest.urlMap || {})) {
    out = out.split(remote).join(local);
  }
  out = out.replace(/https:\/\/(?:irp|lirp|static|vid)\.cdn-website\.com\/[^\s"'>)]+/g, (m) => urlToLocal(m));
  out = out.replace(/https:\/\/www\.clearwaterdentist\.com/g, '');
  return out;
}

function rewriteHtml(html) {
  return html
    .replace(/https:\/\/www\.clearwaterdentist\.com/g, '')
    .replace(new RegExp(BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '')
    .replace(/https:\/\/(?:irp|lirp|static|vid)\.cdn-website\.com\/[^"'\s)]+/g, (m) => urlToLocal(m));
}

function cleanTitle(raw) {
  return (raw || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .replace(/comment bubble icon/gi, '')
    .trim();
}

function processPage(html, pagePath) {
  const $ = cheerio.load(html, { decodeEntities: false });

  /* Rewrite asset URLs in attributes */
  $('link[href], script[src], img[src], img[srcset], source[srcset], video[src], a[href], [style]').each((_, el) => {
    for (const attr of ['href', 'src', 'srcset', 'style']) {
      const v = $(el).attr(attr);
      if (v) $(el).attr(attr, rewriteAttr(v));
    }
  });

  /* Rewrite inline style tag contents */
  $('style').each((_, el) => {
    const t = $(el).html() || '';
    $(el).html(rewriteHtml(t));
  });

  /* Remove Duda runtime scripts — cause ChunkLoadErrors; keep inline config minimal */
  $('script[src*="static.cdn-website.com"], script[src*="d-js-one-runtime"]').remove();
  $('script').each((_, el) => {
    const src = $(el).attr('src') || '';
    const body = $(el).html() || '';
    if (src.includes('googletagmanager') || src.includes('googleads')) {
      /* keep analytics if present */
    } else if (body.includes('Parameters') && body.length > 500) {
      /* keep Parameters block */
    } else if (src && !src.startsWith('/js/')) {
      $(el).remove();
    }
  });

  /* Fix title */
  const title = cleanTitle($('title').text());
  if (title) $('title').text(title.includes('Clearwater Dentist') ? title : `${title} | Clearwater Dentist`);

  /* Inject replica assets before </head> */
  $('head').append(`
<script src="/cdn/static/libs/jquery/jquery-3.7.0.min.js" defer></script>
<link rel="stylesheet" href="/css/replica-fixes.css">
<link rel="stylesheet" href="/css/duda-animations.css">
<link rel="stylesheet" href="/css/flexslider.css">
`);

  /* Inject replica scripts before </body> */
  $('body').append(`
<script src="/js/flexslider.min.js" defer></script>
<script src="/js/duda-animations.js" defer></script>
<script src="/js/duda-nav.js" defer></script>
<script src="/js/site.js" defer></script>
`);

  $('body').addClass('clearwater-replica-body');
  $('html').addClass('clearwater-replica');

  let out = $.html();
  out = rewriteHtml(out);
  return out;
}

async function writePage(pagePath, html) {
  const outDir = pagePath === '/' ? DIST : path.join(DIST, pagePath.replace(/^\/|\/$/g, ''));
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, 'index.html'), '<!DOCTYPE html>\n' + html.replace(/^[^<]*/, ''), 'utf8');
  console.log('  ✓', pagePath);
}

async function copyDir(src, dest) {
  try {
    await fs.access(src);
  } catch {
    return;
  }
  await fs.mkdir(dest, { recursive: true });
  for (const e of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

async function main() {
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });
  console.log('Copying public assets…');
  await copyDir(PUBLIC, DIST);

  console.log('Building', pages.length, 'full-mirror pages…\n');
  for (const pagePath of pages) {
    try {
      const url = `${BASE}${pagePath === '/' ? '/' : pagePath}`;
      const res = await fetch(url, { headers: { 'User-Agent': 'ClearwaterDentistRebuild/2.0' } });
      if (!res.ok) throw new Error(`${res.status}`);
      const html = await res.text();
      await writePage(pagePath, processPage(html, pagePath));
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.error('  ✗', pagePath, err.message);
    }
  }
  console.log('\nDone → dist/');
  const { rewriteTree } = await import('./rewrite-cdn-urls.mjs');
  const n = await rewriteTree(DIST);
  console.log(`Rewrote CDN URLs in ${n} dist files`);
  await import('./fix-missing-assets.mjs');
}

main();
