# Clearwater Dentist — Digital Presence Audit

**Client:** Dr. Nadia Pokrovskaya, D.M.D. — Clearwater Dentist  
**Domain:** https://www.clearwaterdentist.com/  
**Audit date:** June 4, 2026  
**Prepared for:** Office visit — systems, CRM/automation, custom rebuild  
**Address:** 1700 N McMullen Booth Rd, Ste A1, Clearwater, FL 33759  
**Agency / platform:** Xpress, INC · **Duda** (DUDAONE) — **not WordPress**

**Rebuild preview (live):** https://knight-logics.github.io/Clearwater-Dentist/  
**Repo:** https://github.com/Knight-Logics/Clearwater-Dentist

---

## Executive summary

Clearwater Dentist has **real competitive assets**: exact-match domain, compelling doctor story, anxiety-free positioning, therapy dogs, emergency dentistry, implants, cosmetic services, facial esthetics, financing, videos, reviews, and an **active 2026 blog**. Dr. Nadia’s primary interest is a **CRM / automation system** — clarify pricing as **$1,500 setup + ~$400/mo** (she heard **$1,500/month**).

The biggest problems are **conversion confusion** (6+ phone numbers, two booking systems), **duplicate/placeholder content**, **mobile performance** (LCP 9.4s), **Duda runtime errors** (49/90 resources failed in Google’s crawl test), and **vendor lock-in** through Xpress on Duda.

**SEO note:** This audit covers **technical foundation, on-page structure, and local hygiene** in depth. **Keyword rankings, backlink profile, and Map Pack position** require Google Search Console, GBP access, and/or Ahrefs/Semrush — documented below as Phase 3 discovery, not hidden gaps.

| Area | Grade | One-line verdict |
|------|-------|------------------|
| Brand & positioning | B+ | Strong boutique/anxiety-free angle; messaging scattered |
| Conversion flow | **D** | Multiple phones, booking paths, repeated CTAs |
| Technical SEO (crawl) | B | 72 URLs indexed-ready; 0 internal 4xx; template bloat |
| On-page SEO | **C** | 35+ URLs missing H1; grammar pattern; blog cannibalization risk |
| Keyword strategy | **?** | Content exists for money terms — no GSC/rank data yet |
| Local SEO (GBP/Map Pack) | **C+** | Exact-match domain helps; NAP chaos hurts; GBP not audited |
| Backlinks / off-page | **?** | Not profiled — citations + competitor gap need tools/access |
| Content quality | C+ | Duplicates, placeholders, empty financing pages |
| Technical / UX | C | Duda bloat; ChunkLoadErrors; broken runtime JS |
| Structured data | B- | 7 valid rich-result items; 3 redundant Dentist blocks |
| Site performance (mobile) | **D+** | PSI **66** — LCP **9.4s** is a conversion killer |
| Site performance (desktop) | B | PSI **89** — acceptable but improvable |
| CRM / automation readiness | **?** | Primary client interest — discover today |
| Compliance / HIPAA | B-/C+ | Privacy policy exists; vendor BAAs unverified |

**Verdict:** Viable high-value prospect. Custom rebuild + CRM wiring — not “fix WordPress.” SEO has **good bones** (72 URLs, exact-match domain, active blog) but **NAP inconsistency, mobile speed, and missing heading structure** are holding back growth until Phase 3 data confirms rankings.

---

## Audit scope — what was and wasn’t tested

### ✅ Completed without client logins

| Area | Method | Depth |
|------|--------|-------|
| Full site crawl | 72-URL sitemap fetch (Jun 4) | Status, titles, H1, meta, phones, booking |
| PageSpeed Insights | Client-provided links (Jun 3) | Mobile + desktop lab scores, LCP, opportunities |
| Rich Results / schema | Client-provided test (Jun 3) | 7 valid items, JS errors, resource failures |
| Platform fingerprint | Live HTML + CDN headers | Duda, Xpress, third-party stack |
| Trust content scan | Manual review | Placeholders, duplicates, empty pages |
| On-page pattern analysis | Crawl exports | Title templates, H1 grammar, blog vs service URLs |
| Keyword *inventory* | Crawl + URL/title mapping | Which pages *target* which terms — not rankings |
| Custom rebuild | 72/72 pages on GitHub Pages | Visual + technical POC |

### ❌ Not completed — requires access or paid tools

