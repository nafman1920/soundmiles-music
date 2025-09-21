const express = require('express');
const { addBeat } = require('../controllers/beatController');
const { addNews } = require('../controllers/newsController');
const { uploadFile } = require('../controllers/uploadController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { protectAdmin } = require('../middlewares/auth');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

router.post('/beats', protectAdmin, asyncHandler(addBeat));
router.post('/news', protectAdmin, asyncHandler(addNews));
router.post('/upload', protectAdmin, upload.single('file'), asyncHandler(uploadFile));

module.exports = router;
