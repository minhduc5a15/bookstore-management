const renderCart = () => {
    const fetchCart = async () => {
        return await axiosInstance.get('/api/carts');
    };
    const cartContainer = document.getElementById('cart-container');
    const emptyCart = document.querySelector('.empty-cart');
    fetchCart().then(({ data: cartItems }) => {
        if (cartItems.length === 0) {
            emptyCart.style.display = 'block';
            cartContainer.style.display = 'none';
            return;
        }

        emptyCart.style.display = 'none';
        cartContainer.style.display = 'block';
        cartItems.forEach((item) => {
            const { thumbnailId, price, title, authors, id } = item;
            const book = document.createElement('div');
            book.classList.add('book-item');
            book.setAttribute('data-id', id);
            book.innerHTML = `
                        <img src="${apiUrl}/api/image/${thumbnailId}" class="book-thumbnail">
                        <div class="book-info">
                            <div class="book-title">${title}</div>
                            <div class="book-author">${authors}</div>
                            <div class="book-price">$${price}</div>
                        </div>
                        <button data-id="${id}" class="remove-btn">Remove</button>
                    `;
            cartContainer.insertBefore(book, cartContainer.firstChild);
        });
        const removeBtn = document.querySelectorAll('.remove-btn');
        if (removeBtn) {
            removeBtn.forEach((btn) => {
                btn.addEventListener('click', async () => {
                    const id = btn.getAttribute('data-id');
                    const bookItem = document.querySelector(`[data-id="${id}"]`);
                    console.log(id);
                    await axiosInstance
                        .delete(`/api/carts`, {
                            data: {
                                id,
                            },
                        })
                        .then(() => {
                            // window.location.reload();
                            bookItem.remove();
                            if (cartContainer.querySelector('.book-item') === null) {
                                emptyCart.style.display = 'block';
                                cartContainer.style.display = 'none';
                            }
                        });
                });
            });
        }
    });
    
    // renderCart();
};

document.addEventListener('DOMContentLoaded', async () => {
    insertHeader();
    insertHead();
    insertFooter();
    renderCart();
});
