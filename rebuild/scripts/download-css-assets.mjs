#!/usr/bin/env node
/** Download any CDN assets referenced in CSS that are missing locally */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { rewriteCdnUrls } from './rewrite-cdn-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');

const CDN_RE =
  /https:\/\/(irp|lirp|static|vid)\.cdn-website\.com\/[^\s"'<>)\]]+/gi;

async function walkCss(dir, urls = new Set()) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walkCss(p, urls);
    else if (e.name.endsWith('.css')) {
      const text = await fs.readFile(p, 'utf8');
      let m;
      const re = new RegExp(CDN_RE.source, CDN_RE.flags);
      while ((m = re.exec(text)) !== null) urls.add(m[0].replace(/&amp;/g, '&'));
    }
  }
  return urls;
}

function localPath(url) {
  const u = new URL(url);
  const host = u.hostname.replace('.cdn-website.com', '');
  return path.join(PUBLIC, 'cdn', host, decodeURIComponent(u.pathname).replace(/^\//, ''));
}

async function downloadOne(url) {
  const dest = localPath(url);
  try {
    const stat = await fs.stat(dest);
    if (stat.size > 0) return { url, status: 'exists' };
  } catch {}

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'ClearwaterDentistRebuild/1.0 (css asset migration)' },
      redirect: 'follow',
    });
    if (!res.ok) return { url, status: 'fail', code: res.status };
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, buf);
    const distDest = dest.replace(PUBLIC, DIST);
    await fs.mkdir(path.dirname(distDest), { recursive: true });
    await fs.copyFile(dest, distDest);
    return { url, status: 'ok' };
  } catch (e) {
    return { url, status: 'err', message: e.message };
  }
}

const urls = await walkCss(path.join(DIST, 'cdn'));
console.log(`Found ${urls.size} external CDN URLs in CSS…`);
let ok = 0;
let fail = 0;
for (const url of urls) {
  const r = await downloadOne(url);
  if (r.status === 'ok') {
    ok++;
    process.stdout.write('.');
  } else if (r.status === 'exists') {
    ok++;
  } else {
    fail++;
    console.warn('\n FAIL', r.code || r.message, url.slice(0, 90));
  }
}
console.log(`\nDownloaded/exists: ${ok}, failed: ${fail}`);
const n = await (await import('./rewrite-cdn-urls.mjs')).rewriteTree(DIST);
console.log(`Rewrote ${n} files in dist/`);
