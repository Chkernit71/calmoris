// Language switch
  const currentLangBtn = document.getElementById('current-lang');
  const langOptions = document.getElementById('lang-options');
  const elements = document.querySelectorAll('[data-fr]');

  currentLangBtn.addEventListener('click', () => {
    langOptions.style.display = langOptions.style.display === 'block' ? 'none' : 'block';
  });

  langOptions.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.getAttribute('data-lang');
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      elements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
      });
      currentLangBtn.innerHTML = option.innerHTML;
      langOptions.style.display = 'none';
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-switch')) {
      langOptions.style.display = 'none';
    }
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


 
