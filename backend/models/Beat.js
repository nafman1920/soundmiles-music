const mongoose = require('mongoose');

const beatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String },
  price: { type: Number, default: 0 },
  audioUrl: { type: String, required: true },  // Cloudinary audio URL
  coverImage: { type: String },                // optional Cloudinary image
  buyUrl: { type: String, required: true },    // WhatsApp/Gmail link
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Beat', beatSchema);
