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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gfs_1 = require("../lib/gfs");
const router = (0, express_1.Router)();
router.get('/image/:filename', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gfs = yield (0, gfs_1.getGfs)();
        if (!gfs) {
            return res.status(500).send('GridFS is not initialized');
        }
        // Tìm file bằng filename trong GridFSBucket
        const files = yield gfs.find({ filename: req.params.filename }).toArray();
        if (!files || files.length === 0) {
            return res.status(404).send('File not found');
        }
        // Tìm file bằng filename trong GridFSBucket
        const file = files[0];
        const readstream = gfs.openDownloadStreamByName(file.filename);
        readstream.pipe(res);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error downloading file');
    }
}));
exports.default = router;
