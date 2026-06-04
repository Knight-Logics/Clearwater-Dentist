#!/usr/bin/env node
/** Copy dist → pages-deploy and inject GitHub Pages base href */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { rewriteTree } from './rewrite-cdn-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(ROOT, 'pages-deploy');
const BASE = process.env.PAGES_BASE || '/Clearwater-Dentist/';
const BASE_PATH = BASE.replace(/\/$/, '');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const e of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

async function injectBase(file) {
  let html = await fs.readFile(file, 'utf8');
  let changed = false;
  if (!html.includes('data-github-pages-base')) {
    const tag = `<base href="${BASE}" data-github-pages-base>`;
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>\n  ${tag}`);
    } else {
      html = tag + html;
    }
    changed = true;
  }
  if (!html.includes('jquery-3.7.0.min.js')) {
    html = html.replace(
      '<head>',
      '<head>\n  <script src="/cdn/static/libs/jquery/jquery-3.7.0.min.js" defer></script>'
    );
    changed = true;
  }
  if (changed) await fs.writeFile(file, html, 'utf8');
}

function prefixRootPaths(text) {
  if (!BASE_PATH || BASE_PATH === '/') return text;
  let out = text;

  // HTML attributes: href="/...", src="/...", srcset="/..."
  out = out.replace(
    /\b(href|src|poster|action)=["']\/(?!\/|Clearwater-Dentist\/|https?:|#)([^"']*)["']/gi,
    (_m, attr, value) => `${attr}="${BASE_PATH}/${value}"`
  );

  // srcset values can include multiple root-relative candidates.
  out = out.replace(
    /\b(srcset)=["']([^"']+)["']/gi,
    (_m, attr, value) =>
      `${attr}="${value.replace(/(^|,\s*)\/(?!\/|Clearwater-Dentist\/)([^,\s]+)/g, `$1${BASE_PATH}/$2`)}"`
  );

  // CSS url(/...) references inside style tags or stylesheet files.
  out = out.replace(
    /url\((['"]?)\/(?!\/|Clearwater-Dentist\/|data:|https?:)([^'")]+)\1\)/gi,
    (_m, quote, value) => `url(${quote}${BASE_PATH}/${value}${quote})`
  );

  // Inline CSS/import strings occasionally use quoted root paths.
  out = out.replace(
    /(["'])\/(?!\/|Clearwater-Dentist\/|data:|https?:|#)(cdn|css|js|fonts|images|assets)\//gi,
    (_m, quote, dir) => `${quote}${BASE_PATH}/${dir}/`
  );

  return out;
}

async function prefixFile(file) {
  const before = await fs.readFile(file, 'utf8');
  const after = prefixRootPaths(before);
  if (after !== before) {
    await fs.writeFile(file, after, 'utf8');
    return 1;
  }
  return 0;
}

async function walkHtml(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walkHtml(p);
    else if (e.name === 'index.html') await injectBase(p);
  }
}

async function walkDeployFiles(dir) {
  let changed = 0;
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) changed += await walkDeployFiles(p);
    else if (['.html', '.css', '.js'].some((ext) => e.name.endsWith(ext))) {
      changed += await prefixFile(p);
    }
  }
  return changed;
}

await fs.rm(OUT, { recursive: true, force: true });
await copyDir(DIST, OUT);
const rewritten = await rewriteTree(OUT);
await walkHtml(OUT);
const prefixed = await walkDeployFiles(OUT);
console.log(
  `Prepared ${OUT} with base href ${BASE} (rewrote ${rewritten} asset files, prefixed ${prefixed} files)`
);
