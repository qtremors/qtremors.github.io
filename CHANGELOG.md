# Changelog

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

## [v2.3.0] - 18-12-2025

### 🐛 **Bug Fixes**

- **TUI Skills Typo:** Fixed "Nextjs." → "Next.js" in `tui.html`.
- **404 Script Defer:** Added missing `defer` attribute to prevent race conditions.
- **Footer Version:** Updated from v2.0.0 → v2.2.3 in `index.html` and `project.html`.
- **Skills Sync:** Added TypeScript badge (30%) to `index.html`, removed Next.js from TUI for consistency.
- **Comment Numbering:** Fixed duplicate "6." → "7." in theme init script.
- **Null Check:** Added safety check for `githubCard` in `home.js` insertBeforeGithub function.

### ✨ **New Features**

- **Terminal Auto-Detect Reset:** Added "Auto" button to terminal OS switcher in project pages. Clears localStorage and resets to system-detected OS theme.
- **JSON Fetch Error Display:** Portfolio now shows user-friendly error card if `projects.json` fails to load.
- **Toast Warning:** Added `console.warn` when `#toast` element is missing from DOM.

### ♿ **Accessibility**

- **TUI ARIA Labels:** Added `aria-label` attributes to all TUI navigation links.
- **Navigation Landmark:** Added `aria-label="Main navigation"` to TUI nav.

### 🔍 **SEO**

- **Dynamic Canonical Tags:** Project pages now generate canonical `<link>` tags dynamically for each project ID.

### 🎨 **UI/UX**

- **Description Clamp:** Added 5-line CSS clamp to portfolio card descriptions for consistent card heights.

---

## [v2.2.3] - 11-12-2025

### ♿ **Accessibility Improvements**

- **Skip-to-Content Link:** Added a keyboard-accessible skip link that appears on Tab focus, allowing users to jump directly to main content.

- **Reduced Motion Support:** Implemented `prefers-reduced-motion` media query to disable all animations and transitions for users who prefer reduced motion.

### 🔍 **SEO Enhancements**

- **Twitter Card Meta Tags:** Added `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` tags for better social sharing.

- **Robots & Canonical:** Added `<meta name="robots">` and `<link rel="canonical">` tags for search engine optimization.

- **Sitemap & Robots.txt:** Created `sitemap.xml` (16 pages) and `robots.txt` for search engine crawling.

### 🆕 **New Projects & Content**

- **Tremors Music App (Desktop):** Added new Tauri-based desktop music player project with Beta status badge featuring cyan/purple gradient styling.

- **Arcade Nexus:** Added browser-based gaming console project to the portfolio.

### 🎨 **Visual & UI Updates**

- **Beta Status Styling:** Implemented distinct visual treatment for Beta projects with glowing cyan border, animated badge, and gradient hover overlay.

- **404 Page Redesign:** Created a theme-aware `404.html` that matches the site's aesthetic with settings modal, GIF animation, and theme support.

### 📦 **Project Ranking & Organization**

- **Reordered Projects:** Updated `projects.json` with new priority ranking (Quizzer AI → GitNexus → Algorithm Visualizer → Tremors Music App → Arcade Nexus → ...).

- **TUI Sync:** Updated `tui.html` portfolio section to match the new project order with 5 visible and 11 hidden projects.

### 🔒 **Security**

- **External Links:** Added `rel="noopener noreferrer"` to all dynamically generated external links in `home.js`.

---

## [v2.2.2] - 09-12-2025

### 🎨 **Theme System Restructure**

- **Renamed "Default" Theme to "MD" (Material Design):** The original blue-gradient theme is now called "MD" to better reflect its Material Design origins and to align naming with "MD3".

- **OLED is Now the Default Theme:** Fresh visitors will see the clean, distraction-free OLED theme by default, with pure blacks and minimal visual noise.

- **Effects Disabled by Default:** Fog, Glass, and Spotlight effects are now all disabled out of the box. Users can opt-in to these visual enhancements via the Appearance Settings modal.

- **Three Theme Options:** MD (blue gradient), MD3 (purple gradient), and OLED (black/white) are now the official theme lineup.

---

## [v2.2.1] - 09-12-2025

