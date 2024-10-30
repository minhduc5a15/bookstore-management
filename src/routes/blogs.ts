import { Router } from "express";

const router = Router();

router.get('/blogs', (req, res) => res.render('blogs.ejs'));

export default router;