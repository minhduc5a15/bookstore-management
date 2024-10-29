// Assuming your JSON data is in 'books.json'
fetch('category.json')
    .then(response => response.json())
    .then(data => {
        const bookGrid = document.getElementById('bookGrid');

        data.forEach(book => {
            // Create a div for each book
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book-container'); // You can style .book-slot as needed

            const Book = document.createElement('div');
            Book.classList.add('book');

            // Add book cover
            const coverImgDiv = document.createElement('div');
            coverImgDiv.classList.add('book-img');
            const coverImg = document.createElement('img');
            coverImg.src = book.cover; // Ensure the cover images are in the correct path
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
            price.textContent = `${book.price}`;
            priceSpan.textContent = "200$";

            priceDiv.appendChild(price);
            priceDiv.appendChild(priceSpan);
            Content.appendChild(priceDiv);
            Book.appendChild(Content);

            // Append the bookDiv to the bookGrid
            bookDiv.appendChild(Book);
            bookGrid.appendChild(bookDiv);
        });
    })
    .catch(error => console.error('Error loading books:', error));
