document.addEventListener('DOMContentLoaded', async () => {
    getBooks().then((books) => {
        const booksPerPage = 25;
        let allCategories = new Set();

        books.forEach((book) => {
            book.categories.forEach((category) => {
                allCategories.add(category);
            });
        });

        const categorySelect = document.getElementById('category');

        allCategories.forEach((category) => {
            const option = document.createElement('option');
            option.value = category;
            option.innerHTML = category[0].toUpperCase() + category.slice(1);
            categorySelect.appendChild(option);
        });

        let currentPage = 1;
        let filteredBooks = [...books];

        const bookGrid = document.getElementById('bookGrid');
        const prevPageBtn = document.getElementById('prevPage');
        const nextPageBtn = document.getElementById('nextPage');
        const priceInput = document.getElementById('price');
        const priceOutput = document.getElementById('priceOutput');
        const searchInput = document.getElementById('search');
        const bookCountElement = document.getElementById('bookCount');

        function displayBooks() {
            const startIndex = (currentPage - 1) * booksPerPage;
            const endIndex = startIndex + booksPerPage;
            const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

            bookGrid.innerHTML = '';

            booksToDisplay.forEach((book) => {
                const bookCard = document.createElement('a');
                bookCard.href = `/book/detail?id=${encodeURIComponent(book.id)}`;
                bookCard.addEventListener('click', () => {
                    setKey('currentBook', book.id);
                });
                bookCard.className = 'book-card';
                bookCard.innerHTML = `
                        <img src="${apiUrl}/api/image/${book.thumbnailId}" alt="${book.title}" class="book-cover">
                        <div class="book-info">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-author">${book.authors.join(', ')}</p>
                            <p class="book-price">$${book.price}</p>
                        </div>
                    `;
                bookGrid.appendChild(bookCard);
            });

            updatePaginationButtons();
            updateBookCount();
        }

        function updatePaginationButtons() {
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === Math.ceil(filteredBooks.length / booksPerPage);
        }

        function updateBookCount() {
            bookCountElement.textContent = `Showing ${filteredBooks.length} book${filteredBooks.length !== 1 ? 's' : ''}`;
        }

        function applyFilters() {
            const category = categorySelect.value.toLowerCase();
            const maxPrice = parseFloat(priceInput.value);
            const searchTerm = searchInput.value.toLowerCase();

            filteredBooks = books.filter((book) => {
                const matchesCategory = !category || book.categories.some((cat) => cat.toLowerCase() === category);
                const matchesPrice = parseFloat(book.price) <= maxPrice;
                const matchesSearch = book.title.toLowerCase().includes(searchTerm) || book.authors.some((author) => author.toLowerCase().includes(searchTerm));
                return matchesCategory && matchesPrice && matchesSearch;
            });

            currentPage = 1;
            displayBooks();
        }

        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayBooks();
            }
        });

        nextPageBtn.addEventListener('click', () => {
            if (currentPage < Math.ceil(filteredBooks.length / booksPerPage)) {
                currentPage++;
                displayBooks();
            }
        });
        categorySelect.addEventListener('change', applyFilters);
        priceInput.addEventListener('input', () => {
            priceOutput.textContent = `$${priceInput.value}`;
            applyFilters();
        });
        searchInput.addEventListener('input', applyFilters);

        displayBooks();
    });

    insertHeader();
    insertHead();
    insertFooter();
});
