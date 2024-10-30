"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/routes"));
const db_1 = require("./src/lib/db");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
// body parser
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// Home route
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.connectDb)();
        if (db === null) {
            return res.status(500).send('Error connecting to database');
        }
        const books = yield db.collection('books').find().toArray();
        const origin = req.protocol + '://' + req.get('host');
        return res.render('index.ejs', { origin, books });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send('Error connecting to database');
    }
}));
// Other routes
app.get('/blogs', (req, res) => res.render('blogs.ejs'));
app.get('/about', (req, res) => res.render('about.ejs'));
app.get('/category', (req, res) => res.render('category.ejs'));
// API
app.use('/api', routes_1.default);
// Get book details by ID
app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.send(id);
});
// Start server
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    // await connectDb();
    console.log(`[SERVER] ${new Date()} started on port ${PORT}`);
}));
exports.default = app;
