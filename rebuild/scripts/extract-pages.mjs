#!/usr/bin/env node
/** Generate data/pages.json from live sitemap */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const xml = await fetch('https://www.clearwaterdentist.com/sitemap.xml').then((r) => r.text());
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const pages = urls.map((url) => {
  const u = new URL(url);
  let p = u.pathname;
  if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
});

pages.sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

await fs.mkdir(path.join(ROOT, 'data'), { recursive: true });
await fs.writeFile(path.join(ROOT, 'data/pages.json'), JSON.stringify(pages, null, 2) + '\n');
console.log(`Wrote ${pages.length} pages to data/pages.json`);
