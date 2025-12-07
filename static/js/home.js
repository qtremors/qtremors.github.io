/* ==========================================================================
   static/js/home.js
   (Logic only for the Main Homepage: Typewriter & Portfolio Grid)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* --- TYPEWRITER --- */
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const roles = [
      "Aman Singh",
      "A Python Developer",
      "An Open Source Enthusiast",
      "Designing UI/UX",
      "Architecting Systems",
      "Full-Stack Explorer",
      "an AI Integrator",
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
  
  // 1. Check Session Storage: Did the user previously expand the list?
  let isExpanded = sessionStorage.getItem('portfolio_expanded') === 'true';

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

  const createProjectCard = (project, isDynamic = false) => {
    const dynamicClass = isDynamic ? 'dynamic-project' : '';
    const isWip = project.status === 'wip';
    const wipClass = isWip ? 'is-wip' : '';
    const wipBadge = isWip ? '<div class="wip-badge">⚠️ Development</div>' : '';
    const detailUrl = project.id ? `project.html?id=${project.id}` : '#';
    const badgesHtml = project.badges.map(badge => `<span class="${badge}">${getBadgeLabel(badge)}</span>`).join('');
    const linksHtml = project.links.map(link => `<a href="${link.url}" target="_blank" class="${link.class}">${link.text} &rarr;</a>`).join('');

    return `
          <article class="portfolio-item fade-in ${dynamicClass} ${wipClass}">
              <a href="${detailUrl}" class="project-card-link" style="display:block; cursor:pointer;">
                  <div class="img-wrapper" style="position: relative; overflow: hidden;">
                      ${wipBadge}
                      <img src="${project.image}" alt="${project.title} Preview" loading="lazy" style="width: 100%; display: block;">
                  </div>
              </a>
              <div class="portfolio-content">
                  <h3><a href="${detailUrl}" style="text-decoration:none; color:inherit;">${project.title}</a></h3>
                  <p>${project.description}</p>
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
    portfolioGrid.insertBefore(tempDiv.firstElementChild, githubCard);
  };

  const loadProjects = async () => {
    if (!portfolioGrid) return;
    try {
      const response = await fetch('data/projects.json');
      allProjects = await response.json();
      
      // 2. Logic: Show ALL if expanded, otherwise just show INITIAL count
      const countToShow = isExpanded ? allProjects.length : INITIAL_SHOW_COUNT;

      allProjects.slice(0, countToShow).forEach((p, index) => {
          // If index > initial count, mark it as 'dynamic' so we can collapse it later
          const isDynamic = index >= INITIAL_SHOW_COUNT; 
          insertBeforeGithub(createProjectCard(p, isDynamic));
      });

      if (allProjects.length > INITIAL_SHOW_COUNT) {
        const loadBtn = document.createElement('button');
        loadBtn.className = 'card-btn btn-load';
        loadBtn.id = 'card-toggle-trigger';
        
        // 3. Logic: Set initial button text based on state
        if (isExpanded) {
            loadBtn.innerHTML = `<span class="btn-text">Show Less</span><span class="btn-icon">↑</span>`;
        } else {
            loadBtn.innerHTML = `<span class="btn-text">Load More Projects</span><span class="btn-icon">↓</span>`;
        }
        
        if (githubActions) githubActions.prepend(loadBtn);
      }
    } catch (error) { console.error('Error loading projects:', error); }
  };

  if (githubActions) {
    githubActions.addEventListener('click', (e) => {
      const btn = e.target.closest('#card-toggle-trigger');
      if (btn) {
        const btnText = btn.querySelector('.btn-text');
        const btnIcon = btn.querySelector('.btn-icon');
        
        if (!isExpanded) {
          // Expand Action
          allProjects.slice(INITIAL_SHOW_COUNT).forEach(p => insertBeforeGithub(createProjectCard(p, true)));
          btnText.textContent = "Show Less";
          btnIcon.textContent = "↑";
          isExpanded = true;
          sessionStorage.setItem('portfolio_expanded', 'true'); // Save State
        } else {
          // Collapse Action
          document.querySelectorAll('.dynamic-project').forEach(card => card.remove());
          btnText.textContent = "Load More Projects";
          btnIcon.textContent = "↓";
          isExpanded = false;
          sessionStorage.setItem('portfolio_expanded', 'false'); // Save State
          githubCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    });
  }
  loadProjects();
});