document.addEventListener('DOMContentLoaded', async () => {
    getBooks().then((data) => {
        console.log(data);
    });

    insertHeader();
    insertHead();
    insertFooter();
});
