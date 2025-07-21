## 🌐 Project Overview

A sleek, single-page personal portfolio website built with clean HTML, CSS, and vanilla JavaScript. It showcases your skills, projects, and contact info with a mobile-first, responsive design. The star of the show? A smart, floating navigation dock that hides on scroll and adapts beautifully across all devices.

---

## ✨ Key Features

* **🔁 Fully Responsive** – Seamlessly adapts from phones to large monitors.
* **🧭 Floating Navigation Dock** – A unified nav bar that works across all screen sizes.
* **🙈 Auto-Hide Nav** – Dock slides away on scroll down and reappears on scroll up.
* **🎯 Active Link Highlighting** – Highlights current section in view using Intersection Observer.
* **🧭 Smooth Scroll** – Navigation links gently scroll to the respective sections.
* **🎨 Easy Theming** – Customize colors using CSS variables.
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

---

## 🚀 Getting Started

1. **Clone or Download** the repo to your computer.
2. Open the project folder and launch `index.html` in your browser of choice (Chrome, Firefox, Edge, etc).

---

## 🎨 Customization

### 🖌️ Theme Colors

Update color variables at the top of your `<style>` block in `index.html`:

```css
:root {
  --primary-color: #3b82f6;   /* Main accent color */
  --secondary-color: #8b5cf6; /* Gradient/secondary tone */
  /* Add more variables as needed */
}
```

### 🧱 Adding a New Portfolio Item

1. Scroll to the **Portfolio Section** in `index.html`.
2. Copy an existing `.portfolio-item` block.
3. Paste it within the `portfolio-grid` container.
4. Update the image, title, description, and link:

```html
<!-- New portfolio item -->
<div class="portfolio-item">
  <img src="path/to/your/new-image.jpg" alt="New Project Title">
  <div class="portfolio-content">
    <h3>New Project Title</h3>
    <p>A short description of your new project.</p>
    <a href="link/to/your/project" target="_blank" rel="noopener noreferrer">View Project &rarr;</a>
  </div>
</div>
```

---


Crafted with ❤️ by **Tremors**
