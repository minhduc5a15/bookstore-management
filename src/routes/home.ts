import { Router } from 'express';
import { connectDb } from '../lib/db';
import mongoose from 'mongoose';

const router = Router();

connectDb()

// [GET] /
router.get('/', async (req, res) => {
    try {
        let db: mongoose.mongo.Db | null | undefined = mongoose.connection.db;
        if (!db) {
            connectDb();
            db = mongoose.connection.db;
        }
        if (!db) {
            return res.status(500).send('Error connecting to database');
        }
        let books = await db
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
