# Tremors Portfolio - Technical Reference

> Architecture and implementation details for Tremors Portfolio.

**Version:** 3.0.0 | **Last Updated:** 25-02-2026

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Naming Conventions](#naming-conventions)
- [File Conventions](#file-conventions)
- [Theme Systems](#theme-systems)
- [Data Schema](#data-schema)
- [Storage Keys](#storage-keys)
- [Security Practices](#security-practices)
- [Anomalies & Specifics](#anomalies--specifics)
- [Performance Targets](#performance-targets)
- [Intended Changes](#intended-changes)
- [Project Auditing & Quality Standards](#project-auditing--quality-standards)
- [Contributing](#contributing)

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
│   ├── history-tui.html      # Time Machine (Terminal TUI)
│   ├── index-404.html        # Modern UI 404
│   └── tui-404.html          # Terminal TUI 404
│
├── CHANGELOG.md              # Version history
├── DEVELOPMENT.md            # This file
├── LICENSE.md                # License terms (TSL)
└── README.md                 # User-facing documentation
```

---

## Naming Conventions

> Names should be self-documenting. A reader should understand what a file, function, or component does without opening it.

### Files & Directories

| Type | Convention | Good Example | Bad Example |
|------|-----------|--------------|-------------|
| **Pages** | `kebab-case.html` | `project.html`, `history-tui.html` | `page2.html`, `historyTUI.html` |
| **Stylesheets** | `prefix-purpose.css` | `index-animations.css`, `tui-themes.css` | `styles.css`, `main.css` |
| **Scripts** | `purpose.js` | `home.js`, `theme-init.js` | `script.js`, `app.js` |
| **Assets** | `descriptive-name.ext` | `index.png`, `alien.svg` | `img1.png`, `logo2.svg` |
| **Data** | `collection.json` | `projects.json` | `data.json` |

### Functions & Methods

| Prefix | Purpose | Example |
|--------|---------|---------|
| `get` / `fetch` | Retrieve data | `getBadgeLabel()`, `fetchProjectData()` |
| `create` / `add` | Create a new element | `createProjectCard()`, `addLineItem()` |
| `update` / `set` | Modify existing state | `setTheme()`, `updateScrollPosition()` |
| `handle` | Event handler | `handleFormSubmit()`, `handleToggle()` |
| `is` / `has` / `can` | Boolean check | `isExpired()`, `hasPermission()` |
| `show` / `hide` | Visibility control | `showToast()`, `hideModal()` |
| `init` / `setup` | Initialization | `initTheme()`, `setupObservers()` |
| `on` | Callback / listener | `onRouteChange()`, `onScroll()` |
| `to` | Conversion | `toJSON()`, `toDisplayString()` |

### Constants

| Type | Convention | Example |
|------|-----------|---------|
| **Constants** | `UPPER_SNAKE_CASE` | `MAX_PROJECTS_PER_PAGE`, `DEFAULT_THEME` |
| **CSS Variables** | `--prefix-name` | `--md-primary`, `--md-on-surface` |
| **localStorage Keys** | `snake_case` | `style_mode`, `theme_pref` |

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

### Content Writing Guidelines

When adding or editing project entries in `projects.json`, follow these rules:

#### Tone & Style
- Write in a **professional, factual tone**. State what the project does and how it works.
- **Do not** use aggressive marketing language (e.g., "blazing fast", "ultra-powerful", "radically", "aggressively engineered", "bleeding-edge").
- Avoid subjective adjectives like "premium", "sleek", "elegant", "stunning", etc.
- Descriptions should read like technical documentation, not sales copy.

#### Version Numbers
- **Never include version numbers** for technologies (e.g., write "Django" not "Django 5.2", write "React" not "React 19").
- This prevents maintenance overhead — version numbers in project READMEs change frequently and should not need to be mirrored here.
- The only exception is when a version number is part of a feature name or specification (e.g., "Material Design 3").

#### `description` Field
- One or two sentences summarizing what the project is and what it does.
- Mention the primary tech stack without version numbers.
- Should be concise enough for a card preview.

#### `longDescription` Field
- Two paragraphs: the first explains what the project is and its core architecture; the second covers specific features or capabilities.
- Use `\n\n` to separate paragraphs within the JSON string.
- Reference specific, verifiable details from the project's README/DEVELOPMENT documentation.
- Do not make claims that are not documented in the project's own files.

#### `features` Array
- Exactly **6 items** per project.
- Each item should be a short, specific phrase — not a full sentence.
- Use concrete, measurable details where possible (e.g., "11 Concurrent Scanners" instead of "Many Scanners").
- Do not duplicate information already conveyed in the description.

#### `installation` Field
- Copy the exact commands from the project's README Quick Start section.
- Include all required steps: clone, cd, install, env setup, and run.
- Use `\n` for line breaks within the JSON string.

#### `badges` Array
- Only include badges for technologies that have a corresponding `tech-*` badge defined in the site's badge system.
- Do not invent badge IDs. Check existing entries for valid badge names.

### Badge Color Guidelines

When adding or modifying badge colors in `index-base.css`, follow these rules:

#### OLED & Theme Safety
- **Minimum lightness ~25%** — badges must remain visible on the OLED theme's pure black background. Avoid near-black colors (e.g., `#092E20`, `#013243`).
- **Avoid theme accent colors** — do not use colors that match `--md-primary`, `--md-background`, or `--md-surface` variables, as badges will blend into the UI.
- **No pure black or white** — `#000000` backgrounds disappear on OLED; `#FFFFFF` disappears in light mode.

#### Hue Uniqueness
- **Aim for ≥20° hue separation** between badges that commonly appear together in the same project.
- **Avoid hue crowding** — if a hue band (e.g., blue 200°-240°) already has 3+ badges, assign new badges to an unclaimed range.
- When a technology's official brand color collides with an existing badge, shift to a distinct but recognizable alternative.

#### Text Contrast
- Use `#FFFFFF` text on backgrounds with HSL lightness ≤55%.
- Use `#1E1E1E` text on backgrounds with HSL lightness >55%.
- Exception: `tech-cli` uses `#00FF00` (terminal green) for thematic effect.

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

## Security Practices

### Input Sanitization & XSS Prevention

- All user-facing DOM string injections use `document.createElement()` + `.textContent` instead of `innerHTML` with template literals.
- Image and link URLs are sanitized through `encodeURI()` before injection.
- The `escapeHtmlSafe` utility in `project.js` deterministically escapes `& < > " ' /` and backtick characters.

### Anti-Scraping

- Email addresses are encoded and injected via JavaScript to limit crawler indexing. The TUI retains a standard `mailto:` fallback.

### Sensitive Data

- No credentials, tokens, or API keys exist in the codebase.
- The project does not use `.env` files or server-side configuration.

---

## Performance Targets

| Metric | Target | Focus Area |
|--------|--------|------------|
| **LCP** | < 2.5s | Hero images use `loading="eager"` while others use `lazy`. |
| **FID** | < 100ms | Heavy mousemove calculations are scheduled via `requestAnimationFrame` to avoid frame drops. |
| **Security**| High | All DOM string injections use `encodeURI()` or secure `document.createElement()`. |

---

## Intended Changes

> Planned changes, upcoming features, and known technical debt. For a complete history of completed changes, see [CHANGELOG.md](CHANGELOG.md). For tracked tasks, see [TASKS.md](TASKS.md).

---

## Project Auditing & Quality Standards

> A structured approach to ensuring the project is correct, secure, and maintainable.

### System Understanding

Before making significant changes, ensure a deep understanding of:
- **Core Architecture**: The dual-mode (Modern UI / Terminal TUI) system and its data flow.
- **Implicit Design**: The strict zero-JS rule in TUI, namespace scoping in Modern UI, and theme attribute targeting (`<html>`).
- **Edge Cases**: Cross-file synchronization between `projects.json`, `tui.html`, `sitemap.xml`, and history pages.

### Audit Categories

Evaluate changes and existing code against these dimensions:

| Category | Focus Areas |
|----------|-------------|
| **Correctness** | Logical errors, edge-case failures, silent failures, data integrity |
| **Security** | XSS vectors, input sanitization, DOM injection safety |
| **Performance** | LCP/FID budgets, animation frame scheduling, lazy loading |
| **Architecture** | Build-free constraints, CSS-only TUI interactivity, namespace safety |
| **Maintainability** | Readability, naming consistency, technical debt, dead code |
| **Documentation** | Accuracy, completeness, cross-file consistency |

### General Anomalies

Identify and resolve anything that is:
- **Confusing**: Inconsistent or unjustified logic.
- **Out of place**: Contextually surprising behavior.
- **Undocumented**: Implicit assumptions that aren't spelled out.

### Reporting Process

- All audit findings must be added to [TASKS.md](TASKS.md).
- Ensure entries are **Clear**, **Actionable**, and **Concisely described**.
- Avoid vague statements; provide concrete context and impact.

---

## Contributing

### Commit Messages

Follow a descriptive format:

```
vX.Y.Z: Short summary of changes

> Detailed description of what changed and why.
```

### Code Style

- Use **section-based comments** to describe logical blocks.
- Use **sub-comments** for important subsections.
- Use **inline comments sparingly**, only when intent is non-obvious.
- Prefer readable, self-documenting code over excessive commentary.
- All shared utilities must be scoped under `window.Tremors.utils`.

### Pull Request Process

1. Create a branch from `main`
2. Make your changes following the conventions above
3. Verify changes render correctly in browser
4. Commit with clear messages
5. Open a Pull Request with:
   - [ ] Description of what changed and why
   - [ ] Screenshots (if UI changes)
   - [ ] Related issue/task link

---

<p align="center">
  <a href="README.md">← Back to README</a>
</p>
