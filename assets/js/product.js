// ===== Image gallery (thumb swap) =====
const mainImg = document.getElementById('product-main');
document.querySelectorAll('.product-thumbs .thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.product-thumbs .thumb').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const src = btn.getAttribute('data-src');
    if (src) mainImg.setAttribute('src', src);
  });
});

// ===== Tabs (ARIA-friendly) =====
const tabBtns = document.querySelectorAll('.tabs-nav [role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.setAttribute('aria-selected', 'false'));
    tabPanels.forEach(p => p.hidden = true);
    btn.setAttribute('aria-selected', 'true');
    const target = document.getElementById(btn.getAttribute('aria-controls'));
    if (target) target.hidden = false;
  });
});

// ===== WhatsApp buy flow (merged & fixed) =====
const productName = document.querySelector('[itemprop="name"]')?.textContent.trim() || 'Produit Calmoris';
const qtyInput = document.getElementById('quantity');
const incBtn = document.querySelector('.qty .inc');
const decBtn = document.querySelector('.qty .dec');
const whatsappBtn = document.getElementById('whatsapp-btn');
const totalPriceEl = document.getElementById('total-price');
const unitPrice = parseInt(document.querySelector('[itemprop="price"]')?.getAttribute('content') || '220', 10);
// ⚠️ Replace with your actual WhatsApp number, digits only:
const phoneNumber = '212776703475';

function updateTotalAndLink() {
  const q = Math.max(1, parseInt(qtyInput.value || '1', 10));
  const total = unitPrice * q;
  totalPriceEl.textContent = String(total);
  const message = `Bonjour Calmoris, je souhaite commander ${q} ${q > 1 ? 'unités de' : 'un'} ${productName} (Total: ${total} DH).`;
  const encoded = encodeURIComponent(message);
  whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encoded}`;
}

incBtn?.addEventListener('click', () => { qtyInput.value = Math.max(1, (parseInt(qtyInput.value || '1', 10) + 1)); updateTotalAndLink(); });
decBtn?.addEventListener('click', () => { qtyInput.value = Math.max(1, (parseInt(qtyInput.value || '1', 10) - 1)); updateTotalAndLink(); });
qtyInput?.addEventListener('input', updateTotalAndLink);
updateTotalAndLink();
