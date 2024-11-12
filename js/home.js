document.addEventListener('DOMContentLoaded', async () => {
    getBooks().then((data) => {
        console.log(data);
    });

    insertHeader();
    insertHead();
    insertFooter();
});


const swiper = new Swiper('.swiper-new', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 800,
    effect: 'fade', //'cube', 'coverflow', 'flip', 'fade'
    fadeEffect: {
        crossFade: true,
    },
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


const featuredSlider = new Swiper('.featured-slider', {
    loop: true,
    slidesPerView: 5,
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
});


const arrivalSlider = new Swiper('.arrivals-slider', {
    loop: true,
    slidesPerView: 5,
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
});