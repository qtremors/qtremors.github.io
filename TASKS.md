# Tremors Tasks

> **Project:** Tremors  
> **Version:** 2.8.6
> **Last Updated:** 21-02-2026

---

## 🔴 Bugs & Logical Errors

- [x] **Duplicate `#toast` element in `index.html`:** Fixed by removing the redundant element inside `<main>`.
- [x] **Version mismatch in `project.html` footer:** Updated to `v2.8.1`.
- [x] **TUI canonical URL points to `index.html`:** Corrected to point to `tui.html`.
- [x] **`project.html` appearance init script does not restore spotlight or pattern settings:** Intentionally omitted as these sections are only on `index.html`. Redundant CSS links and draft logic have been removed from `project.html`.
- [x] **`home.js` uses `window.escapeHtml` and `window.getBadgeLabel` before they may be loaded:** Added safety guards to check function existence before call.
- [x] **`extras.js` runs on `project.html` but targets elements that don't exist:** Added null/length checks for magnet elements.
- [x] **`project.js` clipboard copy has no error handler chain:** Added `.catch()` block with error logging and user toast.
- [x] **`index.html` appearance init sets attribute on `document.documentElement` but `applyAppearance()` in `index.js` sets it on `document.body`:** Synced target to `document.body` in the init script.

---

## 🟡 Inconsistencies & Mismatches

- [x] **DEVELOPMENT.md documents wrong localStorage keys:** Synced with actual code in v2.8.3.
- [x] **DEVELOPMENT.md documents wrong default theme:** Corrected to MD as default in v2.8.3.
- [x] **DEVELOPMENT.md shows wrong `projects.json` schema:** Updated to match current production schema in v2.8.3.
- [x] **DEVELOPMENT.md project structure shows filenames that don't exist:** Updated tree to match `index-*.css` and `utils.js`/`index.js` architecture.
- [x] **DEVELOPMENT.md describes `extras.js` as "Terminal widget, utilities":** Corrected to describe magnetic effects; terminal logic identified in `project.js`.
- [x] **DEVELOPMENT.md describes `home.js` as "Theme engine, Load More, Effects":** Corrected; theme engine is in `index.js`.
- [x] **DEVELOPMENT.md `404.html` listed as "❌ Minimal" JS:** Updated to reflect use of `index.js`.

---

## 🟠 Sitemap & SEO Issues

- [x] **Sitemap contains phantom project IDs not in `projects.json`:** `pygame-calculator` (line 88) and `local-team-chat` (line 94) are referenced in `sitemap.xml` but do not exist in `projects.json`. These URLs will produce a "Project Not Found" page — bad for SEO.
- [x] **Sitemap missing projects that exist in `projects.json`:** `socnet` (Social Network Platform), `material-design`, and `recontext` are in `projects.json` but not in `sitemap.xml`.
- [x] **Sitemap `<lastmod>` dates are stale:** Most entries show `2026-01-02`, which predates the `v2.8.0` and `v2.8.1` releases. The `gtrmrs` entry is at `2026-01-17` which is correct for v2.8.0 but the root URL was updated 2026-01-24.
- [x] **`project.html` OG image is generic:** `<meta property="og:image" content="assets/index.png">` (line 10) — when shared, every project page shows the same homepage screenshot instead of the project-specific image. The `project.js` sets the canonical URL dynamically but doesn't update OG tags.

---

## 🔵 Code Quality & Maintainability

- [x] **Massive HTML duplication — settings modal markup copied across 3 files:** The Appearance settings modal HTML (~80 lines) is copy-pasted identically in `index.html` (lines 618-784), `project.html` (lines 285-384), and `404.html` (lines 200-301). `project.html` has a reduced version (no spotlight/pattern), making the copies diverge. Any future settings change requires editing 3+ files.
- [x] **Massive HTML duplication — header/nav markup copied across files:** The `<header class="top-app-bar">` and dropdown menu markup is copy-pasted in `index.html` (lines 146-213) and `project.html` (lines 73-139). The dropdown items are identical.
- [x] **Inline `<script>` theme init is copy-pasted across 4 files:** The theme initialization IIFE is duplicated in `index.html` (lines 73-114), `project.html` (lines 43-71), `404.html` (lines 143-171), and likely the system pages. Each has a slightly different subset of features, making them drift over time.
- [x] **`createProjectCard()` in `home.js` builds complex HTML via template literals:** The function (lines 78-107) constructs card HTML by string interpolation. While `escapeHtml()` is used for user data, this pattern is fragile — adding a new field requires careful escaping. Consider using `document.createElement()` or a templating approach.
- [x] **Global functions on `window` object:** `utils.js` attaches `getBadgeLabel` and `escapeHtml` to `window`. `index.js` attaches `showToast` to `window`. This pollutes the global namespace. ES modules would be cleaner but would require a build step (which is intentionally avoided).
- [x] **`debounce` function in `index.js` is not reused:** A `debounce` utility is defined inline in `index.js` (lines 288-294) but could be in `utils.js` for reuse, especially since `extras.js` mousemove handlers could benefit from it.
- [x] **Inline `onclick` handlers in dropdown items:** `index.html` lines 178, 186 use `onclick="location.href='...'"` instead of proper event listeners. Same pattern in `project.html`. This mixes HTML and JS behavior.

