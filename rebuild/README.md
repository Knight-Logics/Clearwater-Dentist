# Clearwater Dentist — Custom Rebuild (Full Replica)

Mirrors the live **Duda** site: same header, body sections, inline CSS, images, fonts, hero slider, and scroll animations — without Duda runtime bloat, broken chunk loaders, or Xpress dependency.

## Quick start

```powershell
cd "E:\Website Audit\High Prospective Clients\ClearwaterDentist\rebuild"
npm install
npm run build    # 72 pages + CDN asset download
npm run serve    # http://localhost:3457
```

**Hard refresh** (Ctrl+F5) after rebuilding.

## What this includes

- **72 pages** from sitemap — shared `.dmHeader` + `#dm_content` + `.dmFooter` shell
- **Local CDN assets** in `public/cdn/` (irp, lirp, static, vid)
- **Fonts:** Be Vietnam, Epilogue, Fjalla One, Poppins, Montserrat, Roboto, Lato, Source Sans Pro
- **Hero slider:** flexslider / dmImageSlider auto-rotate
- **Animations:** `fadeInUp` scroll reveal (`duda-animations.js`)
- **Mobile nav:** hamburger drawer (`duda-nav.js`)
- **Tracking hooks:** phone + booking click placeholders in `site.js`
- **Schema:** consolidated Dentist + Physician JSON-LD

## Rebuild commands

| Command | Action |
|---------|--------|
| `npm run pages` | Refresh `data/pages.json` from sitemap |
| `npm run assets` | Download CDN assets only |
| `npm run build` | Full pipeline |
| `npm run build:fast` | Skip asset download (use existing) |
| `npm run serve` | Preview at :3457 |
| `npm run screenshot` | Compare live vs replica (when Playwright installed) |

## Compare to live

Screenshots saved in `screenshots/`:
- `live-home-desktop.png` vs `replica-home-v2-desktop.png` — **close match** (full HTML mirror v2)
- Run `npm run screenshot` to refresh comparisons

1. Open https://www.clearwaterdentist.com/ and http://localhost:3457 side by side
2. Check header, hero slider, footer, fonts, mobile breakpoint
3. Remaining polish: failed video assets (403), per-page QA on money pages

## Deploy

Upload `dist/` to static host (Hostinger, Cloudflare Pages, Netlify). Map all 72 URL paths. Add 301s only if paths change.

## Client ownership

Confirm rights to copy, images, and design before production deploy. Site credit: Xpress, INC on Duda.

## Related audit files

- `../AUDIT.md` — full digital presence audit
- `../MEETING-PREP.md` — meeting + CRM discovery
- `../crawl-screaming-frog/` — SEO crawl data
