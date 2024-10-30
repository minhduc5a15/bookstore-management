import { Router } from 'express';
import client from '../lib/testdb';

const router = Router();

// [GET] /api/books
router.get('/books', async (req, res) => {
    await client.connect();
    const db = client.db('bookstore');
    if (!db) {
        return res.status(500).send('Error connecting to database');
    }
    const books = await db.collection('books').find().toArray();
    return res.json(books);
});

export default router;
