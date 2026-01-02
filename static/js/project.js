document.addEventListener('DOMContentLoaded', async () => {

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');


  if (!projectId) {
    window.location.href = 'index.html';
    return;
  }

  /* --- FETCH PROJECT DATA --- */
  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error('Failed to load project data');

    const allProjects = await response.json();
    const project = allProjects.find(p => p.id === projectId);

    if (!project) {
      const safeProjectId = window.escapeHtml(projectId);
      document.querySelector('.project-container').innerHTML = `
                <div style="text-align:center; padding: 4rem;">
                    <h1>Project Not Found</h1>
                    <p>The project ID "${safeProjectId}" does not exist.</p>
                    <a href="index.html" class="back-link">Return Home</a>
                </div>
            `;
      return;
    }

    renderProjectPage(project, allProjects);

  } catch (error) {
    console.error("Error loading project:", error);
    document.querySelector('.project-container').innerHTML = `
            <div style="text-align:center; padding: 4rem;">
                <h1>Error Loading Data</h1>
                <p>Could not load project details. Please try again later.</p>
                <a href="index.html" class="back-link">Return Home</a>
            </div>
        `;
  }
});

function renderProjectPage(project, allProjects) {
  /* --- PAGE METADATA --- */
  document.title = `${project.title} | Tremors`;
  document.getElementById('p-title').innerText = project.title;
  document.getElementById('p-id-label').innerText = project.id ? project.id.toUpperCase() : "PROJECT DETAILS";

  /* --- SEO --- */
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = `${window.location.origin}/project.html?id=${project.id}`;

  /* --- BANNER IMAGE --- */
  const banner = document.getElementById('p-banner');
  if (project.image) {
    banner.src = project.image;
    banner.alt = `${project.title} Banner`;

    banner.onerror = function () {
      document.querySelector('.project-banner-wrapper').style.display = 'none';
    };
  } else {
    document.querySelector('.project-banner-wrapper').style.display = 'none';
  }

  /* --- DESCRIPTION --- */
  const descEl = document.getElementById('p-description');
  descEl.textContent = project.longDescription || project.description;

  /* --- STATUS BANNER --- */
  // Remove any existing banners first (in case of re-renders)
  const existingBanner = document.querySelector('.project-status-banner');
  if (existingBanner) existingBanner.remove();

  if (project.status && ['wip', 'beta', 'archive'].includes(project.status)) {
    const overviewSection = document.getElementById('section-overview');

    const statusConfig = {
      'wip': {
        class: 'status-wip',
        icon: '⚠️',
        title: 'Work In Progress',
        message: 'This project is currently under active development. Features may be incomplete or unstable.'
      },
      'beta': {
        class: 'status-beta',
        icon: '🧪',
        title: 'Beta Release',
        message: 'This project is in beta. Report bugs if you find any.'
      },
      'archive': {
        class: 'status-archive',
        icon: '📦',
        title: 'Archived Project',
        message: 'This project is no longer maintained. It is read-only and may have security vulnerabilities.'
      }
    };

    const config = statusConfig[project.status];
    if (config && overviewSection && descEl) {
      const banner = document.createElement('div');
      banner.className = `project-status-banner ${config.class}`;
      banner.innerHTML = `
        <div class="banner-icon">${config.icon}</div>
        <div class="banner-content">
            <strong>${config.title}</strong>
            ${config.message}
        </div>
      `;
      overviewSection.insertBefore(banner, descEl);
    }
  }

  /* --- FEATURES LIST --- */
  const featuresList = document.getElementById('p-features');
  const featuresSection = document.getElementById('section-features');

  featuresList.innerHTML = '';

  if (project.features && project.features.length > 0) {
    featuresSection.style.display = 'block';
    project.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });
  } else {
    featuresSection.style.display = 'none';
  }

  /* --- INSTALLATION / USAGE --- */
  const installSection = document.getElementById('section-installation');
  const wrapper = document.querySelector('.code-block-wrapper');
  const switcherBtns = document.querySelectorAll('.os-btn');

  if (project.installation) {
    installSection.style.display = 'block';

    wrapper.innerHTML = `
            <div class="code-block-header" id="terminal-header">
                </div>
            <div class="code-block" id="p-installation"></div>
        `;

    const installBlock = document.getElementById('p-installation');
    const lines = project.installation.split('\n');
    installBlock.innerHTML = lines.map(line => {
      const safeLine = window.escapeHtml(line);
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) return `<span class="cmd-line cmd-comment">${safeLine}</span>`;
      if (trimmed === '') return `<span class="cmd-line"></span>`;
      return `<span class="cmd-line cmd-command">${safeLine}</span>`;
    }).join('');


    const getSystemOS = () => {
      const userAgent = window.navigator.userAgent;
      if (userAgent.includes("Win")) return "Windows";
      if (userAgent.includes("Linux") && !userAgent.includes("Android")) return "Linux";
      return "MacOS";
    };

    let currentTheme = localStorage.getItem('terminal_theme') || getSystemOS();

    const renderTheme = (osName) => {
      switcherBtns.forEach(btn => {
        if (btn.dataset.os === osName) btn.classList.add('active');
        else btn.classList.remove('active');
      });

      let controlsHTML = '';
      let themeClass = '';

      if (osName === 'Windows') {
        themeClass = 'theme-windows';
        controlsHTML = `
                    <div class="terminal-controls">
                        <div class="win-btn" title="Minimize"><svg width="10" height="1" viewBox="0 0 10 1"><rect width="10" height="1" fill="currentColor"/></svg></div>
                        <div class="win-btn" title="Maximize"><svg width="10" height="10" viewBox="0 0 10 10"><rect width="9" height="9" x="0.5" y="0.5" stroke="currentColor" fill="none"/></svg></div>
                        <div class="win-btn close-btn" title="Close"><svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 1L9 9M9 1L1 9" stroke="currentColor"/></svg></div>
                    </div>`;
      } else if (osName === 'Linux') {
        themeClass = 'theme-linux';
        controlsHTML = `
                    <div class="terminal-controls">
                        <div class="terminal-dot" title="Minimize"></div>
                        <div class="terminal-dot" title="Maximize"></div>
                        <div class="terminal-dot dot-close" title="Close">×</div>
                    </div>`;
      } else {
        themeClass = 'theme-mac';
        controlsHTML = `
                    <div class="terminal-controls">
                        <span class="terminal-dot dot-red"></span>
                        <span class="terminal-dot dot-yellow"></span>
                        <span class="terminal-dot dot-green"></span>
                    </div>`;
      }

      wrapper.className = 'code-block-wrapper ' + themeClass;

      const header = document.getElementById('terminal-header');
      header.innerHTML = `
                ${controlsHTML}
                <button id="copy-btn" class="copy-btn" title="Copy to clipboard">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>Copy</span>
                </button>
            `;

      const newCopyBtn = document.getElementById('copy-btn');
      newCopyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(project.installation).then(() => {
          const originalHTML = newCopyBtn.innerHTML;
          newCopyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Copied!</span>`;
          newCopyBtn.style.color = '#27c93f';
          newCopyBtn.style.borderColor = '#27c93f';
          setTimeout(() => {
            newCopyBtn.innerHTML = originalHTML;
            newCopyBtn.style.color = '';
            newCopyBtn.style.borderColor = '';
          }, 2000);
        });
      });
    };

    renderTheme(currentTheme);

    switcherBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedOS = btn.dataset.os;
        currentTheme = selectedOS;
        localStorage.setItem('terminal_theme', selectedOS);
        renderTheme(selectedOS);
      });
    });

  } else {
    installSection.style.display = 'none';
  }

  /* --- DYNAMIC LINKS SIDEBAR --- */
  const linksContainer = document.getElementById('p-links');
  linksContainer.innerHTML = '';

  if (project.links && project.links.length > 0) {
    project.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.className = 'sidebar-btn';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';

      const isGithub = link.text.toLowerCase().includes('github') || link.url.includes('github.com');

      const githubIcon = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.197-6.091 8.197-11.387C24 5.373 12 0 12 0Z"/>
                </svg>`;

      const webIcon = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>`;

      const iconSvg = isGithub ? githubIcon : webIcon;

      a.innerHTML = `
                <div class="btn-left-group">
                    ${iconSvg}
                    <span>${window.escapeHtml(link.text)}</span>
                </div>
                <span class="btn-arrow">↗</span>
            `;

      linksContainer.appendChild(a);
    });
  }

  /* --- TECHNOLOGIES BADGES --- */
  const tagsContainer = document.getElementById('p-tags');
  tagsContainer.innerHTML = '';

  if (project.badges && project.badges.length > 0) {
    project.badges.forEach(badge => {
      const span = document.createElement('span');
      span.textContent = window.getBadgeLabel(badge);
      span.classList.add('sidebar-badge', badge);
      tagsContainer.appendChild(span);
    });
  }

  /* --- FOOTER NAVIGATION --- */
  if (allProjects && allProjects.length > 0) {
    const footerNav = document.getElementById('project-footer-nav');
    const currentIndex = allProjects.findIndex(p => p.id === project.id);
    const total = allProjects.length;

    // Strict Loop Navigation (Prev/Next based on index)
    let prevProject = allProjects[(currentIndex - 1 + total) % total];
    let nextProject = allProjects[(currentIndex + 1) % total];

    // Helper to create card HTML
    const createNavCard = (proj, directionClass, isRecommended = false) => {
      const badgeHtml = (proj.badges || []).slice(0, 3).map(b => {
        return `<span class="mini-badge ${b}"></span>`;
      }).join('');

      const cardClass = isRecommended ? 'nav-card recommended-item' : `nav-card ${directionClass}`;

      const leftArrow = (directionClass === 'prev-card' && !isRecommended) ? '<span class="nav-arrow">&larr;</span>' : '';
      const rightArrow = (directionClass === 'next-card' && !isRecommended) ? '<span class="nav-arrow">&rarr;</span>' : '';

      return `
                <a href="project.html?id=${proj.id}" class="${cardClass}">
                    <img src="${proj.image}" alt="${proj.title} project thumbnail" class="nav-img">

                    <div class="nav-info">
                        <div class="nav-top-row">
                            ${leftArrow}
                            <div class="nav-badges">${badgeHtml}</div>
                            ${rightArrow}
                        </div>

                        <h3 class="nav-title">${window.escapeHtml(proj.title)}</h3>
                        <p class="nav-desc">${window.escapeHtml(proj.description)}</p>
                    </div>
                </a>
            `;
    };

    // Prepare Standard Nav HTML
    const navHTML = `
        ${createNavCard(prevProject, 'prev-card')}
        ${createNavCard(nextProject, 'next-card')}
    `;

    // Handle Recommended Project (Optional)
    let recommendedHTML = '';
    if (project.recommended) {
      // Normalize to array (support both single string and array of strings)
      const recIds = Array.isArray(project.recommended) ? project.recommended : [project.recommended];

      // Filter out invalid IDs
      const recProjects = recIds
        .map(id => allProjects.find(p => p.id === id))
        .filter(p => p !== undefined);

      if (recProjects.length > 0) {
        const cardsHTML = recProjects.map(p => createNavCard(p, '', true)).join('');

        recommendedHTML = `
             <div class="recommended-container">
                 <div class="recommended-label">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                     <span>Recommended</span>
                 </div>
                 <div class="recommended-grid">
                    ${cardsHTML}
                 </div>
             </div>
        `;
      }
    }

    // Inject into DOM
    if (footerNav) {
      // Clear existing content (needed if re-rendering)
      footerNav.innerHTML = navHTML;

      // If there is a recommended project, we insert it BEFORE the footer nav grid
      // We need to check if we already inserted a recommended container to avoid dupes on re-render
      const existingRec = document.querySelector('.recommended-container');
      if (existingRec) existingRec.remove();

      if (recommendedHTML) {
        const container = document.createElement('div');
        container.innerHTML = recommendedHTML;
        // Insert before the footer nav
        footerNav.parentNode.insertBefore(container.firstElementChild, footerNav);
      }
    }
  }
}
