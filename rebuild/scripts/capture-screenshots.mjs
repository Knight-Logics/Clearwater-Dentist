#!/usr/bin/env node
/** Capture header + hero screenshots for QA */
import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "screenshots");
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
    throw new Error("Server did not start on port " + PORT);
  }
}

const pwScriptPath = path.join(OUT, "_qa-shot.mjs");
const pwScript = `
import { chromium } from 'playwright';
import path from 'path';
const OUT = ${JSON.stringify(OUT)};
const shots = [
  { name: 'qa-header.png', width: 1440, height: 900, clip: { x: 0, y: 0, width: 1440, height: 100 } },
  { name: 'qa-hero.png', width: 1440, height: 900, clip: { x: 0, y: 0, width: 1440, height: 620 } },
  { name: 'qa-hero-panels.png', width: 1440, height: 900, clip: { x: 0, y: 380, width: 1440, height: 420 } },
  { name: 'qa-home-full.png', width: 1440, height: 900, fullPage: true },
];
const browser = await chromium.launch();
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.width, height: s.height } });
  await page.goto('${BASE}/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(OUT, s.name), clip: s.clip, fullPage: !!s.fullPage });
  await page.close();
  console.log('  ✓', s.name);
}
await browser.close();
`;

fs.mkdirSync(OUT, { recursive: true });
console.log("Starting QA screenshots…");
await ensureServer();
fs.writeFileSync(pwScriptPath, pwScript);
try {
  execSync(`node "${pwScriptPath}"`, { stdio: "inherit", cwd: ROOT });
} catch {
  execSync(
    `npx playwright screenshot "${BASE}/" "${path.join(OUT, "qa-home-full.png")}" --viewport-size=1440,900 --wait-for-timeout=4000 --full-page`,
    { stdio: "inherit", cwd: ROOT }
  );
}
try {
  fs.unlinkSync(pwScriptPath);
} catch {
  /* ignore */
}
console.log("Saved to screenshots/");
