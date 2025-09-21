import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../styles/AdminPanel.css';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();

  const [type, setType] = useState('beat');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    price: '',
    buyUrl: '',
    content: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // ✅ Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFilePreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadFile = async () => {
    const form = new FormData();
    form.append('file', file);
    const token = localStorage.getItem('adminToken');
    const res = await axios.post('/api/admin/upload', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    return res.data.url;
  };

  const validate = () => {
    if (!formData.title.trim()) return 'Title is required.';
    if (type === 'beat') {
      if (!formData.artist.trim()) return 'Artist is required.';
      if (!formData.buyUrl.trim()) return 'Buy URL is required.';
      if (formData.price && parseFloat(formData.price) < 0) return 'Price must be 0 or more.';
    } else {
      if (!formData.content.trim()) return 'News content is required.';
    }
    if (!file) return 'Please select a file.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return alert(error);

    try {
      setLoading(true);
      setMessage('');
      const uploadedUrl = await uploadFile();
      const token = localStorage.getItem('adminToken');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (type === 'beat') {
        await axios.post('/api/admin/beats', {
          title: formData.title,
          artist: formData.artist,
          genre: formData.genre,
          price: formData.price,
          audioUrl: uploadedUrl,
          buyUrl: formData.buyUrl
        }, config);
      } else {
        await axios.post('/api/admin/news', {
          title: formData.title,
          content: formData.content,
          imageUrl: uploadedUrl
        }, config);
      }

      setMessage(`${type} uploaded successfully!`);
      setFormData({
        title: '',
        artist: '',
        genre: '',
        price: '',
        buyUrl: '',
        content: ''
      });
      setFile(null);
      setFilePreview(null);
    } catch (err) {
      console.error(err);
      setMessage('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <div style={{ width: '100%', textAlign: 'right', marginBottom: '10px' }}>
        <button onClick={handleLogout} style={{ backgroundColor: '#ff4d4d' }}>
          Logout
        </button>
      </div>

      <h2>🛠️ Admin Panel</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Content Type:
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="beat">Beat</option>
            <option value="news">News</option>
          </select>
        </label>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {type === 'beat' && (
          <>
            <input
              type="text"
              name="artist"
              placeholder="Artist"
              value={formData.artist}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              min="0"
            />
            <input
              type="text"
              name="buyUrl"
              placeholder="Buy URL (WhatsApp/Gmail)"
              value={formData.buyUrl}
              onChange={handleChange}
              required
            />
          </>
        )}

        {type === 'news' && (
          <>
            <textarea
              name="content"
              placeholder="Write news content (Markdown supported)"
              value={formData.content}
              onChange={handleChange}
              required
            />
            <div className="markdown-preview">
              <strong>Preview:</strong>
              <ReactMarkdown>{formData.content}</ReactMarkdown>
            </div>
          </>
        )}

        <div
          className="drop-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
        >
          <p>Drag & drop your file here or click to select</p>
          <input type="file" onChange={handleFileSelect} />
        </div>

        {filePreview && (
          <div className="preview-box">
            <strong>Preview:</strong>
            {type === 'beat' ? (
              <audio controls src={filePreview} />
            ) : (
              <img src={filePreview} alt="Preview" />
            )}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>

        {message && <p className="status-message">{message}</p>}
      </form>
    </div>
  );
  <Link to="/" className="return-home-btn">← Return to Home</Link>
}
