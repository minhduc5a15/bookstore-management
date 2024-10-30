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
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI;
let isConnected = false;
if (!MONGODB_URI) {
    throw new Error('MongoDB URI is missing');
}
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    if (isConnected) {
        console.log('Already connected to database');
        return mongoose_1.default.connection;
    }
    try {
        yield mongoose_1.default.connect(MONGODB_URI, {
            dbName: 'bookstore',
        });
        isConnected = true;
        console.log('MongoDB Connected!');
        return mongoose_1.default.connection;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.connectDb = connectDb;
