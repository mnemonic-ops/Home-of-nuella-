// Cart functionality
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');

cartToggle?.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('active');
});

closeCart?.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Filter products
const filterBtns = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        products.forEach(product => {
            if (filter === 'all' || product.dataset.category === filter) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const product = JSON.parse(this.dataset.product);
        addToCart(product);
        cartSidebar.classList.add('active');
    });
});

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('homeOfNuellaCart')) || [];
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center;padding:40px;">Your cart is empty</p>';
        document.getElementById('cartTotal').textContent = '₦0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₦${item.price || '[Price]'}</div>
                <div>Quantity: ${item.quantity}</div>
            </div>
        </div>
    `).join('');
}

renderCart();