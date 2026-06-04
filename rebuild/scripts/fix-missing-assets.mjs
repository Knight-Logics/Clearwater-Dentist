#!/usr/bin/env node
/** Replace assets that 403 from origin and never downloaded */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { rewriteTree } from './rewrite-cdn-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = process.argv[2] || path.join(ROOT, 'dist');

const REPLACEMENTS = [
  // Patient testimonial mp4 — origin returns 403; use downloaded Julia testimonial instead
  [
    /oMxQQ7D4RHycPqcdz2c3_2024\+Edited\+Patient\+Testimonial\+Video-v\.mp4/g,
    'ywmR4ZpSfW700HOBQ1fQ_Julia+Patient+Testimonial-v.mp4',
  ],
  // Multiscreensite education bg — 403; use local hero-style background already on site
  [
    /https:\/\/irt-cdn\.multiscreensite\.com\/ce0bb35f932b47bb809d0e37905542ba\/dms3rep\/multi\/site_background_education-2087x1173\.jpg/g,
    '/cdn/irp/a227a250/dms3rep/multi/Clearwater-+Dentist-clearwater-fl-homescreen.png',
  ],
  [
    /https:\/\/rtc\.multiscreensite\.com/g,
    '',
  ],
];

async function walk(dir, fn) {
  let n = 0;
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) n += await walk(p, fn);
    else if (/\.(html|css|js)$/.test(e.name)) n += await fn(p);
  }
  return n;
}

let changed = 0;
await walk(DIST, async (file) => {
  let text = await fs.readFile(file, 'utf8');
  let out = text;
  for (const [from, to] of REPLACEMENTS) {
    out = out.replace(from, to);
  }
  if (out !== text) {
    await fs.writeFile(file, out, 'utf8');
    changed++;
  }
});

console.log(`fix-missing-assets: updated ${changed} files in ${DIST}`);
