import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3457/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);

const metrics = await page.evaluate(() => {
  const hero = document.getElementById("1300582767");
  const html = document.documentElement;
  const header = document.querySelector(".cw-site-header");
  return {
    htmlPadding: getComputedStyle(html).padding,
    htmlWidth: html.getBoundingClientRect().width,
    bodyLeft: document.body.getBoundingClientRect().left,
    bodyWidth: document.body.getBoundingClientRect().width,
    headerLeft: header?.getBoundingClientRect().left,
    headerWidth: header?.getBoundingClientRect().width,
    heroLeft: hero?.getBoundingClientRect().left,
    heroWidth: hero?.getBoundingClientRect().width,
    heroPadding: hero
      ? `${getComputedStyle(hero).paddingLeft} / ${getComputedStyle(hero).paddingRight}`
      : null,
    hasLateCss: !!document.querySelector('link[href*="cw-fullbleed-overrides"]'),
    viewport: window.innerWidth,
    pass:
      html.getBoundingClientRect().width === window.innerWidth &&
      document.body.getBoundingClientRect().left === 0 &&
      hero?.getBoundingClientRect().left === 0 &&
      hero?.getBoundingClientRect().width === window.innerWidth,
  };
});

console.log(JSON.stringify(metrics, null, 2));
process.exit(metrics.pass ? 0 : 1);
