# Tremors Changelogs

> **Project:** Tremors  
> **Version:** 2.9.0
> **Last Updated:** 21-02-2026

---

## [v2.9.0] - 21-02-2026

### 🛠️ **PR Feedback & Bug Fixes**

- **Javascript Hygiene:** Refactored inline safe-cast HTML parsing in `project.js` into an `escapeHtmlSafe` helper. Fixed an invalid `a.className="undefined"` injection during dynamic project link generation in `home.js`. Safely wrapped the document resize listener initialization.
- **Dependency Guarding:** Added safe lookup (`typeof window.Tremors.utils`) to prevent `debounce` reference errors for edge cases, and injected missing `utils.js` imports across auxiliary templates (`404.html`, `history.html`).
- **DOM & Schema Continuity:** 
  - Standardized all `sitemap.xml` timestamps into standard ISO `YYYY-MM-DD` notation.
  - Inserted missing version segment boundaries inside the historical changelog cascade.
  - Aligned development docs to strictly define `terminal_theme` mappings for MacOS/Windows/Linux instead of shorthand code names. 
  - Substituted the 1x1 base64 GIF fallback directly against `img.src` missing links to stop cascading undefined requests.
  - Rebound `theme-init.js` targeting to safely fetch `document.documentElement` if the `body` is blocked during `<head>` parsing.

---

## [v2.8.7] - 21-02-2026

### 📚 **Documentation & Refinement**

- **Documentation Overhaul:** Completely rewrote `DEVELOPMENT.md` to accurately reflect the current `v2.8.7` architecture, detailing the dual-theme systems (JS for Modern UI, Pure CSS for Terminal TUI), centralized javascript injection patterns, and `localStorage` schemas.
- **License Cleanup:** Removed deprecated `LICENSE.md` references from `README.md` following the file's deletion.
- **Data Standardization:** Converted all `<lastmod>` timestamps in `sitemap.xml` to `DD-MM-YYYY` format for parity with the Changelog structure.
- **DOM & Schema Anomalies:** 
  - Restored a missing closing `</div>` tag that was malforming the "E-commerce Website" item within `tui.html`.
  - Scrubbed the trailing 404 "Website" routing link for the local-only Plant Disease Detector model across both `projects.json` and the `tui.html` command output.

---

## [v2.8.6] - 21-02-2026

### 🛡️ **Security & Performance Improvements**

- **Improved Performance:** Restructured reusable `debounce` logic globally and specifically applied it to CPU-hot mousemove events within `extras.js` to eliminate frame dropping during magnetic text interaction.
- **XSS Prevention:** Sanitized project image URLs within `project.js` by casting all injection flows through `encodeURI()`.
- **Anti-Scraping Obfuscation:** Replaced hardcoded email instances in `index.html` and `index.js` with an encoded script-driven implementation to limit crawler indexing. Retained standard mailto fallback in TUI.
- **Better LCP:** Removed negligent `loading="lazy"` attributes from above-the-fold hero assets (e.g. `aman.png`) to directly improve First Contentful Paint.

---

## [v2.8.5] - 21-02-2026

### 🛠️ **Code Quality & Maintainability**

- **HTML Deduplication:** Replaced massively duplicated HTML strings across `index.html`, `project.html`, and `404.html` with centralized JavaScript injection using a new `components.js` file for standardizing the Settings Modal and Header Nav markup.
- **Theme Initialization Optimization:** Extracted inline scripts scattered across multiple pages into a reusable, cached `theme-init.js` module. The script logic safely verifies feature toggles, avoiding initialization errors on smaller pages.
- **Global Namespace Safety:** Purged sprawling properties from the `window` object by encapsulating common tools (`getBadgeLabel`, `escapeHtml`, `debounce`, `showToast`) inside a consolidated `window.Tremors.utils` namespace.
- **Safer DOM Interactions:** Eliminated insecure template string interpolation (`innerHTML`) from the `createProjectCard` flow in `home.js`. Switched structure strictly to standard memory-allocated `HTMLElement` node builders (`document.createElement`).
- **Clean Event Attachments:** Scrubbed all inline `onclick=...` overrides from `<button>` and `<a>` elements, swapping to standard `.addEventListener()` methods mapped internally within modules.

