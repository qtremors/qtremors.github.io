/* ==========================================================================
   static/js/utils.js
   (Shared Utilities - Badge Labels, HTML Escaping, etc.)
   ========================================================================== */

window.Tremors = window.Tremors || {};
window.Tremors.utils = {
  // Returns a human-readable label for a tech badge class name.
  getBadgeLabel: (badgeClass) => {
    const labels = {
      'tech-python': 'Python',
      'tech-django': 'Django',
      'tech-ts': 'TypeScript',
      'tech-html': 'HTML',
      'tech-css': 'CSS',
      'tech-js': 'JavaScript',
      'tech-react': 'React',
      'tech-fastapi': 'FastAPI',
      'tech-flask': 'Flask',
      'tech-sql': 'SQL',
      'tech-tensorflow': 'TensorFlow',
      'tech-pillow': 'Pillow',
      'tech-numpy': 'NumPy',
      'tech-plotly': 'Plotly',
      'tech-cli': 'CLI',
      'tech-git': 'Git',
      'tech-pygame': 'Pygame',
      'tech-nextjs': 'Next.js',
      'tech-framermotion': 'Framer Motion',
      'tech-tsparticles': 'tsParticles',
      'tech-sqlite': 'SQLite',
      'tech-github': 'GitHub',
      'tech-tailwind': 'Tailwind',
      'tech-rust': 'Rust',
      'tech-tauri': 'Tauri',
      'tech-threejs': 'Three.js',
      'tech-prisma': 'Prisma',
      'tech-bootstrap': 'Bootstrap',
    };
    return labels[badgeClass] || badgeClass.replace('tech-', '').charAt(0).toUpperCase() + badgeClass.replace('tech-', '').slice(1);
  },

  // Escapes HTML entities to prevent XSS attacks.
  escapeHtml: (str) => {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return String(str).replace(/[&<>"']/g, char => escapeMap[char]);
  },

  toastTimeout: null,

  showToast: (message, duration = 3000) => {
    const toastElement = document.getElementById('toast');
    if (!toastElement) {
      console.warn('showToast: #toast element not found in DOM');
      return;
    }

    if (window.Tremors.utils.toastTimeout) clearTimeout(window.Tremors.utils.toastTimeout);

    toastElement.textContent = message;
    toastElement.classList.add("show");

    window.Tremors.utils.toastTimeout = setTimeout(() => {
      toastElement.classList.remove("show");
    }, duration);
  },

  debounce: (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
};
