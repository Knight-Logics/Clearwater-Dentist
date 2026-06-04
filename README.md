# Clearwater Dentist — Audit & Custom Rebuild

**Client:** Dr. Nadia Pokrovskaya, D.M.D. — [clearwaterdentist.com](https://www.clearwaterdentist.com/)  
**Live preview (GitHub Pages):** https://knight-logics.github.io/Clearwater-Dentist/

Custom static rebuild of the Duda site — 72 pages, visual parity, no Duda runtime bloat.

## View the site

| | URL |
|--|-----|
| **Live preview** | https://knight-logics.github.io/Clearwater-Dentist/ |
| **Original (Duda)** | https://www.clearwaterdentist.com/ |

## Audit deliverables

| File | Purpose |
|------|---------|
| `AUDIT.md` | Full digital presence audit |
| `MEETING-PREP.md` | Office visit checklist |
| `WAVE.md` | Accessibility addendum |
| `PRINT-PACK.md` | Print instructions |

## Local development

```powershell
cd rebuild
npm install
npm run build:fast
npm run serve
```

Open http://localhost:3457

## Deploy

Push to `main` or `master` — GitHub Actions deploys to Pages automatically.

**Knight Logics** · [GitHub](https://github.com/Knight-Logics)
