import express from 'express';
import routes from './src/routes';
import { connectDb } from './src/lib/db';

const PORT = process.env.PORT || 3000;

const app = express();

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Home route
app.get('/', async (req, res) => {
    try {
        const db = await connectDb();
        if (db === null) {
            return res.status(500).send('Error connecting to database');
        }
        const books = await db.collection('books').find().toArray();
        const origin = req.protocol + '://' + req.get('host');

        return res.render('index.ejs', { origin, books });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error connecting to database');
    }
});

// Other routes
app.get('/blogs', (req, res) => res.render('blogs.ejs'));
app.get('/about', (req, res) => res.render('about.ejs'));
app.get('/category', (req, res) => res.render('category.ejs'));

// API
app.use('/api', routes);

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