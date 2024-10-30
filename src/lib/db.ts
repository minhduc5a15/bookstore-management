import mongoose from 'mongoose';

mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

if (!MONGODB_URI) {
    throw new Error('MongoDB URI is missing');
}

export const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: 'bookstore',
            
        });
        isConnected = true;
        console.log('MongoDB Connected!');
        return mongoose.connection;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default mongoose;