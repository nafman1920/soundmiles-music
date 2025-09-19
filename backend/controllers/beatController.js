const Beat = require('../models/Beat');

exports.getBeats = async (req, res) => {
  try {
    const beats = await Beat.find().sort({ createdAt: -1 });
    res.json(beats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
