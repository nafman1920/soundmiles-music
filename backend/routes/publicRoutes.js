const express = require('express');
const { getBeats } = require('../controllers/beatController');
const { getNews } = require('../controllers/newsController');
const router = express.Router();

router.get('/beats', getBeats);
router.get('/news', getNews);

module.exports = router;
