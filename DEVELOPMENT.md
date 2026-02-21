# Tremors Portfolio - Technical Reference

> Architecture and implementation details for Tremors Portfolio.

**Version:** 2.9.0 | **Last Updated:** 21-02-2026

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [File Conventions](#file-conventions)
- [Theme Systems](#theme-systems)
- [Data Schema](#data-schema)
- [Storage Keys](#storage-keys)
- [Anomalies & Specifics](#anomalies--specifics)
- [Performance Targets](#performance-targets)

---

## Architecture Overview

Tremors Portfolio follows a **Static-First, Progressive Enhancement** architecture:

```
┌──────────────────────────────────────────────────────────────┐
│                      Presentation Layer                      │
│              HTML5 (Semantic) + CSS3 (Modular)               │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                      Interactivity Layer                     │
│     ES6 Modules (Modern UI) | Pure CSS (Terminal TUI)        │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                         Data Layer                           │
│                 JSON (projects.json) + localStorage          │
└──────────────────────────────────────────────────────────────┘
```

The project is organized with:
- **Modern UI (`index.html`)**: Progressive enhancement with ES6 modules for data fetching, namespaced utilities (`Tremors.utils`), and dynamic component injection.
- **Terminal TUI (`tui.html`)**: Zero JavaScript—pure HTML/CSS interactivity using radio inputs and CSS pseudo-classes.
- **Data**: Server-less data model using JSON files and localStorage for persistence.

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **No Build Step** | Direct browser loading—no bundlers, transpilers, or complex toolchains. |
| **Namespace Safety** | Shared utilities are strictly scoped under `window.Tremors.utils` to prevent global pollution. |
| **Modular JavaScript** | Dynamic UI parts (modals, navbars) are injected via `components.js`. Theming is handled early via `theme-init.js` to prevent FOUC. |
| **CSS-Only TUI** | Creative exploration of pure CSS interactivity; zero JS dependencies. |
| **localStorage** | Client-side persistence for theme, effects, and state. |

---

## Project Structure

```
qtremors.github.io/
├── index.html                # Modern UI landing page
├── project.html              # Dynamic project detail view
├── tui.html                  # Terminal TUI (JS-free)
├── 404.html                  # Theme-aware root error page
│
├── assets/                   # Images & screenshots
├── data/
│   └── projects.json         # Portfolio project data
│
├── static/
│   ├── css/
│   │   ├── index-animations.css    # Keyframes, transitions
│   │   ├── index-base.css          # Reset, variables, typography
│   │   ├── index-navigation.css    # Header, footer, nav
│   │   ├── index-sections.css      # Content sections
│   │   ├── project.css             # project.html specific styles
│   │   ├── tui-themes.css          # Terminal TUI pure CSS themes
│   │   └── tui-styles.css          # Terminal TUI base layout
│   │
│   ├── js/
│   │   ├── theme-init.js           # Early theme/feature initialization
│   │   ├── components.js           # Dynamically injects Navigation and Modals
│   │   ├── utils.js                # Shared tools (window.Tremors.utils)
│   │   ├── index.js                # Core app engine (Theming, Toast)
│   │   ├── home.js                 # index.html logic (Typewriter, Projects)
│   │   ├── project.js              # project.html logic (Details, Scrollspy)
│   │   └── extras.js               # Visual effects (Magnetic text, Observers)
│   │
│   ├── themes/                     # MD, MD3, OLED theme CSS variables
│   ├── effects/                    # Fog, Glass, Spotlight CSS
│   └── patterns/                   # Dots, Grid, Waves background CSS
│
├── system/
│   ├── history.html          # Time Machine (Modern UI)
│   ├── index-404.html        # Modern UI 404
│   └── tui-404.html          # Terminal TUI 404
│
├── CHANGELOG.md              # Version history
├── DEVELOPMENT.md            # This file
└── README.md                 # User-facing documentation
```

---

## File Conventions

### HTML Files

| File | Purpose | JavaScript Usage |
|------|---------|------------------|
| `index.html` | Modern UI landing | ✅ Full ES6 Modules |
| `project.html` | Project detail view | ✅ Full ES6 Modules |
| `tui.html` | Terminal TUI | ❌ Zero JS (Pure HTML/CSS) |
| `404.html` | Root error page | ✅ Minimal (for theme init only) |

---

## Theme Systems

### 🌇 Modern UI Theme System (JavaScript)
The Modern UI uses JavaScript (`theme-init.js` and `index.js`) to read `localStorage` and toggle CSS files dynamically.
- **Themes**: MD (Default Material), MD3 (Material 3), OLED (Pure Black).
- **Effects**: Fog, Glass, Spotlight, Patterns.

### 👾 Terminal TUI Theme System (Pure CSS)
The Terminal TUI (`tui.html`) does **not** use JavaScript for its theme engine. 
It relies entirely on HTML `<input type="radio">` elements hidden at the top of the DOM. 
When a user clicks a theme `<label>`, the corresponding radio input becomes `:checked`. Using CSS general sibling combinators (`~`), the `tui-themes.css` file dynamically applies the theme variables to the `.tui-container`.

Available TUI Themes:
- **Dracula** (Default)
- **Catppuccin** (Macchiato variant)
- **Tokyo Night**

---

## Data Schema

### projects.json

```json
[
  {
    "id": "unique-slug",
    "title": "Project Name",
    "image": "assets/project-preview.png",
    "description": "Short description for cards",
    "longDescription": "Detailed narrative for project page",
    "features": ["Feature 1", "Feature 2"],
    "installation": "# Step-by-step CLI commands",
    "status": "beta",
    "badges": ["tech-python", "tech-react"],
    "links": [
      {
        "text": "Website",
        "url": "https://example.com",
        "class": "link-primary"
      }
    ]
  }
]
```

---

## Storage Keys

The application uses `localStorage` to persist user preferences across sessions. 

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `style_mode` | `string` | `"md"` | Current theme (md/md3/oled) |
| `theme_pref` | `string` | `"system"` | Color mode preference (system/light/dark) |
| `effect_mode` | `string` | `"none"` | Active scene effect (none/fog/glass) |
| `spotlight_mode`| `string` | `"off"` | Mouse spotlight toggle (on/off) |
| `pattern_mode` | `string` | `"none"` | Active hero pattern background |
| `portfolio_expanded`| `boolean`| `false` | Tracks if the user expanded the "Load More" project grid |
| `terminal_theme`| `string` | `"MacOS"` | Smart Terminal widget OS mock (MacOS/Windows/Linux) |

---

## Anomalies & Specifics

### `tui.html` `#home` Markup Duplication
The `tui.html` document intentionally contains two complete copies of the `#home` section markup (the ASCII art logo and intro text).
1. **Splash Screen**: Used specifically for the initial CSS-based boot animation.
2. **Main Content**: The actual persistent element once the animation finishes. 

Because `tui.html` enforces a strict zero-JavaScript rule, this markup duplication is required to achieve the seamless transition between the keyframe boot animation and the interactive terminal layout without relying on DOM manipulation.

---

## Performance Targets

| Metric | Target | Focus Area |
|--------|--------|------------|
| **LCP** | < 2.5s | Hero images use `loading="eager"` while others use `lazy`. |
| **FID** | < 100ms | Heavy mousemove calculations are scheduled via `requestAnimationFrame` to avoid frame drops. |
| **Security**| High | All DOM string injections use `encodeURI()` or secure `document.createElement()`. |

---

<p align="center">
  <a href="README.md">← Back to README</a>
</p>
