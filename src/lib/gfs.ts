import client from './testdb';
import { Db, GridFSBucket } from 'mongodb';

const getDb = async (): Promise<Db> => {
    await client.connect();
    return client.db('bookstore');
};

export const getGfs = async (): Promise<GridFSBucket | null> => {
    try {
        const db = await getDb();
        return new GridFSBucket(db, { bucketName: 'images' });
    } catch (error) {
        console.error('Failed to create GridFSBucket:', error);
        return null;
    }
};
