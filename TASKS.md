# Project Tasks & Issues

> **Last Updated:** December 19, 2025  
> **Portfolio Version:** v2.3.0

---

## 🔴 Critical Bugs

### Theme System
- [x] **`system/history.html` Theme Inconsistency:** ~~Uses `oled` as default and has hardcoded `oled.css` enabled.~~ Fixed to match index.html pattern.
- [x] **`system/history.html` Missing Color Mode:** ~~Init script lacks `data-theme` attribute setting.~~ Added color mode support.

---

## 🟠 Code Quality Issues

### JavaScript
- [x] **Dead Code - Auto Button Handler (`project.js`):** ~~Code handles `data-os="Auto"` button clicks but button was removed.~~ Removed dead code.
- [x] **localStorage Key Inconsistency:** ~~`terminal-theme` uses kebab-case.~~ Changed to `terminal_theme`.
- [x] **Missing Tech Badge Label (`utils.js`):** ~~`tech-threejs` not defined.~~ Added 'Three.js' label.

### CSS
- [x] **Typo in Animation Comment (`index-animations.css:78`):** ~~"potfolio"~~ Fixed to "portfolio".

### HTML Consistency
- [x] **`tui.html` Duplicate Project Entry:** ~~"Earnslate" appeared twice.~~ Removed "Earnslate Finance" duplicate.

---

## 🟡 Data Issues (`projects.json`)

- [x] **Badge Definition Check:** `tech-threejs` color already exists in `index-base.css`.

---

## 🔵 UI/UX Improvements

- [ ] **Mobile Navigation on Very Small Screens:** Navigation bar may overlap content on viewports under 360px.
- [ ] **Contact Card Click-to-Copy:** Consider adding copy-to-clipboard for email address.

---

## 🟢 Performance & Optimization

- [ ] **Critical CSS:** Consider inlining critical CSS for above-the-fold content.
- [ ] **Font Loading:** Consider `font-display: swap` strategy.

---

## ⚪ Documentation

- [x] Created `DEVELOPMENT.md` with guidelines for theme system, project updates, badge additions, and consistency rules.

---

## ✅ Recently Completed (This Session)

- [x] Fixed `system/history.html` theme init pattern
- [x] Removed dead Auto button code from `project.js`
- [x] Fixed `terminal-theme` → `terminal_theme` localStorage key
- [x] Added `tech-threejs` label to `utils.js`  
- [x] Fixed "potfolio" typo in animation comment
- [x] Removed duplicate Earnslate project from `tui.html`
- [x] Created `DEVELOPMENT.md` development guidelines