| Area | Tool / access needed | Why it matters |
|------|---------------------|----------------|
| **Actual keyword rankings** | GSC, Semrush, Ahrefs, Local Falcon | Proves what drives traffic today |
| **Search impressions / CTR** | Google Search Console | Shows SERP underperformance |
| **Backlink profile** | Ahrefs, Semrush, Moz | Domain authority, toxic links, competitor gap |
| **Citation audit (NAP)** | BrightLocal, Moz Local, manual | Map Pack trust — critical with 6 phones on site |
| **Google Business Profile** | GBP manager login | Categories, reviews count, photos, posts, Q&A |
| **Map Pack position** | Local rank tracker / manual SERP | Often beats organic for “dentist near me” |
| **Google Ads history** | Ads account | Wasted spend, landing pages, conversion paths |
| **Competitor deep dive** | Ahrefs + manual SERP | Who owns implants/emergency in Clearwater |
| **Index count verification** | GSC or `site:` operator | Confirm all 72 URLs indexed vs crawled |

> **How to say this in the meeting:**  
> *“I audited everything I could see from the outside — crawl, speed, schema, content structure, and keyword mapping. I haven’t seen Search Console, your backlink profile, or where you rank in the Map Pack yet. That’s Phase 3 after today’s systems check — or a dedicated SEO retainer.”*

---

## Client meeting — pricing (clarify first)

| | |
|--|--|
| **Setup** (rebuild + CRM + automations) | **$1,500 one-time** (Phase 1) · **$4,500–$5,500** (full rebuild + CRM) |
| **Ongoing** (hosting + CRM + maintenance) | **~$400–$600/month** |
| **SEO retainer** (optional Phase 3) | **$750–$1,500/month** — keywords, content, citations, reporting |

> “The fifteen hundred is a one-time Phase 1 cleanup — phones, booking, worst site issues. Full rebuild with CRM is separate. SEO deep dive with rankings and backlinks is Phase 3 after we get Search Console and GBP access.”

---

## Pros (what’s working)

### Domain & brand
- **ClearwaterDentist.com** — premium exact-match local domain (major SEO asset for branded + geo queries)
- Differentiators: one-patient-at-a-time boutique model, Dr. Nadia’s surgical/implant/sedation background, therapy dogs, same-day emergency, facial esthetics
- Doctor narrative: Tufts D.M.D., Harvard post-bacc, Air Force oral surgery training, 27+ years, “Top 10 under ten” (Massachusetts Dental Society, 2015)

### Content & services
- **72 URLs** in sitemap — emergency, implants, cosmetic, sedation, laser, TMJ, facial esthetics, XERF, Invisalign, etc.
- **Active blog** with 2026 posts (March–June) targeting implants, emergency, anxiety, smile makeover
- Before/after gallery, patient videos, financing hub (CareCredit works), real embedded reviews
- **Chamber/community content** — Safety Harbor Chamber page signals local involvement

### SEO & accessibility (Lighthouse)
- Lighthouse **SEO score 92** (mobile & desktop) — *basics only* (see SEO section below)
- Accessibility **93**
- Rich Results: **7 valid items** (see below)
- robots.txt + XML sitemap clean; **0 internal 4xx** on full crawl

### Rebuild already built
- **72/72 pages** replicated · **441 assets** local · preview deployed to GitHub Pages

---

## Cons (risks & opportunities)

### Critical: mobile performance (PageSpeed Insights)

