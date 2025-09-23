const express = require('express');
const {
  getAllBeats,
  getBeatByTitle,
} = require('../controllers/beatController');
const {
  getAllNews,
  getNewsByTitle,
} = require('../controllers/newsController');

const router = express.Router();

// Beats routes
router.get('/beats', getAllBeats);          // pagination & filter by genre
router.get('/beats/:title', getBeatByTitle);  // get beat by title (case-insensitive)

// News routes
router.get('/news', getAllNews);            // pagination
router.get('/news/:title', getNewsByTitle);   // get news by title (case-insensitive)

module.exports = router;
