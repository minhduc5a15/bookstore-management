import express, { urlencoded } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import authMiddleware from './src/middleware/auth.middleware';
import { apiRoutes, homePage, blogPage, bookPage, signInPage, signUpPage, categoryPage, cartPage } from './src/routes';
import { getDb } from './src/lib/db';

const PORT = process.env.PORT || 3000;

const app = express();

// body parser
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Middleware
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
    }),
);

// Middleware

app.use(authMiddleware);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Home route
app.get('/', homePage);
// Other routes
app.get('/blogs', blogPage);
app.get('/about', (req, res) => res.render('about.ejs'));
app.use('/category', categoryPage);
app.use('/book', bookPage);
app.use('/sign-in', signInPage);
app.use('/sign-up', signUpPage);
app.use('/cart', cartPage);
app.get('/id-images', async (req, res) => {
    const db = await getDb();
    if (!db) {
        return res.status(500).send('Error connecting to databas e');
    }
    const books = await db.collection('books').find().toArray();
    const ids = books.map((book) => book.thumbnailId);
    return res.json(ids);
});
//
// API
app.use('/api', apiRoutes);

// Start server
const server = http.createServer(app);

export const io = new Server(server);

server.listen(PORT, async () => {
    // await connectDb();
    console.log(`[SERVER] ${new Date()} started on port ${PORT}`);
});

export default app;
