import { Router } from 'express';
import { connectDb } from '../lib/db';

const router = Router();

// [GET] /api/books
router.get('/books', async (req, res) => {
    const db = await connectDb();
    if (!db) {
        return res.status(500).send('Error connecting to database');
    }
    const books = await db.collection('books').find().toArray();
    return res.json(books);
});

export default router;
