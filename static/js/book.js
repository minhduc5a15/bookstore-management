const fetchBookData = async () => {
    try {
        const bookId = new URLSearchParams(window.location.search).get('bookId');
        const response = await axiosInstance.get(`/api/books/${bookId}`);
        const book = response.data;

        document.getElementById('book-cover').src = book.thumbnailUrl;
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
    } catch (error) {
        console.error('Error fetching book data:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    insertHeader();
    insertFooter();
});
