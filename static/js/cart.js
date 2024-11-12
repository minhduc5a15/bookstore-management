const renderCart = () => {
    const fetchCart = async () => {
        return await axiosInstance.get('/api/carts');
    };

    const updateQuantity = async (id, quantity) => {
        return await axiosInstance.patch(`/api/carts/${id}`, { quantity });
    };

    const cartContainer = document.getElementById('cart-container');
    const emptyCart = document.querySelector('.empty-cart');
    const totalElement = document.querySelector('.cart-total');

    const calculateTotal = (cartItems) => {
        let total = cartItems.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);
        totalElement.innerHTML = `$${total.toFixed(2)}`;
    };

    fetchCart().then(({ data: cartItems }) => {
        if (cartItems.length === 0) {
            emptyCart.style.display = 'block';
            cartContainer.style.display = 'none';
            totalElement.innerHTML = '$0.00';
            return;
        }

        emptyCart.style.display = 'none';
        cartContainer.style.display = 'block';
        calculateTotal(cartItems); // Initial total calculation

        cartItems.forEach((item) => {
            const { thumbnailId, price, title, authors, id } = item;
            const book = document.createElement('div');
            book.classList.add('cart-item');
            book.setAttribute('data-id', id);
            book.innerHTML = `
                <div class="book-cart">
                    <img src="${apiUrl}/api/image/${thumbnailId}" class="book-thumbnail">
                    <div class="book-info">
                        <div class="book-title">${title}</div>
                        <div class="book-author">${authors}</div>
                        <div class="book-price">$${price}</div>
                    </div>
                </div>
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-id="${id}">-</button>
                    <span class="quantity-display" data-id="${id}">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${id}">+</button>
                </div>
                <button data-id="${id}" class="remove-btn">Remove</button>
            `;
            cartContainer.insertBefore(book, cartContainer.firstChild);
        });

        const updateTotal = async (id, isIncrement) => {
            const item = cartItems.find((item) => item.id === id);
            if (isIncrement) {
                item.quantity++;
            } else {
                item.quantity = Math.max(item.quantity - 1, 1);
            }
            await updateQuantity(id, item.quantity);
            calculateTotal(cartItems);
        };

        document.querySelectorAll('.plus').forEach((btn) => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                updateTotal(id, true);
                document.querySelector(`.quantity-display[data-id="${id}"]`).innerHTML = cartItems.find((item) => item.id === id).quantity;
            });
        });

        document.querySelectorAll('.minus').forEach((btn) => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                updateTotal(id, false);
                document.querySelector(`.quantity-display[data-id="${id}"]`).innerHTML = cartItems.find((item) => item.id === id).quantity;
            });
        });

        document.querySelectorAll('.remove-btn').forEach((btn) => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');
                const bookItem = document.querySelector(`.cart-item[data-id="${id}"]`);
                await axiosInstance.delete(`/api/carts`, { data: { id } });
                cartItems = cartItems.filter((item) => item.id !== id);
                bookItem.remove();
                calculateTotal(cartItems);
                if (cartItems.length === 0) {
                    emptyCart.style.display = 'block';
                    cartContainer.style.display = 'none';
                    totalElement.innerHTML = '$0.00';
                }
            });
        });
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    insertHeader();
    insertHead();
    insertFooter();
    renderCart();
});
