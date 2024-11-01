
let categories = []
document.querySelectorAll('.category-tag').forEach((tag) => {
    categories.push(tag.innerHTML);
})

const bookId = window.location.pathname.split('/').pop();

const filterBooks = (category) => {
    const filteredBooks = books.filter((book) => book.categories.includes(category) && book.id !== decodeURIComponent(bookId));
    return filteredBooks;
};

const createRelatedBook = (book) => {
    const relatedBook = document.createElement('a');
    relatedBook.className = 'related-book';
    relatedBook.href = `/book/detail/${encodeURIComponent(book.id)}`;
    relatedBook.innerHTML = `
        <img src="${window.location.origin}/api/image/${book.thumbnailId}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${book.authors}</p>
    `;
    return relatedBook;
};

const relatedBooksContainer = document.querySelector('.related-books-grid');

setTimeout(() => {
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
    })
}, 1000);