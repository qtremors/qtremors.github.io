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
      "a Full-Stack Developer",
      "a Python Architect",
      "a UI/UX Enthusiast",
      "an AI Integrator",
      "a Developer Tool Builder",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isVisible = true;
    let typeTimer = null;

    const type = () => {
      if (!isVisible) {
        typeTimer = null;
        return;
      }
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
      typeTimer = setTimeout(type, typeSpeed);
    };

    const homeSection = document.getElementById('home');
    if (homeSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
          if (!isVisible && typeTimer) {
            clearTimeout(typeTimer);
            typeTimer = null;
          }
          if (isVisible && !typeTimer) type();
        });
      }, { threshold: 0.1 });
      observer.observe(homeSection);
    } else {
      type(); // Fallback
    }
  }

  /* --- PORTFOLIO LOADING --- */
  const portfolioGrid = document.getElementById('portfolio-grid');
  const githubCard = document.getElementById('github-card');
  const githubActions = document.getElementById('github-card-actions');

  let allProjects = [];
  const INITIAL_SHOW_COUNT = 5;

  let isExpanded = sessionStorage.getItem('portfolio_expanded') === 'true';

  const createProjectCard = (project, isDynamic = false) => {
    const isWip = project.status === 'wip';
    const isBeta = project.status === 'beta';
    const isArchive = project.status === 'archive';

    const article = document.createElement('article');
    article.className = 'portfolio-item fade-in';
    if (isDynamic) article.classList.add('dynamic-project');
    if (isWip) article.classList.add('is-wip');
    if (isBeta) article.classList.add('is-beta');
    if (isArchive) article.classList.add('is-archive');

    const detailUrl = project.id ? `project.html?id=${project.id}` : '#';
    article.dataset.href = detailUrl;
    article.style.cursor = 'pointer';

    const link = document.createElement('a');
    link.href = detailUrl;
    link.className = 'project-card-link';
    link.style.display = 'block';

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'img-wrapper';
    imgWrapper.style.position = 'relative';
    imgWrapper.style.overflow = 'hidden';

    if (isWip) {
      const badge = document.createElement('div');
      badge.className = 'wip-badge';
      badge.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z"/>
        </svg>
        <span>Development</span>
      `;
      imgWrapper.appendChild(badge);
    } else if (isBeta) {
      const badge = document.createElement('div');
      badge.className = 'beta-badge';
      badge.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 11.33L6 18h12l-5-6.67V6h-2v5.33zM15.96 4h-7.92L9 5.28V11l-5 6.67c-.75.98-.05 2.33 1.2 2.33h13.6c1.25 0 1.95-1.35 1.2-2.33L15 11V5.28L15.96 4z"/>
        </svg>
        <span>Beta</span>
      `;
      imgWrapper.appendChild(badge);
    } else if (isArchive) {
      const badge = document.createElement('div');
      badge.className = 'archive-badge';
      badge.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.47 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.41l.83-1zM5 19V8h14v11H5zm3-5h2l2 2 2-2h2v-2H8v2z"/>
        </svg>
        <span>Archived</span>
      `;
      imgWrapper.appendChild(badge);
    }

    const img = document.createElement('img');
    img.src = project.image ? project.image : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    img.setAttribute('loading', 'lazy');
    img.alt = `${project.title} Preview`;
    img.style.width = '100%';
    img.style.display = 'block';

    imgWrapper.appendChild(img);
    link.appendChild(imgWrapper);
    article.appendChild(link);

    const content = document.createElement('div');
    content.className = 'portfolio-content';

    const h3 = document.createElement('h3');
    const h3Link = document.createElement('a');
    h3Link.href = detailUrl;
    h3Link.style.textDecoration = 'none';
    h3Link.style.color = 'inherit';
    h3Link.textContent = project.title;
    h3.appendChild(h3Link);

    const desc = document.createElement('p');
    desc.textContent = project.description || '';

    const badgesContainer = document.createElement('div');
    badgesContainer.className = 'tech-badges';
    if (project.badges) {
      project.badges.forEach(badge => {
        const span = document.createElement('span');
        span.className = badge;
        span.textContent = (window.Tremors && window.Tremors.utils && typeof window.Tremors.utils.getBadgeLabel === 'function') ? window.Tremors.utils.getBadgeLabel(badge) : badge;
        badgesContainer.appendChild(span);
      });
    }

    const linksContainer = document.createElement('div');
    linksContainer.className = 'portfolio-links';
    if (project.links) {
      project.links.forEach(l => {
        const a = document.createElement('a');
        a.href = l.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = l.class || '';
        // Use unicode arrow
        a.textContent = `${l.text} \u2192`;
        linksContainer.appendChild(a);
      });
    }

    content.appendChild(h3);
    content.appendChild(desc);
    content.appendChild(badgesContainer);
    content.appendChild(linksContainer);

    article.appendChild(content);

    return article;
  };

  const insertBeforeGithub = (elementOrString) => {
    if (!portfolioGrid) return;
    let nodeToInsert = elementOrString;
    if (typeof elementOrString === 'string') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = elementOrString;
      nodeToInsert = tempDiv.firstElementChild;
    }
    if (githubCard) {
      portfolioGrid.insertBefore(nodeToInsert, githubCard);
    } else {
      portfolioGrid.appendChild(nodeToInsert);
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