---

## 🟣 Performance & Resource Issues

- [x] **`extras.js` magnetic text iterates ALL words on EVERY mousemove:** The mousemove handler (lines 23-39) calculates distance for every `.magnetic-word` span on every mouse move event. With 3 paragraphs of text, that's ~100+ distance calculations per frame. No `requestAnimationFrame` throttling is applied.
- [x] **Profile image `aman.png` is `loading="lazy"` in the hero section:** Line 267 in `index.html` lazy-loads the hero profile image. Since the hero is always above the fold, this delays the LCP (Largest Contentful Paint). Should use `loading="eager"` or remove the attribute.
- [x] **No font `display` property on Google Fonts link in TUI:** `tui.html` line 20 loads Fira Code and Roboto Mono. The `&display=swap` parameter is correctly set — no issue here, just verified.

---

## 🟤 Security Considerations

- [x] **`project.js` renders `project.image` directly into `<img src>` without validation:** Line 96 uses `banner.src = project.image`, and line 358 uses the image path in `createNavCard()` template strings. While `projects.json` is first-party data, if the JSON were ever compromised or loaded from a user-controlled source, this could be exploited. The `escapeHtml()` function is used for text but not for `src` attributes.
- [x] **Email address hardcoded and exposed in `index.js`:** Line 303 hardcodes `singhamankumar207@gmail.com`. This is also in the HTML. While intentional for a portfolio, it could be obfuscated to reduce automated scraping.
- [x] **`navigator.clipboard.writeText` silently fails in non-HTTPS contexts:** The clipboard API requires a secure context. On `localhost` or `file://`, the catch block in `index.js` (line 306) falls back to `mailto:`, but `project.js` copy (line 253) has no catch at all for the command copy feature.

---

## 📄 Documentation Gaps

- [ ] **No `LICENSE.md` file exists in the repository:** `README.md` references `LICENSE.md` in the documentation table (line 162) and license section (line 170), but no such file exists in the project root.
- [ ] **`DEVELOPMENT.md` is severely outdated:** Nearly every technical detail (file paths, localStorage keys, default theme, data schema, module descriptions) is wrong. This document needs a complete rewrite to match the current codebase.
- [ ] **No documentation for the TUI theme system:** TUI uses a completely different theme mechanism (CSS radio inputs + `tui-themes.css`) that is not documented anywhere.
- [ ] **`CHANGELOG.md` date format is inconsistent:** The header uses `DD-MM-YYYY` format (`24-01-2026`) while `sitemap.xml` uses `YYYY-MM-DD` and `DEVELOPMENT.md` uses `YYYY-MM-DD`. Pick one and be consistent.

---

## ⚫ Anomalies & General Observations

- [ ] **`tui.html` has two complete copies of the home section:** The splash screen (lines 26-65) and the main content (lines 73-848) both contain the full `#home` section with identical ASCII art. The splash screen version is presumably for the boot animation, but the full content is duplicated.
- [ ] **`E-commerce Website` (eshopper) in TUI has a malformed closing `</fieldset>`:** Line 707 has `</fieldset>` closing tag but the opening `<div class="portfolio-content">` was never closed with `</div>` first. The inner `</div>` on line 706 matches `run-live-container`, leaving the outer `portfolio-content` div unclosed.
- [ ] **Plant Disease Detector links to `system/tui-404.html` as "run-live" in TUI:** In `tui.html` line 644, the Plant Disease Detector's live link points to `system/tui-404.html`. While this is technically intentional (no live demo available), it's misleading — the user clicks "run-live" and gets a 404. A "no live demo" message would be clearer.
- [ ] **Plant Disease Detector links to `system/index-404.html` as "Website" in JSON:** In `projects.json` line 418, the "Website" link URL is `system/index-404.html` — a relative link to a 404 page. Same intent as TUI but confusing for users clicking through from the modern UI.
