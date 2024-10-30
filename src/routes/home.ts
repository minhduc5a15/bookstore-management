import { Router } from 'express';
import client from '../lib/testdb';

const router = Router();

// [GET] /
router.get('/', async (req, res) => {
    try {
        await client.connect();
        const books = await client
            .db('bookstore')
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
        return res.status(500).json(error);
    }
});

export default router;
