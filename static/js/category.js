$(document).ready(async function () {
    getBooks().then((books) => {
        const booksPerPage = 15;
        let allCategories = new Set();

        books.forEach((book) => {
            book.categories.forEach((category) => {
                allCategories.add(category);
            });
        });

        const $categorySelect = $('#category');

        allCategories.forEach((category) => {
            const $option = $('<option></option>');
            $option.val(category);
            $option.text(category.charAt(0).toUpperCase() + category.slice(1));
            $categorySelect.append($option);
        });

        let currentPage = 1;
        let filteredBooks = [...books];

        const $bookGrid = $('#bookGrid');
        const $prevPageBtn = $('#prevPage');
        const $nextPageBtn = $('#nextPage');
        const $priceInput = $('#price');
        const $priceOutput = $('#priceOutput');
        const $searchInput = $('#search');
        const $bookCountElement = $('#bookCount');

        function displayBooks() {
            const startIndex = (currentPage - 1) * booksPerPage;
            const endIndex = startIndex + booksPerPage;
            const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

            $bookGrid.empty();

            booksToDisplay.forEach((book) => {
                const $bookCard = $('<a></a>');
                $bookCard.attr('href', `/book/detail?id=${encodeURIComponent(book.id)}`);
                $bookCard.addClass('book-card');
                $bookCard.html(`
                    <img src="${apiUrl}/api/image/${book.thumbnailId}" alt="${book.title}" class="book-cover">
                    <div class="book-info">
                        <h3 class="book-title">${book.title}</h3>
                        <p class="book-author">${book.authors.join(', ')}</p>
                        <p class="book-price">$${book.price}</p>
                    </div>
                `);
                $bookCard.on('click', () => {
                    setKey('currentBook', book.id);
                });
                $bookGrid.append($bookCard);
            });

            updatePaginationButtons();
            updateBookCount();
        }

        function updatePaginationButtons() {
            $prevPageBtn.prop('disabled', currentPage === 1);
            $nextPageBtn.prop('disabled', currentPage === Math.ceil(filteredBooks.length / booksPerPage));
        }

        function updateBookCount() {
            $bookCountElement.text(`Showing ${filteredBooks.length} book${filteredBooks.length !== 1 ? 's' : ''}`);
        }

        function applyFilters() {
            const category = $categorySelect.val().toLowerCase();
            const maxPrice = parseFloat($priceInput.val());
            const searchTerm = $searchInput.val().toLowerCase();

            filteredBooks = books.filter((book) => {
                const matchesCategory = !category || book.categories.some((cat) => cat.toLowerCase() === category);
                const matchesPrice = parseFloat(book.price) <= maxPrice;
                const matchesSearch = book.title.toLowerCase().includes(searchTerm) || book.authors.some((author) => author.toLowerCase().includes(searchTerm));
                return matchesCategory && matchesPrice && matchesSearch;
            });

            currentPage = 1;
            displayBooks();
        }

        $prevPageBtn.on('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayBooks();
            }
        });

        $nextPageBtn.on('click', () => {
            if (currentPage < Math.ceil(filteredBooks.length / booksPerPage)) {
                currentPage++;
                displayBooks();
            }
        });

        $categorySelect.on('change', applyFilters);
        $priceInput.on('input', () => {
            $priceOutput.text(`$${$priceInput.val()}`);
            applyFilters();
        });
        $searchInput.on('input', applyFilters);

        displayBooks();
    });

    insertHeader();
    insertHead();
    insertFooter();
});
