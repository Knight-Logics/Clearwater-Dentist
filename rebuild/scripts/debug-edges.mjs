import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3457/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);

const edge = await page.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      w: Math.round(r.width * 100) / 100,
      left: Math.round(r.left * 100) / 100,
      right: Math.round(r.right * 100) / 100,
      border: `${cs.borderLeftWidth} / ${cs.borderRightWidth}`,
      outline: cs.outlineWidth,
      boxShadow: cs.boxShadow !== "none" ? cs.boxShadow.slice(0, 80) : "none",
      margin: cs.margin,
      padding: cs.padding,
      overflow: cs.overflowX,
    };
  };
  const vw = window.innerWidth;
  const samples = [];
  for (let x of [0, 1, 2, vw - 1, vw - 2, vw - 3]) {
    const el = document.elementFromPoint(x, 400);
    if (el) {
      const cs = getComputedStyle(el);
      samples.push({
        x,
        tag: el.tagName,
        id: el.id || null,
        cls: (el.className || "").toString().slice(0, 60),
        bg: cs.backgroundColor,
      });
    }
  }
  return {
    vw,
    html: pick("html"),
    body: pick("body"),
    dmInner: pick(".dmInner"),
    mainBorder: pick(".mainBorder"),
    trust: pick(".cw-google-trust-section"),
    trustInner: pick(".cw-google-trust"),
    samples,
  };
});
console.log(JSON.stringify(edge, null, 2));

await page.screenshot({
  path: "screenshots/qa-reviews-section.png",
  clip: { x: 0, y: 620, width: 1440, height: 700 },
});
await page.screenshot({
  path: "screenshots/qa-edge-left.png",
  clip: { x: 0, y: 0, width: 8, height: 900 },
});
await browser.close();
