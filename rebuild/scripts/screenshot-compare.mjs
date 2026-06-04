#!/usr/bin/env node
/** Screenshot live vs replica homepage for visual diff (requires playwright) */
import { execSync } from 'node:child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'screenshots');

async function shot(url, name) {
  try {
    execSync(
      `npx playwright screenshot "${url}" "${path.join(OUT, name)}" --viewport-size=1440,900 --wait-for-timeout=3000`,
      { stdio: 'inherit' }
    );
  } catch (e) {
    console.warn('Screenshot failed for', url, '- install playwright: npx playwright install chromium');
  }
}

await fs.mkdir(OUT, { recursive: true });
console.log('Capturing live vs replica…');
await shot('https://www.clearwaterdentist.com/', 'live-home-desktop.png');
await shot('http://localhost:3457/', 'replica-home-desktop.png');
await shot('https://www.clearwaterdentist.com/', 'live-home-mobile.png');
await shot('http://localhost:3457/', 'replica-home-mobile.png');
console.log('Saved to screenshots/');
