import { Router } from 'express';
import { connectDb } from '../lib/db';

const router = Router();

// [GET] /
router.get('/', async (req, res) => {
    try {
        let db = await connectDb();
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
