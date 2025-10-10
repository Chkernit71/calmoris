// Language switcher
const currentLangBtn = document.getElementById('current-lang');
const langOptions = document.getElementById('lang-options');

// Toggle dropdown
currentLangBtn.addEventListener('click', () => {
  langOptions.style.display = langOptions.style.display === 'block' ? 'none' : 'block';
});

// Handle language selection
langOptions.querySelectorAll('div').forEach(option => {
  option.addEventListener('click', () => {
    const lang = option.getAttribute('data-lang');

    // Redirect to correct version
    if (lang === 'fr') {
      window.location.href = '/fr/';
    } else if (lang === 'ar') {
      window.location.href = '/ar/';
    }
  });
});


  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.querySelector('.main-nav ul');

  menuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('show');

    // toggle icon ☰ <-> ✖
    if (mainMenu.classList.contains('show')) {
      menuToggle.textContent = '✖';
    } else {
      menuToggle.textContent = '☰';
    }
  });

 const backToTopBtn = document.getElementById('backToTop');

  // Show button after scrolling down
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Smooth scroll to top
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  // Get all accordion buttons
const accordions = document.querySelectorAll('.calmoris-accordion');

// Add event listeners to each accordion button
accordions.forEach(accordion => {
  accordion.addEventListener('click', () => {
    // Toggle the "active" class for the clicked accordion
    accordion.classList.toggle('active');
    
    // Get the corresponding panel
    const panel = accordion.nextElementSibling;

    // If the panel is already open, close it
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      // Otherwise, open it with a smooth transition
      panel.style.display = 'block';
      panel.classList.add('open');
    }
  });
});


 
