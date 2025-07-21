## 🌐 Project Overview

A sleek, single-page personal portfolio website built with clean HTML, CSS, and vanilla JavaScript. It showcases your skills, projects, and contact info with a mobile-first, responsive design. The star of the show? A smart, floating navigation dock and theme toggle that hide on scroll and adapt beautifully across all devices.

---

## ✨ Key Features

* **🔁 Fully Responsive** – Seamlessly adapts from phones to large monitors.
* **🧭 Floating Navigation Dock** – A unified nav bar that works across all screen sizes.
* **🙈 Auto-Hide Nav & Theme Toggle** – Both the dock and theme toggle slide away on scroll down and reappear on scroll up.
* **🎯 Active Link Highlighting** – Highlights current section in view using Intersection Observer.
* **🧭 Smooth Scroll** – Navigation links gently scroll to the respective sections.
* **🎨 Easy Theming with Dark Mode** – Customize colors using CSS variables and toggle between light and dark themes.
* **🎲 Interactive UI** – Hover effects make cards and buttons feel alive.
* **🖼️ Fallback Images** – Placeholders ensure layout stays pretty even when images break.

---

## 🔧 Technologies Used

* **HTML5** – Structure and semantics.
* **CSS3** – Styling, animations, layout.
    * CSS Variables for easy theme tweaks
    * Flexbox & Grid for clean layouts
    * Smooth transitions and hover effects
* **Vanilla JavaScript (ES6+)**
    * DOM manipulation
    * Intersection Observer API for section tracking
    * Local Storage for theme persistence

---

## 🚀 Getting Started

1.  **Clone or Download** the repo to your computer.
2.  Open the project folder and launch `index.html` in your browser of choice (Chrome, Firefox, Edge, etc).

---

## 🎨 Customization

### 🖌️ Theme Colors

Update color variables at the top of your `<style>` block in `index.html`. You'll find sections for `:root` (light theme) and `body[data-theme='dark']` (dark theme) where you can adjust the color values.

### 🧱 Adding a New Portfolio Item

1.  Scroll to the **Portfolio Section** in `index.html`.
2.  Copy an existing `.portfolio-item` block.
3.  Paste it within the `portfolio-grid` container.
4.  Update the `<img>` tag's `src` and `alt` attributes, the `<h3>` title, the `<p>` description, and the `<a>` link for your new project. Ensure the `onerror` attribute remains for image fallbacks.

---

Crafted with ❤️ by **Tremors**