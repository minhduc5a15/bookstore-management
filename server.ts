import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
// app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

export default app;