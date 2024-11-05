import { Router } from 'express';
import { getDb } from '../../lib/db';
const router = Router();

// [GET] /book/detail/:id
router.get('/detail/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const db = await getDb();

        if (!db) {
            return res.status(500).send('Error connecting to database');
        }

        const book = await db.collection('books').findOne({ id });

        if (!book) {
            return res.render('404.ejs');
        }

        res.render('book.ejs', { book, ...book, origin: req.protocol + '://' + req.get('host'), email: req.user?.email });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

export default router;
