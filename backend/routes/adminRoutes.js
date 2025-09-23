const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  addBeat,
  getAllBeats,
  deleteBeat,
} = require('../controllers/beatController');

const {
  addNews,
  getAllNews,
  deleteNews,
} = require('../controllers/newsController');

const { uploadFile } = require('../controllers/uploadController');
const { protectAdmin } = require('../middlewares/auth');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

// Upload file
router.post('/upload', protectAdmin, upload.single('file'), asyncHandler(uploadFile));

// BEATS
router.post('/beats', protectAdmin, asyncHandler(addBeat));
router.get('/beats', protectAdmin, asyncHandler(getAllBeats));     // plural for consistency
router.delete('/beats/:id', protectAdmin, asyncHandler(deleteBeat));

// NEWS
router.post('/news', protectAdmin, asyncHandler(addNews));
router.get('/news', protectAdmin, asyncHandler(getAllNews));
router.delete('/news/:id', protectAdmin, asyncHandler(deleteNews));

module.exports = router;
