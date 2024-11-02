import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('sign-up.ejs');
});

export default router;
