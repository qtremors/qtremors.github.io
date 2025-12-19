/* ==========================================================================
   static/js/utils.js
   (Shared Utilities - Badge Labels, HTML Escaping, etc.)
   ========================================================================== */

/**
 * Returns a human-readable label for a tech badge class name.
 * @param {string} badgeClass - The badge class (e.g., 'tech-python')
 * @returns {string} - Human-readable label (e.g., 'Python')
 */
window.getBadgeLabel = (badgeClass) => {
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
  };
  return labels[badgeClass] || badgeClass.replace('tech-', '').charAt(0).toUpperCase() + badgeClass.replace('tech-', '').slice(1);
};

/**
 * Escapes HTML entities to prevent XSS attacks.
 * @param {string} str - The string to escape
 * @returns {string} - Escaped string safe for HTML insertion
 */
window.escapeHtml = (str) => {
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return String(str).replace(/[&<>"']/g, char => escapeMap[char]);
};
