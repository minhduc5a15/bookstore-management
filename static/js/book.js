const fetchBookData = async () => {
    try {
        const bookId = new URLSearchParams(window.location.search).get('id');
        console.log(bookId);
        const response = await axiosInstance.get(`/api/books/${bookId}`);
        const book = response.data;

        document.getElementById('book-cover').src = `${apiUrl}/api/image/${book.thumbnailId}`;
        document.getElementById('book-cover').alt = book.title;
        document.getElementById('book-title').innerText = book.title;
        document.getElementById('book-subtitle').innerText = book.subtitle;
        document.getElementById('authors').innerText = book.authors.join(', ');
        document.getElementById('publisher').innerText = book.publisher;
        document.getElementById('language').innerText = book.language;
        document.getElementById('published-date').innerText = book.publishedDate;
        document.getElementById('page-count').innerText = book.pageCount;
        document.getElementById('description').innerText = book.description;

        const categoriesContainer = document.getElementById('categories');
        book.categories.forEach((category) => {
            const span = document.createElement('span');
            span.className = 'category-tag';
            span.innerText = category;
            categoriesContainer.appendChild(span);
        });

        const addToCartBtn = document.getElementById('add-to-cart');
        const addToCart = async () => {
            // axiosInstance.get('/api/auth/me').then(({ data }) => {
            //     const { currentUser: user } = data;
            // })
            const user = await verifyUser();
            if (!user) {
                window.location.href = `/sign-in?redirect=${encodeURIComponent(window.location.href)}`;
                return;
            }
            const response = await axiosInstance.post('/api/carts', { id: bookId });
            if (response.status === 200) {
                addToCartBtn.innerHTML = 'Added to cart';
                addToCartBtn.disabled = true;
            }
        };
        addToCartBtn.addEventListener('click', addToCart);
    } catch (error) {
        console.error('Error fetching book data:', error);
    }
};

const relatedBooks = async () => {
    const bookId = new URLSearchParams(window.location.search).get('id');
    const currentBook = await getBook(bookId);
    const categories = currentBook.categories;

    getBooks().then((books) => {
        const filterBooks = (category) => {
            const filteredBooks = books.filter((book) => book.categories.includes(category) && book.id !== bookId);
            return filteredBooks;
        };

        const createRelatedBook = (book) => {
            const relatedBook = document.createElement('a');
            relatedBook.className = 'related-book';
            relatedBook.href = `/book/detail?id=${encodeURIComponent(book.id)}`;
            relatedBook.innerHTML = `
            <img src="${apiUrl}/api/image/${book.thumbnailId}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.authors}</p>
        `;
            return relatedBook;
        };

        const relatedBooksContainer = document.querySelector('.related-books-grid');

        let relatedBooks = new Set();
        for (let i = 0; i < categories.length; ++i) {
            const category = categories[i];
            const filteredBooks = filterBooks(category);
            filteredBooks.forEach((book) => {
                relatedBooks.add(book);
            });
        }
        relatedBooks = Array.from(relatedBooks);
        relatedBooks.forEach((book, index) => {
            if (index >= 4) return;
            const relatedBook = createRelatedBook(book);
            relatedBooksContainer.appendChild(relatedBook);
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    insertHeader();
    insertFooter();
    insertHead();

    fetchBookData();
    relatedBooks();
});
