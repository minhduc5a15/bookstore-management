import app from '../server';

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    return res.render('index');
});

app.get('/blogs', (req, res) => {
    return res.render('blogs');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/category', (req, res) => {
    return res.render('category');
});

app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.send(id);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
