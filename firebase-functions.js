// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9bMwqm0X1KzXyk8U370Y8aWNZzUIMhQs",
  authDomain: "calmoris-7f87f.firebaseapp.com",
  projectId: "calmoris-7f87f",
  storageBucket: "calmoris-7f87f.firebasestorage.app",
  messagingSenderId: "179124967618",
  appId: "1:179124967618:web:7ce3b24a76c3c1dc5e835b",
  databaseURL: "https://calmoris-7f87f-default-rtdb.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Global variables
let appliedCoupon = null;
const basePrice = 449;

// Coupon validation function
async function validateCoupon(code) {
  if (!code || code.trim() === '') {
    return { valid: false, message: 'Veuillez entrer un code promo' };
  }

  try {
    const couponCode = code.toUpperCase();
    const couponDoc = await db.collection('coupons').doc(couponCode).get();
    
    if (!couponDoc.exists) {
      return { valid: false, message: 'Code promo invalide' };
    }

    const couponData = couponDoc.data();
    
    // Check if coupon is active
    if (!couponData.active) {
      return { valid: false, message: 'Ce code promo a expiré' };
    }

    // Check usage limit
    if (couponData.maxUses && couponData.usedCount >= couponData.maxUses) {
      return { valid: false, message: 'Ce code promo a atteint sa limite d\'utilisation' };
    }

    // Check expiration date
    if (couponData.expiryDate) {
      const expiryDate = new Date(couponData.expiryDate);
      if (expiryDate < new Date()) {
        return { valid: false, message: 'Ce code promo a expiré' };
      }
    }

    // Check minimum order amount
    if (couponData.minOrderAmount && basePrice < couponData.minOrderAmount) {
      return { 
        valid: false, 
        message: `Montant minimum requis : ${couponData.minOrderAmount} DH` 
      };
    }

    return { 
      valid: true, 
      message: `✓ Code promo appliqué ! ${couponData.discount}${couponData.type === 'percentage' ? '%' : ' DH'} de réduction`,
      couponData: couponData
    };

  } catch (error) {
    console.error('Error validating coupon:', error);
    return { valid: false, message: 'Erreur lors de la validation. Veuillez réessayer.' };
  }
}

// Calculate discount
function calculateDiscount(price, couponData) {
  if (couponData.type === 'percentage') {
    return Math.round(price * (couponData.discount / 100));
  } else if (couponData.type === 'fixed') {
    return Math.min(couponData.discount, price);
  }
  return 0;
}

// Update total price
function updateTotalPrice() {
  const quantity = parseInt(document.getElementById('quantity').value) || 1;
  let totalPrice = basePrice * quantity;
  let discountAmount = 0;

  if (appliedCoupon) {
    const discountPerItem = calculateDiscount(basePrice, appliedCoupon);
    discountAmount = discountPerItem * quantity;
    totalPrice = totalPrice - discountAmount;
  }

  document.getElementById('total-price').textContent = totalPrice;
  document.getElementById('unit-price').textContent = basePrice + ' DH';
  
  if (discountAmount > 0) {
    document.getElementById('discount-amount').textContent = discountAmount;
    document.getElementById('discount-display').style.display = 'block';
  } else {
    document.getElementById('discount-display').style.display = 'none';
  }

  // Update WhatsApp link with coupon info
  updateWhatsAppLink(quantity, totalPrice, appliedCoupon);
}

// Update WhatsApp link
function updateWhatsAppLink(quantity, totalPrice, coupon) {
  const productName = "Pack Immunité & Protection";
  let message = `Bonjour Calmoris,\n\nJe souhaite commander :\n📦 ${productName}\n🔢 Quantité : ${quantity}\n💰 Total : ${totalPrice} DH`;
  
  if (coupon) {
    const couponCode = document.getElementById('coupon-code').value.toUpperCase();
    message += `\n🎟️ Code promo : ${couponCode}`;
  }
  
  const whatsappUrl = `https://wa.me/+212776703475?text=${encodeURIComponent(message)}`;
  document.getElementById('whatsapp-btn').href = whatsappUrl;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Apply coupon button handler
  document.getElementById('apply-coupon-btn').addEventListener('click', async function() {
    const couponInput = document.getElementById('coupon-code');
    const couponMessage = document.getElementById('coupon-message');
    const applyBtn = this;
    
    const code = couponInput.value.trim().toUpperCase();
    
    // Disable button during validation
    applyBtn.disabled = true;
    applyBtn.textContent = 'Vérification...';
    couponMessage.className = 'coupon-message info';
    couponMessage.textContent = 'Validation en cours...';
    couponMessage.style.display = 'block';

    const result = await validateCoupon(code);
    
    applyBtn.disabled = false;
    applyBtn.textContent = 'Appliquer';

    if (result.valid) {
      appliedCoupon = result.couponData;
      couponMessage.className = 'coupon-message success';
      couponMessage.textContent = result.message;
      couponInput.disabled = true;
      applyBtn.textContent = '✓ Appliqué';
      applyBtn.disabled = true;
      applyBtn.style.background = '#27ae60';
      updateTotalPrice();
    } else {
      appliedCoupon = null;
      couponMessage.className = 'coupon-message error';
      couponMessage.textContent = result.message;
    }
  });

  // Quantity change handlers
  const incBtn = document.querySelector('.qty-btn.inc');
  const decBtn = document.querySelector('.qty-btn.dec');
  const qtyInput = document.getElementById('quantity');

  if (incBtn) {
    incBtn.addEventListener('click', function() {
      qtyInput.value = parseInt(qtyInput.value) + 1;
      updateTotalPrice();
    });
  }

  if (decBtn) {
    decBtn.addEventListener('click', function() {
      if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
        updateTotalPrice();
      }
    });
  }

  if (qtyInput) {
    qtyInput.addEventListener('change', function() {
      if (parseInt(this.value) < 1) {
        this.value = 1;
      }
      updateTotalPrice();
    });
  }

  // Allow Enter key to apply coupon
  document.getElementById('coupon-code').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('apply-coupon-btn').click();
    }
  });

  // Initialize
  updateTotalPrice();
});