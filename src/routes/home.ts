import { Router } from 'express';
import { connectDb } from '../lib/db';
import mongoose from 'mongoose';

const router = Router();

connectDb()

// [GET] /
router.get('/', async (req, res) => {
    try {
        let db: mongoose.Connection | null = mongoose.connection;
        if (!db) {
            db = await connectDb();
        }
        if (!db) {
            return res.status(500).send('Error connecting to database');
        }
        const books = await db
            .collection('books')
            .find(
                {},
                {
                    limit: 6,
                    sort: { publishedDate: -1 },
                    retryWrites: true,
                },
            )
            .toArray();
        const origin = req.protocol + '://' + req.get('host');

        return res.render('index.ejs', { origin, books });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error connecting to database');
    }
});

export default router;
