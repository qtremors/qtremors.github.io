document.addEventListener('DOMContentLoaded', function () {

    // ==========================================================================
    // 1. ELEMENT SELECTION
    // ==========================================================================
    const body = document.body;
    const sections = document.querySelectorAll('section');
    const allNavLinks = document.querySelectorAll('.nav-item');
    const themeToggleButton = document.getElementById('theme-toggle');
    const mobileNavBar = document.querySelector('.navigation-bar');
    const topAppBar = document.querySelector('.top-app-bar');

    // ==========================================================================
    // 2. THEME MANAGEMENT
    // ==========================================================================

    /**
     * Applies the specified theme to the page and stores it in localStorage.
     * @param {string} theme - The theme to apply ('dark' or 'light').
     */
    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    /**
     * Toggles between 'dark' and 'light' themes.
     */
    const toggleTheme = () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    };

    /**
     * Initializes theme from saved preference or defaults to 'dark'.
     */
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        applyTheme(savedTheme || 'dark');
    };

    // ==========================================================================
    // 3. NAVIGATION MANAGEMENT
    // ==========================================================================

    /**
     * Updates the active navigation link based on the currently visible section.
     * @param {string} visibleSectionId - The ID of the section currently in view.
     */
    const updateActiveNav = (visibleSectionId) => {
        allNavLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${visibleSectionId}`;
            link.classList.toggle('active', isActive);
        });
    };

    /**
     * Shows or hides navigation bars depending on scroll direction.
     * @param {number} currentScrollY - Current vertical scroll position.
     * @param {number} lastScrollY - Previous vertical scroll position.
     */
    const handleNavVisibility = (currentScrollY, lastScrollY) => {
        const isScrollingDown = currentScrollY > lastScrollY;
        const isPastHeader = currentScrollY > topAppBar.offsetHeight;

        if (isScrollingDown && isPastHeader) {
            // Hide nav bars when scrolling down past header
            mobileNavBar.classList.add('hidden');
            topAppBar.classList.add('hidden');
        } else {
            // Show nav bars when scrolling up
            mobileNavBar.classList.remove('hidden');
            topAppBar.classList.remove('hidden');
        }
    };

    // ==========================================================================
    // 4. SCROLL HANDLING
    // ==========================================================================
    let lastScrollY = window.scrollY;
    const scrollThreshold = 3;

    /**
     * Handles scroll events: updates nav visibility and remembers last scroll position.
     */
    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Ignore small scroll changes below threshold
        if (Math.abs(currentScrollY - lastScrollY) <= scrollThreshold) {
            return;
        }

        handleNavVisibility(currentScrollY, lastScrollY);

        // Update last scroll position (never negative)
        lastScrollY = Math.max(currentScrollY, 0);
    };

    // ==========================================================================
    // 5. UTILITY FUNCTIONS
    // ==========================================================================

    /**
     * Creates a debounced version of a function to limit its execution rate.
     * @param {Function} func - Function to debounce.
     * @param {number} [wait=10] - Delay in milliseconds.
     * @returns {Function} Debounced function.
     */
    const debounce = (func, wait = 10) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // ==========================================================================
    // 6. INITIALIZATION & EVENT LISTENERS
    // ==========================================================================

    // Apply saved theme or default on page load
    initializeTheme();

    // Toggle theme on button click
    themeToggleButton.addEventListener('click', toggleTheme);

    // Handle scroll events with debounce
    window.addEventListener('scroll', debounce(handleScroll));

    // Track visible section using IntersectionObserver
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

    // Observe all page sections
    sections.forEach(section => observer.observe(section));
});
