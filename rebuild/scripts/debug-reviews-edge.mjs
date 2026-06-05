import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3457/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(500);
const edge = await page.evaluate(() => {
  const vw = window.innerWidth;
  const samples = [];
  for (const x of [0, 1, 2, vw - 3, vw - 2, vw - 1]) {
    const el = document.elementFromPoint(x, 950);
    if (!el) continue;
    const cs = getComputedStyle(el);
    samples.push({ x, tag: el.tagName, id: el.id, cls: (el.className || "").toString().slice(0, 50), bg: cs.backgroundColor });
  }
  const trust = document.querySelector(".cw-google-trust");
  const r = trust?.getBoundingClientRect();
  return { samples, trustW: r?.width, trustLeft: r?.left };
});
console.log(JSON.stringify(edge, null, 2));
await page.screenshot({ path: "screenshots/qa-reviews-section.png", fullPage: false, clip: { x: 0, y: 700, width: 1440, height: 650 } });
await browser.close();
