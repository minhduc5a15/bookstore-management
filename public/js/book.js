// Hàm để lấy giá trị của query parameter
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Sử dụng hàm để lấy biến
const bookId = window.location.pathname.split('/').pop();

// Hàm tìm kiếm thông tin từ file JSON dựa trên thumbnailId
function findBookByThumbnailId(thumbnailId, books) {
    return books.find((book) => book.thumbnailId === thumbnailId);
}

// Hàm tải file JSON và tìm kiếm sách
function loadBooksAndFind(bookId) {
    fetch('http://localhost:4000/api/books')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const book = findBookByThumbnailId(bookId, data);
            console.log(book.title);

            const bookImg = document.createElement('img');
            bookImg.src = `${window.location.origin}/images/${book.thumbnailId}`;
            bookImg.alt = book.title;
            const bookImgDiv = document.createElement('div');
            bookImgDiv.classList.add('book-img');
            bookImgDiv.appendChild(bookImg);

            const bookName = document.createElement('h1');
            bookName.textContent = book.title;
            const bookAuthor = document.createElement('h2');
            bookAuthor.textContent = `${book.authors.join(', ')}`;
            const bookPrice = document.createElement('h2');
            bookPrice.textContent = `${book.price}$`;
            const bookPriceSpan = document.createElement('span');
            bookPriceSpan.textContent = '200$';
            bookPrice.appendChild(bookPriceSpan);
            const bookDes = document.createElement('div');
            bookDes.classList.add('description');
            bookDes.textContent = book.description;
            const btnContainer = document.createElement('div');
            btnContainer.classList.add('btn-book');
            const btn1 = document.createElement('button');
            btn1.textContent = 'Add to cart';
            const btn2 = document.createElement('button');
            btn2.textContent = 'Buy Now';
            btnContainer.appendChild(btn1);
            btnContainer.appendChild(btn2);

            const bookInfo = document.createElement('div');
            bookInfo.classList.add('book-info');
            bookInfo.appendChild(bookName);
            bookInfo.appendChild(bookAuthor);
            bookInfo.appendChild(bookPrice);
            bookInfo.appendChild(bookDes);
            bookInfo.appendChild(btnContainer);

            const bookInfo1 = document.createElement('main');
            bookInfo1.appendChild(bookImgDiv);
            bookInfo1.appendChild(bookInfo);

            const bookAuthor2 = document.createElement('h1');
            bookAuthor2.innerHTML = `Author <br> ${book.authors.join(', ')}`;
            const bookPublisher = document.createElement('h1');
            bookPublisher.innerHTML = `Publisher <br> ${book.publisher}`;
            const bookPublishedDate = document.createElement('h1');
            bookPublishedDate.innerHTML = `Published Date <br> ${book.publishedDate}`;
            const bookCategories = document.createElement('h1');
            bookCategories.innerHTML = `Categories <br> ${book.categories.join(', ')}`;
            const bookLanguage = document.createElement('h1');
            bookLanguage.innerHTML = `Language <br> ${book.language}`;
            const bookPageCount = document.createElement('h1');
            bookPageCount.innerHTML = `Page Count <br> ${book.pageCount}`;

            const bookInfo2 = document.createElement('div');
            bookInfo2.classList.add('detail');
            bookInfo2.appendChild(bookAuthor2);
            bookInfo2.appendChild(bookPublisher);
            bookInfo2.appendChild(bookPublishedDate);
            bookInfo2.appendChild(bookCategories);
            bookInfo2.appendChild(bookLanguage);
            bookInfo2.appendChild(bookPageCount);

            const bookShow = document.getElementById('bookDetails');
            bookShow.innerHTML = '';
            bookShow.appendChild(bookInfo1);
            bookShow.appendChild(bookInfo2);
        })
        .catch((error) => console.error('Error loading JSON:', error));
}

loadBooksAndFind(bookId);
