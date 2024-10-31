import express from 'express';

import { apiRoutes, home, blogs } from './src/routes';
import { getDb } from './src/lib/db';

const PORT = process.env.PORT || 3000;

const app = express();

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Home route
app.get('/', home);
// Other routes
app.get('/blogs', blogs);
app.get('/about', (req, res) => res.render('about.ejs'));
app.get('/category', (req, res) => res.render('category.ejs'));
app.get('/book/:id', async (req, res) => {
    const { id } = req.params;

    const db = await getDb();

    if (!db) {
        return res.status(500).send('Error connecting to database');
    }

    const book = await db.collection('books').findOne({ id: id });

    if (!book) {
        return res.status(404).send('Book not found');
    }
    const { _id, ...bookInfo } = book;
    console.log(bookInfo);

    res.render('book.ejs', {
        book: bookInfo,
    }); // Ghi 'book.ejs' trong thư mục public để hiển thị
});
//
// API
app.use('/api', apiRoutes);

// Get book details by ID
app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.send(id);
});

// Start server
app.listen(PORT, async () => {
    // await connectDb();
    console.log(`[SERVER] ${new Date()} started on port ${PORT}`);
});

export default app;
