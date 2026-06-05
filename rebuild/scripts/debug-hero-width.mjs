#!/usr/bin/env node
import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 3457;
const BASE = `http://localhost:${PORT}`;

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function ensureServer() {
  try {
    execSync(`curl -s -o NUL -w "%{http_code}" ${BASE}/`, { stdio: "pipe" });
  } catch {
    spawn("npx", ["--yes", "serve", "dist", "-l", String(PORT)], {
      cwd: ROOT,
      stdio: "ignore",
      detached: true,
      shell: true,
    }).unref();
    for (let i = 0; i < 20; i++) {
      await wait(500);
      try {
        execSync(`curl -s -o NUL -w "%{http_code}" ${BASE}/`, { stdio: "pipe" });
        return;
      } catch {
        /* retry */
      }
    }
    throw new Error("Server did not start");
  }
}

const debugScript = path.join(ROOT, "screenshots", "_debug-width.mjs");
const script = `
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('${BASE}/', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

const data = await page.evaluate(() => {
  const ids = [
    'dmRoot', 'dm', 'dm-outer-wrapper', 'dmStyle_outerContainer', 'dmStyle_innerContainer',
    '1300582767', '1716942098', 'dmFirstContainer'
  ];
  const vw = window.innerWidth;
  const out = { viewport: vw, elements: {} };
  for (const id of ids) {
    const el = document.getElementById(id) || document.querySelector('.' + id);
    const target = document.getElementById(id) || document.querySelector('#' + id) || document.body;
    const node = document.getElementById(id);
    if (!node) { out.elements[id] = null; continue; }
    const r = node.getBoundingClientRect();
    const cs = getComputedStyle(node);
    out.elements[id] = {
      width: Math.round(r.width),
      left: Math.round(r.left),
      right: Math.round(r.right),
      maxWidth: cs.maxWidth,
      widthCss: cs.width,
      marginLeft: cs.marginLeft,
      marginRight: cs.marginRight,
      paddingLeft: cs.paddingLeft,
      paddingRight: cs.paddingRight,
      overflow: cs.overflow,
      classes: node.className?.slice?.(0, 120),
    };
  }
  const hero = document.getElementById('1300582767');
  const video = hero?.querySelector('.videobgframe, .videobgwrapper, video');
  if (video) {
    const r = video.getBoundingClientRect();
    const cs = getComputedStyle(video);
    out.video = { width: Math.round(r.width), left: Math.round(r.left), tag: video.tagName, maxWidth: cs.maxWidth };
  }
  const body = document.body;
  out.bodyClasses = body.className;
  out.htmlOverflow = getComputedStyle(document.documentElement).overflowX;
  out.bodyOverflow = getComputedStyle(body).overflowX;
  return out;
});

console.log(JSON.stringify(data, null, 2));

await page.screenshot({
  path: '${path.join(ROOT, "screenshots", "qa-hero-debug.png").replace(/\\/g, "/")}',
  clip: { x: 0, y: 80, width: 1440, height: 500 },
});
await browser.close();
`;

await ensureServer();
fs.mkdirSync(path.join(ROOT, "screenshots"), { recursive: true });
fs.writeFileSync(debugScript, script);
execSync(`node "${debugScript}"`, { stdio: "inherit", cwd: ROOT });
