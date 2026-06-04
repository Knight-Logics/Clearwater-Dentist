# What to Print — Clearwater Dentist Visit

**You already have the data.** PSI, Rich Results, and the full site crawl are documented in **`AUDIT.md`** — same depth as Art Form Plastic Surgery’s audit.

---

## Print this (in order)

### 1. Main audit — **`AUDIT.md`** ← primary document (~20 pages)

This is the Art-Form-equivalent audit. It includes:

- Executive summary + grades (revised SEO/local grades)
- **Audit scope** — what was / wasn’t tested (keywords, backlinks, GBP)
- **SEO & on-page (expanded)** — titles, H1s, meta, keyword map, cannibalization, citations
- **Off-page / backlinks** — honest gaps + Phase 3 citation checklist
- **PageSpeed Insights** (your links, Jun 3 — mobile 66 / LCP 9.4s, desktop 89)
- **Rich Results Test** (your link — 7 valid items, schema issues)
- **Full site crawl** (72 URLs, 0 errors, 35+ missing H1, phones, booking)
- Duda JS errors (49/90 resources failed in Google test)
- Trust issues (placeholder gallery, phones, duplicates)
- **Phase 3 SEO discovery checklist** (GSC, GBP, SERP, Ahrefs — fill at visit)
- CRM/automation section + pricing
- 5-phase plan + priority recommendations
- Evidence links + rebuild preview URL

**Path:** `E:\Website Audit\High Prospective Clients\ClearwaterDentist\AUDIT.md`

---

### 2. Office visit checklist — **`MEETING-PREP.md`** (~4 pages)

- Pricing script ($1,500 **once** + ~$400/mo)
- 45-minute agenda
- Systems discovery checkboxes (fill in with pen at visit)
- URLs to open on **their computer**

---

### 3. Accessibility addendum — **`WAVE.md`** (~2 pages) — **print if not already done**

Separate from `AUDIT.md` — no need to re-print the main audit.

- WAVE AIM score **5.7 / 10** vs PSI Accessibility **93**
- 1 error (missing `lang`), **25 contrast errors**, 63 alerts
- Hero CTAs, phone, heading structure (ties to H1 issues in main audit)
- Report: https://wave.webaim.org/report#/https://www.clearwaterdentist.com/

**Path:** `E:\Website Audit\High Prospective Clients\ClearwaterDentist\WAVE.md`

Optional: print your WAVE homepage screenshot (Jun 4).

---

### 4. Screenshots you already captured (attach or print)

These are **not duplicated inside the markdown** — print the images you saved from Google:

| Screenshot | Source |
|------------|--------|
| PSI mobile (score 66, LCP 9.4s, filmstrip) | [PageSpeed mobile](https://pagespeed.web.dev/analysis/https-www-clearwaterdentist-com/6zlhhreqp8?form_factor=mobile) |
| PSI desktop (score 89) | [PageSpeed desktop](https://pagespeed.web.dev/analysis/https-www-clearwaterdentist-com/6zlhhreqp8?form_factor=desktop) |
| Rich Results (7 valid items) | [Rich Results Test](https://search.google.com/test/rich-results/result?id=Izy7JEPzZrgP0xQMRVBSeQ) |
| Rich Results detail (schema warnings, tested page errors) | Same test → expand Local Business items |

Optional: `rebuild/screenshots/live-home-desktop.png` vs `replica-home-v2-desktop.png`

---

## Do NOT print

- `crawl-screaming-frog/*.csv` / JSON (reference only)
- Full `rebuild/dist/` (560MB — it’s online instead)
- `schema-current.json` (summarized in AUDIT.md)

---

## Screaming Frog — accurate note

**Screaming Frog CLI did not run** (licence file missing for headless mode).

**What did run:** Full **72-URL sitemap crawl** (Jun 4) with the same SEO outputs: status codes, titles, H1s, meta, phones, booking links. Results are in `AUDIT.md` and `crawl-screaming-frog/CRAWL-SUMMARY.md`.

If they ask: *“We crawled all 72 pages — zero broken links. Screaming Frog equivalent data; SF licence wasn’t available for automated export.”*

---

## No laptop — use their PC

Open on their computer:

1. https://knight-logics.github.io/High-Prospective-Clients/ (your rebuild)
2. https://www.clearwaterdentist.com/ (live)
3. PSI / Rich Results links from AUDIT.md if needed

Your phone works as backup for the rebuild URL.

---

## Total print pack

| # | File | Pages (approx) |
|---|------|----------------|
| 1 | **AUDIT.md** | ~20 |
| 2 | **MEETING-PREP.md** | ~4 |
| 3 | **WAVE.md** (addendum) | ~2 |
| 4 | PSI + Rich Results + WAVE screenshots | 3–5 |

**Already printed AUDIT.md?** Just add **WAVE.md** + WAVE screenshot — don’t re-print the main audit.

**That’s the full audit.** The old 4-page PRINT-PACK was only a cheat sheet — **AUDIT.md is the real deliverable**, matching Art Form.
