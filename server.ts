import express from 'express';
import { connectDb } from './src/lib/db';
import { apiRoutes, home, blogs } from './src/routes';
const PORT = process.env.PORT || 3000;

const app = express();

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Home route
app.get('/', home);
// Other routes
app.get('/blogs', blogs);
app.get('/about', (req, res) => res.render('about.ejs'));
app.get('/category', (req, res) => res.render('category.ejs'));

// API
app.use('/api', apiRoutes);

// Get book details by ID
app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.send(id);
});

// Start server
connectDb();
app.listen(PORT, async () => {
    // await connectDb();
    console.log(`[SERVER] ${new Date()} started on port ${PORT}`);
});

export default app;
