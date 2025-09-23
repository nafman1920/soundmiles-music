const News = require('../models/News');

// Get all news with pagination
exports.getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const news = await News.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalNews = await News.countDocuments();

    res.json({
      page,
      limit,
      totalPages: Math.ceil(totalNews / limit),
      totalNews,
      news,
    });
  } catch (err) {
    console.error('Error fetching news:', err.message);
    res.status(500).json({ error: 'Server error while fetching news' });
  }
};

// Get single news by title (case-insensitive exact match)
exports.getNewsByTitle = async (req, res) => {
  try {
    const titleParam = req.params.title;

    const newsItem = await News.findOne({
      title: { $regex: `^${titleParam}$`, $options: 'i' },
    });

    if (!newsItem) {
      return res.status(404).json({ error: 'News item not found' });
    }

    res.status(200).json(newsItem);
  } catch (err) {
    console.error('Error fetching news by title:', err.message);
    res.status(500).json({ error: 'Server error while fetching news item' });
  }
};

// Add a new news item
exports.addNews = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const news = new News({ title, content, imageUrl });
    await news.save();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete news by ID
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ error: 'News item not found' });
    }

    await news.remove();
    res.json({ message: 'News item deleted successfully' });
  } catch (err) {
    console.error('Error deleting news item:', err.message);
    res.status(500).json({ error: 'Server error while deleting news item' });
  }
};
