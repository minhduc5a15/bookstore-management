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

    // Hiển thị 3 slide trên mỗi lần cuộn
    slidesPerView: 3, // Thay đổi số này theo nhu cầu, ví dụ: 2, 4, 5, v.v.
    spaceBetween: 20, // Khoảng cách giữa các slide (đơn vị: px)

    // Pagination (phân trang)
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows (mũi tên điều hướng)
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Scrollbar (thanh cuộn)
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },

    // Cấu hình breakpoints để thay đổi số slide hiển thị trên các kích thước màn hình khác nhau
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    },
});
