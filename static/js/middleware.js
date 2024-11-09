const Url = 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: Url,
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${authToken}`,
    },
});

console.log(Url);

// document.addEventListener('DOMContentLoaded', () => {
//     if (document.location.pathname.startsWith('/sign-in')) {
//         const authToken = document.cookie.split('=')[1];
//         if (!authToken) return;
//     }
// });
