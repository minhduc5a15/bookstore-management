import { Router } from 'express';
import { getDb } from '../../lib/db';

const router = Router();

// [GET] /category
router.get('/', async (req, res) => {
    const { page, category } = req.query;
    const db = await getDb();
    try {
        const books = await db.collection('books').find({}).toArray();

        const filterBooks = books.filter((book) => book.categories.includes(category));
        const total = filterBooks.length;

        return res.render('category.ejs', { books: filterBooks, total, page, category });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

export default router;
