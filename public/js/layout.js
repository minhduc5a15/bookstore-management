const searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
};

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

document.querySelector('#login-btn').onclick = () => {
    if (isLoggedIn()) return;
    loginFormContainer.classList.toggle('active');
};

document.querySelector('#close-login-btn').onclick = () => {
    if (isLoggedIn()) return;
    loginFormContainer.classList.remove('active');
};

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    window.localStorage.setItem('email', email);
    window.localStorage.setItem('password', password);
    window.location.reload();
});

window.onload = () => {
    if (window.scrollY > 80) {
        document.querySelector('.header .header-2').classList.add('active');
    } else {
        document.querySelector('.header .header-2').classList.remove('active');
    }
};
