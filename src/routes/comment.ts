import { Router } from 'express';
import { getDb } from '../lib/db';

const router = Router();

router.post('/comment', async (req, res) => {
    const { comment } = req.body;
    console.log(comment);
    try {
        if (!comment) {
            return res.status(400).json({ message: 'Comment is required' });
        }
        const db = await getDb();

        const newComment = {
            comment: comment,
            date: new Date().toISOString(),
        };

        await db.collection('comments').insertOne(newComment);

        return res.status(200).json({ message: 'Comment submitted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error submitting comment' });
    }
});

export default router;
