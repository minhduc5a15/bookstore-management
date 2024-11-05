const searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
};

document.onclick = (e) => {
    console.log(e.target);
    if (e.target !== searchForm && !searchForm.contains(e.target) && searchForm.classList.contains('active') && e.target !== document.querySelector('#search-btn')) {
        searchForm.classList.remove('active');
    }
}
// if click outside of the search form, remote the active class
// document.addEventListener('click', (e) => {
//     if (e.target !== searchForm && !searchForm.contains(e.target) && searchForm.classList.contains('active')) {
//         searchForm.classList.remove('active');
//     }
// });
searchForm.onclick = (e) => {
    e.stopPropagation();
}

window.onscroll = () => {
    searchForm.classList.remove('active');

    if (window.scrollY > 80) {
        document.querySelector('.header .header-2').classList.add('active');
    } else {
        document.querySelector('.header .header-2').classList.remove('active');
    }
};

const isLoggedIn = () => {
    const email = window.localStorage.getItem('email');
    const password = window.localStorage.getItem('password');
    return !!email && !!password.length;
};

const loginFormContainer = document.querySelector('.login-form-container');
const loginForm = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

window.onload = () => {
    if (window.scrollY > 80) {
        document.querySelector('.header .header-2').classList.add('active');
    } else {
        document.querySelector('.header .header-2').classList.remove('active');
    }
};
