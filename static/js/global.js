const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
console.log(`Mode: ${isProduction ? 'production' : 'development'}`);
const setKey = (key, value) => {
    window.localStorage.setItem(key, value);
};

const getKey = (key) => {
    return window.localStorage.getItem(key);
};

const apiUrl = isProduction ? 'https://bookstore-api-cyan.vercel.app/' : 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getKey('token')}`,
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
};

const getBooks = async () => {
    try {
        const response = await axiosInstance.get('/api/books');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};