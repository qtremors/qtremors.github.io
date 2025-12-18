# Project Tasks & Issues

> **Last Updated:** December 18, 2025 (Deep Review on dev branch)  
> **Portfolio Version:** v2.3.1

---

## 🐛 Bugs & Issues

### High Priority

- [x] **TUI Skills Typo:** Fixed "Nextjs." → "Next.js" in `tui.html`
- [x] **404 Page Missing Script Defer:** Added `defer` to `404.html` script tag
- [x] **Footer Version Mismatch:** Updated to v2.2.3 in `index.html` and `project.html`
- [x] **Project Page Missing Hero Background Controls:** N/A - project.html has no hero section
- [x] **GitHub Card Path Issue:** Verified OK, pattern not found

### Medium Priority

- [x] **Plant Disease Detector Dead Link:** Intentional placeholder for offline projects
- [x] **TUI/index.html Skills Sync:** TypeScript added to index.html, Next.js removed from TUI

### Low Priority

- [x] **Inconsistent Comment Numbering:** Fixed duplicate "6." → "7." in `index.html` inline script
- [ ] **Console Easter Egg Escaping:** Easter egg ASCII art in `extras.js` uses double backslash escaping - works but inconsistent style

---

## 🔧 Logic & Code Quality

### Refactoring Opportunities

- [ ] **Duplicate Theme Init Scripts:** Theme initialization script is duplicated between `index.html` (lines 53-113) and `project.html` (lines 41-102). Consider extracting to a shared inline module
- [ ] **Settings Modal Duplication:** Full settings modal HTML is duplicated across `index.html`, `project.html`, and `404.html`. Consider using a shared component or JavaScript injection
- [x] **TUI Projects Hard-Coded:** Intentional - TUI is a pure HTML+CSS showcase with no JavaScript

### Missing Error Handling

- [x] **No Fallback for JSON Fetch Failure:** Added user-friendly error card display in `home.js`
- [x] **Missing Toast Element Check:** Added `console.warn` in `index.js` showToast when element missing

### Code Inconsistencies

- [ ] **Mixed Quote Styles:** Codebase mixes single and double quotes inconsistently across JS files
- [ ] **Inconsistent Function Declaration:** Mix of arrow functions and traditional functions without clear pattern
- [ ] **localstorage Key Naming:** Inconsistent naming (`style_mode`, `effect_mode`, `theme_pref`, `spotlight_mode`, `hero_bg_mode`) - some use underscores, some don't follow a pattern

---

## ⚡ Half-Baked Features

- [x] **TUI Theme/Font Not Persisted:** Cannot be fixed without JavaScript - CSS has no access to localStorage or cookies. This is acceptable for the pure CSS showcase.
- [x] **Terminal Theme Persistence in project.html:** Added "Auto" button to reset to system-detected OS theme

---

## 🗑️ Dead Code & Unused Files

### Unused Asset Files (9 files not referenced anywhere):
- `MD3.svg`
- `music-preview.png`
- `nexus-preview0.png`
- `python.gif`
- `qtrmrs-preview.png`
- `scrap-preview.png`
- `tremors_fav.png`
- `tremors_github.jpg`
- `workingonit.gif`

---

## 🎯 Missing Features

### Accessibility

- [ ] **Focus Management:** Modal opens don't trap focus or return focus on close
- [ ] **ARIA Live Regions:** Toast uses `aria-live="polite"` but doesn't announce changes properly
- [x] **TUI Missing ARIA Labels:** Added aria-labels to TUI navigation links

### Functionality

- [ ] **Theme Sync Across Pages:** Theme changes in settings don't immediately reflect on navigation to new page (brief flash)
- [ ] **Search Functionality:** No way to search/filter projects in the portfolio (decide later)
- [ ] **Loading States:** No skeleton loaders or spinners while fetching `projects.json`
- [ ] **Offline Support:** No service worker or fallback for offline access

### SEO

- [ ] **Missing Structured Data:** JSON-LD or Schema.org markup for rich search snippets (Person, Portfolio, Project schemas)
- [x] **Project Pages Missing Canonical:** Added dynamic canonical tags in `project.js`

---

## 🎨 UI/UX Issues

### Visual Polish

- [ ] **Mobile Navigation Overlap:** On very small screens, navigation items may overlap or truncate

### User Experience

- [ ] **No "Back to Top" Button:** Long scrolling pages lack quick return mechanism
- [ ] **Project Card Click Target:** Entire card should be clickable, not just title and image
- [x] **Project Description Line Count:** Added 5-line CSS clamp in `index-sections.css`

### Responsive Design

- [ ] **TUI ASCII Art Breaks on Mobile:** ASCII logos/art may not render properly on narrow screens (known issue, hard to fix)

---

## ⚡ Performance & Efficiency

### Resource Optimization (Later)

- [ ] **Large GIF Files:** `404.gif` (474KB), `logo.gif` (500KB), `coding.gif` (459KB) should be optimized or converted to WebP/AVIF
- [ ] **Large Preview Images:** Several preview PNGs are 1-2MB each - should be compressed
- [ ] **Video Size:** `v0.0.0-v2.0.0.mp4` is 5MB - consider lazy loading or offering lower quality

### Code Efficiency

- [ ] **Event Listener Cleanup:** No cleanup for event listeners when navigating away
- [ ] **Mousemove Performance:** `extras.js` attaches a global `mousemove` listener that iterates over every `.magnetic-word` span on every mouse move - consider throttling (later)
- [x] **Missing null checks:** Added null check for `githubCard` in `home.js` insertBeforeGithub function

### Loading Performance (Later)

- [ ] **Render-Blocking CSS:** Multiple CSS files loaded synchronously in `<head>`
- [ ] **No Critical CSS:** No inline critical CSS for above-the-fold content
- [ ] **Preload Priorities:** Only `projects.json` is preloaded - consider fonts and hero image

---

## 📚 Documentation

### Changelog

- [x] **Well Maintained:** CHANGELOG.md is comprehensive and follows good practices ✓

---

## 🔮 Future Improvements

### Suggested Enhancements

- [ ] **Dark Mode Toggle Animation:** Add smooth transition when toggling between light/dark
- [ ] **Project Filtering/Tags:** Allow filtering projects by technology or category

### Technical Debt (Later)

- [ ] **Build System:** Consider a build step for minification and bundling
- [ ] **CSS Variables Audit:** Ensure all color/spacing values use CSS variables consistently
- [ ] **Testing:** No automated tests for JavaScript functionality

---

## ✅ Completed (Recent)

- [x] Modular CSS architecture (v2.0.0)
- [x] Dynamic project loading from JSON (v1.5.0)
- [x] Theme engine with MD/MD3/OLED options (v2.2.0)
- [x] Accessibility improvements - Skip link & reduced motion (v2.2.3)
- [x] SEO - Twitter cards, sitemap, robots.txt (v2.2.3)
- [x] XSS protection via escapeHtml utility (v2.2.1)
- [x] Project detail pages with deep linking (v1.6.0)
- [x] Smart Terminal widget with OS detection (v2.0.0)
- [x] Removed indexlite.css (v2.3.0)
- [x] Removed Reading Mode feature (moved to temp/)

### Extracted to `/temp` (Dec 2025)
- [x] Screensaver system (moved to temp/)
- [x] Reading Mode with page transitions (moved to temp/)
- [x] Water-wash transition effects (moved to temp/)
