# Tremors Tasks

> **Project:** Tremors  
> **Version:** 2.9.0
> **Last Updated:** 21-02-2026

---

## 📝 PR Feedback & Verification

- [x] **`404.html` (L143):** Missing `utils.js`/`components.js` includes before `index.js`, causing `debounce` throw.
- [x] **`CHANGELOG.md` (L52-62):** Missing `v2.8.3` header above "Documentation & Architecture Sync".
- [x] **`DEVELOPMENT.md` (L175-183):** `terminal_theme` storage key values should be `MacOS`/`Windows`/`Linux`.
- [x] **`DEVELOPMENT.md` (L203):** Update FID row to mention `requestAnimationFrame`.
- [x] **`sitemap.xml`:** Update `<lastmod>` values to `YYYY-MM-DD` format.
- [x] **`static/js/home.js` (L121-126):** Fix empty `img.src` request for falsy `project.image`.
- [x] **`static/js/home.js` (L159-170):** Prevent `a.className="undefined"` in links iteration.
- [x] **`static/js/index.js` (L270):** Safe debounce registration for scroll listener.
- [x] **`static/js/project.js` (L21):** Local helper for `escapeHtml` to DRY up guards.
- [x] **`static/js/theme-init.js` (L1-40):** Safeguard `document.body` access when loaded in `<head>`.
- [x] **`system/history.html` (L471-473):** Add `utils.js` before `index.js` to fix debounce throws.
