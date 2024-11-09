const getBooks = async () => {
    try {
        const response = await fetch(`${URL}/api/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${document.cookie.split("=")[1]}`,
                
            },
            credentials: "omit",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

console.log(document.cookie.split("=")[1])

getBooks().then((data) => {
    console.log(data);
})