# 🌐 Project Overview

This repository hosts my **personal portfolio**, built in two distinct versions:

- 🌇 **[`index.html`](https://qtremors.github.io/)** – Modern, Material Design-inspired UI with animations, dynamic JSON content loading, and a switchable MD3 theme.
    
- 📄 **`project.html`** – A dedicated, dynamic detail view for every project, featuring deep linking, installation guides, and tech specs.
    
- 👾 **[`tui.html`](https://qtremors.github.io/tui.html)** – Terminal-inspired TUI with multiple themes, fonts, and a CSS-only splash screen.
    

All versions are **fully responsive**, minimalist, and built with **clean, semantic HTML and CSS**.

The TUI version is completely **JavaScript-free**, utilizing advanced CSS selectors for interactivity, while the modern version uses **vanilla JS** for data fetching and theme logic.

---

## 📸 Screenshots

### 🌇 Material UI [▶](https://qtremors.github.io/) 
![Modern UI Screenshot](assets/index.png)

### 👾 Terminal TUI [▶](https://qtremors.github.io/tui.html)
![Terminal TUI Screenshot](assets/tui.png)

---

## ✨ Key Features

### 🌇 Modern UI (`index.html` & `project.html`)

This version focuses on a scalable, data-driven user experience with a professional aesthetic.

#### **Architecture & Data**

- **Dynamic Content Loading:** Projects are fetched dynamically from **`projects.json`** using the Fetch API.
    
    - Includes logic for **"Load More" / "Show Less"** to keep the initial load lightweight.
        
- **Modular CSS Architecture:** Styles are refactored into a maintainable system using `@import` (Base, Animations, Sections, Navigation).
    
- **Project Detail Views:** - **Deep Linking:** URLs like `project.html?id=quizzer-ai` dynamically render content.
    
    - **Rich Data:** Supports "Tech Spec" feature lists, long-form descriptions, and installation code blocks with **Copy-to-Clipboard** functionality.
        
    - **Infinite Navigation:** Footer navigation allowing users to cycle through previous/next projects.
        

#### **UI & Visual Design**

- **Material Design 3 (MD3) Support:** Includes a dedicated **MD3 Theme engine** (`md3.css`) that reshapes buttons into "squircles" and applies a new expressive color palette.
    
- **Dynamic Theming:** **JavaScript-powered light/dark mode toggle** with `localStorage` persistence.
    
    - **Neon Gradients:** Rotating conic-gradients on the logo and profile picture borders.
        
- **Immersive Navigation:** Navigation bars **auto-hide on scroll down** and **reappear on scroll up** (debounced for performance).
    
    - **Active Section Highlighting** using the `IntersectionObserver` API.
        
- **WIP Indicators:** Projects marked as `wip` in JSON display a specific "Development" hazard effect.
    

---

### 👾 Terminal UI (`tui.html`)

This version is a **creative exploration of what's possible with only HTML and CSS**, prioritizing performance and a unique retro aesthetic.

#### **UI & Visual Design**

- **Retro TUI Aesthetic:** Classic command-line look with monospaced fonts and prompt-style navigation.
    
- **Expanded Themes:** - **Dracula** (Default)
    
    - **Catppuccin** (Macchiato)
        
    - **Tokyo Night** (New!)
        
        Achieved using **hidden radio inputs** and the **CSS general sibling combinator (`~`)**.
        

#### **UX & Interactivity**

- **CSS-Only "Show More":** Uses the **`:target` CSS pseudo-class** to reveal hidden projects without a single line of JavaScript.
    
- **Boot Sequence:** Animated splash screen simulating a **terminal boot-up** using CSS keyframes.
    
- **Uncompromising Performance:** Zero JavaScript = **lightning-fast loading** and **maximum reliability**.
    

---

## 🚧 Development Status Features

The system includes specialized handling for projects that are currently being built or are temporarily offline:

- **Visual WIP Indicators:** Projects marked as `wip` in the JSON data are automatically rendered with a **"Hazard" theme**—featuring a yellow border, a "Development" badge, and a holographic "Construction Zone" stripe overlay on hover.
    
- **Custom 404 Handling:** - **Modern UI:** Redirects to `index-404.html`, featuring an interactive toggle between "Cat" and "Coding" animations.
    
    - **TUI:** Redirects to `tui-404.html`, a text-only error page with CRT glitch effects and CLI-style navigation.

---

## 🔧 Technologies Used

|**Technology**|**Usage**|
|---|---|
|**HTML5**|Structure & semantics|
|**CSS3**|Layouts, variables, animations, MD3 overrides, JS-free interactivity|
|**JavaScript**|Fetch API (JSON loading), URLSearchParams, IntersectionObserver|
|**JSON**|Data storage for Portfolio projects|

---

**Crafted with ❤️ by Tremors**