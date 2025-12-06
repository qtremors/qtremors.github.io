/* ==========================================================================
   static/js/index.js
   (SHARED Global Logic: Themes, Navigation, Email Toast)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  const body = document.body;

  // --- THEME ELEMENTS ---
  const md3Vars = document.getElementById('md3-vars');
  const md3Overrides = document.getElementById('md3-overrides');
  const themeToggleButton = document.getElementById('theme-toggle');
  const toast = document.getElementById('toast'); // Needed for Email feature

  // --- NAVIGATION ELEMENTS ---
  const allNavLinks = document.querySelectorAll('.nav-item');
  const mobileNavBar = document.querySelector('.navigation-bar');
  const topAppBar = document.querySelector('.top-app-bar');
  const sections = document.querySelectorAll('section, .content-section');

  /* ==========================================================================
     GLOBAL THEME MANAGER
     ========================================================================== */
  window.setGlobalTheme = (mode) => {
    body.setAttribute('data-style-mode', mode);
    if (mode === 'md3') {
      if (md3Vars) md3Vars.disabled = false;
      if (md3Overrides) md3Overrides.disabled = false;
    } else {
      if (md3Vars) md3Vars.disabled = true;
      if (md3Overrides) md3Overrides.disabled = true;
    }
    localStorage.setItem('style_mode', mode);
  };

  const savedMode = localStorage.getItem('style_mode') || 'default';
  setGlobalTheme(savedMode);


  /* ==========================================================================
     LIGHT / DARK TOGGLE
     ========================================================================== */
  const toggleLightDark = () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme_pref', newTheme);
  };

  const initLightDark = () => {
    const savedPref = localStorage.getItem('theme_pref');
    if (savedPref) {
      body.setAttribute('data-theme', savedPref);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      body.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }
  };

  initLightDark();
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleLightDark);
  }


  /* ==========================================================================
     NAVIGATION LOGIC
     ========================================================================== */
  const updateActiveNav = (visibleSectionId) => {
    allNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Check if href matches exactly OR ends with the ID (handles index.html#about vs #about)
      if (!visibleSectionId) return; // Guard clause
      const isActive = href === `#${visibleSectionId}` || href.endsWith(`#${visibleSectionId}`);
      link.classList.toggle('active', isActive);
    });
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveNav(entry.target.getAttribute('id'));
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

  if (sections.length > 0) {
    sections.forEach(section => navObserver.observe(section));
  }

  let lastScrollY = window.scrollY;

  const handleNavVisibility = () => {
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - lastScrollY) <= 5) return;

    const isScrollingDown = currentScrollY > lastScrollY;
    const headerHeight = topAppBar ? topAppBar.offsetHeight : 100;
    const isPastHeader = currentScrollY > headerHeight;

    if (isScrollingDown && isPastHeader) {
      if (mobileNavBar) mobileNavBar.classList.add('hidden');
      if (topAppBar) topAppBar.classList.add('hidden');
    } else {
      if (mobileNavBar) mobileNavBar.classList.remove('hidden');
      if (topAppBar) topAppBar.classList.remove('hidden');
    }
    lastScrollY = currentScrollY;
  };

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };
  window.addEventListener('scroll', debounce(handleNavVisibility, 15));


  /* ==========================================================================
     EMAIL UTILS (Global because Footer is on all pages)
     ========================================================================== */
  const emailBtn = document.getElementById('email-btn');
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText("singhamankumar207@gmail.com").then(() => {
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => { toast.classList.remove("show"); }, 3000);
        }
      }).catch(() => { window.location.href = "mailto:singhamankumar207@gmail.com"; });
    });
  }
});
