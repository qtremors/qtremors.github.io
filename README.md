## 🌐 Project Overview

This repository features **two** versions of a personal portfolio website:

1. [`index.html`](./index.html) – A modern, animated UI with floating navigation and theme toggle.
2. [`indextui.html`](./indextui.html) – A terminal-inspired TUI (Text User Interface) with ASCII art and hacker-chic vibes.

Both are mobile-friendly, minimalist, and built with clean HTML and CSS. Only `index.html` uses JavaScript — `indextui.html` is completely JS-free for a feather-light experience.

---

## ✨ Key Features

### 🖥️ [`index.html`](./index.html)
* **🔁 Fully Responsive** – Looks great on phones, tablets, and desktops.
* **🧭 Floating Navigation Dock** – Fixed pill-shaped nav dock that highlights active sections.
* **🌗 Dark Mode Toggle** – Switch between light and dark themes with emoji flair (☀️/🌙).
* **🙈 Auto-Hide UI** – Nav dock and buttons hide on scroll and reappear gracefully.
* **🎨 Customizable Themes** – Edit CSS variables for easy color changes.
* **📜 Powered by JavaScript** – Handles theme switching, scroll detection, and active section tracking.

### 🧮 [`indextui.html`](./indextui.html)
* **🖼️ ASCII Art Header** – Terminal-style greeting powered by monospaced fonts.
* **📁 TUI Layout** – File-path inspired nav (`./about`, `/usr/bin/skills`, etc).
* **🎨 Dracula-Themed** – Uses Dracula palette and Fira Code font for max hacker feels.
* **💨 Zero JavaScript** – Fully functional with just HTML and CSS for lightning-fast loading.

---

## 🔧 Technologies Used

* **HTML5** – Structure and semantics.
* **CSS3** – Layouts, transitions, dark theme stylings.
* **Vanilla JavaScript (only in `index.html`)** – Theme toggle, scroll detection, active link highlighting.

---

## 🚀 Getting Started

1. **Clone or Download** this repo.
2. Open either `index.html` or `indextui.html` in your browser.

---

## 🎨 Customization Tips

### ✏️ Changing Theme Colors (`index.html`)

In `index.html`, scroll to the top `<style>` block. Modify the `:root` and `body[data-theme='dark']` sections for your own color palette.

### 🧱 Add Portfolio Items

For **index.html**:
- Scroll to the `#portfolio` section and duplicate any `.portfolio-item` inside the `portfolio-grid`.

For **indextui.html**:
- Locate the `/var/log/portfolio.log` section and copy a `.portfolio-item` block.

---

## 🧭 Quick Links

* [Open `index.html`](./index.html) – 🌇 Visual UI version (with JavaScript)  
* [Open `indextui.html`](./indextui.html) – 👨‍💻 Terminal TUI version (no JavaScript)

---

Crafted with ❤️ by **Tremors**
