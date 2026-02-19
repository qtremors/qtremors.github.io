# Tremors Portfolio - Technical Reference

> Architecture and implementation details for Tremors Portfolio.

**Version:** 2.8.3 | **Last Updated:** 2026-02-19

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [File Conventions](#file-conventions)
- [Theme System](#theme-system)
- [Data Schema](#data-schema)
- [Code Style](#code-style)
- [Performance Targets](#performance-targets)
- [Browser Compatibility](#browser-compatibility)

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
- **Modern UI (`index.html`)**: Progressive enhancement with ES6 modules for data fetching and theming.
- **Terminal TUI (`tui.html`)**: Zero JavaScript—pure HTML/CSS interactivity using radio inputs and CSS pseudo-classes.
- **Data**: Server-less data model using JSON files and localStorage for persistence.

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **No Build Step** | Direct browser loading—no bundlers, transpilers, or complex toolchains. |
| **Modular CSS** | Split into `base`, `sections`, `animations` to avoid `@import` waterfalls. |
| **ES6 Modules** | Native browser module support with context-aware loading per page. |
| **CSS-Only TUI** | Creative exploration of pure CSS interactivity; zero JS dependencies. |
| **localStorage** | Client-side persistence for theme, effects, and "Load More" state. |

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
│   ├── index.png             # Modern UI screenshot
│   ├── tui.png               # Terminal TUI screenshot
│   └── alien.svg             # Logo
│
├── data/
│   └── projects.json         # Portfolio project data
│
├── static/
│   ├── css/
│   │   ├── index-animations.css    # Keyframes, transitions
│   │   ├── index-base.css          # Reset, variables, typography
│   │   ├── index-navigation.css    # Header, footer, nav
│   │   ├── index-sections.css      # Content sections
│   │   └── project.css             # project.html specific styles
│   │
│   ├── js/
│   │   ├── utils.js                # Shared utilities (Badges, Escaping)
│   │   ├── index.js                # Shared engine (Theming, Toast, Nav)
│   │   ├── home.js                 # index.html logic (Typewriter, Projects)
│   │   ├── project.js              # project.html logic (Clipboard, OS)
│   │   └── extras.js               # Visual effects (Magnetic text)
│   │
│   ├── themes/                     # MD, MD3, OLED theme overrides
│   ├── effects/                    # Fog, Glass, Spotlight
│   └── patterns/                   # Dots, Grid, Waves
│
├── system/
│   ├── history.html          # Time Machine (Modern UI)
│   ├── history-tui.html      # Git Log (Terminal TUI)
│   ├── index-404.html        # Modern UI 404
│   └── tui-404.html          # Terminal TUI 404
│
├── robots.txt                # Search engine directives
├── sitemap.xml               # SEO sitemap
├── CHANGELOG.md              # Version history
├── LICENSE.md                # License terms
├── DEVELOPMENT.md            # This file
└── README.md                 # User-facing documentation
```

---

## File Conventions

### HTML Files

| File | Purpose | JavaScript |
|------|---------|------------|
| `index.html` | Modern UI landing | ✅ ES6 Modules |
| `project.html` | Project detail view | ✅ ES6 Modules |
| `tui.html` | Terminal TUI | ❌ None |
| `404.html` | Root error page | ❌ Minimal |

### CSS Architecture

| File | Scope | Dependencies |
|------|-------|--------------|
| `index-base.css` | Reset, variables, typography | None |
| `index-sections.css`| Layout & components | `index-base.css` |
| `index-animations.css`| Keyframes & transitions | `index-base.css` |
| `project.css` | Project-page specific | `index-base.css` |

### JavaScript Modules

| Module | Purpose | Scope |
|--------|---------|-------|
| `utils.js` | Shared utility functions | Global |
| `index.js` | Theme engine & navigation | Global |
| `home.js` | Typewriter & Portfolio loading| `index.html` |
| `project.js` | Clipboard & OS detection | `project.html` |
| `extras.js` | Magnetic text effects | Shared |

---

## Theme System

### Available Themes

| Theme | Mode | Description |
|-------|------|-------------|
| **MD** | Light/Dark | **Default.** Material Design with shadows and elevation. |
| **MD3** | Light/Dark | Material Design 3 with expressive shapes and morphing animations. |
| **OLED** | Light/Dark | Pure Black (Dark) and Pure White (Light/Paper) theme. |

### Visual Effects

| Effect | Description | Performance Impact |
|--------|-------------|-------------------|
| **None** | Clean, distraction-free | ⚡ Fastest |
| **Fog** | Context-aware gradient backgrounds | 🔶 Moderate |
| **Glass** | Frosted glass borders (backdrop-filter) | 🔶 Moderate |
| **Spotlight**| Mouse-tracking radial gradients | ⚫ GPU-intensive |
| **Patterns** | Hero background overlays (dots/grid/waves) | ⚡ Fast |

### localStorage Keys

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `style_mode` | `string` | `"md"` | Current theme (md/md3/oled) |
| `theme_pref` | `string` | `"system"` | Color mode (system/light/dark) |
| `effect_mode` | `string` | `"none"` | Active scene effect (none/fog/glass) |
| `spotlight_mode`| `string` | `"off"` | Mouse spotlight toggle (on/off) |
| `pattern_mode` | `string` | `"none"` | Active hero pattern background |
| `portfolio_expanded`| `boolean`| `false` | "Load More" pagination state |
| `terminal_theme`| `string` | `"mac"` | OS switch state (mac/win/linux) |

---

## Data Schema

### projects.json

```json
[
  {
    "id": "unique-slug",
    "title": "Project Name",
    "image": "assets/project-preview.png",
    "description": "Short description for cards (grid view)",
    "longDescription": "Detailed narrative for project page",
    "features": [
      "Feature 1 Description",
      "Feature 2 Description"
    ],
    "installation": "# Step-by-step CLI commands\ngit clone ...\nnpm install",
    "recommended": "related-project-slug",
    "status": "beta",
    "badges": [
      "tech-python",
      "tech-react"
    ],
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

### Project Status Values

| Status | Treatment | Badge / Effect |
|--------|-----------|----------------|
| `live` (none) | Clean | Default card styling |
| `wip` | Warning | Yellow stripes, "Under Construction" badge |
| `beta` | Info | Pulsing cyan badge, gradient highlights |
| `archive` | Muted | Grayscale card, "Legacy" notice |

---

## Code Style

| Language | Standard | Notes |
|----------|----------|-------|
| **HTML** | Semantic HTML5 | ARIA labels, skip links |
| **CSS** | BEM-like naming | `section__element--modifier` |
| **JavaScript** | ES6+ | `const` default, no `var` |

---

## Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| **LCP** | < 2.5s | Lighthouse |
| **FID** | < 100ms | Lighthouse |
| **CLS** | < 0.1 | Lighthouse |
| **Accessibility** | > 90 | Lighthouse |

---

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| ES6 Modules | ✅ | ✅ | ✅ | ✅ |
| CSS `:has()` | ✅ | ✅ | ✅ | ✅ |
| `backdrop-filter` | ✅ | ✅ | ✅ | ✅ |
| CSS Radio Hacks | ✅ | ✅ | ✅ | ✅ |

---

<p align="center">
  <a href="README.md">← Back to README</a>
</p>
