/* ==========================================================================
   static/js/index.js
   (Themes, Settings, Navigation, Universal Toast)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  const body = document.body;

  /* --- UNIVERSAL TOAST SYSTEM --- */
  const toastElement = document.getElementById('toast');
  let toastTimeout;

  window.showToast = (message, duration = 3000) => {
    if (!toastElement) {
      console.warn('showToast: #toast element not found in DOM');
      return;
    }

    if (toastTimeout) clearTimeout(toastTimeout);

    toastElement.textContent = message;
    toastElement.classList.add("show");

    toastTimeout = setTimeout(() => {
      toastElement.classList.remove("show");
    }, duration);
  };


  /* --- SETTINGS MODAL LOGIC --- */
  const modal = document.getElementById('settings-modal');
  const openBtn = document.getElementById('open-settings-btn');
  const closeBtn = document.getElementById('close-settings-btn');

  let lastFocusedElement = null;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      lastFocusedElement = document.activeElement;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      const firstFocusable = modal.querySelector('button, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) firstFocusable.focus();
    });
  }

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      if (lastFocusedElement) lastFocusedElement.focus();
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });

    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusables = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  const modalTabs = document.querySelectorAll('.modal-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      modalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabPanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === `panel-${targetTab}`);
      });
    });
  });


  /* --- THEME & APPEARANCE ENGINE --- */
  const state = {
    theme: localStorage.getItem('style_mode') || 'md',
    effect: localStorage.getItem('effect_mode') || 'none',
    mode: localStorage.getItem('theme_pref') || 'system',
    spotlight: localStorage.getItem('spotlight_mode') || 'off',
    pattern: localStorage.getItem('pattern_mode') || 'none'
  };

  const sheets = {
    themes: {
      md: document.getElementById('theme-md'),
      md3: document.getElementById('theme-md3'),
      oled: document.getElementById('theme-oled')
    },
    effects: {
      fog: document.getElementById('effect-fog'),
      glass: document.getElementById('effect-glass')
    },
    patterns: {
      dots: document.getElementById('pattern-dots'),
      grid: document.getElementById('pattern-grid'),
      waves: document.getElementById('pattern-waves')
    },
    spotlight: document.getElementById('effect-spotlight')
  };

  const modeBtns = document.querySelectorAll('[data-set-mode]');
  const themeBtns = document.querySelectorAll('[data-set-theme]');
  const effectBtns = document.querySelectorAll('[data-set-effect]');
  const spotlightBtns = document.querySelectorAll('[data-set-spotlight]');
  const patternBtns = document.querySelectorAll('[data-set-pattern]');


  const applyAppearance = () => {
    // Themes
    if (sheets.themes.oled) {
      Object.values(sheets.themes).forEach(t => { if (t) t.disabled = true; });
      const activeTheme = sheets.themes[state.theme] || sheets.themes.oled;
      if (activeTheme) activeTheme.disabled = false;
      body.setAttribute('data-style-mode', state.theme);
    }

    // Effects
    if (sheets.effects.fog) {
      Object.values(sheets.effects).forEach(e => { if (e) e.disabled = true; });
      if (state.effect !== 'none') {
        const activeEffect = sheets.effects[state.effect] || sheets.effects.fog;
        if (activeEffect) activeEffect.disabled = false;
      }
    }

    // Spotlight
    if (sheets.spotlight) {
      sheets.spotlight.disabled = (state.spotlight === 'off');
    }

    // Patterns
    if (sheets.patterns.dots) {
      Object.values(sheets.patterns).forEach(p => { if (p) p.disabled = true; });
      if (state.pattern !== 'none') {
        const activePattern = sheets.patterns[state.pattern];
        if (activePattern) activePattern.disabled = false;
      }
      // Force repaint
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.animation = 'none';
        hero.offsetHeight;
        hero.style.animation = '';
      }
    }

    // Color Mode
    let effectiveMode = state.mode;
    if (state.mode === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveMode = systemDark ? 'dark' : 'light';
    }
    body.setAttribute('data-theme', effectiveMode);

    updateActiveButtons();

    // Save State
    localStorage.setItem('style_mode', state.theme);
    localStorage.setItem('effect_mode', state.effect);
    localStorage.setItem('theme_pref', state.mode);
    localStorage.setItem('spotlight_mode', state.spotlight);
    localStorage.setItem('pattern_mode', state.pattern);
  };


  const updateActiveButtons = () => {
    const updateGroup = (btns, currentVal, datasetKey) => {
      btns.forEach(btn => {
        if (btn.dataset[datasetKey] === currentVal) btn.classList.add('active');
        else btn.classList.remove('active');
      });
    };
    updateGroup(modeBtns, state.mode, 'setMode');
    updateGroup(themeBtns, state.theme, 'setTheme');
    updateGroup(effectBtns, state.effect, 'setEffect');
    updateGroup(spotlightBtns, state.spotlight, 'setSpotlight');
    updateGroup(patternBtns, state.pattern, 'setPattern');
  };


  // --- Listeners ---
  modeBtns.forEach(btn => btn.addEventListener('click', () => { state.mode = btn.dataset.setMode; applyAppearance(); }));
  themeBtns.forEach(btn => btn.addEventListener('click', () => { state.theme = btn.dataset.setTheme; applyAppearance(); }));
  effectBtns.forEach(btn => btn.addEventListener('click', () => { state.effect = btn.dataset.setEffect; applyAppearance(); }));
  patternBtns.forEach(btn => btn.addEventListener('click', () => { state.pattern = btn.dataset.setPattern; applyAppearance(); }));

  spotlightBtns.forEach(btn => btn.addEventListener('click', () => {
    const action = btn.dataset.setSpotlight;
    if (action === 'toggle') {
      state.spotlight = state.spotlight === 'on' ? 'off' : 'on';
      btn.classList.toggle('on', state.spotlight === 'on');
    } else {
      state.spotlight = action;
    }
    applyAppearance();
  }));

  const spotlightToggle = document.querySelector('.toggle-switch[data-set-spotlight="toggle"]');
  if (spotlightToggle && state.spotlight === 'on') {
    spotlightToggle.classList.add('on');
  }

  const themeToggleButton = document.getElementById('theme-toggle');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      const currentEffective = body.getAttribute('data-theme');
      state.mode = currentEffective === 'dark' ? 'light' : 'dark';
      applyAppearance();
    });
  }

  applyAppearance();

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (state.mode === 'system') applyAppearance();
  });


  /* --- NAVIGATION LOGIC --- */
  const allNavLinks = document.querySelectorAll('.nav-item');
  const mobileNavBar = document.querySelector('.navigation-bar');
  const topAppBar = document.querySelector('.top-app-bar');
  const sections = document.querySelectorAll('section, .content-section');

  const updateActiveNav = (visibleSectionId) => {
    allNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!visibleSectionId) return;
      const isActive = href === `#${visibleSectionId}` || href.endsWith(`#${visibleSectionId}`);
      link.classList.toggle('active', isActive);
    });
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) updateActiveNav(entry.target.getAttribute('id'));
    });
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

  if (sections.length > 0) sections.forEach(section => navObserver.observe(section));

  let lastScrollY = window.scrollY;
  const handleNavVisibility = () => {
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - lastScrollY) <= 5) return;

    const isScrollingDown = currentScrollY > lastScrollY;
    const headerHeight = topAppBar ? topAppBar.offsetHeight : 100;

    if (isScrollingDown && currentScrollY > headerHeight) {
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


  /* --- EMAIL CLIPBOARD --- */
  const emailBtn = document.getElementById('email-btn');
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = "singhamankumar207@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        window.showToast("Email Copied! 📋");
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }

});
