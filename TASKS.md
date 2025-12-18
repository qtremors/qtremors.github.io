# Project Tasks & Issues

> **Last Updated:** December 18, 2025  
> **Portfolio Version:** v2.3.0

---

## � Remaining Tasks

### Code Quality
- [ ] **Duplicate Theme Init Scripts:** Extract shared theme initialization from `index.html` and `project.html`
- [ ] **Settings Modal Duplication:** Consider extracting to shared component
- [ ] **Mixed Quote Styles:** Standardize quotes across JS files
- [ ] **localStorage Key Naming:** Standardize naming convention

### Accessibility
- [ ] **Focus Management:** Modal focus trapping and return on close
- [ ] **ARIA Live Regions:** Improve toast announcements

### Functionality
- [ ] **Theme Sync Across Pages:** Fix brief flash on page navigation
- [ ] **Loading States:** Add skeleton loaders for projects

### UI/UX
- [ ] **Mobile Navigation Overlap:** Fix on very small screens
- [x] **Back to Top Button:** Not needed - navbar always visible
- [x] **Project Card Click Target:** Entire card now clickable (except external links)

### SEO
- [x] **Structured Data:** Added JSON-LD Person/ProfilePage schemas

### Performance (Later)
- [ ] **Large GIF Files:** Optimize or convert to WebP
- [ ] **Large Preview Images:** Compress PNGs
- [ ] **Render-Blocking CSS:** Consider critical CSS
- [ ] **Mousemove Performance:** Throttle magnetic text effect

### Low Priority
- [ ] **Console Easter Egg Escaping:** Clean up ASCII art escaping
- [ ] **TUI ASCII Art Mobile:** Known issue, hard to fix

---

## �️ Unused Assets (Can Delete)
`MD3.svg`, `music-preview.png`, `nexus-preview0.png`, `python.gif`, `qtrmrs-preview.png`, `scrap-preview.png`, `tremors_fav.png`, `tremors_github.jpg`, `workingonit.gif`

---

## ✅ Completed (v2.3.0 Sprint)

- [x] TUI typo fix (Nextjs. → Next.js)
- [x] 404.html script defer
- [x] Footer version → v2.2.3
- [x] Skills sync (TypeScript badge, remove Next.js from TUI)
- [x] 5-line CSS clamp for project descriptions
- [x] Null check in home.js
- [x] Comment numbering fix
- [x] JSON fetch error display
- [x] Toast element warning
- [x] Terminal Auto-detect reset button
- [x] TUI ARIA labels
- [x] Project page canonical tags
