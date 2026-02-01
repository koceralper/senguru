document.addEventListener('DOMContentLoaded', () => {
    // --- Existing Navigation Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');
    const icon = hamburger ? hamburger.querySelector('i') : null;

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Announcement Bar Logic ---
    const announcementText = document.getElementById('announcement-text');
    if (announcementText && typeof storeConfig !== 'undefined') {
        announcementText.innerHTML = `<i class="fas fa-shipping-fast"></i> &nbsp; ${storeConfig.freeShippingThreshold} TL ve üzeri siparişlerde Kargo Ücretsiz! &nbsp; <i class="fas fa-gift"></i>`;
    }

    // --- New Shop Logic ---
    initShop();
});

// Shop Logic
let cart = [];

function initShop() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    // Render Products
    productList.innerHTML = products.map(product => {
        // Find 100 Gr option to show as default price if exists, else first option
        const displayOption = product.options.find(o => o.weight === "100 Gr") || product.options[0];

        return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <div class="product-price">${displayOption.price} TL <span class="price-hint">(${displayOption.weight})</span></div>
                <p class="product-desc">${product.description}</p>
                <button class="btn-product" onclick="openVariantModal(${product.id})">Sepete Ekle</button>
            </div>
        </div>
        `;
    }).join('');

    // Cart Event Listeners
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.querySelector('.close-cart');
    const cartModal = document.getElementById('cart-modal');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartModal.classList.add('active');
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }

    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
}

// Variant Modal Logic
window.openVariantModal = function(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('variant-modal');
    const content = document.getElementById('variant-modal-content');

    if(!modal || !content) return;

    // Generate HTML for the modal
    const optionsHtml = product.options.map((opt, index) => `
        <button class="variant-btn" onclick="selectVariantAndAdd(${product.id}, ${index})">
            <span class="v-weight">${opt.weight}</span>
            <span class="v-price">${opt.price} TL</span>
        </button>
    `).join('');

    content.innerHTML = `
        <div class="vm-header">
            <h3>${product.title}</h3>
            <span class="close-variant" onclick="closeVariantModal()"><i class="fas fa-times"></i></span>
        </div>
        <div class="vm-body">
            <p>Lütfen paket ağırlığını seçiniz:</p>
            <div class="variant-grid">
                ${optionsHtml}
            </div>
        </div>
    `;

    modal.classList.add('active');
};

window.closeVariantModal = function() {
    const modal = document.getElementById('variant-modal');
    if(modal) modal.classList.remove('active');
};

window.selectVariantAndAdd = function(productId, optionIndex) {
    const product = products.find(p => p.id === productId);
    const selectedOption = product.options[optionIndex];

    // Create a unique ID for cart item based on product + variant
    const cartItemId = `${product.id}-${optionIndex}`;

    const existingItem = cart.find(item => item.cartId === cartItemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            cartId: cartItemId,
            id: product.id,
            title: product.title,
            image: product.image,
            price: selectedOption.price,
            weight: selectedOption.weight,
            quantity: 1
        });
    }

    updateCartUI();
    closeVariantModal();

    // Open cart automatically to show success (optional, but good UX)
    const cartBtn = document.getElementById('cart-btn');
    if(cartBtn) cartBtn.click();
};

window.removeFromCart = function(cartItemId) {
    cart = cart.filter(item => item.cartId !== cartItemId);
    updateCartUI();
};

window.increaseQuantity = function(cartItemId) {
    const item = cart.find(item => item.cartId === cartItemId);
    if (item) {
        item.quantity++;
        updateCartUI();
    }
};

window.decreaseQuantity = function(cartItemId) {
    const item = cart.find(item => item.cartId === cartItemId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
            updateCartUI();
        } else {
            removeFromCart(cartItemId);
        }
    }
};

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    // Update Count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalCount;

    // Update Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Sepetiniz boş.</p>';
        cartTotalPrice.innerText = '0 TL';
        return;
    }

    let subtotal = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.title} <span class="cart-item-weight">(${item.weight})</span></h4>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="decreaseQuantity('${item.cartId}')"><i class="fas fa-minus"></i></button>
                            <span class="qty-text">${item.quantity}</span>
                            <button class="qty-btn" onclick="increaseQuantity('${item.cartId}')"><i class="fas fa-plus"></i></button>
                        </div>
                        <p class="price-calc">${item.quantity} x ${item.price} TL = <strong>${itemTotal} TL</strong></p>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.cartId}')"><i class="fas fa-trash"></i></button>
            </div>
        `;
    }).join('');

    // Shipping Logic
    let shippingCost = storeConfig.shippingCost;
    if (subtotal >= storeConfig.freeShippingThreshold) {
        shippingCost = 0;
    }

    const grandTotal = subtotal + shippingCost;

    cartTotalPrice.innerHTML = `
        <div style="font-size: 0.9rem; font-weight: 400; color: #666;">Ara Toplam: ${subtotal} TL</div>
        <div style="font-size: 0.9rem; font-weight: 400; color: #666;">Kargo: ${shippingCost === 0 ? 'Ücretsiz' : shippingCost + ' TL'}</div>
        <div style="margin-top: 5px; color: var(--primary-color);">Toplam: ${grandTotal} TL</div>
    `;
}

function checkout() {
    if (cart.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }

    let message = "Merhaba, Instagram üzerinden sipariş vermek istiyorum:\n\n";
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        message += `- ${item.title} (${item.weight}): ${item.quantity} Adet - ${itemTotal} TL\n`;
    });

    // Shipping Logic for Checkout
    let shippingCost = storeConfig.shippingCost;
    if (subtotal >= storeConfig.freeShippingThreshold) {
        shippingCost = 0;
    }
    const grandTotal = subtotal + shippingCost;

    message += `\nAra Toplam: ${subtotal} TL\n`;
    message += `Kargo: ${shippingCost === 0 ? 'Ücretsiz' : shippingCost + ' TL'}\n`;
    message += `GENEL TOPLAM: ${grandTotal} TL\n\nAdres ve İletişim bilgilerim: ...`;

    // Copy to Clipboard
    navigator.clipboard.writeText(message).then(() => {
        alert("Sipariş özetiniz kopyalandı! \n\nAçılan Instagram sayfasında mesaj kutusuna yapıştırıp gönderebilirsiniz.");
        window.open("https://www.instagram.com/senguru.co/", "_blank");
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
        // Fallback for some browsers or if permission denied
        alert("Sipariş metnini kopyalayamadık. Lütfen manuel yazın.");
        window.open("https://www.instagram.com/senguru.co/", "_blank");
    });
}