### ♻️ **Code Quality & Refactoring**

- **Shared Utilities Module:** Created `static/js/utils.js` to centralize common functions and eliminate code duplication.
    - Extracted `getBadgeLabel()` (previously duplicated in `home.js` and `project.js`).
    - Added `escapeHtml()` utility for XSS protection.

- **Security Hardening:** Added HTML entity escaping for URL parameters in `project.js` error messages to prevent potential XSS attacks.

- **CSS Best Practices:**
    - Replaced inline JavaScript styles with `.sidebar-badge` CSS class in `project.css`.
    - Removed `!important` override in mobile footer nav by using proper CSS specificity.
    - Added standard `line-clamp` property alongside `-webkit-line-clamp` for browser compatibility.

- **Theme Synchronization:** Aligned the inline theme initialization script between `index.html` and `project.html` to respect saved `effect_mode` preferences consistently.

### 🐛 **Bug Fixes**

- Fixed "LIbraries" typo → "Libraries" in the Skills section.
- Fixed badge proficiency bar mismatches (Numpy/Pandas: 80%, TensorFlow: 50%).
- Improved alt text for navigation images (`"project thumbnail"` suffix).
- Restored dotted border on the GitHub card image container.

---

## [v2.2.0] - 07-12-2025

### 🚀 **The Theme & Effects Engine**

- **Modular Theme Architecture:** Completely decoupled visual styles from structural CSS.
    - Created **`static/themes/`** for color palettes (`default.css`, `md3.css`, `oled.css`).
    - Created **`static/effects/`** for visual layers (`fog.css`, `glass.css`, `spotlight.css`).
    - This allows mix-and-match capabilities (e.g., *Default Theme* with *Glass Effect*).

- **Settings Modal:** Replaced the simple dropdown swatches with a centralized **Appearance Settings** modal.
    - **Granular Control:** Users can now independently toggle **Color Mode** (System/Light/Dark), **Visual Theme**, **Scene Effects**, and **Spotlight**.
    - **Live Preview:** Changes apply instantly without reloading.

### ✨ **New Features**

- **Universal Toast System:** Refactored the email notification toast into a global `window.showToast()` utility, now used by both the Contact section and the Easter Egg ("Python Mode") for a consistent UI.
    
- **Persistent Portfolio State:** Implemented `sessionStorage` logic in `home.js`. If a user expands the portfolio ("Load More") and navigates away, the grid remains expanded when they return, preserving their context.
    
- **Glassmorphism 2.0:** Upgraded the OLED "Glass" effect to use high-translucency backgrounds (`rgba(18,18,18,0.45)`) with heavy `backdrop-filter: blur(20px)` for a true frosted look.

### 📄 **Data & Content**

- **Installation Data:** Parsed the universal `UREADME.md` to auto-populate the `installation` field in `projects.json` for 10+ projects (GitNexus, Tremors Music, etc.), ensuring the Terminal Widget displays accurate setup commands.

### 🐛 **Bug Fixes & Refactoring**

- **Spotlight Logic:** Extracted spotlight gradients from `index-sections.css` into a toggleable `spotlight.css` file to fix the "always-on" bug in the Skills section.
- **Project Page Synchronization:** Updated `project.html` to fully support the new Theme Engine, Settings Modal, and Anti-Flash scripts, ensuring a seamless transition from the home page.
- **Clean Code:** Deleted deprecated files (`index-variables.css`, `md3-variables.css`, `md3-overrides.css`) following the successful migration to the new architecture.

---

## [v2.1.0] - 06-12-2025

### ✨ **New Features**

- **Time Machine (Project History):** Added a dedicated timeline page (`history.html`) to visualize the project's evolution from v0.0.0 to v2.0.0.
    
- **TUI Git Log:** Added a terminal-styled history page (`history-tui.html`) featuring an ASCII git graph and command-line aesthetics.
    
- **Evolution Visualization:** Embedded a 60fps **Gource timelapse video** (`v0.0.0-v2.0.0.mp4`) showing the codebase growth over time.
    
- **Navigation Shortcuts:** Added a "Time Machine" shortcut to the main Dropdown menu and a version stamp (`v2.0.0`) to the footer.
    

