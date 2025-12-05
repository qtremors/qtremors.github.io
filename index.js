document.addEventListener('DOMContentLoaded', function () {

  const body = document.body;
  const sections = document.querySelectorAll('section');
  const allNavLinks = document.querySelectorAll('.nav-item');
  const themeToggleButton = document.getElementById('theme-toggle');
  const mobileNavBar = document.querySelector('.navigation-bar');
  const topAppBar = document.querySelector('.top-app-bar');
  const md3ThemeToggle = document.querySelector('.theme-option');
  const mainStylesheet = document.getElementById('main-stylesheet');


  const applyTheme = (theme) => {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };


  const toggleTheme = () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };


  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      applyTheme(savedTheme);
    } else if (systemPrefersDark) {
      applyTheme('dark');
    } else {
      applyTheme('dark');
    }
  };


  const updateActiveNav = (visibleSectionId) => {
    allNavLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${visibleSectionId}`;
      link.classList.toggle('active', isActive);
    });
  };


  const handleNavVisibility = (currentScrollY, lastScrollY) => {
    const isScrollingDown = currentScrollY > lastScrollY;
    const isPastHeader = currentScrollY > topAppBar.offsetHeight;

    if (isScrollingDown && isPastHeader) {
      mobileNavBar.classList.add('hidden');
      topAppBar.classList.add('hidden');
    } else {
      mobileNavBar.classList.remove('hidden');
      topAppBar.classList.remove('hidden');
    }
  };


  let lastScrollY = window.scrollY;
  const scrollThreshold = 3;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - lastScrollY) <= scrollThreshold) return;
    handleNavVisibility(currentScrollY, lastScrollY);
    lastScrollY = Math.max(currentScrollY, 0);
  };


  const debounce = (func, wait = 10) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };


  initializeTheme();

  themeToggleButton.addEventListener('click', toggleTheme);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // --- MD3 Theme Logic ---
  
  // 1. Get Elements
  const md3Vars = document.getElementById('md3-vars');
  const md3Overrides = document.getElementById('md3-overrides');
  const md3ToggleBtn = document.querySelector('.theme-option');
  const md3BtnText = document.querySelector('.theme-option .dropdown-title');

  // Helper: Update button text based on state
  const updateMd3ButtonText = (isActive) => {
    if (md3BtnText) {
        md3BtnText.textContent = isActive ? "Switch to MD" : "Switch to MD3";
    }
  };

  // 2. Initialize: Check LocalStorage & Set Initial Text
  if (md3Vars && md3Overrides) {
    const isMd3Active = localStorage.getItem('use_md3') === 'true';
    
    // Set State
    if (isMd3Active) {
        md3Vars.disabled = false;
        md3Overrides.disabled = false;
    }
    
    // Set Text (Runs on both index.html and project.html)
    updateMd3ButtonText(isMd3Active);
  }

  // 3. Interaction: Toggle Event Listener (Only if button exists)
  if (md3ToggleBtn && md3Vars && md3Overrides) {
    md3ToggleBtn.addEventListener('click', () => {
      const isDisabled = md3Vars.disabled; // If disabled, MD3 is OFF.

      if (isDisabled) {
        // Enable MD3
        md3Vars.disabled = false;
        md3Overrides.disabled = false;
        localStorage.setItem('use_md3', 'true');
        updateMd3ButtonText(true); // Update text
        console.log('Switched to Material Design 3');
      } else {
        // Disable MD3
        md3Vars.disabled = true;
        md3Overrides.disabled = true;
        localStorage.setItem('use_md3', 'false');
        updateMd3ButtonText(false); // Update text
        console.log('Switched to Standard Theme');
      }
    });
  }
  
  /* ==========================================================================
       Dynamic Portfolio Loading
       ========================================================================== */
    
    const portfolioGrid = document.getElementById('portfolio-grid');
    const githubCard = document.getElementById('github-card');
    const githubActions = document.getElementById('github-card-actions');
    
    let allProjects = [];
    let isExpanded = false;
    const INITIAL_SHOW_COUNT = 5;
  
    // Helper: Get readable names for badges
    const getBadgeLabel = (badgeClass) => {
      const labels = {
          'tech-python': 'Python', 'tech-django': 'Django', 'tech-ts': 'TypeScript',
          'tech-html': 'HTML', 'tech-css': 'CSS', 'tech-js': 'JavaScript',
          'tech-react': 'React', 'tech-fastapi': 'FastAPI', 'tech-flask': 'Flask',
          'tech-sql': 'SQL', 'tech-tensorflow': 'TensorFlow', 'tech-pillow': 'Pillow',
          'tech-numpy': 'NumPy', 'tech-plotly': 'Plotly', 'tech-cli': 'CLI',
          'tech-git': 'Git', 'tech-pygame': 'Pygame', 'tech-nextjs': 'NextJs',
          'tech-framermotion': 'Framer Motion', 'tech-tsparticles': 'tsParticles',
          'tech-sqlite': 'SQLite', 'tech-github': 'Github', 'tech-tailwind': 'Tailwind',
      };
      return labels[badgeClass] || badgeClass.replace('tech-', '');
    };
  
    // Helper: Create the HTML string for a project
  const createProjectCard = (project, isDynamic = false) => {
    const dynamicClass = isDynamic ? 'dynamic-project' : '';
    
    // Check for WIP status
    const isWip = project.status === 'wip';
    const wipClass = isWip ? 'is-wip' : '';
    
    // Badge HTML (Optional, but looks good with the theme)
    const wipBadge = isWip ? '<div class="wip-badge">⚠️ Development</div>' : '';

    const detailUrl = project.id ? `project.html?id=${project.id}` : '#';

    const badgesHtml = project.badges.map(badge => 
        `<span class="${badge}">${getBadgeLabel(badge)}</span>`
    ).join('');

    const linksHtml = project.links.map(link => 
        `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${link.class}">
            ${link.text} &rarr;
        </a>`
    ).join('');

    return `
      <article class="portfolio-item fade-in ${dynamicClass} ${wipClass}">
          <a href="${detailUrl}" class="project-card-link" style="display:block; cursor:pointer;">
              
              <div class="img-wrapper" style="position: relative; overflow: hidden;">
                  ${wipBadge}
                  <img src="${project.image}" alt="${project.title} Preview" loading="lazy" style="width: 100%; display: block;">
              </div>

          </a>

          <div class="portfolio-content">
              <h3>
                  <a href="${detailUrl}" style="text-decoration:none; color:inherit;">${project.title}</a>
              </h3>

              <p>${project.description}</p>
              <div class="tech-badges">
                  ${badgesHtml}
              </div>
              <div class="portfolio-links">
                  ${linksHtml}
              </div>
          </div>
      </article>
    `;
  };
  
    // Helper: Insert a card BEFORE the static GitHub card
    const insertBeforeGithub = (htmlString) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        const newCard = tempDiv.firstElementChild;
        portfolioGrid.insertBefore(newCard, githubCard);
    };
  
    const loadProjects = async () => {
      try {
          const response = await fetch('projects.json');
          allProjects = await response.json();
          
          // 1. Render Top 5 Projects
          const topProjects = allProjects.slice(0, INITIAL_SHOW_COUNT);
          topProjects.forEach(project => {
              insertBeforeGithub(createProjectCard(project));
          });
  
          // 2. Add "Load More" button if needed
          if (allProjects.length > INITIAL_SHOW_COUNT) {
              const loadBtn = document.createElement('button');
              loadBtn.className = 'card-btn btn-load';
              loadBtn.id = 'card-toggle-trigger';
              loadBtn.innerHTML = `
                  <span class="btn-text">Load More Projects</span>
                  <span class="btn-icon">↓</span>
              `;
              // Add it before the GitHub button
              githubActions.prepend(loadBtn);
          }
  
      } catch (error) {
          console.error('Error loading projects:', error);
          // If JSON fails, the GitHub card is already in HTML, so we are safe.
      }
    };
  
    // --- Click Event for Load More / Show Less ---
    githubActions.addEventListener('click', (e) => {
        const btn = e.target.closest('#card-toggle-trigger');
        
        if (btn) {
            const btnText = btn.querySelector('.btn-text');
            const btnIcon = btn.querySelector('.btn-icon');
  
            if (!isExpanded) {
                // EXPAND: Show the rest
                const remainingProjects = allProjects.slice(INITIAL_SHOW_COUNT);
                remainingProjects.forEach(project => {
                    insertBeforeGithub(createProjectCard(project, true));
                });
  
                btnText.textContent = "Show Less";
                btnIcon.textContent = "↑";
                isExpanded = true;
            } else {
                // COLLAPSE: Remove extra cards
                document.querySelectorAll('.dynamic-project').forEach(card => card.remove());
  
                btnText.textContent = "Load More Projects";
                btnIcon.textContent = "↓";
                isExpanded = false;
                
                // Smooth scroll back to position
                githubCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }
    });
  
    // Run the loader
    loadProjects();

  /* ==========================================================================
     Developer Console & Easter Eggs
     ========================================================================== */

  console.log("%c Hello there! Looking for the source code?", "font-weight: bold; font-size: 20px; color: #8ab4f8;");
  console.log("Check it out here: https://github.com/qtremors/qtremors.github.io");


  const easterEggTriggers = ['python', 'tremors'];
  let inputSequence = '';

  document.addEventListener('keydown', (e) => {
    inputSequence += e.key.toLowerCase();

    if (inputSequence.length > 10) {
      inputSequence = inputSequence.slice(-10);
    }

    easterEggTriggers.forEach(word => {
      if (inputSequence.endsWith(word)) {
        triggerEasterEgg();
        inputSequence = '';
      }
    });
  });

  const triggerEasterEgg = () => {
    const asciiArt = `
      _______
     |__   __|
        | | _ __  ___  _ __ ___   ___   _ __  ___
        | || '__|/ _ \\| '_ \` _ \\ / _ \\ | '__|/ __|
        | || |  |  __/| | | | | | (_) || |   \\__ \\
        |_||_|   \\___||_| |_| |_|\\___/ |_|   |___/
        `;

    console.log(`%c${asciiArt}`, "color: #8ab4f8; font-family: monospace; font-weight: bold;");

    console.log('%c>>> import tremors', 'color: #50fa7b; font-family: monospace; font-size: 14px; font-weight: bold;');
    console.log('%c>>> tremors.hire()', 'color: #50fa7b; font-family: monospace; font-size: 14px; font-weight: bold;');
    console.log('%c"You won\'t regret it! plzzzzzz 🥺"', 'color: #f1fa8c; font-family: monospace; font-size: 14px;');

    alert("🐍 Python Mode Activated!");
  };

  /* ========================================================================== */


  window.addEventListener('scroll', debounce(handleScroll, 15));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveNav(entry.target.getAttribute('id'));
      }
    });
  }, {
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
});
