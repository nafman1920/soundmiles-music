const express = require('express');
const { addBeat } = require('../controllers/beatController');
const { addNews } = require('../controllers/newsController');
const { uploadFile } = require('../controllers/uploadController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temporary storage before Cloudinary

const router = express.Router();

router.post('/beats', addBeat);
router.post('/news', addNews);
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
