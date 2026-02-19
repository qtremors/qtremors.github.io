/* ==========================================================================
   static/js/home.js
   (Logic only for the Main Homepage: Typewriter & Portfolio Grid)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* --- HERO SAFE ZONE (Centers content between Header & Dock) --- */
  const updateHeroSafeZones = () => {
    const hero = document.querySelector('.hero');
    const bottomNav = document.querySelector('.navigation-bar');
    const topBar = document.querySelector('.top-app-bar');

    if (!hero) return;

    let topOffset = 100; // Default fallback
    if (topBar) {
      topOffset = topBar.offsetHeight;
    }

    let bottomOffset = 60; // Default fallback
    if (bottomNav) {
      const navStyle = window.getComputedStyle(bottomNav);
      if (navStyle.display !== 'none') {
        const navRect = bottomNav.getBoundingClientRect();
        bottomOffset = (window.innerHeight - navRect.top) + 20;
      }
    }

    hero.style.setProperty('--hero-pad-top', `${topOffset}px`);
    hero.style.setProperty('--hero-pad-bottom', `${bottomOffset}px`);
  };

  window.addEventListener('resize', updateHeroSafeZones);
  updateHeroSafeZones();
  setTimeout(updateHeroSafeZones, 100);

  /* --- TYPEWRITER --- */
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const roles = [
      "Aman Singh",
      "Python Developer",
      "Full-Stack Engineer",
      "Building Scalable Apps",
      "Crafting Developer Tools",
      "Integrating AI Models",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const type = () => {
      const currentRole = roles[roleIndex];
      let typeSpeed = isDeleting ? 20 : 40;
      if (!isDeleting) {
        if (charIndex < currentRole.length) { charIndex++; }
        else { isDeleting = true; typeSpeed = 2500; }
      } else {
        if (charIndex > 0) { charIndex--; }
        else { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; typeSpeed = 500; }
      }
      typewriterElement.textContent = currentRole.substring(0, charIndex);
      setTimeout(type, typeSpeed);
    };
    type();
  }

  /* --- PORTFOLIO LOADING --- */
  const portfolioGrid = document.getElementById('portfolio-grid');
  const githubCard = document.getElementById('github-card');
  const githubActions = document.getElementById('github-card-actions');

  let allProjects = [];
  const INITIAL_SHOW_COUNT = 5;

  let isExpanded = sessionStorage.getItem('portfolio_expanded') === 'true';

  const createProjectCard = (project, isDynamic = false) => {
    const dynamicClass = isDynamic ? 'dynamic-project' : '';
    const isWip = project.status === 'wip';
    const isBeta = project.status === 'beta';
    const isArchive = project.status === 'archive';
    const statusClass = isWip ? 'is-wip' : (isBeta ? 'is-beta' : (isArchive ? 'is-archive' : ''));
    const statusBadge = isWip
      ? '<div class="wip-badge">⚠️ Development</div>'
      : (isBeta ? '<div class="beta-badge">🧪 Beta</div>' : (isArchive ? '<div class="archive-badge">📦 Archived</div>' : ''));
    const detailUrl = project.id ? `project.html?id=${project.id}` : '#';
    const badgesHtml = project.badges.map(badge => {
      const label = (typeof window.getBadgeLabel === 'function') ? window.getBadgeLabel(badge) : badge;
      return `<span class="${badge}">${label}</span>`;
    }).join('');
    const linksHtml = project.links.map(link => {
      const text = (typeof window.escapeHtml === 'function') ? window.escapeHtml(link.text) : link.text;
      return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${link.class}">${text} &rarr;</a>`;
    }).join('');

    return `
          <article class="portfolio-item fade-in ${dynamicClass} ${statusClass}" data-href="${detailUrl}" style="cursor: pointer;">
              <a href="${detailUrl}" class="project-card-link" style="display:block;">
                  <div class="img-wrapper" style="position: relative; overflow: hidden;">
                      ${statusBadge}
                      <img src="${project.image}" alt="${window.escapeHtml(project.title)} Preview" loading="lazy" style="width: 100%; display: block;">
                  </div>
              </a>
              <div class="portfolio-content">
                  <h3><a href="${detailUrl}" style="text-decoration:none; color:inherit;">${window.escapeHtml(project.title)}</a></h3>
                  <p>${window.escapeHtml(project.description)}</p>
                  <div class="tech-badges">${badgesHtml}</div>
                  <div class="portfolio-links">${linksHtml}</div>
              </div>
          </article>
        `;
  };

  const insertBeforeGithub = (htmlString) => {
    if (!portfolioGrid) return;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    if (githubCard) {
      portfolioGrid.insertBefore(tempDiv.firstElementChild, githubCard);
    } else {
      portfolioGrid.appendChild(tempDiv.firstElementChild);
    }
  };

  const createSkeletonCard = () => `
    <article class="portfolio-item skeleton-card">
      <div class="skeleton skeleton-image"></div>
      <div class="portfolio-content">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
        <div class="skeleton-badges">
          <div class="skeleton skeleton-badge"></div>
          <div class="skeleton skeleton-badge"></div>
          <div class="skeleton skeleton-badge"></div>
        </div>
      </div>
    </article>
  `;

  const loadProjects = async () => {
    if (!portfolioGrid) return;

    for (let i = 0; i < 3; i++) {
      insertBeforeGithub(createSkeletonCard());
    }

    try {
      const response = await fetch('data/projects.json');
      allProjects = await response.json();

      document.querySelectorAll('.skeleton-card').forEach(el => el.remove());

      const countToShow = isExpanded ? allProjects.length : INITIAL_SHOW_COUNT;

      allProjects.slice(0, countToShow).forEach((p, index) => {
        const isDynamic = index >= INITIAL_SHOW_COUNT;
        insertBeforeGithub(createProjectCard(p, isDynamic));
      });

      if (allProjects.length > INITIAL_SHOW_COUNT) {
        const loadBtn = document.createElement('button');
        loadBtn.className = 'card-btn btn-load';
        loadBtn.id = 'card-toggle-trigger';

        if (isExpanded) {
          loadBtn.innerHTML = `<span class="btn-text">Show Less</span><span class="btn-icon">↑</span>`;
        } else {
          const remainingCount = allProjects.length - INITIAL_SHOW_COUNT;
          loadBtn.innerHTML = `<span class="btn-text">Load More Projects (${remainingCount})</span><span class="btn-icon">↓</span>`;
        }

        if (githubActions) githubActions.prepend(loadBtn);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      const errorCard = document.createElement('div');
      errorCard.className = 'portfolio-item';
      errorCard.innerHTML = `
        <div class="portfolio-content" style="text-align: center; padding: 2rem;">
          <h3 style="color: var(--md-error, #f44336);">⚠️ Failed to load projects</h3>
          <p>Please check your connection and refresh the page.</p>
        </div>
      `;
      if (githubCard) {
        portfolioGrid.insertBefore(errorCard, githubCard);
      } else {
        portfolioGrid.appendChild(errorCard);
      }
    }
  };

  if (githubActions) {
    githubActions.addEventListener('click', (e) => {
      const btn = e.target.closest('#card-toggle-trigger');
      if (btn) {
        const btnText = btn.querySelector('.btn-text');
        const btnIcon = btn.querySelector('.btn-icon');

        if (!isExpanded) {
          allProjects.slice(INITIAL_SHOW_COUNT).forEach(p => insertBeforeGithub(createProjectCard(p, true)));
          btnText.textContent = "Show Less";
          btnIcon.textContent = "↑";
          isExpanded = true;
          sessionStorage.setItem('portfolio_expanded', 'true');
        } else {
          document.querySelectorAll('.dynamic-project').forEach(card => card.remove());
          const remainingCount = allProjects.length - INITIAL_SHOW_COUNT;
          btnText.textContent = `Load More Projects (${remainingCount})`;
          btnIcon.textContent = "↓";
          isExpanded = false;
          sessionStorage.setItem('portfolio_expanded', 'false');
          githubCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    });
  }
  loadProjects();

  if (portfolioGrid) {
    portfolioGrid.addEventListener('click', (e) => {
      if (e.target.closest('.portfolio-links a')) return;

      const card = e.target.closest('.portfolio-item[data-href]');
      if (card) {
        window.location.href = card.dataset.href;
      }
    });
  }
});