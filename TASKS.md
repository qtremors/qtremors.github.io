# Tremors Tasks

> **Project:** Tremors  
> **Version:** 2.8.1
> **Last Updated:** 18-02-2026

---

## 🔴 Bugs & Logical Errors

- [ ] **Duplicate `#toast` element in `index.html`:** Two `<div id="toast">` elements exist (line 595 and line 616). Only one should exist — IDs must be unique. The first one (inside `<main>`) is unreachable because `getElementById` returns the first match, but the second one (outside `<main>`) has ARIA attributes. Remove the duplicate.
- [ ] **Version mismatch in `project.html` footer:** Footer shows `v2.7.0` (line 275) while `index.html` shows `v2.8.1` and `CHANGELOG.md` is at `v2.8.1`. Must be synced.
- [ ] **TUI canonical URL points to `index.html`:** `tui.html` line 8 has `<link rel="canonical" href="https://qtremors.github.io/index.html">`. A canonical tag declaring a *different page* as canonical tells search engines to ignore `tui.html` entirely and index `index.html` instead. If TUI should be independently indexed, this should point to `tui.html` itself.
- [ ] **`project.html` appearance init script does not restore spotlight or pattern settings:** The inline `<script>` in `project.html` (lines 43-71) only restores theme, color mode, and scene effect — but does not restore spotlight or hero pattern state, unlike `index.html` (lines 73-114). While these features aren't visually present on the project page, the CSS files for spotlight/patterns are still linked, creating a flash inconsistency.
- [ ] **`home.js` uses `window.escapeHtml` and `window.getBadgeLabel` before they may be loaded:** `home.js` is loaded with `defer` alongside `utils.js`, but the execution order of deferred scripts is based on document order. Since `utils.js` is listed before `home.js`, this *should* work — but there's no explicit guard or import. If script order ever changes (e.g., moving to ES modules), this breaks silently.
- [ ] **`extras.js` runs on `project.html` but targets elements that don't exist:** `extras.js` is loaded on both `index.html` and `project.html`. On `project.html`, it searches for `.magnet-text` paragraphs and `.hero` sections — which don't exist. The code handles this gracefully (returns early), but it splits words into `<span>` elements unnecessarily, parsing text from elements not on the page.
- [ ] **`project.js` clipboard copy has no error handler chain:** In `project.js` line 252-264, the copy button's `navigator.clipboard.writeText()` catch block is empty — on failure, the button shows "Copied!" but nothing was actually copied. There's no `.catch()` at all. Compare with `index.js` email copy (lines 304-308) which falls back to `mailto:`.
- [ ] **`index.html` appearance init sets attribute on `document.documentElement` but `applyAppearance()` in `index.js` sets it on `document.body`:** The inline script (line 83) sets `document.documentElement.setAttribute('data-style-mode', theme)` and `data-theme`, but `applyAppearance()` in `index.js` (line 142, 181) sets them on `body`. This means both `<html>` and `<body>` get the attribute — CSS selectors must target the right one.

---

## 🟡 Inconsistencies & Mismatches

- [ ] **TASKS.md version says `2.8.0` but `CHANGELOG.md` and `index.html` footer say `2.8.1`:** Version in TASKS.md header is out of date.
- [ ] **DEVELOPMENT.md version says `2.8.0` (line 5):** Should be `2.8.1` to match the latest changelog entry.
- [ ] **DEVELOPMENT.md documents wrong localStorage keys:** The localStorage keys table (lines 159-165) lists `theme`, `darkMode`, `effect`, `spotlight`, `projectsShown` — but the actual code uses `style_mode`, `theme_pref`, `effect_mode`, `spotlight_mode`, `pattern_mode`, `portfolio_expanded`, `terminal_theme`. Every single key name is wrong.
- [ ] **DEVELOPMENT.md documents wrong default theme:** States OLED is the default theme (line 144), but code defaults to `md` (`localStorage.getItem('style_mode') || 'md'` in every init script).
- [ ] **DEVELOPMENT.md shows wrong `projects.json` schema:** The documented schema (lines 173-194) uses fields `url`, `github`, `tech`, `install` (with OS-specific sub-keys), and `status: "live"`. The actual schema uses `links[]`, `badges[]`, `installation` (single string), `recommended`, and status values `wip`/`beta`/`archive` (no `live`).
- [ ] **DEVELOPMENT.md project structure shows filenames that don't exist:** Lists `base.css`, `sections.css`, `animations.css`, `effects.css` — actual files are `index-base.css`, `index-sections.css`, `index-animations.css`. Effects and themes are in separate directories, not under `css/`.
- [ ] **DEVELOPMENT.md describes `extras.js` as "Terminal widget, utilities":** `extras.js` handles magnetic text, spotlight effects, scroll observer, and easter eggs — not the terminal widget (which is in `project.js`).
- [ ] **DEVELOPMENT.md describes `home.js` as "Theme engine, Load More, Effects":** Theme engine is in `index.js`, not `home.js`. `home.js` handles typewriter and portfolio loading.
- [ ] **DEVELOPMENT.md `404.html` listed as "❌ Minimal" JS:** `404.html` actually loads `index.js` with `defer`, which includes the full theme engine, settings modal, and navigation logic.
- [ ] **README.md version table stops at `v2.6.0`:** Missing entries for `v2.6.5`, `v2.7.0`, `v2.8.0`, `v2.8.1`.
- [ ] **CHANGELOG.md header says `Last Updated: 24-01-2026` but latest entry is `v2.8.1 - 24-01-2026`:** This is technically correct, but the DEVELOPMENT.md says `Last Updated: 2026-01-25`. The dates use inconsistent formats (`DD-MM-YYYY` vs `YYYY-MM-DD`).

