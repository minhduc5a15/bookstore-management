import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render("sign-in.ejs");
});

export default router;