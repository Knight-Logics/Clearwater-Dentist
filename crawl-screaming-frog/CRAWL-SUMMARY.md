# Screaming Frog / Sitemap Crawl Summary

**Site:** https://www.clearwaterdentist.com/  
**Date:** June 4, 2026  
**Tool:** Custom sitemap crawl (Screaming Frog CLI blocked — licence missing for headless)  
**URLs:** **72** in sitemap · all fetched successfully  

## Exports in this folder

| File | Contents |
|------|----------|
| `crawl-summary.json` | Machine-readable summary |
| `internal_all.csv` | URL, title, H1, meta, phones, booking |
| `crawl-results.json` | Full per-page crawl data |

Re-run: `node ../technical/crawl-sitemap.mjs`

---

## HTTP status

| Code | Count |
|------|-------|
| 200 | 72 |
| 4xx (internal) | 0 |

---

## Key issues for proposal

1. **Phone NAP chaos** — 6+ distinct numbers on homepage; 5 numbers on most inner pages.
2. **Dual booking** — Dentrix Ascend (70/72 pages) + GetWeave (homepage + therapy dog page).
3. **Homepage** — 4 H1 tags; duplicate "Welcome to Clearwater Dentist" and "Individualized Care" blocks.
4. **Placeholder gallery** — "Nature's Symphony", "Faces of Humanity", "Beyond Boundaries".
5. **Missing H1** — **35+ URLs** including Sunbit, Alphaeon, all `/blog/*`, most root-level articles, new-patient-faqs.
6. **Weak title** — `/alphaeon` → title is just "Alphaeon".
7. **Truncated meta** — blog post meta cut to "Don" (apostrophe encoding bug).
8. **H1 grammar** — pattern "Service **at** Clearwater, FL" sitewide.

---

## Phone variants (sitewide)

| Number | Notes |
|--------|-------|
| (727) 797-8444 | Header / primary on most pages |
| (727) 285-8132 | Footer + Book Online CTAs |
| (727) 758-0243 | Homepage Call Now section only |
| 727-591-4577 | Footer — unexplained |
| 727-610-7702 | Footer — unexplained |
| 727-300-0253 | Footer — unexplained |

---

## Booking systems detected

| System | Pages |
|--------|-------|
| Dentrix Ascend | 70 |
| GetWeave | 2 (homepage, `/what-is-a-dental-therapy-dog`) |

---

## Screaming Frog CLI (when licensed)

```powershell
$cli = "C:\Program Files (x86)\Screaming Frog SEO Spider\ScreamingFrogSEOSpider.exe"
$out = "E:\Website Audit\High Prospective Clients\ClearwaterDentist\crawl-screaming-frog"
& $cli --crawl "https://www.clearwaterdentist.com/" --headless --output-folder $out --overwrite --export-format csv --export-tabs "Internal:All,Page Titles:All,Meta Description:All,H1:All,Structured Data:All,Response Codes:All"
```

Requires licence file at `C:\Users\nknig\.ScreamingFrogSEOSpider\licence.txt`.
