#!/usr/bin/env node
/** Rewrite external Duda CDN URLs → local /cdn/ paths in HTML/CSS/JS */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MANIFEST = path.join(ROOT, 'data', 'asset-manifest.json');

const CDN_HOSTS = ['irp', 'lirp', 'static', 'vid'];
const CDN_RE = new RegExp(
  `https:\\/\\/(${CDN_HOSTS.join('|')})\\.cdn-website\\.com\\/`,
  'g'
);

let urlMap = {};
try {
  const manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
  urlMap = manifest.urlMap || {};
} catch {
  /* no manifest */
}

export function rewriteCdnUrls(text) {
  if (!text || typeof text !== 'string') return text;
  let out = text;
  const entries = Object.entries(urlMap).sort((a, b) => b[0].length - a[0].length);
  for (const [remote, local] of entries) {
    if (out.includes(remote)) out = out.split(remote).join(local);
  }
  out = out.replace(CDN_RE, '/cdn/$1/');
  return out;
}

async function walk(dir, exts, fn) {
  let changed = 0;
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) changed += await walk(p, exts, fn);
    else if (exts.some((x) => e.name.endsWith(x))) changed += await fn(p);
  }
  return changed;
}

export async function rewriteTree(dir) {
  return walk(dir, ['.html', '.css', '.js'], async (file) => {
    const before = await fs.readFile(file, 'utf8');
    const after = rewriteCdnUrls(before);
    if (after !== before) {
      await fs.writeFile(file, after, 'utf8');
      return 1;
    }
    return 0;
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const target = process.argv[2] || path.join(ROOT, 'dist');
  const n = await rewriteTree(target);
  console.log(`Rewrote CDN URLs in ${n} files under ${target}`);
}
