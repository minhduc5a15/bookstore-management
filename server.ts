import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    return res.render('index.html');
});

app.get('/blogs', (req, res) => {
    return res.render('blogs.html');
});

app.get('/category', (req, res) => {
    res.render('category.html');
});

app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    res.send(id);
});

app.get('/about', (req, res) => {
    res.render('about.html');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