## [v2.8.4] - 20-02-2026

### 🚀 **SEO & Social Optimization**

-   **Sitemap Synchronization:** Fully synced `sitemap.xml` with `projects.json`. Removed phantom project IDs (`pygame-calculator`, `local-team-chat`) and added missing active projects (`socnet`, `material-design`, `recontext`).
-   **Lastmod Update:** Updated all `<lastmod>` entries in `sitemap.xml` to `2026-01-24` to reflect the latest state.
-   **Dynamic OG Tags:** Implemented dynamic Open Graph meta tags in `project.html`. Project pages now correctly display project-specific titles, descriptions, and preview images when shared on social platforms.
-   **DOM Targeting:** Added unique IDs to OG meta tags for reliable JavaScript-based updates.

---
    
## [v2.8.3] - 19-02-2026

### 📝 **Documentation & Architecture Sync**

-   **Technical Reference:** Comprehensive audit and update of `DEVELOPMENT.md` to accurately reflect the v2.8.x architecture.
-   **Schema Alignment:** Synced `projects.json` documentation with the actual production schema (Links, Badges, Installation strings).
-   **State Management:** Corrected `localStorage` keys and default settings in technical docs to match the actual implementation.
-   **File Architecture:** Updated project structure maps to include missing modules (`utils.js`, `index.js`) and correct CSS/Effect paths.

## [v2.8.2] - 19-02-2026

### 🛠️ **Bug Fixes**

-   **Color Contrast:** Fixed accessibility issue where sidebar cards in `project.html` (Links/Technologies) remained dark in Light Mode when the Glass effect was active.
-   **HTML Stability:** Removed duplicate `#toast` ID in `index.html` and synced theme initialization to target `document.body` for consistency.
-   **Navigation & SEO:** Fixed `tui.html` canonical URL to correctly point to itself and updated `project.html` footer version.
-   **Initialization Logic:** Cleaned up redundant spotlight and pattern logic/links in `project.html` to optimize secondary page loading.
-   **Defensive JS:** Added safety guards to `home.js` and `extras.js` to prevent silent failures on pages where specific DOM elements (magnet text, hero sections) are missing.
-   **Security & UX:** Implemented error handling for the "Copy Command" feature in `project.js` to provide user feedback if clipboard operations fail.

## [v2.8.1] - 24-01-2026

### 📝 **Content & Persona Refresh**

-   **Portfolio Bio:** Refined Hero intro and "About Me" sections (Index & TUI) to focus on professional philosophy and full-stack specialization, prioritizing narrative over chronological details.
-   **Typewriter Roles:** Updated `home.js` roles to a cohesive "Identity -> Role -> Action" sequence (e.g., "Building Scalable Apps", "Crafting Developer Tools").
-   **TUI Corrections:** Fixed outdated tech stack for GitNexus (Flask → FastAPI) and corrected minor typos.

### ⚙️ **Process Updates**

-   **Installation Guides:** Updated `projects.json` to explicitly show concurrent terminal commands for split-stack projects and corrected Quizzer AI path.
-   **SEO & Metadata:** Synced `sitemap.xml` dates and meta descriptions with the new content.

### 🐛 **Bug Fixes**

-   **Project Navigation:** Implemented Scroll Spy in `project.js` for accurate section highlighting and fixed Logo link to return to Portfolio Home.
-   **TUI Synchronization:** Synced skills list in `tui.html` to exactly match the categorized skills in `index.html`.
-   **Typo Fixes:** Corrected grammar in Beta status messages ("features may be incomplete").

## [v2.8.0] - 17-01-2026

### 🛠️ **Unified Tooling (gtrmrs)**

-   **New unified CLI Utility:** Unified `repo-tree`, `locr`, and `gitmig` into a single, cohesive CLI tool named `gtrmrs`.
-   **Simplified Installation:** Users can now install one tool to get directory visualization, LOC counting, and git migration features.
-   **Documentation Update:** Expanded project description to clearly explain the unification.

### 🎨 **TUI Portfolio Enhancements**

