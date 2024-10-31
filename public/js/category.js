function displayBook(category) {
    fetch('./data/books.json')
        .then((response) => response.json())
        .then((data) => {
            const bookGrid = document.getElementById('bookGrid');
            bookGrid.innerHTML = '';

            data.forEach((book) => {
                if (book.categories.includes(category)) {
                    // Create a div for each book
                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('book-container');

                    const Book = document.createElement('div');
                    Book.classList.add('book');
                    //--------------------------------------------------- id book ở đây ------------------------------------------------------
                    // Book.id = `${book.id}`;
                    Book.id = `${book.thumbnailId}`;

                    // Add book cover
                    const coverImgDiv = document.createElement('div');
                    coverImgDiv.classList.add('book-img');
                    const coverImg = document.createElement('img');
                    coverImg.src = `http://localhost:8080/file/${book.thumbnailId}`;
                    coverImg.alt = book.title;
                    // Button
                    // const buyButton = document.createElement('button');
                    // const icon = document.createElement('i');
                    // icon.classList.add('fa-solid', 'fa-cart-plus');

                    // buyButton.appendChild(icon);
                    // coverImgDiv.appendChild(buyButton);
                    coverImgDiv.appendChild(coverImg);
                    Book.appendChild(coverImgDiv);

                    // Add book details
                    const Content = document.createElement('div');
                    Content.classList.add('content');
                    // Add book title
                    const title = document.createElement('h1');
                    title.textContent = book.title;
                    Content.appendChild(title);

                    // Add price name
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
            console.log(this.id);
            window.location.href = `/book/${encodeURIComponent(this.id)}`;
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
window.addEventListener('resize', getValue);
