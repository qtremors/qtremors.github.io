document.addEventListener('DOMContentLoaded', function () {

  /* --- CONSOLE WELCOME --- */
  console.log("%c Hello there! Looking for the source code?", "font-weight: bold; font-size: 20px; color: #8ab4f8;");
  console.log("Check it out here: https://github.com/qtremors/qtremors.github.io");

  /* --- MAGNETIC TEXT --- */
  const magnetParagraphs = document.querySelectorAll('p.magnet-text');
  const magnetSections = document.querySelectorAll('.hero, #about');

  if (magnetParagraphs.length > 0 && magnetSections.length > 0) {
    magnetParagraphs.forEach(paragraph => {
      const cleanText = paragraph.textContent.replace(/\s+/g, ' ').trim();
      const textArray = cleanText.split(' ');
      paragraph.innerHTML = textArray
        .map(word => `<span class="magnetic-word">${word}</span>`)
        .join(' ');
    });

    const words = document.querySelectorAll('.magnetic-word');

    magnetSections.forEach(section => {
      section.addEventListener('mousemove', (e) => {
        words.forEach(word => {
          const rect = word.getBoundingClientRect();
          const wordX = rect.left + rect.width / 2;
          const wordY = rect.top + rect.height / 2;
          const dist = Math.hypot(e.clientX - wordX, e.clientY - wordY);

          if (dist < 100) {
            const force = (100 - dist) / 100;
            const x = (e.clientX - wordX) * force * -0.3;
            const y = (e.clientY - wordY) * force * -0.3;

            word.style.transform = `translate(${x}px, ${y}px)`;
          } else {
            word.style.transform = `translate(0px, 0px)`;
          }
        });
      });

      section.addEventListener('mouseleave', () => {
        words.forEach(word => {
          word.style.transform = `translate(0px, 0px)`;
        });
      });
    });
  }

  /* --- SPOTLIGHT EFFECTS --- */
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      heroSection.style.setProperty('--hero-mouse-x', `${x}px`);
      heroSection.style.setProperty('--hero-mouse-y', `${y}px`);
    });
  }

  /* --- SCROLL OBSERVER --- */
  const observerOptions = { root: null, threshold: 0.15 };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToReveal = document.querySelectorAll('.about-text');
  elementsToReveal.forEach(el => {
    el.classList.add('reveal-item', 'reveal-from-bottom');
    scrollObserver.observe(el);
  });

  /* --- DEVELOPER CONSOLE & EASTER EGGS --- */
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

    if (window.showToast) {
      window.showToast("🐍 Python Mode Activated!");
    } else {
      alert("🐍 Python Mode Activated!");
    }
  };
});
