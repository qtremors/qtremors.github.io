document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. Parse URL Parameters to get Project ID
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            // Only use history.back if the user actually came from index.html (preserves scroll position)
            if (document.referrer.includes('index.html')) {
                e.preventDefault();
                history.back();
            }
        });
    }

    // If no ID is in the URL, redirect back to home
    if (!projectId) {
        window.location.href = 'index.html';
        return;
    }

    // 2. Fetch Project Data from JSON
    try {
        const response = await fetch('projects.json');
        if (!response.ok) throw new Error('Failed to load project data');
        
        const allProjects = await response.json();
        
        // Find the specific project matching the ID
        const project = allProjects.find(p => p.id === projectId);

        if (!project) {
            document.querySelector('.project-container').innerHTML = `
                <div style="text-align:center; padding: 4rem;">
                    <h1>Project Not Found</h1>
                    <p>The project ID "${projectId}" does not exist.</p>
                    <a href="index.html" class="back-link">Return Home</a>
                </div>
            `;
            return;
        }

        // 3. Render the Page (Pass allProjects for navigation logic)
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
    // --- Page Metadata ---
    document.title = `${project.title} | Tremors`;
    document.getElementById('p-title').innerText = project.title;
    document.getElementById('p-id-label').innerText = project.id ? project.id.toUpperCase() : "PROJECT DETAILS";

    // --- Banner Image ---
    const banner = document.getElementById('p-banner');
    if (project.image) {
        banner.src = project.image;
        banner.alt = `${project.title} Banner`;

        // Error Handler: If image is 404/broken, hide the container
        banner.onerror = function() {
            document.querySelector('.project-banner-wrapper').style.display = 'none';
        };
    } else {
        // Hide the banner container if no image exists in JSON
        document.querySelector('.project-banner-wrapper').style.display = 'none';
    }

    // --- Description ---
    // Prefer longDescription if available, fallback to standard description
    const descEl = document.getElementById('p-description');
    descEl.textContent = project.longDescription || project.description;

    // --- Features List ---
    const featuresList = document.getElementById('p-features');
    const featuresSection = document.getElementById('section-features');
    
    // Clear previous content
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

    // --- Installation / Usage Code Block ---
    const installBlock = document.getElementById('p-installation');
    const installSection = document.getElementById('section-installation');
    const copyBtn = document.getElementById('copy-btn');
    
    if (project.installation) {
        installSection.style.display = 'block';
        installBlock.textContent = project.installation;

        // Copy Button Logic
        // Clone button to remove old event listeners if re-rendering
        const newCopyBtn = copyBtn.cloneNode(true);
        copyBtn.parentNode.replaceChild(newCopyBtn, copyBtn);

        newCopyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(project.installation).then(() => {
                const originalHTML = newCopyBtn.innerHTML;
                newCopyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Copied!</span>`;
                newCopyBtn.style.borderColor = 'var(--md-primary)';
                newCopyBtn.style.color = 'var(--md-primary)';
                
                setTimeout(() => {
                    newCopyBtn.innerHTML = originalHTML;
                    newCopyBtn.style.borderColor = '';
                    newCopyBtn.style.color = '';
                }, 2000);
            });
        });

    } else {
        installSection.style.display = 'none';
    }

    // --- Dynamic Links Sidebar ---
    const linksContainer = document.getElementById('p-links');
    linksContainer.innerHTML = ''; // Clear existing

    if (project.links && project.links.length > 0) {
        project.links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'sidebar-btn';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            
            // Logic: Check if it's a GitHub link to swap the icon
            const isGithub = link.text.toLowerCase().includes('github') || link.url.includes('github.com');
            
            // SVG Icons
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
            
            // Build the HTML structure (Icon + Text on left, Arrow on right)
            a.innerHTML = `
                <div class="btn-left-group">
                    ${iconSvg}
                    <span>${link.text}</span>
                </div>
                <span class="btn-arrow">↗</span>
            `;
            
            linksContainer.appendChild(a);
        });
    }

    // --- Technologies Badges ---
    const tagsContainer = document.getElementById('p-tags');
    tagsContainer.innerHTML = ''; // Clear existing

    if (project.badges && project.badges.length > 0) {
        
        // Helper to format badge names
        const getBadgeLabel = (b) => {
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
            return labels[b] || b.replace('tech-', '').charAt(0).toUpperCase() + b.replace('tech-', '').slice(1);
        };

        project.badges.forEach(badge => {
            const span = document.createElement('span');
            span.className = badge; 
            span.textContent = getBadgeLabel(badge);
            
            // Apply standard badge styling
            span.style.padding = "5px 12px";
            span.style.borderRadius = "20px";
            span.style.fontSize = "0.85rem";
            span.style.fontWeight = "500";
            span.style.display = "inline-block";
            
            tagsContainer.appendChild(span);
        });
    }

    // --- Footer Navigation (Previous & Next) ---
    if (allProjects && allProjects.length > 0) {
        const footerNav = document.getElementById('project-footer-nav');
        const currentIndex = allProjects.findIndex(p => p.id === project.id);
        const total = allProjects.length;

        // 1. Determine Previous & Next Projects (Looping)
        let prevProject = project.related_prev 
            ? allProjects.find(p => p.id === project.related_prev) 
            : allProjects[(currentIndex - 1 + total) % total];

        let nextProject = project.related_next 
            ? allProjects.find(p => p.id === project.related_next) 
            : allProjects[(currentIndex + 1) % total];

        // Helper to generate the HTML for footer card
        const createNavCard = (proj, directionClass) => {
            // Truncate description to ~80 characters
            const shortDesc = proj.description.length > 80 
                ? proj.description.substring(0, 80) + '...' 
                : proj.description;

            // Generate first 3 badges
            const badgeHtml = proj.badges.slice(0, 3).map(b => {
                return `<span class="mini-badge ${b}"></span>`; 
            }).join('');

            return `
                <a href="project.html?id=${proj.id}" class="nav-card ${directionClass}">
                    <img src="${proj.image}" alt="${proj.title}" class="nav-img">
                    
                    <div class="nav-info">
                        <div class="nav-top-row">
                            <div class="nav-badges">${badgeHtml}</div>
                        </div>
                        
                        <h3 class="nav-title">${proj.title}</h3>
                        <p class="nav-desc">${shortDesc}</p>
                    </div>
                </a>
            `;
        };

        // 2. Inject HTML
        if (footerNav) {
            footerNav.innerHTML = `
                ${createNavCard(prevProject, 'prev-card')}
                ${createNavCard(nextProject, 'next-card')}
            `;
        }
    }
}