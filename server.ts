import express from 'express';

import { apiRoutes, home, blogs, book } from './src/routes';

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
app.use('/book', book);
//
// API
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, async () => {
    // await connectDb();
    console.log(`[SERVER] ${new Date()} started on port ${PORT}`);
});

export default app;