-   **Status Badges (Corner Tags):** Added graphical status indicators (BETA, ARCHIVED, DEVELOPMENT) to portfolio items.
    -   **Design:** Styled as bottom-right corner tags with dotter borders, matching the tech stack badge aesthetic.
    -   **Visibility:** Subtle content highlight tells the status at a glance without clutter.
-   **Ranking Update:** Updated `tui.html` project order to prioritize `gtrmrs` and other active projects.

---

## [v2.7.0] - 14-01-2026

### 📝 **Documentation Overhaul**

- **README Reformat:** Complete restructure using modern portfolio template format:
    - Added centered header with logo, title link, and tech badges (HTML5, CSS3, JavaScript, License).
    - Added GitHub-style NOTE callout for personal portfolio tag.
    - Converted features to scannable feature table with emoji icons.
    - Added condensed Quick Start section with clear commands.
    - Added Tech Stack table replacing inline technology list.
    - Added formatted Project Structure code block.
    - Split Modern UI and Terminal TUI into dedicated feature sections.
    - Added Evolution table summarizing version highlights.
    - Added Documentation links table.
    - Added centered footer with attribution.

- **DEVELOPMENT.md Created:** Technical reference documentation:
    - Architecture Overview with Static-First diagram.
    - Complete Project Structure breakdown.
    - File Conventions tables for HTML, CSS, and JS modules.
    - Theme System documentation (OLED/MD/MD3, effects, localStorage keys).
    - Data Schema with `projects.json` format and status values.
    - Code Style standards and Performance Targets.
    - Browser Compatibility matrix.

---

## [v2.6.5] - 02-01-2026

### 🎨 **UI Refinements & Theme Compatibility**

- **Theme Initialization:** Fixed initialization logic in `history.html`, `404.html`, `system/index-404.html`, and `project.html` to consistently apply themes by targeting `document.body`.
- **Simplified Settings Modal:** Unified settings modal to a single-view layout (no tabs) across all pages for better usability.
- **Context-Aware Settings:** Removed irrelevant "Spotlight" and "Hero" settings from secondary pages (`history`, `404`, `project`) while retaining them on `index.html`.
- **Glass Effect Fix:** Resolved Light Mode visibility issues where the glass effect background was too dark; now uses a proper semi-transparent light surface.
- **Contrast Fixes:** Updated "Spotlight Effect" toggle switch to use theme-aware variables (`var(--md-on-primary)`), fixing visibility in Dark/MD3 modes.
- **Code Cleanup:** Removed duplicated HTML content blocks and stray closing tags across multiple files.


## [v2.6.0] - 02-01-2026

### 🚦 **Project Status Indicators**

- **Dynamic Banners:** Added visual status indicators for projects marked as `wip` (Warning), `beta` (Info), `archive` (Error), and `featured` (Success) in `projects.json`.
- **Automatic Styling:** Banners are auto-generated above the description with corresponding emojis (⚠️, 🧪, 📦, ⭐) and color schemes.

### 🧭 **Navigation & Discovery**

- **Recommended Projects:** Implemented a new "Recommended" section above the footer navigation.
    - **Smart Recommendations:** Can display single or multiple related projects defined via a `recommended` array in JSON.
    - **Unified Styling:** Cards match the standard navigation design but feature a highlighted primary border and glow effect.
    - **Circular CLI Loop:** Configured `locr` ↔ `gitmig` ↔ `repo-tree` to recommend each other.
    - **Legacy Redirection:** `eshopper` (Archived) now recommends `amanzon` (Modern).

- **Navigation Refinements:**
    - **Directional Arrows:** Added visual `←` and `→` arrows to navigation cards, removing text labels for a cleaner look.
    - **Improved Mobile Layout:** "Next" card now uses a symmetrical right-aligned layout (Image Right) while maintaining left-aligned text for readability.
    - **Text Fix:** Removed JavaScript description truncation to ensure text fills the card properly on mobile, eliminating "middle start" visual gaps.

### 🎞️ **History Timeline**