**Source (client-provided, Jun 3, 2026):**  
[Mobile PSI](https://pagespeed.web.dev/analysis/https-www-clearwaterdentist-com/6zlhhreqp8?form_factor=mobile) · [Desktop PSI](https://pagespeed.web.dev/analysis/https-www-clearwaterdentist-com/6zlhhreqp8?form_factor=desktop)

**No CrUX field data** — insufficient real-user traffic in Chrome UX Report.

| Metric | Mobile | Desktop |
|--------|--------|---------|
| **Performance** | **66** 🟠 | **89** 🟠 |
| Accessibility | 93 🟢 | 93 🟢 |
| Best Practices | 77 🟠 | 73 🟠 |
| SEO (Lighthouse) | 92 🟢 | 92 🟢 |
| FCP | 3.9s 🔴 | 0.8s 🟢 |
| **LCP** | **9.4s** 🔴 | 1.3s 🟠 |
| TBT | 50ms 🟢 | 210ms 🟠 |
| CLS | 0.019 🟢 | 0 🟢 |
| Speed Index | 3.9s 🟠 | 0.8s 🟢 |

**Why it matters for SEO:** Google uses **page experience** (Core Web Vitals) as a ranking signal. **9.4s LCP on mobile** hurts both rankings and conversions — most dental searches happen on phones, often from the Map Pack click-through.

**Top Lighthouse opportunities (mobile):**
1. **Render-blocking requests** — ~300ms savings
2. **Efficient cache lifetimes** — ~19 KiB
3. **Network dependency tree** — complex request chains
4. **Font display** — ~10ms (`font-display: swap`)
5. **Image delivery** — ~14 KiB

**Rebuild target:** Mobile LCP **< 2.5s**, Performance **90+**.

---

### SEO & on-page (expanded)

**Important:** Lighthouse’s “SEO” score (**92**) only checks basics (meta present, crawlable, tap targets). It does **not** reflect whether the site ranks for competitive **procedure + geo** queries or wins the **Map Pack**. The issues below are what actually limit organic growth.

#### Title tags & SERP presentation

| Issue | Impact | Example |
|-------|--------|---------|
| **Consistent service template** | ~40 service pages use `{Service} in Clearwater, FL \| Clearwater Dentist` — good geo signal but repetitive in SERPs | `/dental-implants-clearwater-fl` |
| **Homepage title OK, H1 broken** | Title is fine; **4× H1 “Welcome To”** wastes primary keyword real estate | Homepage |
| **Weak utility titles** | No geo, no brand suffix — look unfinished in SERPs | `/alphaeon` → “Alphaeon”; `/new-patient-faqs` → “New Patient FAQs” |
| **Blog titles stronger** | Many blog posts front-load intent better than service templates | `/blog/emergency-dentist-clearwater-fl` |
| **Emoji in title** | May truncate oddly in SERPs | 🦷 Needle-Free Dentistry… |
| **HTML entities in titles** | `&amp;` may display literally in some tools | Crowns &amp; Bridges… |

**Target pattern for money pages:** `{Primary Service} in Clearwater, FL | Dr. Nadia Pokrovskaya` or `{Service} Clearwater \| Clearwater Dentist` (≤ ~60 chars where possible).

#### Meta descriptions

| Issue | Impact |
|-------|--------|
| **Most service pages OK** | 160–166 chars, include CTA — decent CTR potential |
| **Truncated / broken meta** | `/5-signs-you-need-an-immediate-emergency-dental-extraction` — meta cut to **“Don”** (apostrophe encoding bug) |
| **Missing meta** | `/alphaeon`, `/new-patient-faqs`, several articles — **0 char meta** |
| **Short meta** | `/pediatric-dentistry-establishing-healthy-habits-early-on` — only 30 chars |
| **Duplicate review blocks in body** | Same testimonial repeated across pages — not meta, but hurts uniqueness signals |

#### Headings & content structure (72-URL crawl)

| Issue | Count | Impact |
|-------|-------|--------|
| **Missing H1** | **35+ URLs** | Blog posts, articles, `/sunbit`, `/alphaeon`, `/new-patient-faqs` — Google must guess page topic |
| **Multiple H1** | Homepage (**4**) | Dilutes primary keyword focus |
| **“Service at Clearwater, FL” grammar** | ~25 service H1s | Awkward phrasing vs “Dental Implants in Clearwater, FL” — weaker keyword match |
| **Blog H1 discipline** | 13 `/blog/*` URLs — **all missing H1** | Long-tail posts not structured for rankings |
| **Duda template bloat** | 2,600–13,000 words/page | Not thin content — but boilerplate dilutes unique copy ratio |

**High-intent URLs missing H1 (sample):**
- `/blog/emergency-dentist-clearwater-fl`
- `/blog/are-dental-implants-painful`
- `/dental-implants-in-clearwater-why-material-matters-how-our-team-makes-it-easy`
- `/5-signs-you-need-an-immediate-emergency-dental-extraction`
- `/sunbit`, `/alphaeon`, `/new-patient-faqs`

#### Indexation, URLs & architecture

| Issue | Impact |
|-------|--------|
| **72 URLs, 0 internal 4xx** | Clean crawl — good foundation |
| **Blog at two URL patterns** | `/blog/slug` AND root-level article slugs — inconsistent silo |
| **Potential cannibalization** | Multiple implant URLs compete for same intent (see keyword map) |
| **No neighborhood landing pages** | No Safety Harbor, Dunedin, Largo, Countryside pages — missed “dentist near [area]” |
| **Internal linking unknown** | Blog → money page links not fully mapped — likely weak “learn more” pattern |
| **Index count unverified** | Run `site:clearwaterdentist.com` in GSC today — confirm 72 vs subset indexed |

#### Local & YMYL SEO (dental / medical)

| Issue | Impact |
|-------|--------|
| **NAP chaos — 6+ phones** | **#1 local SEO risk** — GBP, site, Ads, directories may disagree |
| **Exact-match domain** | Strong for “Clearwater Dentist” branded queries |
| **3× redundant Dentist schema** | Confuses entity consolidation; one block uses SEO title as `name` |
| **No Physician schema** | Dr. Nadia not a structured entity — missed E-E-A-T signal |
| **No FAQ schema** | Service pages have FAQ-style content but no `FAQPage` markup |
| **24/7 emergency claim vs hours** | Mon–Fri 9–5 in schema/copy — trust issue for YMYL |
| **Placeholder gallery** | Stock-art titles on homepage — credibility harm for medical YMYL |
| **GBP not audited** | Categories, review count vs competitors, photo freshness unknown |

#### Keyword inventory & content gaps

**We mapped target keywords to existing pages — this is NOT a ranking report.** Rank position requires GSC/Ahrefs (Phase 3).

| Priority | Target keyword (examples) | Primary URL today | Secondary / competing URLs | Gap / action |
|----------|----------------------------|-------------------|------------------------------|--------------|
| P0 | dentist clearwater fl | `/` (homepage) | Branded domain helps | Fix 4× H1; one phone; speed |
| P0 | emergency dentist clearwater | `/emergency-dentistry-clearwater-fl` | `/blog/emergency-dentist-clearwater-fl`, `/how-emergency-dentistry-in-clearwater-fl-can-relieve-your-pain` | Consolidate internal links to canonical service page |
| P0 | dental implants clearwater | `/dental-implants-clearwater-fl` | `/blog/*` implant posts, `/dental-implants-in-clearwater-why-material-matters…` | Cannibalization risk — hub + spoke linking |
| P1 | sedation dentist clearwater | `/sedation-dentistry-clearwater-fl` | `/anti-anxiety-dentist-office` | Cross-link; FAQ schema |
| P1 | cosmetic dentist clearwater | `/cosmetic-dentistry` | `/cosmetic-dentistry-in-clearwater-fl-types-of-smile-correction-procedures` | Merge or differentiate intent |
| P1 | invisalign clearwater | `/Invisalign-service-clearwater-fl` | `/invisalign-and-oral-health-beyond-straight-teeth` | Fix URL casing; add H1 to blog |
| P1 | dental implants cost / financing | `/financing`, `/financing/carecredit` | `/sunbit`, `/alphaeon` (empty) | Complete Alphaeon/Sunbit or redirect to `/financing` |
| P2 | therapy dog dentist | `/dental-therapy-dogs-clearwater-fl` | `/what-is-a-dental-therapy-dog`, `/blog/therapy-dog-dentist-clearwater` | Unique differentiator — promote in GBP |
| P2 | laser dentistry clearwater | `/laser-dentistry` | Solea blog posts | Strong Solea angle — FAQ + video |
| P2 | pediatric dentist clearwater | `/pediatric-dentistry-clearwater-fl` | Blog pediatric posts | Title on service page drops brand suffix |
| P3 | dentist safety harbor / dunedin | *None* | — | **Content gap** — 3–5 hyper-local pages needed |
| Branded | dr nadia pokrovskaya | `/meet-the-doctor` | `/blog/why-clearwater-dentist-dr-nadia` | Physician schema + credentials |

**Blog as SEO asset:** 13+ posts under `/blog/` plus ~20 root-level articles — **good long-tail foundation** if H1s, internal links to money pages, and duplicate meta bugs are fixed. Several posts directly target high-intent terms (emergency, implants, anxiety).

**Content gaps vs typical Clearwater competitors (estimated — verify in Phase 3):**
- Neighborhood / “near me” landing pages
- Procedure cost / insurance FAQ sections on money pages
- Video embeds with `VideoObject` schema on implant/cosmetic pages
- Consistent “before/after” alt text and image SEO
- Spanish-language consideration (Pinellas County market)

#### Off-page SEO, backlinks & citations

**Status: NOT profiled.** No Ahrefs/Semrush/Moz access during this audit. Findings below are **observed signals only**.

| Signal | Status | Notes |
|--------|--------|-------|
| **Referring domains / DR** | ❓ Unknown | Requires Ahrefs or Semrush |
| **Toxic / spam links** | ❓ Unknown | Common on older Duda/agency sites — check in Phase 3 |
| **Google Business Profile** | ❓ Not audited | Likely primary traffic driver for local — get login today |
| **Third-party directories** | Partial | Reviews syndicated on locality/directory sites; full NAP audit needed |
| **Chamber / local links** | ✅ On-site | Safety Harbor Chamber page — good local signal if listed on chamber site too |
| **Social profiles** | ❓ Unknown | Check GBP linked profiles; add `sameAs` in schema |
| **Review volume vs market** | ❓ Unknown | Pinellas dental market is competitive — benchmark vs top 3 Map Pack |
| **Xpress / Duda footprint** | ⚠️ Risk | Agency-built sites often share boilerplate citations — verify uniqueness |

**Citation priorities (Phase 3 audit checklist):**
Google Business Profile · Apple Maps · Bing Places · Yelp · Healthgrades · Zocdoc · Vitals · WebMD · Facebook · BBB · Chamber(s) · CareCredit provider directory

**NAP rule for citations:** Pick **one canonical phone** (recommend `(727) 797-8444` or whichever matches GBP) and **one booking URL** before any citation cleanup — otherwise you lock in bad data.

#### Branded vs non-branded organic (SERP observation — not ranked)

**Not yet verified live.** Check on their computer during visit:

| Query | What to look for |
|-------|------------------|
| `clearwater dentist` | Do they appear? Map Pack vs organic? Who ranks #1–3? |
| `clearwaterdentist.com` | Sitelinks (Services, Meet Doctor, Book)? Knowledge panel? |
| `dr nadia pokrovskaya dentist` | Branded control — should dominate |
| `dental implants clearwater fl` | Money term — note top 3 organic + Map Pack |
| `emergency dentist clearwater` | Same-day intent — high conversion |
| `site:clearwaterdentist.com` | Indexed page count (~72 expected) |

**Hypothesis (verify today):** Exact-match domain + active site should win **branded** queries. **Non-branded** procedure + geo terms likely dominated by practices with stronger GBP review counts, consistent NAP, and faster mobile experience — until fixes above are deployed.

---

### Structured data & rich results

**Source (client-provided, Jun 3, 2026):** [Rich Results Test](https://search.google.com/test/rich-results/result?id=Izy7JEPzZrgP0xQMRVBSeQ)

**Overall:** ✅ **7 valid items detected** — eligible for rich results  
**Crawl:** Successful · Jun 3, 2026 10:32:15 PM · Google Inspection Tool smartphone

| Detected | Count | Issues |
|----------|-------|--------|
| Local businesses (Dentist) | 3 | Non-critical: missing `priceRange`, `image` on one block |
| Organization | 3 | None |
| Review snippets | 1 | None |

**Schema on homepage (verified):**
- `WebSite` — Clearwater Dentist
- `Dentist` ×3 — redundant blocks (`#business`, `#LocalBusiness`, standalone)
- Address: 1700 N McMullen Booth Rd, STE a1, Clearwater, FL 33759
- Geo: 27.984634, -82.719502

**Issues:**
- **Three separate Dentist blocks** — redundant (Duda auto + manual)
- One block uses **page SEO title** as schema `name` instead of “Clearwater Dentist”
- No `Physician` entity for Dr. Nadia Pokrovskaya, D.M.D.
- Missing `openingHours`, canonical `telephone`, `priceRange` (optional warning)
- No FAQ schema on service pages despite FAQ-style content
- No `sameAs` linking to GBP, Facebook, Instagram

**Should implement (underbuilt today):**  
`Physician` · `Dentist` (single canonical) · `Organization` · `WebSite` · `FAQPage` · `Review` · `OpeningHoursSpecification` · `sameAs` (GBP + social)

---

### JavaScript errors & Duda runtime (Rich Results “Tested page”)

| Error / finding | Impact |
|-----------------|--------|
| `Uncaught SyntaxError: '#1300582767' is not a valid selector` | Broken DOM query on homepage |
| **ChunkLoadError** ×6 — Duda runtime chunks fail | Mobile layout modules break |
| `Init initAnchorsApp failed` | In-page anchor navigation broken |
| CORS errors on Google Ads conversion pixels | Tracking unreliable |
| **49/90 page resources couldn't load** in Google’s test | Images, fonts, Duda JS chunks |

**Google Ads conversion snippet** references phone **`7277580243`** in URL — conflicts with header/footer numbers.

**Third-party stack detected:**
- Google Tag Manager / GA4 (`G-70P2GLMWC7`)
- Google Ads conversion (`17534174030`)
- Duda analytics (`d32hwlnfiv2gyn.cloudfront.net`)
- Dentrix Ascend booking (70/72 pages)
- GetWeave booking (homepage + therapy dog page)
- Embedded Google Maps

**Platform:** Duda (`DUDAONE`) via `irp.cdn-website.com` · Footer: “Website designed and maintained by **Xpress, INC**”

---

### Conversion & NAP chaos

**🚨 Highest priority — phone numbers sitewide**

| Number | Where |
|--------|-------|
| **(727) 797-8444** | Header |
| **(727) 285-8132** | Footer, Book Online CTAs |
| **(727) 758-0243** | Homepage Call Now · **Google Ads conversion** |
| 727-591-4577 | Footer — unexplained |
| 727-610-7702 | Footer — unexplained |
| 727-300-0253 | Footer — unexplained |

**Dual booking systems**

| System | Pages |
|--------|-------|
| **Dentrix Ascend** | 70 of 72 |
| **GetWeave** | Homepage + `/what-is-a-dental-therapy-dog` |

**SEO impact:** Inconsistent NAP suppresses Map Pack rankings and confuses Google’s entity understanding — often worse than a missing meta description.

---

### Trust-damaging content (verified live)

| Issue | Example |
|-------|---------|
| **Placeholder gallery** | Homepage — “Nature’s Symphony”, “Faces of Humanity”, “Beyond Boundaries”, “Breathtaking colors of our planet” |
| **Duplicate homepage blocks** | “Welcome to Clearwater Dentist” + “Individualized Care With an Artistic Touch” repeated |
| **4 H1 tags** on homepage | “Welcome To” repeated |
| **24/7 emergency claim** | Copy says 24/7; hours Mon–Fri 9–5 |
| **Empty financing page** | `/alphaeon` — title “Alphaeon”, no H1, no body |
| **Weak Sunbit page** | `/sunbit` — no H1 |
| **Truncated meta** | Blog post meta cut to “Don” (encoding bug) |

---

## Site crawl (Jun 4, 2026)

### Screaming Frog
**Screaming Frog CLI headless:** ❌ Blocked — licence file missing (`C:\Users\nknig\.ScreamingFrogSEOSpider\licence.txt`).  
**Equivalent crawl run:** ✅ Custom sitemap crawl — all **72 URLs** fetched · **0 internal 4xx**

Exports: `crawl-screaming-frog/crawl-summary.json` · `internal_all.csv` · `CRAWL-SUMMARY.md`

| Finding | Detail |
|---------|--------|
| URLs in sitemap | 72 |
| HTTP 200 | 72 |
| 4xx (internal) | **0** |
| Missing H1 | **35+** (Sunbit, Alphaeon, all `/blog/*`, most root articles, new-patient-faqs) |
| Multiple H1 | Homepage (**4**) |
| Duplicate titles | None across 72 URLs |
| Title template | ~40 pages: `…in Clearwater, FL \| Clearwater Dentist` |
| Phone variants per page | 5–6 numbers |
| Thin pages (<300 words) | 0 (Duda template bloat — 2,600+ words/page) |
| Booking: Dentrix | 70 pages |
| Booking: Weave | 2 pages |
| Broken meta | 1 (truncated to “Don”); several with 0-length meta |

---

## Technical scan summary

```
Host:           www.clearwaterdentist.com
Platform:       Duda (DUDAONE) — NOT WordPress
Agency:         Xpress, INC
CDN:            irp / lirp / static / vid.cdn-website.com
Site alias:     a227a250
Server:         nginx
Homepage HTML:  ~73 KB (gzip)
JSON-LD:        Yes — 3× Dentist + Organization + Review
Booking:        Dentrix Ascend + GetWeave
Analytics:      GA4 G-70P2GLMWC7 + Google Ads
robots.txt:     ✅ Sitemap declared
SSL:            ✅ HSTS enabled
Cache-Control:  no-cache, must-revalidate (poor caching)
```

---

## CRM & automation (client’s primary interest)

### Questions for today
- What happens when contact form submits? (email vs CRM)
- Is **Weave** active CRM or leftover booking link?
- Who manages **Google Ads**? Spend?
- **Dentrix Ascend** — admin access?
- How are Google reviews requested today?
- Missed-call follow-up process?
- HIPAA BAAs with Duda, Xpress, form handler, SMS, analytics?

### Quick wins (inside $1,500 setup)
1. One phone + one booking URL everywhere (including Ads)
2. Form → CRM → instant staff + patient notification
3. Missed call → SMS auto-reply
4. Post-visit review request sequence
5. New patient nurture email/SMS
6. Monthly dashboard: calls, forms, bookings

---

## Custom rebuild — status

| Item | Status |
|------|--------|
| Pages built | ✅ 72/72 |
| Assets downloaded | ✅ 441 (9 failed — video/font 403) |
| GitHub Pages live | ✅ https://knight-logics.github.io/High-Prospective-Clients/ |
| Fixes vs live | No ChunkLoadErrors · consolidated schema · tracking hooks · H1-ready structure |

**Show on their computer:** rebuild URL vs clearwaterdentist.com side-by-side.

---

## 5-phase improvement plan

| Phase | Focus |
|-------|--------|
| **1 — Immediate** | One phone, one booking, remove placeholders/duplicates, pricing clarify |
| **2 — Rebuild + CRM** | Deploy custom site, wire forms, missed-call SMS, review automation |
| **3 — Speed/SEO** | Mobile LCP < 2.5s, Physician schema, FAQ schema, GSC baseline, keyword report |
| **4 — Citations & links** | GBP NAP sync, directory audit, internal linking blog → money pages, local landing pages |
| **5 — Ongoing** | ~$400/mo hosting, CRM, automation maintenance, optional SEO/content retainer |

---

## Phase 3 — SEO discovery checklist (office visit)

**Run on their computer. Check boxes during visit.**

### Google Search Console
- [ ] Confirm property verified (`www` vs non-`www` — pick canonical)
- [ ] **Performance → last 3 months:** top 20 queries by impressions
- [ ] **Performance:** average position for `dentist clearwater`, `dental implants clearwater`, `emergency dentist clearwater`
- [ ] **Pages:** which URLs get the most clicks? (Blog vs service pages)
- [ ] **Indexing:** any “Crawled — not indexed” or “Duplicate without canonical”?
- [ ] **Core Web Vitals:** field data vs PSI lab scores
- [ ] **Manual actions / security issues:** any penalties?

### Google Business Profile
- [ ] Primary category (should be **Dentist** or **General Dentist**)
- [ ] Secondary categories (Cosmetic dentist? Emergency dental service? Pediatric?)
- [ ] **Review count** vs top 3 Map Pack competitors for “dentist clearwater fl”
- [ ] NAP matches chosen canonical phone + address
- [ ] Photos: count + date of last upload
- [ ] Posts / Q&A / services listed
- [ ] Booking link — Dentrix or Weave?
- [ ] Linked social profiles

### Manual SERP checks (incognito / their area)
- [ ] `dentist clearwater fl` — Map Pack top 3 + organic top 5
- [ ] `dental implants clearwater fl`
- [ ] `emergency dentist clearwater`
- [ ] `cosmetic dentist clearwater`
- [ ] `clearwater dentist` (branded)
- [ ] `site:clearwaterdentist.com` — indexed count

### Analytics & ads
- [ ] GA4: top landing pages, organic vs paid vs direct split
- [ ] Google Ads: monthly spend, top keywords, landing pages, conversion phone number
- [ ] Confirm Ads phone matches site + GBP

### Backlinks & citations (if time — or follow-up deliverable)
- [ ] Run Ahrefs/Semrush **free trial** on `clearwaterdentist.com` — referring domains, DR, top links
- [ ] Compare to 2–3 Map Pack competitors (referring domains gap)
- [ ] Spot-check NAP on Yelp, Healthgrades, Facebook, BBB
- [ ] Note any old/wrong phone or address on directories

### Export for follow-up SEO report
- [ ] GSC Performance CSV (last 16 months)
- [ ] GBP Insights screenshot (last 28 days — calls, directions, website clicks)
- [ ] List of top 5 organic competitors (names + URLs from SERP)

---

## Priority recommendations (ranked)

### P0 — Revenue, trust & local SEO foundation
1. Clarify **$1,500 once + ~$400/mo** (Phase 1 vs full package)
2. Confirm **one canonical phone** — GBP, site, Ads, top citations aligned
3. **Single booking path** — Dentrix Ascend
4. Remove placeholder gallery + duplicate homepage blocks
5. Deploy rebuild (speed + clean schema + single H1)

### P1 — CRM & automation (30 days)
6. Form → CRM pipeline
7. Missed-call SMS + review automation
8. Conversion tracking (phone, booking, emergency CTA)
9. HIPAA review on form + SMS vendors

### P2 — SEO & growth (60–90 days)
10. Consolidate schema + Physician entity + `sameAs`
11. Fix missing H1s (35+ URLs — blog, Sunbit, Alphaeon, articles)
12. Fix broken/truncated meta descriptions
13. Internal link map: blog → implant, emergency, cosmetic, sedation money pages
14. Resolve implant/emergency **cannibalization** (canonical hub pages)
15. 3–5 quality nearby-city landing pages (Safety Harbor, Dunedin, Largo)
16. **Full SEO report** — GSC queries, backlink profile, citation cleanup, monthly rank tracking

---

## Recommended audits (after today — need client access)

| Audit | Tool | Why |
|-------|------|-----|
| Google Search Console | GSC | Queries, indexing, CWV, CTR — **#1 SEO priority** |
| Google Business Profile | GBP manager | Map Pack, reviews, NAP, categories |
| GA4 + Google Ads | GA4 / Ads UI | Conversion paths, wasted spend, landing pages |
| Ahrefs or Semrush | Paid tool | Backlinks, referring domains, competitor keyword gap |
| Local rank tracker | Local Falcon / BrightLocal | Map Pack position by zip |
| Citation audit | BrightLocal / Moz | NAP consistency across directories |
| Dentrix / Weave admin | On-site | Booking + CRM integration |
| Form destination test | Submit test lead | HIPAA + routing |
| SSL Labs | ssllabs.com | Cert grade |
| `site:clearwaterdentist.com` | Google | Index count |

### Completed without access ✅
| Check | Status |
|-------|--------|
| PageSpeed Insights (mobile + desktop) | ✅ Client-provided Jun 3 |
| Rich Results Test | ✅ Client-provided Jun 3 — 7 valid items |
| Full sitemap crawl (72 URLs) | ✅ Jun 4 — 0 internal 4xx |
| On-page SEO pattern analysis | ✅ Titles, H1s, meta, keyword inventory |
| Platform fingerprint | ✅ Duda + Xpress |
| JSON-LD export | ✅ schema-current.json |
| Trust content scan | ✅ Placeholders, phones, duplicates |
| Custom rebuild | ✅ 72 pages on GitHub Pages |
| Keyword rankings | ❌ Phase 3 — needs GSC |
| Backlink profile | ❌ Phase 3 — needs Ahrefs/Semrush |
| GBP / Map Pack audit | ❌ Phase 3 — needs login |

---

## Optional SEO retainer scope (for proposal)

| Deliverable | Frequency |
|-------------|-----------|
| GSC + GBP performance report | Monthly |
| 1–2 SEO blog posts (long-tail) | Monthly |
| Internal linking + on-page tweaks | Ongoing |
| Citation monitoring + NAP fixes | Quarterly |
| Local landing page (new neighborhood) | As needed |
| Competitor rank comparison | Quarterly |
| **Price range** | **$750–$1,500/mo** depending on content volume |

---

## Links & evidence

| Resource | URL |
|----------|-----|
| Live site | https://www.clearwaterdentist.com/ |
| PageSpeed Mobile | https://pagespeed.web.dev/analysis/https-www-clearwaterdentist-com/6zlhhreqp8?form_factor=mobile |
| PageSpeed Desktop | https://pagespeed.web.dev/analysis/https-www-clearwaterdentist-com/6zlhhreqp8?form_factor=desktop |
| Rich Results Test | https://search.google.com/test/rich-results/result?id=Izy7JEPzZrgP0xQMRVBSeQ |
| Rebuild preview | https://knight-logics.github.io/Clearwater-Dentist/ |
| GitHub repo | https://github.com/Knight-Logics/Clearwater-Dentist |
| Crawl exports | `crawl-screaming-frog/internal_all.csv` |

**Print attach:** Include PSI + Rich Results screenshots you already captured (Jun 3).

---

*Office visit checklist: `MEETING-PREP.md` · Print this file (`AUDIT.md`) as the main deliverable.*
