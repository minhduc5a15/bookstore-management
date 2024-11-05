import { Router } from 'express';
import { getDb } from '../../lib/db';

const router = Router();

// [GET] /cart 
router.get('/', async (req, res) => {
    const db = await getDb();

    if (!db) {
        return res.status(500).send('Error connecting to database');
    }
    try {
        const email = req.user?.email;
        const user = await db.collection('carts').findOne({ email });
        if (!user) {
            return res.render('cart.ejs', { carts: [] });
        }
        return res.render('cart.ejs', { user, origin: req.protocol + '://' + req.get('host'), email: req.user?.email, carts: user.carts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error getting cart', error });
    }
});

export default router;