-   **High Quality Toggle:** Added a "Switch to HQ" feature on history pages.
    -   **Modern UI:** Interactive JS toggle to swap between 720p (Optimized) and 1080p (Original) renders on demand.
    -   **TUI:** CSS-only radio switch to toggle players without JavaScript.
    -   **Lazy Loading:** HQ video is set to `preload="none"` to save bandwidth until explicitly requested.

---

## [v2.5.2] - 01-01-2026

### 🧹 **Code Hygiene & Cleanup**

- **Documentation Overhaul:** Performed a comprehensive cleanup of code comments across the entire `static/` directory (JS, CSS, Themes, Effects).
- **Consistent Style:** Standardized all file headers and section titles to "Minimalist Structural Commenting" style.
- **Noise Reduction:** Removed excessive numbered steps, redundant inline comments, and verbose explanations from production code.
- **Files Processed:** `home.js`, `project.js`, `utils.js`, `index-*.css`, `tui-*.css`, `themes/*.css`, and `effects/*.css`.

### 🛡️ **Security**

- **XSS Prevention:** Verified and enhanced HTML escaping in `project.js` rendering logic.

---

## [v2.5.1] - 22-12-2025

### 🔄 **Project Updates**

- **Tremors Portfolio:** Replaced "Nexus" project with the new integrated "Tremors Portfolio" — a multi-mode portfolio website with 5 viewing modes (Default, Terminal, Paper, Newspaper, Nexus), GitHub API integration, AI newspaper generation, and secret admin controls.
- **New Tech Badge:** Added `tech-prisma` badge (CSS color + JS label mapping) for Prisma ORM.

### 📦 **Data Synchronization**

- **Sitemap Cleanup:** Removed invalid `tremors-music-app` URL, added missing `cosmos` and `gitmig` projects, updated all dates to 2025-12-22.
- **TUI Sync:** Updated `tui.html` to replace "Nexus" with "Tremors Portfolio" including new tech badges (TypeScript, Tailwind, Prisma).
- **GitNexus Demo Link:** Updated live demo URL in TUI to point to correct scrap projects demo.

---

## [v2.5.0] - 19-12-2025

### 🆕 **New Projects & Content**

- **GitMig:** Added Git migration utility for clean repo backups (Python CLI).
- **Earnslate:** Updated with live URL (earnslate.vercel.app) and full project details.
- **Cosmos:** Added 3D solar system simulation project (WIP).

### 📦 **Project Ranking & Organization**

- **Major Reorder:** Updated `projects.json` with new priority ranking (Quizzer AI → GitNexus → Algorithm Visualizer → Arcade Nexus → Tremors Music → Earnslate → Cosmos → ...).
- **TUI Sync:** Updated `tui.html` portfolio section to match the new project order with 5 visible and 12 hidden projects.

### 🐛 **Bug Fixes**

- **Theme Flash Prevention:** Fixed FOUC (flash of unstyled content) issues across all pages.
- **Waves Pattern:** Rewrote animated gradient waves to use background layers instead of pseudo-elements (prevents conflict with fog/spotlight effects).
- **Pattern Animation Refresh:** Added repaint trigger for instant CSS animation apply on pattern switch.
- **Mobile Navigation:** Added media query for screens under 360px to prevent navigation overlap.
- **Linux Terminal Icon:** Added Tux penguin icon to terminal style switcher button.
- **localStorage Keys:** Standardized `terminal-theme` to `terminal_theme` (snake_case).
- **Dead Code Removal:** Removed unused Auto button handler from `project.js`.
- **History Page Init:** Fixed theme initialization in `system/history.html` to match standardized pattern.
- **Three.js Badge:** Added missing `tech-threejs` label mapping to `utils.js`.
- **CSS Typo:** Fixed "potfolio" → "portfolio" in animation comment.
- **Duplicate Entry:** Removed duplicate Earnslate entry from `tui.html`.

### 📝 **Documentation**

- **DEVELOPMENT.md:** Created development guidelines for theme system, adding projects/badges, and consistency rules.
- **TASKS.md:** Updated with all review findings and marked as complete.

---


## [Older Versions]

For older changelogs (v0.0.0 - v2.3.0), please see [CHANGELOG_ARCHIVE.md](CHANGELOG_ARCHIVE.md).
