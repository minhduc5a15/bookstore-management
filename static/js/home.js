const URL = "https://bookstore-management-beta.vercel.app";

const getBooks = async () => {
    try {
        const response = await fetch(`${URL}/api/books`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

getBooks().then((data) => {
    console.log(data);
})