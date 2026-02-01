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

    // --- New Shop Logic ---
    initShop();
});

// Shop Logic
let cart = [];

function initShop() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    // Render Products
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="product-weight">${product.weight}</p>
                <div class="product-price">${product.price} TL</div>
                <p class="product-desc">${product.description}</p>
                <button class="btn-product" onclick="addToCart(${product.id}, this)">Sepete Ekle</button>
            </div>
        </div>
    `).join('');

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

// Global functions for inline onclicks
window.addToCart = function(productId, btnElement) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();

    // Simple visual feedback
    const btn = btnElement || document.querySelector(`button[onclick="addToCart(${productId}, this)"]`);
    if(btn) {
        const originalText = btn.innerText;
        btn.innerText = "Eklendi!";
        btn.style.backgroundColor = "#2ecc71"; // Green
        btn.style.borderColor = "#2ecc71";
        btn.style.color = "#fff";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
            btn.style.borderColor = "";
            btn.style.color = "";
        }, 1000);
    }
};

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
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

    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>${item.price} TL x ${item.quantity} = ${itemTotal} TL</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;
    }).join('');

    cartTotalPrice.innerText = `${total} TL`;
}

function checkout() {
    if (cart.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }

    let message = "Merhaba, Instagram üzerinden sipariş vermek istiyorum:\n\n";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `- ${item.title} (${item.weight}): ${item.quantity} Adet - ${itemTotal} TL\n`;
    });

    message += `\nTOPLAM: ${total} TL\n\nAdres ve İletişim bilgilerim: ...`;

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
