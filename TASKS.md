# Project Tasks & Issues

> **Last Updated:** December 19, 2025  
> **Portfolio Version:** v2.3.0

---

## 🔴 Critical Bugs

### Theme System
- [ ] **`system/history.html` Theme Inconsistency:** Uses `oled` as default and has hardcoded `oled.css` enabled. Should use `md` as default and all themes `disabled` like `index.html`.
- [ ] **`system/history.html` Missing Color Mode:** Init script lacks `data-theme` attribute setting (light/dark mode support).

---

## 🟠 Code Quality Issues

### JavaScript
- [ ] **Dead Code - Auto Button Handler (`project.js:216-223`):** Code handles `data-os="Auto"` button clicks but this button was removed from `project.html`. Remove dead code.
- [ ] **localStorage Key Inconsistency:** `terminal-theme` uses kebab-case while others use snake_case (`style_mode`, `effect_mode`, `spotlight_mode`, etc.). Standardize to snake_case.
- [ ] **Missing Tech Badge Color (`utils.js`):** `tech-threejs` badge used in `projects.json` but not defined in `utils.js` label map. Returns fallback "Threejs" instead of "Three.js".

### CSS
- [ ] **Typo in Animation Comment (`index-animations.css:78`):** Comment says "potfolio" instead of "portfolio".

### HTML Consistency
- [ ] **Settings Modal Duplication:** Modal HTML duplicated in `index.html`, `project.html`, `404.html`, `system/history.html` with variations. Consider JS-injected template.
- [ ] **`tui.html` Duplicate Project Entry (`lines 420-453, 530-550`):** "Earnslate" appears twice - once in visible grid and once in hidden projects as "Earnslate Finance".

---

## 🟡 Data Issues (`projects.json`)

- [ ] **Missing Badge Definition:** `tech-threejs` used in Cosmos project but color not defined in `index-base.css`.
- [ ] **Placeholder Images:** Multiple projects use `assets/preview.png` as placeholder (Cosmos, Earnslate, Local Team Chat).
- [ ] **Broken Live Links:** Some projects link to `system/index-404.html` as placeholder for unreleased features.

---

## 🔵 UI/UX Improvements

- [ ] **Mobile Navigation on Very Small Screens:** Navigation bar may overlap content on viewports under 360px.
- [ ] **TUI ASCII Art Mobile:** Alien ASCII art in `tui.html` breaks on mobile screens.
- [ ] **Contact Card Click-to-Copy:** Consider adding copy-to-clipboard for email address.

---

## 🟢 Performance & Optimization

- [ ] **Critical CSS:** Consider inlining critical CSS for above-the-fold content to reduce render-blocking.
- [ ] **Font Loading:** Multiple Google Fonts loaded. Consider `font-display: swap` strategy.
- [ ] **Image Optimization:** Some project preview images are large. Consider WebP format.

---

## ⚪ Architecture Notes

### Theme Init Pattern (Standardized)
All pages should use this pattern in `<head>`:
```html
<!-- All theme stylesheets DISABLED by default -->
<link rel="stylesheet" href="static/themes/md.css" id="theme-md" disabled>
<link rel="stylesheet" href="static/themes/md3.css" id="theme-md3" disabled>
<link rel="stylesheet" href="static/themes/oled.css" id="theme-oled" disabled>

<!-- Effects and patterns after themes -->
<link rel="stylesheet" href="static/effects/fog.css" id="effect-fog" disabled>
...

<!-- Init script AFTER all stylesheets -->
<script>
(function() {
  var theme = localStorage.getItem('style_mode') || 'md';
  // Enable correct theme...
})();
</script>
```
**Key:** All themes start `disabled`. Default is `md`.

### Pages Needing Updates
| Page | Status |
|------|--------|
| `index.html` | ✅ Correct |
| `project.html` | ✅ Correct |
| `404.html` | ✅ Correct |
| `system/history.html` | ❌ Uses old pattern |
| `tui.html` | ➖ CSS-only, no JS |

### tui.html (Special Case)
This page is **CSS/HTML only** — no JavaScript. Theme/font switching uses pure CSS `:checked` selectors on hidden radio inputs. Any changes requiring JS should be avoided.

---

## ✅ Recently Completed

- [x] Fixed navbar flash prevention (moved init script after all stylesheets)
- [x] Fixed navbar background using theme colors instead of transparent
- [x] Fixed 404.html theme default inconsistency (changed from oled to md)
- [x] Fixed magnetic text effect scope (now only runs in Hero/About sections)
- [x] All main pages now use standardized flash prevention pattern
