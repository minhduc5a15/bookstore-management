function displayBook(category) {
    fetch('/api/books')
        .then((response) => response.json())
        .then((data) => {
            const bookGrid = document.getElementById('bookGrid');
            bookGrid.innerHTML = '';

            data.forEach((book) => {
                if (book.categories.includes(category) || category === 'all') {
                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('book-container');

                    const Book = document.createElement('div');
                    Book.classList.add('book');
                    Book.id = `${book.id}`;

                    const coverImgDiv = document.createElement('div');
                    coverImgDiv.classList.add('book-img');
                    const coverImg = document.createElement('img');
                    coverImg.src = `${window.location.origin}/api/image/${book.thumbnailId}`;
                    coverImg.alt = book.title;
                    coverImgDiv.appendChild(coverImg);
                    Book.appendChild(coverImgDiv);

                    const Content = document.createElement('div');
                    Content.classList.add('content');
                    const title = document.createElement('h1');
                    title.textContent = book.title;
                    Content.appendChild(title);

                    const priceDiv = document.createElement('div');
                    priceDiv.classList.add('price');
                    const price = document.createElement('span');
                    const priceSpan = document.createElement('span');
                    price.textContent = `${book.price}$`;
                    priceSpan.textContent = '200$';

                    priceDiv.appendChild(price);
                    priceDiv.appendChild(priceSpan);
                    Content.appendChild(priceDiv);
                    Book.appendChild(Content);

                    bookDiv.appendChild(Book);
                    bookGrid.appendChild(bookDiv);
                }
            });
            bookDetail();
        })
        .catch((error) => console.error('Error loading books:', error));
}

function bookDetail() {
    document.querySelectorAll('#bookGrid > div > div').forEach((div) => {
        div.addEventListener('click', function () {
            window.location.href = `/book/detail/${encodeURIComponent(this.id)}`;
        });
    });
}

function getValue() {
    if (window.innerWidth > 768) {
        document.querySelectorAll('#navbar button').forEach((button) => {
            button.addEventListener('click', function () {
                displayBook(this.value);
            });
        });
    } else {
        const selectbar = document.getElementById('selectbar');
        selectbar.addEventListener('change', function () {
            displayBook(this.value);
        });
    }
}
getValue();
displayBook('all');
window.addEventListener('resize', getValue);
