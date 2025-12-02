document.addEventListener('DOMContentLoaded', () => {
    const shopCards = document.querySelectorAll('.pro');
    const cartAddBtn = document.querySelector('#addToCartBtn');
    const modalQuantityInput = document.querySelector('.buy-actions input[type="number"]');

    if (shopCards.length > 0) {
        shopCards.forEach(card => {
            card.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const image = this.getAttribute('data-image');
                const title = this.getAttribute('data-title');
                const price = this.getAttribute('data-price');

                if (cartAddBtn) {
                    cartAddBtn.setAttribute('data-id', id);
                    cartAddBtn.setAttribute('data-title', title);
                    cartAddBtn.setAttribute('data-price', price);
                    cartAddBtn.setAttribute('data-image', image);

                    if (modalQuantityInput) modalQuantityInput.value = 1;
                }
            });
        });
    }

    function addToCart() {
        if (!cartAddBtn || !cartAddBtn.hasAttribute('data-id')) {
            console.error("Помилка: Не вибрано товар або кнопка не знайдена");
            return;
        }

        let qty = 1;
        if (modalQuantityInput && modalQuantityInput.value) {
            qty = parseInt(modalQuantityInput.value);
        }

        const product = {
            id: cartAddBtn.getAttribute('data-id'),
            name: cartAddBtn.getAttribute('data-title'),
            price: cartAddBtn.getAttribute('data-price'),
            img: cartAddBtn.getAttribute('data-image'),
            quantity: qty
        };

        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += qty;
        } else {
            cart.push(product);
        }

        localStorage.setItem('shoppingCart', JSON.stringify(cart));

        alert('Товар успішно додано в кошик!');
    }

    if (cartAddBtn) {
        cartAddBtn.addEventListener('click', addToCart);
    }

    const cartTableBody = document.querySelector('#cart-table-body');
    const cartTotalElement = document.querySelector('#cart-total');

    function parsePrice(priceString) {
        if (!priceString) return 0;
        let cleanString = priceString.replace(',', '.').replace(/[^0-9.]/g, '');
        return parseFloat(cleanString) || 0;
    }

    function displayCart() {
        if (!cartTableBody) return;

        const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        cartTableBody.innerHTML = '';

        let grandTotal = 0;

        if (cart.length === 0) {
            cartTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">Ваш кошик порожній</td></tr>';
            if (cartTotalElement) cartTotalElement.innerHTML = `<strong>0 грн</strong>`;
            return;
        }

        cart.forEach((item, index) => {
            let priceNumber = parsePrice(item.price);
            let rowTotal = priceNumber * item.quantity;
            grandTotal += rowTotal;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><a href="#" class="remove-btn" data-index="${index}"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${item.img}" alt="${item.name}" width="70"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" class="qty-input" data-index="${index}"></td>
                <td>${rowTotal.toFixed(2).replace('.', ',')} грн</td>
            `;
            cartTableBody.appendChild(tr);
        });

        if (cartTotalElement) {
            cartTotalElement.innerHTML = `<strong>${grandTotal.toFixed(2).replace('.', ',')} грн</strong>`;
        }

        attachCartEvents();
    }

    function attachCartEvents() {
        const removeBtns = document.querySelectorAll('.remove-btn');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.closest('.remove-btn');
                const index = target.getAttribute('data-index');
                removeFromCart(index);
            });
        });

        const qtyInputs = document.querySelectorAll('.qty-input');
        qtyInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const index = e.target.getAttribute('data-index');
                const newQty = e.target.value;
                updateQuantity(index, newQty);
            });
        });
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        displayCart();
    }

    function updateQuantity(index, quantity) {
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        cart[index].quantity = parseInt(quantity);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        displayCart();
    }

    displayCart();
});