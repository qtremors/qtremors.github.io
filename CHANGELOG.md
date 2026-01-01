# Changelog

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