### ♻️ **Refactoring & Architecture**

- **Directory Restructure:** Moved meta-pages (`index-404.html`, `tui-404.html`, `history.html`) into a clean **`system/`** directory.
    
- **Path Standardization:** Updated all asset references (CSS/JS/Images) in system pages to use relative paths (`../`).
    

### 🐛 **Bug Fixes (Mobile)**

- **Hero Visibility:** Reduced mobile hero section height (`min-height: calc(100svh - 100px)`) to ensure the "View My Work" button is visible above the floating nav dock.
    
- **Typewriter Jitter:** Fixed layout shifting in the Hero text by enforcing a reserved `min-height` for the typing animation container.
    
- **Video Optimization:** Constrained the TUI video player width to prevent upscaling blur on large screens.
    
---

## [v2.0.0] - 06-12-2025

### 🚀 **Architecture & Refactoring**

- **Page-Specific JS Split:** Further decoupled logic by creating `home.js` (Typewriter, Portfolio Grid) and ensuring `project.js` handles only detail pages. `index.js` now strictly manages shared global logic (Themes, Navigation, Toast).
    
- **JS Decoupling & Extras:** Split the monolithic `index.js` to isolate concerns, including an `extras.js` file for handling visual effects (Magnetic Text, Easter Eggs, Console Logs).
    
- **Script Optimization:** Updated `index.html` and `project.html` to only load the specific JavaScript files required for that context, reducing unused code execution.
    
- **CSS Modularization:** Removed the `@import` waterfall performance bottleneck. CSS is now split into modular files (`base`, `sections`, `animations`) linked directly in HTML.
    
- **Project CSS Isolation:** Added a CSS reset in `project.css` to prevent global homepage styles (fog effects, large vertical padding) from bleeding into and breaking the project detail layout.
    
- **Scroll Spy Logic:** Updated `index.js` `IntersectionObserver` to target both standard `<section>` tags and `.content-section` classes, ensuring navigation highlighting works on project pages without altering HTML structure.
    
- **Dynamic Portfolio Logic:** Replaced static HTML hiding with a true JavaScript "Load More" system that dynamically appends projects from the JSON source.
    
- **Project Page Cleanup:** Removed the deprecated static "Installation & Usage" section, replacing it with the new Smart Terminal widget.
    

### ✨ **New Features**

- **Smart Terminal Widget:** Transformed the plain text installation block into a fully interactive Terminal window on project pages.
    
    - **Syntax Highlighting:** Automatically detects comments vs. commands.
        
    - **OS Detection:** Detects user OS (Windows/Mac/Linux) to render appropriate window controls (Traffic lights vs. Minimize/Maximize).
        
    - **Persistent Switcher:** Added a toolbar to manually toggle OS styles, saved to `localStorage`.
        
- **MD3 Theme Engine:** Implemented a Material Design 3 theme engine with direct-link toggling (no FOUC).
    
- **SVG Theme Morph:** Implemented a smooth animation where the "MD3" theme button physically morphs from a circle to a squircle when active.
    
- **SEO & Open Graph:** Added meta tags and canonical links to resolve duplicate content issues and improve social sharing previews.
    

### 🎨 **Visual Overhaul (Atmosphere)**

- **Universal Fog System:** Implemented a global `section::after` fog layer with context-aware blending (Dark sections fade to Light Grey; Light sections fade to Dark Grey).
    
- **Hero Redesign:** Replaced animated "Aurora Blobs" with a cleaner **Material Wash** (Ambient Light) and **Tech Grid** background.
    
- **Mouse Spotlights:** Added mouse-tracking radial gradients to the Hero background and Skill cards for depth.
    
- **Magnetic Text:** Added physics-based hover effects to the text in the "About" section.
    
- **Dropdown Menu Polish:** Switched to Inline SVGs for theme buttons to fix gradient clipping bugs; centered the "Visual Theme" label and improved spacing.
    

### 📄 **Project Page Layout**

- **Responsive Reordering:** Restructured HTML into split rows (`top-row` / `bottom-row`) to ensure the **Links Sidebar** appears immediately after the Banner on mobile.
    
