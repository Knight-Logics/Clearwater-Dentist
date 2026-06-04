# Clearwater Dentist — WAVE Accessibility Addendum

**Addendum to:** `AUDIT.md` (Jun 4, 2026)  
**Client:** Dr. Nadia Pokrovskaya, D.M.D. — Clearwater Dentist  
**URL tested:** https://www.clearwaterdentist.com/ (homepage)  
**Tool:** [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/) by WebAIM  
**Report:** https://wave.webaim.org/report#/https://www.clearwaterdentist.com/  
**Date:** June 4, 2026

> **Print note:** This is a **1-page addendum** — stapled behind `AUDIT.md`. No need to re-print the main audit.

---

## Executive summary

WAVE found **1 error**, **25 contrast failures**, and **63 alerts** on the homepage. **AIM Score: 5.7 / 10.**

PageSpeed Insights reported **Accessibility 93** on the same site — that score checks a narrow automated ruleset. WAVE surfaces **real user-facing issues** (contrast, heading structure, form labels, ARIA complexity) that Lighthouse underweights.

For a practice that markets **anxiety-free, patient-comfort dentistry**, accessibility is both a **trust signal** and a **legal/compliance consideration** (ADA Title III for public accommodations — consult counsel; this is not legal advice).

| Finding | Count | Severity |
|---------|-------|----------|
| Errors | **1** | 🔴 Fix immediately |
| Contrast errors | **25** | 🔴 Fix in rebuild |
| Alerts | **63** | 🟠 Triage by impact |
| AIM Score | **5.7 / 10** | 🟠 Below acceptable for medical YMYL |

**Rebuild opportunity:** Custom site can fix lang attribute, contrast, heading hierarchy, and form labels in one pass — included in Phase 2 deploy.

---

## WAVE summary (homepage)

| Category | Count |
|----------|-------|
| **Errors** | 1 |
| **Contrast errors** | 25 |
| **Alerts** | 63 |
| Features | 28 |
| Structural elements | 78 |
| ARIA | 302 |

---

## Errors (1) — must fix

### Language missing or invalid
- The document `<html>` element lacks a valid **`lang`** attribute (e.g. `lang="en"`).
- **Impact:** Screen readers may mispronounce content; WCAG 2.x failure (3.1.1 Language of Page).
- **Fix:** Add `lang="en"` on `<html>` in site template. **5-minute fix** on rebuild.

---

## Contrast errors (25) — visible on hero & CTAs

**Issue:** Text/background combinations fail WCAG contrast minimums (4.5:1 normal text, 3:1 large text).

**Confirmed on homepage (from WAVE overlay):**
- **BOOK ONLINE** button (header)
- Phone number **(727) 285-8132** (header bar)
- **BOOK AN APPOINTMENT TODAY!** (hero left panel)
- **BOOK NOW** (hero right panel — emergency treatment)
- Additional contrast flags across navigation and body sections

**Impact:** Low-vision patients and older adults — a core dental demographic — cannot read CTAs. Also hurts outdoor/mobile viewing in bright light.

**Fix in rebuild:**
- Darken teal/orange button backgrounds OR lighten button text
- Re-test with WAVE contrast picker or WebAIM Contrast Checker
- Target **WCAG AA** minimum on all buttons and phone links

---

## Alerts (63) — top priorities

| Alert | Count | What it means | Priority |
|-------|-------|---------------|----------|
| **Possible headings** | 38 | Styled text that looks like headings but isn’t `<h1>`–`<h6>` | P1 — ties to SEO H1 issues in AUDIT.md |
| **Redundant links** | 6 | Adjacent links to the same URL (confusing for screen readers) | P1 |
| **Orphaned form labels** | 4 | Labels not associated with inputs | P1 — contact/booking forms |
| **Skipped heading level** | 1 | Heading order jumps (e.g. h1 → h3) | P1 |
| **Device-dependent event handler** | 1 | Interaction may require mouse, not keyboard | P2 |

### Heading structure (connects to main audit)

WAVE confirms what the crawl found — **broken heading hierarchy on homepage:**

- **`<h1>`** — “Welcome to the Office of Dr. Nadia”
- **`<h2>`** — “YOU DESERVE A BEAUTIFUL SMILE”
- Hero panels marked **`h7`** in WAVE overlay — **not valid HTML** (headings stop at `<h6>`). Duda is using styled divs or invalid levels.
- Additional **`<h1>`** lower on page — “Welcome to Clearwater Dentist” (matches **4× H1** finding in `AUDIT.md`)

**SEO + accessibility:** One clear `<h1>` per page, logical `h2` → `h3` order. Rebuild should enforce this.

### ARIA: 302 attributes

High ARIA count often means **complex widgets** (nav, sliders, modals) compensating for non-semantic HTML. Not automatically bad — but **302 on one homepage** suggests Duda runtime overhead. Simpler semantic HTML in rebuild reduces ARIA dependency.

---

## PSI vs WAVE — why scores disagree

| Tool | Accessibility score | What it measures |
|------|---------------------|------------------|
| **PageSpeed Insights** | **93** | Lighthouse subset (~40 automated checks) |
| **WAVE** | **AIM 5.7 / 10** | Errors + contrast + alerts with visual overlay |

Lighthouse can pass while **contrast, lang, and heading structure** still fail WAVE. Use **both**: PSI for CWV/performance, WAVE for accessibility depth.

---

## Recommended fixes (ranked)

### P0 — Rebuild blockers
1. Add `lang="en"` to `<html>`
2. Fix **25 contrast errors** on CTAs, phone, nav
3. Single `<h1>` per page; valid heading order (no skipped levels, no fake `h7`)

### P1 — Forms & navigation
4. Associate all form labels (contact, newsletter, booking embeds)
5. Remove redundant adjacent links
6. Ensure keyboard access for all CTAs (fix device-dependent handler)

### P2 — Ongoing
7. Alt text audit on gallery (placeholder images in AUDIT.md need real alt or removal)
8. Manual screen-reader test (NVDA/VoiceOver) on booking flow
9. Optional: WCAG 2.2 AA formal audit if legal/compliance requested

---

## What to say in the meeting (30 seconds)

> “PageSpeed gave you a 93 on accessibility, but WAVE — the standard tool hospitals and universities use — scored 5.7 out of 10. You have one hard error, 25 contrast problems on your Book buttons and phone number, and broken heading structure. For a practice that specializes in anxious patients, that’s worth fixing in the rebuild. I brought a one-page addendum — we don’t need to redo the whole audit.”

---

## Evidence

| Resource | URL |
|----------|-----|
| WAVE report (live) | https://wave.webaim.org/report#/https://www.clearwaterdentist.com/ |
| WebAIM Contrast Checker | https://webaim.org/resources/contrastchecker/ |
| Main audit (companion) | `AUDIT.md` — crawl H1s, performance, CRM |

**Optional print:** Screenshot of WAVE homepage overlay (you captured Jun 4).

---

*Staple behind `AUDIT.md` · Does not replace full WCAG audit or legal ADA review.*
