# Project Tasks & Issues

> **Last Updated:** December 18, 2025  
> **Portfolio Version:** v2.3.0

---

## 🔧 Code Quality / Bugs

### Critical
- [ ] **Theme Flash on Refresh (MD3/OLED):** When page refreshes with MD3 or OLED theme selected, there's a brief flash of the default MD theme before the saved theme applies. Affects both `index.html` and `project.html`. Root cause: The inline script runs after md.css is already loaded and applied.
- [ ] **404.html Theme Default Inconsistency:** Uses `oled` as default theme while `index.html`/`project.html` use `md`. Update to match.
- [ ] **404.html Theme Init Code:** Has its own inline theme init script (lines 140-162) that differs from the shared pattern. Should match index/project.

### Medium
- [ ] **Settings Modal Duplication:** Settings modal HTML is duplicated in `index.html`, `project.html`, and `404.html` with slight variations (404 lacks pattern selector, project lacks tabs). Consider extracting to JS-injected template.
- [ ] **localStorage Key Inconsistency:** `terminal-theme` uses kebab-case while others use snake_case (`style_mode`, `effect_mode`, etc.).

### Low
- [ ] **Console Easter Egg Escaping:** ASCII art in `extras.js` uses escaped backslashes that render incorrectly in some consoles.
- [ ] **Mixed Quote Styles:** JS files mix single and double quotes (minor, low impact).

---

## 🎨 UI/UX

- [ ] **Mobile Navigation on Small Screens:** Navigation bar may overlap content on very small viewports (<360px).
- [ ] **TUI ASCII Art Mobile:** Alien ASCII art in `tui.html` breaks on mobile screens (known issue, hard to fix without JS).

---

## ⚡ Performance

### Large Assets (Consider Optimizing)
| File | Size | Suggestion |
|------|------|------------|
| `404.gif` | 463 KB | Convert to WebP or optimize |
| `logo.gif` | 488 KB | Convert to WebP or optimize |
| `coding.gif` | 448 KB | Convert to WebP or optimize |
| `nexus-preview.png` | 2.78 MB | Compress to <500KB |
| `music-preview.png` | 1.73 MB | Compress to <500KB |
| `quizzer-preview.png` | 1.59 MB | Compress to <500KB |
| `git-nexus-preview.png` | 1.54 MB | Compress to <500KB |
| `v0.0.0-v2.0.0.mp4` | 4.94 MB | Host externally or lazy-load |

### Other
- [ ] **Throttle Mousemove Events:** Magnetic text effect in `extras.js` runs on every mousemove — consider throttling for performance.
- [ ] **Critical CSS:** Consider inlining critical CSS for above-the-fold content to reduce render-blocking.

---

## 📁 Unused Assets (Can Delete)

These files exist in `/assets` but are not referenced anywhere:
- `MD3.svg`
- `music-preview.png` (old preview, replaced)
- `nexus-preview0.png`
- `python.gif`
- `qtrmrs-preview.png`
- `scrap-preview.png`
- `tremors_fav.png`
- `tremors_github.jpg`
- `workingonit.gif`

---

## 📝 Documentation / SEO

- [x] **Structured Data:** JSON-LD Person/ProfilePage schemas present in index.html
- [x] **Meta Tags:** OG tags present on all pages
- [ ] **system/ Pages:** Files in `/system/` (history.html, index-404.html, tui-404.html, history-tui.html) may need review for consistency.

---

## 🗂️ Architecture Notes

### tui.html (Special Case)
This page is **CSS/HTML only** — no JavaScript at all. Theme/font switching is done purely via CSS `:checked` selectors on hidden radio inputs. Any changes requiring JS should be avoided unless the page is refactored.

### Theme Init Pattern
Pages should use this inline pattern in `<head>` to prevent theme flash:
```html
<link rel="stylesheet" href="static/themes/md.css" id="theme-md">
<link rel="stylesheet" href="static/themes/md3.css" id="theme-md3" disabled>
<link rel="stylesheet" href="static/themes/oled.css" id="theme-oled" disabled>
<script>
(function() {
  try {
    var saved = localStorage.getItem('style_mode') || 'md';
    // ... toggle disabled attributes based on saved value
  } catch(e) {}
})();
</script>
```
Key: Default theme (`md.css`) is NOT disabled initially.