- **Banner Constraints:** Added logical height constraints to prevent the banner from dominating mobile viewports.
    
- **Footer Navigation:** Enforced a strict **2-column grid** for "Related Projects" on both Desktop and Mobile.
    

### ⚡ **UX & Performance**

- **Scroll Debounce:** Added a 15ms debounce utility to `window.scroll` listeners.
    
- **Toast Notifications:** Added visual feedback ("Email Copied!") for the contact card.
    
- **Navbar Integration:** Updated the navigation bar to have a transparent border, sitting seamlessly atop new fog effects.
    
- **History Management:** Fixed the "Back to Portfolio" button to respect browser history and scroll position.
    
- **TUI Accessibility:** Replaced `display:none` with `clip-path` for the TUI version to improve screen reader access.
    

### 🐛 **Bug Fixes**

- **Project Navigation Fix:** Resolved issue where navbar buttons on `project.html` remained inactive by expanding the scroll observer targets.
    
- **Back Button Logic:** Removed custom history interception in `project.js`. The "Back to Portfolio" link now reliably functions as a standard anchor link to the portfolio section.
    
- **Scroll Animation Glitch:** Updated `IntersectionObserver` to use "Play Once" logic (`unobserve`) to stop elements from flickering at the viewport threshold.
    
- **Project Layout Crash:** Fixed a critical structural bug (extra closing `</div>`) that broke the footer navigation layout.
    
- **JS Safety:** Added safe navigation `(proj.badges || [])` in `project.js` to prevent crashes on projects with missing tags.
    
- **CSS Conflicts:** Resolved collision between `.hero::after` spotlight and fog effects.
    
- **Mobile Overflow:** Applied global `box-sizing` reset to fix horizontal scroll bugs caused by Sidebar padding.
    
---

## [v1.7.0] - 05-12-2025

### 🚀 **Fixes and Improvements**

- **CSS Performance Refactor:** Completely removed the `@import` "waterfall" structure. Styles are now modular (`base`, `sections`, `animations`) and linked directly in HTML for faster First Contentful Paint (FCP).
- **SEO Overhaul:** Added comprehensive Open Graph tags, descriptions, and Canonical links to prevent duplicate content penalties between the TUI and Modern versions.

### 🎨 **Theme Engine (MD3)**

- **No-FOUC Theming:** Refactored the Material Design 3 engine to use direct link toggling (via the `disabled` attribute) instead of HREF swapping. This prevents "Flash of Unstyled Content" and ensures instant theme switching.
- **Variable Mapping:** Standardized the mapping between generic MD3 tokens (`sys-color`) and base variables, allowing the MD3 theme to "infect" the entire site structure seamlessly.

### ⚡ **UX & Logic Enhancements**

- **Smart Navigation History:** The "Back to Portfolio" button on project details pages now detects if the user came from the home page and uses `history.back()` to preserve scroll position and "Load More" states.
- **Fail-Safe Image Loading:** Implemented error handling in `project.js` to automatically hide banner containers if the image fails to load (404), preventing broken image icons.

### 🐛 **Bug Fixes & Polish**

- **Accessibility (A11y):** Replaced `display: none` on TUI radio inputs with the `clip-path` pattern, making the theme toggles accessible to screen readers.

---

## [v1.6.0] - 05-12-2025

### 🚀 **New Feature: Project Detail Pages**

- **Deep Linking:** Clicking any project card now opens a dedicated detail page (`project.html?id=...`).
    
- **Rich Data:** Expanded `projects.json` to support `longDescription`, `features`, and `installation` fields.
    
- **Responsive Layout:**
    
    - **Desktop:** Split-view with sticky sidebar and full-width banners.
        
    - **Mobile:** Optimized stacking order (Banner → Links → Overview) for immediate access to actions.
        
- **Navigation:** Added an infinite-loop "Previous / Next" project navigation footer with preview cards.
    

### 🎨 **UI Improvements**

- **Portfolio Effects:** Added a `In Development Warning` effect to portfolio cards if they have `wip` id in the json.

- **Card Design:** Implemented "Tech Spec" style feature lists with accent bars.
    
- **Micro-interactions:** Added copy-to-clipboard functionality for installation code blocks.
    
