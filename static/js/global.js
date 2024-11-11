const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && window.location.hostname !== 'test-localhost';
console.log(`Mode: ${isProduction ? 'production' : 'development'}`);
const setKey = (key, value) => {
    window.localStorage.setItem(key, value);
};

const getKey = (key) => {
    return window.localStorage.getItem(key);
};

const removeKey = (key) => {
    window.localStorage.removeItem(key);
};

const apiUrl = isProduction ? 'https://bookstore-api-cyan.vercel.app/' : 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getKey('token')}`,
    },
});

const insertHeader = () => {
    fetch('/partials/header.html')
        .then((res) => res.text())
        .then((data) => {
            document.body.insertAdjacentHTML('afterbegin', data);
        })
        .catch((err) => console.log(err));
};

const insertHead = () => {
    fetch('/partials/head.html')
        .then((res) => res.text())
        .then((data) => {
            document.head.insertAdjacentHTML('afterbegin', data);
        })
        .catch((err) => console.log(err));
};

const insertFooter = () => {
    fetch('/partials/footer.html')
        .then((res) => res.text())
        .then((data) => {
            document.body.insertAdjacentHTML('beforeend', data);
        })
        .catch((err) => console.log(err));
    fetch('/js/header.js')
        .then((res) => res.text())
        .then((data) => {
            const script = document.createElement('script');
            script.innerHTML = data;
            document.body.appendChild(script);
        });
};

const getBooks = async () => {
    try {
        const response = await axiosInstance.get('/api/books');
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getBook = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/books/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const verifyUser = async () => {
    if (!getKey('token')) {
        return null;
    }
    const response = await axiosInstance.get('/api/auth/me');
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
};
// document.addEventListener("DOMContentLoaded", () =>)
