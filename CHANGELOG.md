# Changelog


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