- **Dynamic Icons:** SVG icons in the sidebar now automatically adapt based on link type (GitHub vs. Web).

---

## [v1.5.0] - 23-11-2025

### 🚀 **Major Architectural Changes**

- **Modular CSS Architecture:** refactored monolithic stylesheets into a maintainable, `@import` based system.
    
    - **Modern UI:** Split `index.css` into `index-variables.css`, `index-animations.css`, `index-base.css`, `index-sections.css`, and `index-navigation.css`.
        
    - **TUI:** Split `tui.css` into `tui-themes.css`, `tui-animations.css`, and `tui-base.css`.
        
- **Data Decoupling:** Removed hardcoded project HTML cards from `index.html`. Projects are now fetched dynamically from `projects.json` via JavaScript.
    
- **File Renaming:** Renamed `indextui.html` to `tui.html` for cleaner URL routing.
    

---

### 🌇 **Modern UI (`index.html`)**

#### **Features & Logic**

- **Dynamic Project Loading:** Implemented `fetch()` logic to load projects from `projects.json`.
    
    - Added logic to initially show only the top 5 projects.
        
    - Added a "Load More/Show Less" toggle button to handle the remaining projects.
        
- **Theme Engine:**
    
    - Added support for **Material Design 3 (MD3)** via a dedicated `md3.css` override system.
        
    - Implemented a "Shape Engine" enforcing 16px/28px "squircles" on buttons and cards when MD3 is active.
        
    - Added a JavaScript-based theme toggle (Light/Dark) with `localStorage` persistence.
        
- **Easter Eggs:**
    
    - Added a developer console message inviting users to check the source code.
        
    - Implemented a "Konami code" style listener: Typing `python` or `tremors` triggers a specific alert and ASCII art in the console.
        

#### **Styling (CSS)**

- **Gradients:** Added a "Neon" conic-gradient (Pink/Purple/Cyan) to the logo, dropdowns, and profile picture borders.
    
- **Animations:** Added `jigglet` (title hover), `pulse`, and `infinite-rotate` animations for improved micro-interactions.
    
- **Navigation:** Implemented a scroll-aware navigation bar that hides on scroll down and reveals on scroll up using a debounce function.
    

---

### 👾 **Terminal UI (`tui.html`)**

#### **Theming**

- **New Theme:** Added **Tokyo Night** (`#1a1b26`) to the existing Dracula and Catppuccin theme options.
    
- **Responsive Typography:** Adjusted font sizes for mobile devices (`14px` root, `6px` ASCII art) to prevent layout breakage on small screens.
    

#### **Interactivity (CSS-Only)**

- **Project filtering:** Implemented a "Show More" feature for portfolio items using the `:target` CSS selector.
    
    - Projects #6 and onwards are hidden by default.
        
    - Clicking `ls -a .hidden` targets `#hidden-projects`, changing its display property to `flex` without using JavaScript.
        

---

### 📂 **Content & Portfolio Updates**

#### **New Projects Added**

The following projects were added to `projects.json` and the TUI markup:

- **Tremors Music Player:** Python/FastAPI backend with React/Framer Motion frontend.
    
- **GitNexus:** Flask-based self-hosted GitHub explorer.
    
- **RepoTree Generator:** CLI tool for generating directory trees respecting `.gitignore`.
    
- **PC Remote Control API:** FastAPI tool for controlling PC functions via phone.
    

#### **Tech Stack Badges**

- Added specific styling and colors for new technologies: `Next.js`, `Framer Motion`, `tsParticles`, `Pygame`, `CLI`.
    

---

### 🚧 **System Pages**

- **404 Pages:**
    
    - Created `index-404.html`: A graphical "Working on it" page with a GIF toggle (switching between a cat and coding animation).
        
    - Created `tui-404.html`: A text-based error page featuring glitch text effects and a `cd ..` button to return home.
        

---

### 🐛 **Bug Fixes & Refinements**

- **TUI Splash Screen:** Refined the splash screen animation to ensure the border fades in correctly after the ASCII art reveals.
    
- **Scroll Observer:** Added `IntersectionObserver` to highlight the active navigation link based on the section currently in the viewport.
    

---