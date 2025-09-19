const News = require('../models/News');

exports.getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
