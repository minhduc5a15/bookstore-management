import app from '../server';
import routes from '../src/routes';
import { connectDb } from '../src/lib/db';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

let gfs: mongoose.mongo.GridFSBucket | undefined;

connectDb().then(() => {
    const db = mongoose.connection.db;
    if (!db) {
        return;
    }
    gfs = new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'images', // Tên bucket cho GridFS
    });
});

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
    await connectDb();
    console.log(`[SERVER] ${new Date()} started on port ${PORT}`);
});
