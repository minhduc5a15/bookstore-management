new Swiper('.new-books-swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 800,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

new Swiper('.featured-slider', {
    direction: 'horizontal',
    loop: true,
    speed: 800,

    slidesPerView: 1, 
    spaceBetween: 20, 

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Cấu hình breakpoints để thay đổi số slide hiển thị trên các kích thước màn hình khác nhau
    // breakpoints: {
    //     768: {
    //         slidesPerView: 1,
    //         spaceBetween: 15,
    //     },
    //     1024: {
    //         slidesPerView: 2,
    //         spaceBetween: 20,
    //     },
    // },
});