---

## 🟠 Sitemap & SEO Issues

- [ ] **Sitemap contains phantom project IDs not in `projects.json`:** `pygame-calculator` (line 88) and `local-team-chat` (line 94) are referenced in `sitemap.xml` but do not exist in `projects.json`. These URLs will produce a "Project Not Found" page — bad for SEO.
- [ ] **Sitemap missing projects that exist in `projects.json`:** `socnet` (Social Network Platform), `material-design`, and `recontext` are in `projects.json` but not in `sitemap.xml`.
- [ ] **Sitemap `<lastmod>` dates are stale:** Most entries show `2026-01-02`, which predates the `v2.8.0` and `v2.8.1` releases. The `gtrmrs` entry is at `2026-01-17` which is correct for v2.8.0 but the root URL was updated 2026-01-24.
- [ ] **`project.html` OG image is generic:** `<meta property="og:image" content="assets/index.png">` (line 10) — when shared, every project page shows the same homepage screenshot instead of the project-specific image. The `project.js` sets the canonical URL dynamically but doesn't update OG tags.

---

## 🔵 Code Quality & Maintainability

- [ ] **Massive HTML duplication — settings modal markup copied across 3 files:** The Appearance settings modal HTML (~80 lines) is copy-pasted identically in `index.html` (lines 618-784), `project.html` (lines 285-384), and `404.html` (lines 200-301). `project.html` has a reduced version (no spotlight/pattern), making the copies diverge. Any future settings change requires editing 3+ files.
- [ ] **Massive HTML duplication — header/nav markup copied across files:** The `<header class="top-app-bar">` and dropdown menu markup is copy-pasted in `index.html` (lines 146-213) and `project.html` (lines 73-139). The dropdown items are identical.
- [ ] **Inline `<script>` theme init is copy-pasted across 4 files:** The theme initialization IIFE is duplicated in `index.html` (lines 73-114), `project.html` (lines 43-71), `404.html` (lines 143-171), and likely the system pages. Each has a slightly different subset of features, making them drift over time.
- [ ] **`createProjectCard()` in `home.js` builds complex HTML via template literals:** The function (lines 78-107) constructs card HTML by string interpolation. While `escapeHtml()` is used for user data, this pattern is fragile — adding a new field requires careful escaping. Consider using `document.createElement()` or a templating approach.
- [ ] **Global functions on `window` object:** `utils.js` attaches `getBadgeLabel` and `escapeHtml` to `window`. `index.js` attaches `showToast` to `window`. This pollutes the global namespace. ES modules would be cleaner but would require a build step (which is intentionally avoided).
- [ ] **`debounce` function in `index.js` is not reused:** A `debounce` utility is defined inline in `index.js` (lines 288-294) but could be in `utils.js` for reuse, especially since `extras.js` mousemove handlers could benefit from it.
- [ ] **Inline `onclick` handlers in dropdown items:** `index.html` lines 178, 186 use `onclick="location.href='...'"` instead of proper event listeners. Same pattern in `project.html`. This mixes HTML and JS behavior.

---

## 🟣 Performance & Resource Issues

- [ ] **`extras.js` magnetic text iterates ALL words on EVERY mousemove:** The mousemove handler (lines 23-39) calculates distance for every `.magnetic-word` span on every mouse move event. With 3 paragraphs of text, that's ~100+ distance calculations per frame. No `requestAnimationFrame` throttling is applied.
- [ ] **Profile image `aman.png` is `loading="lazy"` in the hero section:** Line 267 in `index.html` lazy-loads the hero profile image. Since the hero is always above the fold, this delays the LCP (Largest Contentful Paint). Should use `loading="eager"` or remove the attribute.
- [ ] **`logo.gif` at 500KB loaded on every page:** The animated logo GIF (`assets/logo.gif`, 500KB) is loaded in the header of `index.html` and `project.html`. This significantly impacts FCP on slower connections. Consider converting to WebP or using a static SVG with CSS animation.
- [ ] **Large video files in `assets/`:** `v0.0.0-v2.6.0-hq.mp4` is 30MB and `v0.0.0-v2.6.0.mp4` is 7.6MB. These are served from the same GitHub Pages domain. While they're only loaded on history pages, they inflate the repo size.
- [ ] **No font `display` property on Google Fonts link in TUI:** `tui.html` line 20 loads Fira Code and Roboto Mono. The `&display=swap` parameter is correctly set — no issue here, just verified.

---

## 🟤 Security Considerations

- [ ] **`project.js` renders `project.image` directly into `<img src>` without validation:** Line 96 uses `banner.src = project.image`, and line 358 uses the image path in `createNavCard()` template strings. While `projects.json` is first-party data, if the JSON were ever compromised or loaded from a user-controlled source, this could be exploited. The `escapeHtml()` function is used for text but not for `src` attributes.
- [ ] **Email address hardcoded and exposed in `index.js`:** Line 303 hardcodes `singhamankumar207@gmail.com`. This is also in the HTML. While intentional for a portfolio, it could be obfuscated to reduce automated scraping.
- [ ] **`navigator.clipboard.writeText` silently fails in non-HTTPS contexts:** The clipboard API requires a secure context. On `localhost` or `file://`, the catch block in `index.js` (line 306) falls back to `mailto:`, but `project.js` copy (line 253) has no catch at all for the command copy feature.

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
