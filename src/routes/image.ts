import { Router } from 'express';
import { getGfs } from '../lib/gfs';

const router = Router();

router.get('/image/:filename', async (req, res) => {
    try {
        const gfs = await getGfs();
        if (!gfs) {
            return res.status(500).send('GridFS is not initialized');
        }

        // Tìm file bằng filename trong GridFSBucket
        const files = await gfs.find({ filename: req.params.filename }).toArray();

        if (!files || files.length === 0) {
            return res.status(404).send('File not found');
        }

        // Tìm file bằng filename trong GridFSBucket
        const file = files[0];
        console.log(file);
        const readstream = gfs.openDownloadStreamByName(file.filename);

        readstream.pipe(res);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error downloading file');
    }
});

export default router;