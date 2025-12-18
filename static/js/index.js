/* ==========================================================================
   static/js/index.js
   (Themes, Settings, Navigation, Universal Toast)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  const body = document.body;

  /* ==========================================================================
     1. UNIVERSAL TOAST SYSTEM
     ========================================================================== */
  const toastElement = document.getElementById('toast');
  let toastTimeout;

  // Global function to show toast from anywhere (extras.js, project.js, etc.)
  window.showToast = (message, duration = 3000) => {
    if (!toastElement) {
      console.warn('showToast: #toast element not found in DOM');
      return;
    }

    // Clear existing timeout to handle rapid clicks
    if (toastTimeout) clearTimeout(toastTimeout);

    toastElement.textContent = message;
    toastElement.classList.add("show");

    toastTimeout = setTimeout(() => {
      toastElement.classList.remove("show");
    }, duration);
  };


  /* ==========================================================================
     2. SETTINGS MODAL LOGIC
     ========================================================================== */
  const modal = document.getElementById('settings-modal');
  const openBtn = document.getElementById('open-settings-btn');
  const closeBtn = document.getElementById('close-settings-btn');

  let lastFocusedElement = null;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      lastFocusedElement = document.activeElement;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      // Focus first focusable element in modal
      const firstFocusable = modal.querySelector('button, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) firstFocusable.focus();
    });
  }

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      // Return focus to element that opened the modal
      if (lastFocusedElement) lastFocusedElement.focus();
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });

    // Focus trap - Tab cycles within modal
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

  // Tab Switching Logic
  const modalTabs = document.querySelectorAll('.modal-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      // Update tab buttons
      modalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels
      tabPanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === `panel-${targetTab}`);
      });
    });
  });


  /* ==========================================================================
     3. THEME & APPEARANCE ENGINE
     ========================================================================== */

  const state = {
    theme: localStorage.getItem('style_mode') || 'oled',
    effect: localStorage.getItem('effect_mode') || 'none',
    mode: localStorage.getItem('theme_pref') || 'system',
    spotlight: localStorage.getItem('spotlight_mode') || 'off'
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
    spotlight: document.getElementById('effect-spotlight')
  };

  // Buttons
  const modeBtns = document.querySelectorAll('[data-set-mode]');
  const themeBtns = document.querySelectorAll('[data-set-theme]');
  const effectBtns = document.querySelectorAll('[data-set-effect]');
  const spotlightBtns = document.querySelectorAll('[data-set-spotlight]');


  const applyAppearance = () => {
    // A. Themes
    if (sheets.themes.oled) {
      Object.values(sheets.themes).forEach(t => { if (t) t.disabled = true; });
      const activeTheme = sheets.themes[state.theme] || sheets.themes.oled;
      if (activeTheme) activeTheme.disabled = false;
      body.setAttribute('data-style-mode', state.theme);
    }

    // B. Scene Effects
    if (sheets.effects.fog) {
      Object.values(sheets.effects).forEach(e => { if (e) e.disabled = true; });
      if (state.effect !== 'none') {
        const activeEffect = sheets.effects[state.effect] || sheets.effects.fog;
        if (activeEffect) activeEffect.disabled = false;
      }
    }

    // C. Spotlight Effect
    if (sheets.spotlight) {
      sheets.spotlight.disabled = (state.spotlight === 'off');
    }

    // D. Color Mode
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
  };


  // --- Listeners ---
  modeBtns.forEach(btn => btn.addEventListener('click', () => { state.mode = btn.dataset.setMode; applyAppearance(); }));
  themeBtns.forEach(btn => btn.addEventListener('click', () => { state.theme = btn.dataset.setTheme; applyAppearance(); }));
  effectBtns.forEach(btn => btn.addEventListener('click', () => { state.effect = btn.dataset.setEffect; applyAppearance(); }));

  // Spotlight Listener (supports both buttons and toggle switch)
  spotlightBtns.forEach(btn => btn.addEventListener('click', () => {
    const action = btn.dataset.setSpotlight;
    if (action === 'toggle') {
      // Toggle switch behavior
      state.spotlight = state.spotlight === 'on' ? 'off' : 'on';
      btn.classList.toggle('on', state.spotlight === 'on');
    } else {
      state.spotlight = action;
    }
    applyAppearance();
  }));

  // Initialize toggle switch state on load
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

  // Init
  applyAppearance();

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (state.mode === 'system') applyAppearance();
  });


  /* ==========================================================================
     4. NAVIGATION LOGIC
     ========================================================================== */
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


  /* ==========================================================================
     5. EMAIL CLIPBOARD (Uses Universal Toast)
     ========================================================================== */
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
