import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const BASE = 'https://www.clearwaterdentist.com';
const MANIFEST = path.join(ROOT, 'data', 'asset-manifest.json');

const CDN_HOSTS = [
  'irp.cdn-website.com',
  'lirp.cdn-website.com',
  'static.cdn-website.com',
  'vid.cdn-website.com',
];

const pages = JSON.parse(await fs.readFile(path.join(ROOT, 'data/pages.json'), 'utf8').catch(() => '[]'));
if (!pages.length) {
  console.log('No pages.json — run: npm run pages');
  process.exit(1);
}

const queue = new Set();
const done = new Set();
const failed = new Set();

const ASSET_EXT = /\.(jpe?g|png|gif|webp|svg|css|js|mjs|woff2?|ttf|eot|ico|mp4|webm|jpeg)(\?|$)/i;

function isAssetUrl(url) {
  try {
    const u = new URL(url);
    if (CDN_HOSTS.some((h) => u.hostname === h)) return true;
    if (u.hostname === 'www.clearwaterdentist.com' && ASSET_EXT.test(u.pathname)) return true;
    return ASSET_EXT.test(u.pathname);
  } catch {
    return false;
  }
}

function normalizeUrl(raw) {
  if (!raw || raw.startsWith('data:') || raw.startsWith('javascript:')) return null;
  let u = raw.trim().replace(/&amp;/g, '&').split(/[\s,]/)[0];
  if (u.startsWith('//')) u = 'https:' + u;
  if (u.startsWith('/')) u = BASE + u;
  if (!u.startsWith('http')) return null;
  try {
    const url = new URL(u);
    url.hash = '';
    const clean = url.origin + url.pathname + (url.search || '');
    if (!isAssetUrl(clean)) return null;
    return clean;
  } catch {
    return null;
  }
}

function collectFromText(text) {
  if (!text) return;
  const patterns = [
    /https?:\/\/(?:irp|lirp|static|vid)\.cdn-website\.com\/[^\s"'<>)\]]+/gi,
    /https:\/\/www\.clearwaterdentist\.com\/[^\s"'<>)\]]+\.(?:jpe?g|png|gif|webp|svg|css|js|mp4)/gi,
    /url\(\s*['"]?([^'")]+)['"]?\s*\)/gi,
  ];
  for (const re of patterns) {
    let m;
    const r = new RegExp(re.source, re.flags);
    while ((m = r.exec(text)) !== null) {
      const raw = m[1] || m[0];
      const n = normalizeUrl(raw);
      if (n) queue.add(n);
    }
  }
}

function localPath(url) {
  const u = new URL(url);
  if (CDN_HOSTS.includes(u.hostname)) {
    return path.join(PUBLIC, 'cdn', u.hostname.replace('.cdn-website.com', ''), decodeURIComponent(u.pathname).replace(/^\//, ''));
  }
  return path.join(PUBLIC, decodeURIComponent(u.pathname).replace(/^\//, ''));
}

function urlToLocalPath(url) {
  const u = new URL(url);
  if (CDN_HOSTS.includes(u.hostname)) {
    const host = u.hostname.replace('.cdn-website.com', '');
    return `/cdn/${host}${u.pathname}${u.search || ''}`;
  }
  return u.pathname + (u.search || '');
}

async function downloadOne(url) {
  if (done.has(url) || failed.has(url)) return;
  const dest = localPath(url);
  try {
    await fs.access(dest);
    const stat = await fs.stat(dest);
    if (stat.size > 0) {
      done.add(url);
      return;
    }
  } catch {}

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'ClearwaterDentistRebuild/1.0 (asset migration)' },
      redirect: 'follow',
    });
    if (!res.ok) {
      failed.add(url);
      console.warn('  FAIL', res.status, url.slice(0, 100));
      return;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, buf);
    done.add(url);
    if (url.endsWith('.css')) collectFromText(buf.toString('utf8'));
    process.stdout.write('.');
  } catch (e) {
    failed.add(url);
    console.warn('\n  ERR', url.slice(0, 80), e.message);
  }
}

async function processPage(pagePath) {
  const url = `${BASE}${pagePath === '/' ? '/' : pagePath}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'ClearwaterDentistRebuild/1.0' } });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  $('link[href], img[src], img[srcset], source[srcset], video[src], [style]').each((_, el) => {
    collectFromText($(el).attr('href'));
    collectFromText($(el).attr('src'));
    collectFromText($(el).attr('srcset'));
    collectFromText($(el).attr('style'));
  });
  collectFromText(html);
  return html;
}

console.log('Collecting asset URLs from', pages.length, 'pages…\n');
for (const p of pages) {
  try {
    await processPage(p);
    console.log(' scanned', p);
    await new Promise((r) => setTimeout(r, 200));
  } catch (e) {
    console.warn(' skip page', p, e.message);
  }
}

// Critical font bundle
const site = JSON.parse(await fs.readFile(path.join(ROOT, 'data/site.json'), 'utf8'));
if (site.fonts?.google) queue.add(site.fonts.google);

console.log('\n\nDownloading', queue.size, 'assets…\n');
const urls = [...queue];
for (let i = 0; i < urls.length; i++) {
  await downloadOne(urls[i]);
  if (i % 50 === 49) await new Promise((r) => setTimeout(r, 100));
}

const manifest = {
  downloadedAt: new Date().toISOString(),
  total: queue.size,
  done: done.size,
  failed: failed.size,
  urlMap: Object.fromEntries([...done].map((u) => [u, urlToLocalPath(u)])),
  failedUrls: [...failed],
};

await fs.mkdir(path.join(ROOT, 'data'), { recursive: true });
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`\n\nDone: ${done.size} ok, ${failed.size} failed → data/asset-manifest.json`);
