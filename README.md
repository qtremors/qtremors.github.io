# 💻 Personal Portfolio Website

A clean, modern, and fully responsive personal portfolio website built with **HTML** and **CSS**. It's designed to showcase your **skills**, **projects**, and **contact information** in a professional and visually appealing way.

---

## ✨ Features

* **Modern & Clean Design**: Simple and elegant layout to highlight your content
* **Fully Responsive**: Looks great on all devices from phones to desktops
* **Desktop Navigation**: Sleek, fixed header with scroll-linked highlighting
* **Mobile Navigation**: Floating dock at the bottom for quick access

### 🌐 Dynamic Content Sections:

* **Hero Section**: Your name, title, and a profile picture front and center
* **About Me**: A personal story and background summary
* **Skills**: Cards to present your technical and soft skills
* **Portfolio**: Grid layout to display your projects
* **Contact**: Social media and email links for networking

### 💡 Built With:

* **Pure HTML/CSS**: For simplicity and speed
* **Minimal JavaScript**: Used only for dynamic navigation highlights

---

## 🚀 Installation & Deployment

No installations or dependencies needed. Just download and open in your browser.

### View Locally

1. Download the project
2. Open `index.html` in your web browser

### Deploy Online

* **GitHub Pages**: Fork the repo, rename to `your-username.github.io`, and it's live!
* **Netlify / Vercel**: Drag & drop the project folder into their deployment UI
* **Traditional Hosting**: Upload `index.html` and the `assets/` folder to your hosting provider

---

## 🔧 Customization Guide

### 1. ✏️ Update Content

Open `index.html` in a text editor:

* **Hero Section**: Replace the name and subtitle
* **About Me**: Edit paragraph text to reflect your story
* **Skills**: Update skill cards with your tech stack
* **Portfolio**: Change project titles and descriptions
* **Contact**: Edit `mailto:` and social media URLs

### 2. 📸 Change Images

* **Profile Picture**: Replace `assets/pfp.jpg` with your image
* **Project Images**: Add your images in `assets/` and update their `src` attributes:

```html
<!-- Example Before -->
<img src="assets/project1.jpg" alt="E-commerce Project">

<!-- Example After -->
<img src="assets/my-awesome-app.png" alt="My Awesome App">
```

### 3. 🖌️ Adjust Colors

Modify the CSS variables inside `<style>` at the top of `index.html`:

```css
:root {
  --primary-color: #3b82f6;   /* Main accent color */
  --secondary-color: #8b5cf6; /* Secondary accent color */
  /* ... other colors */
}
```

---

## 📄 Technologies Used

* **HTML5**: Structure and content
* **CSS3**: Styling, layout, and responsiveness
* **JavaScript**: Navigation highlighting on scroll

---

Start customizing and make it yours! 🚀👩‍💻
