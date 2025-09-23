const Beat = require('../models/Beat');

// Get all beats with pagination and optional genre filter
exports.getAllBeats = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const genreFilter = req.query.genre ? { genre: req.query.genre } : {};

    const beats = await Beat.find(genreFilter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalBeats = await Beat.countDocuments(genreFilter);

    res.json({
      page,
      limit,
      totalPages: Math.ceil(totalBeats / limit),
      totalBeats,
      beats,
    });
  } catch (err) {
    console.error('Error fetching beats:', err.message);
    res.status(500).json({ error: 'Server error while fetching beats' });
  }
};

// Get single beat by title (case-insensitive exact match)
exports.getBeatByTitle = async (req, res) => {
  try {
    const titleParam = req.params.title;

    const beat = await Beat.findOne({
      title: { $regex: `^${titleParam}$`, $options: 'i' },
    });

    if (!beat) {
      return res.status(404).json({ error: 'Beat not found' });
    }

    res.status(200).json(beat);
  } catch (err) {
    console.error('Error fetching beat by title:', err.message);
    res.status(500).json({ error: 'Server error while fetching beat' });
  }
};

// Add a new beat
exports.addBeat = async (req, res) => {
  try {
    const { title, artist, genre, price, audioUrl, coverImage, buyUrl } = req.body;
    const beat = new Beat({ title, artist, genre, price, audioUrl, coverImage, buyUrl });
    await beat.save();
    res.json(beat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete beat by ID
exports.deleteBeat = async (req, res) => {
  try {
    const beat = await Beat.findById(req.params.id);

    if (!beat) {
      return res.status(404).json({ error: 'Beat not found' });
    }

    await beat.remove();
    res.json({ message: 'Beat deleted successfully' });
  } catch (err) {
    console.error('Error deleting beat:', err.message);
    res.status(500).json({ error: 'Server error while deleting beat' });
  }
};
