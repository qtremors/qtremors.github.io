document.addEventListener('DOMContentLoaded', function() {
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item');
    const themeToggleButton = document.getElementById('theme-toggle');
    const navBar = document.querySelector('.navigation-bar'); 
    const topAppBar = document.querySelector('.top-app-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));

    const body = document.body;
    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    themeToggleButton.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme || 'dark');



    const debounce = (func, wait = 10) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    let lastScrollY = window.scrollY;
    const scrollThreshold = 5;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (Math.abs(currentScrollY - lastScrollY) <= scrollThreshold) {
            return;
        }

        if (currentScrollY > lastScrollY && currentScrollY > topAppBar.offsetHeight) {
            navBar.classList.add('hidden');
            topAppBar.classList.add('hidden');
        } else {
            navBar.classList.remove('hidden');
            topAppBar.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener('scroll', debounce(handleScroll));

});