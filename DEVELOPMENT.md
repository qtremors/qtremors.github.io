# Tremors Portfolio - Technical Reference

> Architecture and implementation details for Tremors Portfolio.

**Version:** 2.7.0 | **Last Updated:** 2026-01-14

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
│   │   ├── base.css          # Reset, variables, typography
│   │   ├── sections.css      # Hero, skills, projects, footer
│   │   ├── animations.css    # Keyframes, transitions
│   │   ├── effects.css       # Fog, Glass, Spotlight
│   │   └── themes/           # MD, MD3, OLED theme overrides
│   │
│   └── js/
│       ├── home.js           # index.html logic (Load More, themes)
│       ├── project.js        # project.html logic (deep linking)
│       └── extras.js         # Shared utilities (terminal widget)
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
| `base.css` | Reset, variables, typography | None |
| `sections.css` | Layout components | `base.css` |
| `animations.css` | Keyframes, transitions | `base.css` |
| `effects.css` | Fog, Glass, Spotlight | `base.css` |

### JavaScript Modules

| Module | Page | Exports |
|--------|------|---------|
| `home.js` | `index.html` | Theme engine, Load More, Effects |
| `project.js` | `project.html` | Deep linking, OS detection |
| `extras.js` | Shared | Terminal widget, utilities |

---

## Theme System

### Available Themes

| Theme | Mode | Description |
|-------|------|-------------|
| **OLED** | Dark | Default. Pure black background, minimal distractions. |
| **MD** | Light/Dark | Material Design with shadows and elevation. |
| **MD3** | Light/Dark | Material Design 3 with rounded shapes and morphing animations. |

### Visual Effects

| Effect | Description | Performance Impact |
|--------|-------------|-------------------|
| **None** | Clean, distraction-free | ⚡ Fastest |
| **Fog** | Context-aware gradient backgrounds | 🔶 Moderate |
| **Glass** | Frosted glass borders (backdrop-filter) | 🔶 Moderate |
| **Spotlight** | Mouse-tracking radial gradients | ⚫ GPU-intensive |

### localStorage Keys

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `theme` | `string` | `"oled"` | Current theme (oled/md/md3) |
| `darkMode` | `boolean` | `true` | Light/dark mode toggle |
| `effect` | `string` | `"none"` | Active effect (none/fog/glass) |
| `spotlight` | `boolean` | `false` | Mouse spotlight enabled |
| `projectsShown` | `number` | `6` | "Load More" pagination state |

---

## Data Schema

### projects.json

```json
{
  "projects": [
    {
      "id": "unique-slug",
      "title": "Project Name",
      "description": "Short description for cards",
      "longDescription": "Detailed description for project page",
      "image": "assets/project-image.png",
      "url": "https://live-demo.com",
      "github": "https://github.com/user/repo",
      "tech": ["HTML", "CSS", "JavaScript"],
      "features": ["Feature 1", "Feature 2"],
      "status": "live",
      "install": {
        "windows": "winget install app",
        "mac": "brew install app",
        "linux": "apt install app"
      }
    }
  ]
}
```

### Project Status Values

| Status | Visual Treatment | Use Case |
|--------|------------------|----------|
| `live` | Default styling | Production-ready projects |
| `wip` | Yellow "Construction Zone" stripes | Under active development |
| `beta` | Cyan/purple gradient + pulsing badge | Feature-complete but testing |
| `archive` | Muted styling | Deprecated or unmaintained |

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
