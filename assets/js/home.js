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


 
