const createBookSlide = (book) => {
    // console.log(book);
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.classList.add('new-book-slide');
    slide.innerHTML = `
            <div class="newBook">
                <div class="thumbnail">
                    <img src="${apiUrl}/api/image/${book.thumbnailId}">
                </div>
                <div class="book-content">
                    <h3>${book.title}</h3>
                    <p>
                        ${book.description.substring(0, 150)}
                    </p>
                </div>
                <div class="book-img">
                    <a href="book/detail?id=${encodeURIComponent(book.id)}">
                        <img src="${apiUrl}/api/image/${book.thumbnailId}">
                    </a>
                </div>
            </div>
        `;
    return slide;
};

const createBookSwiper = (data) => {
    const newestBookContainer = document.getElementById('newest-book-wrapper');

    data.forEach((book, index) => {
        if (index >= 10) return;
        const slide = createBookSlide(book);
        newestBookContainer.appendChild(slide);
    });

    new Swiper('.swiper-new', {
        loop: true,
        slidesPerView: 1,
        speed: 800,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
};

const createSellerSlide = (book) => {
    // console.log(123);
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.classList.add('book-slider');
    slide.innerHTML = `
            <div class="bestSeller box-slider">
                <div class="box-slider-img">
                    <a href="/book/detail?id=${encodeURIComponent(book.id)}">
                        <img src="${apiUrl}/api/image/${book.thumbnailId}" alt="${book.title}">
                    </a>
                </div>
                <div class="box-slider-content">
                    <h3>${book.title}</h3>
                </div>
            </div>
        `;
    return slide;
};

const createSellerSwiper = (data) => {
    const sellerBookContainer = document.getElementById('seller-book-wrapper');

    data.forEach((book, index) => {
        if (index >= 10) return;
        // if (index > 10){
        const slide = createSellerSlide(book);
        sellerBookContainer.appendChild(slide);
        // }
    });

    new Swiper('.featured-slider', {
        loop: true,
        spaceBetween: 20,
        speed: 800,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            1200: {
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
        },
    });
};

const createArrivalSlide = (book) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.classList.add('book-slider');
    slide.innerHTML = `
            <div class="box-slider">
                <div class="box-slider-img">
                    <a href="/book/detail?id=${encodeURIComponent(book.id)}">
                        <img src="${apiUrl}/api/image/${book.thumbnailId}" alt="${book.title}">
                    </a>
                </div>
                <div class="box-slider-content">
                    <h3>${book.title}</h3>
                </div>
            </div>
        `;
    return slide;
};

const createArrivalSwiper = (data) => {
    const arrivalBookContainer = document.getElementById('arrival-book-wrapper');

    data.forEach((book, index) => {
        if (index >= 10) return;
        // if (index > 10){
        const slide = createArrivalSlide(book);
        arrivalBookContainer.appendChild(slide);
        // }
    });

    new Swiper('.arrivals-slider', {
        loop: true,
        spaceBetween: 20,
        speed: 800,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            1200: {
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
        },
    });
};

const email = document.getElementById('email');
const emailAuthor = document.getElementById('email-author');

document.addEventListener('DOMContentLoaded', async () => {
    getBooks().then((data) => {
        // console.log(data);
        createBookSwiper(data);
        createSellerSwiper(data);
        createArrivalSwiper(data);
    });

    insertHeader();
    insertHead();
    insertFooter();

    email.value = getKey("user") ? JSON.parse(getKey("user")).email : "";
    emailAuthor.value = getKey("user") ? JSON.parse(getKey("user")).email : "";
});
