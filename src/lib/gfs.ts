import { connectDb } from './db';
import mongoose from 'mongoose';

export const getGfs = async () => {
    await connectDb();
    const db = mongoose.connection.db;
    if (!db) {
        return null;
    }
    return new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'images',
    });
};
