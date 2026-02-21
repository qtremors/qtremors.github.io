# Tremors Tasks

> **Project:** Tremors  
> **Version:** 2.9.0
> **Last Updated:** 21-02-2026

---

## 📝 Findings

- [ ] **`static/js/project.js` (L1-5) [Security]:** Replace unsafe fallback in `escapeHtmlSafe` with a built-in deterministic HTML-escaping routine for `& < > " ' /` and backticks. Ensure built-in replacer is used when `window.Tremors.utils.escapeHtml` isn't present to prevent reflected XSS.
- [ ] **`static/js/theme-init.js` & CSS selectors [Maintainability]:** Update CSS selectors targeting `body[data-style-mode]` or `body[data-theme]` to `html[...]` or `:root[...]` since `theme-init.js` sets these attributes on `document.documentElement`. Update `static/css/index-animations.css`, `static/themes/md.css`, `static/themes/md3.css`, `static/themes/oled.css`, `static/effects/glass.css`, and `system/history.html`.
- [ ] **`system/history.html` (L471-474) [Performance]:** Reorder script tags to canonical pattern: `window.TREMORS_BASE_PATH`, then `utils.js`, `components.js`, `index.js`, and add the `defer` attribute to each script tag.
- [ ] **`project.html` & `project.js` [SEO / Architecture]:** OpenGraph tags (`og:title`, `og:image`) are dynamically generated via JavaScript, but social media crawlers do not execute JS. Sharing any project link will incorrectly show the default fallback metadata.
- [ ] **`project.html` [Correctness & Accessibility]:** The page relies entirely on `projects.json` loading via JavaScript. If JS fails or is disabled, the page is completely blank. Add a `<noscript>` fallback and initial loading skeleton.
- [ ] **`static/js/home.js` [Performance]:** The typewriter effect (`type()`) runs continuously in the background via `setTimeout` even when the `#home` section is completely scrolled out of view, wasting CPU cycles and battery. Use `IntersectionObserver` to pause it.
- [ ] **`static/js/project.js` [Security]:** Error states use template literals with `.innerHTML` (`<p>The project ID "${safeProjectId}"...</p>`). Even with `escapeHtmlSafe`, it is generally a poor security practice to use `innerHTML` for dynamic rendering. Use `.textContent` or `document.createElement()` instead.
- [ ] **`data/projects.json` [Data Integrity]:** URLs for live links are inconsistent. Some contain trailing slashes (e.g., `https://qtrmrs.onrender.com/`), while others do not (e.g., `https://tremors-algoviz.netlify.app/`). Normalize URLs for consistency.
- [ ] **`static/js/index.js` [Code Quality]:** Modal focus trapping handles Escape key globally on the `document` (L44). This listener is not cleaned up or scoped effectively, acting globally regardless of modal payload state.
