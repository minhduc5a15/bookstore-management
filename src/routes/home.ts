import { Router } from 'express';
import { connectDb } from '../lib/db';

const router = Router();

// [GET] /
router.get('/', async (req, res) => {
    try {
        const db = await connectDb();
        if (!db) {
            return res.status(500).send('Error connecting to database');
        }
        const books = await db.collection('books').find().limit(6).toArray();
        const origin = req.protocol + '://' + req.get('host');

        return res.render('index.ejs', { origin, books });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error connecting to database');
    }
});

export default router;