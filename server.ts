import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));
// app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

export default app;