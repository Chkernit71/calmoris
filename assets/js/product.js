
// ===== Image gallery (thumb swap) =====
var mainImg = document.getElementById('product-main');
document.querySelectorAll('.product-thumbs .thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.product-thumbs .thumb').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const src = btn.getAttribute('data-src');
    if (src) mainImg.setAttribute('src', src);
  });
});

// ===== Tabs (ARIA-friendly) =====
var tabBtns = document.querySelectorAll('.tabs-nav [role="tab"]');
var tabPanels = document.querySelectorAll('[role="tabpanel"]');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.setAttribute('aria-selected', 'false'));
    tabPanels.forEach(p => p.hidden = true);
    btn.setAttribute('aria-selected', 'true');
    var target = document.getElementById(btn.getAttribute('aria-controls'));
    if (target) target.hidden = false;
  });
});

// ===== WhatsApp buy flow (merged & fixed) =====
var productName = document.querySelector('[itemprop="name"]')?.textContent.trim() || 'Produit Calmoris';
var qtyInput = document.getElementById('quantity');
var incBtn = document.querySelector('.qty .inc');
var decBtn = document.querySelector('.qty .dec');
var whatsappBtn = document.getElementById('whatsapp-btn');
var totalPriceEl = document.getElementById('total-price');
var priceElement = document.querySelector('[itemprop="price"]');
var unitPrice = parseInt(priceElement?.getAttribute('content') || '220', 10);

// Add data-base-price attribute if not exists (for coupon functionality)
if (priceElement && !priceElement.hasAttribute('data-base-price')) {
  priceElement.setAttribute('data-base-price', unitPrice);
  priceElement.setAttribute('id', 'unit-price');
}

// ⚠️ Replace with your actual WhatsApp number, digits only:
var phoneNumber = '212776703475';

function updateTotalAndLink() {
  var q = Math.max(1, parseInt(qtyInput.value || '1', 10));
  var total = unitPrice * q;
  totalPriceEl.textContent = String(total);
  var message = `Bonjour Calmoris,\nJe souhaite commander :\n👤 Nom : \n👤 Prénom : \n📱 Téléphone : \n📍 Adresse : \n📦 ${productName}\n🔢 Quantité : ${q}\n💰 Total : ${total} DH`;
  var encoded = encodeURIComponent(message);
  whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encoded}`;
}

incBtn?.addEventListener('click', () => { qtyInput.value = Math.max(1, (parseInt(qtyInput.value || '1', 10) + 1)); updateTotalAndLink(); });
decBtn?.addEventListener('click', () => { qtyInput.value = Math.max(1, (parseInt(qtyInput.value || '1', 10) - 1)); updateTotalAndLink(); });
qtyInput?.addEventListener('input', updateTotalAndLink);
updateTotalAndLink();

// Language switcher
var currentLangBtn = document.getElementById('current-lang');
var langOptions = document.getElementById('lang-options');

// Toggle dropdown
currentLangBtn.addEventListener('click', () => {
  langOptions.style.display = langOptions.style.display === 'block' ? 'none' : 'block';
});

// Handle language selection
langOptions.querySelectorAll('div').forEach(option => {
  option.addEventListener('click', () => {
    var lang = option.getAttribute('data-lang');

    // Redirect to correct version
    if (lang === 'fr') {
      window.location.href = '/';
    } else if (lang === 'ar') {
      window.location.href = '/ar/';
    }
  });
});

// Mobile menu toggle
var menuToggle = document.querySelector('.menu-toggle');
var mainMenu = document.querySelector('.main-nav ul');

menuToggle.addEventListener('click', () => {
  mainMenu.classList.toggle('show');

  // toggle icon ☰ <-> ✖
  if (mainMenu.classList.contains('show')) {
    menuToggle.textContent = '✖';
  } else {
    menuToggle.textContent = '☰';
  }
});