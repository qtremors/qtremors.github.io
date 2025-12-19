# Development Guidelines

> Maintain consistency across all pages and components when making changes.

---

## 🎨 Theme System

### Flash Prevention Pattern
All HTML pages must use this pattern in `<head>`:

```html
<!-- 1. All theme stylesheets start DISABLED -->
<link rel="stylesheet" href="static/themes/md.css" id="theme-md" disabled>
<link rel="stylesheet" href="static/themes/md3.css" id="theme-md3" disabled>
<link rel="stylesheet" href="static/themes/oled.css" id="theme-oled" disabled>

<!-- 2. Effects and patterns (all disabled) -->
<link rel="stylesheet" href="static/effects/fog.css" id="effect-fog" disabled>
<link rel="stylesheet" href="static/effects/glass.css" id="effect-glass" disabled>
<link rel="stylesheet" href="static/effects/spotlight.css" id="effect-spotlight" disabled>

<!-- 3. Init script AFTER all stylesheets -->
<script>
(function() {
    var theme = localStorage.getItem('style_mode') || 'md';
    // Enable correct theme, set data-theme for color mode...
})();
</script>
```

**Key Rules:**
- Default theme is `md` (not `oled`)
- All stylesheets start with `disabled` attribute
- Script must be placed AFTER all stylesheets
- Script runs synchronously before first paint

### localStorage Keys (snake_case)
| Key | Values | Default |
|-----|--------|---------|
| `style_mode` | md, md3, oled | md |
| `theme_pref` | system, light, dark | system |
| `effect_mode` | fog, glass, none | none |
| `spotlight_mode` | on, off | off |
| `pattern_mode` | dots, grid, waves, none | none |
| `terminal_theme` | MacOS, Windows, Linux | (auto-detected) |

---

## 📦 Adding New Projects

### 1. Update `data/projects.json`
Add the project with all required fields:
```json
{
  "id": "project-slug",
  "title": "Project Name",
  "status": "wip|beta|null",
  "image": "assets/project-preview.png",
  "description": "Short description",
  "longDescription": "Detailed description",
  "features": ["Feature 1", "Feature 2"],
  "installation": "git clone ...\nnpm install",
  "badges": ["tech-python", "tech-react"],
  "links": [...]
}
```

### 2. Update `tui.html`
Projects must be manually added to `tui.html` since it has NO JavaScript.
- Add to visible grid (top 5 projects) or hidden section
- Match the exact fieldset structure used by other projects
- Keep in sync with `projects.json` ordering

---

## 🏷️ Adding New Tech Badges

Badges require updates in **3 places**:

### 1. CSS Color (`static/css/index-base.css`)
```css
.tech-newbadge {
    background-color: #HEXCOLOR;
    color: #FFFFFF; /* or #000000 for light backgrounds */
}
```

**Important:** Badge colors must be distinct from theme colors (`--md-primary`, `--md-surface`) so they don't blend into the UI.

### 2. Label Map (`static/js/utils.js`)
```javascript
'tech-newbadge': 'Display Name',
```

### 3. Usage in `projects.json`
```json
"badges": ["tech-newbadge"]
```

---

## 📄 Special Pages

### `tui.html` - Terminal UI
- **Pure CSS/HTML** — NO JavaScript
- Theme switching via hidden radio inputs + CSS `:checked` selectors
- Projects are **hardcoded** (must sync with `projects.json` manually)
- Any feature requiring JS cannot be added without major refactor

### `system/history.html` - Timeline
- Changelog/version history page
- Uses same theme system as main site
- OLED theme has special glass effect for timeline cards

### `404.html` - Error Page
- Minimal settings modal (no tabs, no patterns)
- Should match main theme system exactly

---

## 🧭 Navigation Consistency

### Desktop & Mobile Nav
`index.html` and `project.html` share identical navigation structure:
- `.top-app-bar` for desktop header
- `.navigation-bar` for mobile bottom dock
- Same dropdown menu structure and actions

When modifying navigation, update **both** files to maintain consistency.

### Settings Modal
Modal HTML is duplicated across pages. When updating:
1. `index.html` - Full modal with tabs (Themes, Effects)
2. `project.html` - Same as index
3. `404.html` - Simplified modal (no tabs)
4. `system/history.html` - Simplified modal

---

## ✅ Pre-Commit Checklist

- [ ] Theme init script matches standardized pattern
- [ ] All theme stylesheets start with `disabled`
- [ ] Default theme is `md`
- [ ] localStorage keys use snake_case
- [ ] New badges added to CSS, utils.js, and projects.json
- [ ] tui.html projects sync with projects.json
- [ ] Navigation matches across index.html and project.html
