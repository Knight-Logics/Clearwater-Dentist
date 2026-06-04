import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const stats = { files: 0, badPhone: 0, weave: 0, nature: 0, canonical: 0, knight: 0, lang: 0 };

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === "index.html") {
      stats.files++;
      const h = fs.readFileSync(p, "utf8");
      if (/797-8444|7978444|758-0243|591-4577/.test(h)) stats.badPhone++;
      if (/getweave/.test(h)) stats.weave++;
      if (/Nature's Symphony/.test(h)) stats.nature++;
      if (/285-8132|2858132/.test(h)) stats.canonical++;
      if (/knight-upgrades/.test(h)) stats.knight++;
      if (h.includes('lang="en"')) stats.lang++;
    }
  }
}

walk(DIST);
console.log(stats);
