const cloudinary = require('cloudinary').v2;

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto", // handles both images & audio
      folder: "project_uploads"
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
