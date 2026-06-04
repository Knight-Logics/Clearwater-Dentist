# Pre-Visit Audits (No Login Required)

**Completed · Jun 4, 2026**  
**Client:** Clearwater Dentist · Dr. Nadia Pokrovskaya, D.M.D.  
**Domain:** https://www.clearwaterdentist.com/  
**Decision:** Custom rebuild + CRM/automation (not Duda cleanup)

---

## Platform discovery

| Signal | Finding |
|--------|---------|
| HTML `SiteType` | **DUDAONE** (Duda — not WordPress) |
| CDN | `irp.cdn-website.com/a227a250` |
| Footer credit | **Xpress, INC** |
| Server | nginx |

---

## External audit results (user-provided links)

| Tool | Link | Key result |
|------|------|------------|
| PSI Mobile | [PageSpeed Mobile](https://pagespeed.web.dev/analysis/https-www-clearwaterdentist-com/6zlhhreqp8?form_factor=mobile) | Perf **66**, LCP **9.4s** |
| PSI Desktop | [PageSpeed Desktop](https://pagespeed.web.dev/analysis/https-www-clearwaterdentist-com/6zlhhreqp8?form_factor=desktop) | Perf **89**, LCP 1.3s |
| Rich Results | [Rich Results Test](https://search.google.com/test/rich-results/result?id=Izy7JEPzZrgP0xQMRVBSeQ) | **7 valid items**; 49/90 resources failed in Google crawl |

---

## Crawl summary

| Tool | Result |
|------|--------|
| Screaming Frog CLI | ❌ Licence missing for headless |
| Sitemap crawl | ✅ 72 URLs, 0 4xx |
| Rebuild | ✅ 72 pages built, 441 assets |

---

## Rich Results — technical red flags

From [tested page details](https://search.google.com/test/rich-results/result?id=Izy7JEPzZrgP0xQMRVBSeQ):

- **ChunkLoadError** ×6 — Duda runtime JS fails
- **Invalid selector** `#1300582767`
- **initAnchorsApp failed**
- Google Ads conversion references phone **7277580243**
- **49/90 resources** couldn't load (images, fonts, Duda chunks)

---

## Client meeting — pricing clarification needed

| What you said | What she heard |
|---------------|----------------|
| $1,500 | $1,500 **per month** |

**Clarify:** $1,500 **one-time setup** (rebuild + CRM) + **~$400/month** ongoing.

---

## Completed without access

| Audit | Result |
|-------|--------|
| PageSpeed | Mobile 66 / Desktop 89 |
| Rich Results | 7 valid; duplicate schema; JS errors |
| Sitemap crawl | 72 URLs; 6+ phones; dual booking |
| Platform | Duda + Xpress |
| Rebuild POC | 72 pages at `rebuild/dist/` |

---

## Needs access at office

Duda/Xpress admin · Dentrix Ascend · Weave · GBP · GSC · GA4 · Ads · form destination · HIPAA/BAAs · CRM current state · who pays Xpress monthly

---

## Rebuild preview

```powershell
cd "E:\Website Audit\High Prospective Clients\ClearwaterDentist\rebuild"
npm run serve
# → http://localhost:3457
```
