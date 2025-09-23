import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../styles/AdminPanel.css';

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
  const [contents, setContents] = useState([]);

  // Pagination & Filtering
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [genre, setGenre] = useState('');
  const [availableGenres, setAvailableGenres] = useState([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/login');
  }, [navigate]);

  // Fetch content when type, genre, or page changes
  useEffect(() => {
    const fetchContent = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const params = { page, limit };
        if (type === 'beat' && genre) params.genre = genre;

        const res = await axios.get(`/api/admin/${type}`, {
          headers: { Authorization: `Bearer ${token}` },
          params
        });

        const items = res.data?.beats || res.data?.news || [];
        setContents(items);
        setTotalPages(res.data.totalPages || 1);

        // Extract available genres from beats
        if (type === 'beat') {
          const genres = new Set(items.map(item => item.genre).filter(Boolean));
          setAvailableGenres(Array.from(genres));
        }
      } catch (err) {
        console.error('Failed to fetch content:', err);
      }
    };

    fetchContent();
  }, [type, page, genre]);

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
      setPage(1); // reset to page 1 after upload
    } catch (err) {
      console.error(err);
      setMessage('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`/api/admin/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContents(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete item. Try again.');
    }
  };

  return (
    <div className="admin-panel">
      <div className="top-bar">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <h2>🛠️ Admin Panel</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Content Type:
          <select value={type} onChange={e => {
            setType(e.target.value);
            setPage(1);
            setGenre('');
          }}>
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

      {/* Filters */}
      {type === 'beat' && availableGenres.length > 0 && (
        <div className="filter-bar">
          <label>
            Filter by Genre:
            <select value={genre} onChange={e => {
              setGenre(e.target.value);
              setPage(1);
            }}>
              <option value="">All</option>
              {availableGenres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Content Listing */}
      <div className="content-list">
        <h3>📦 Uploaded {type === 'beat' ? 'Beats' : 'News'}</h3>
        {contents.length === 0 ? (
          <p>No {type} uploaded yet.</p>
        ) : (
          <ul>
            {contents.map(item => (
              <li key={item._id} className="content-item">
                <div className="content-info">
                  <strong>{item.title}</strong>
                  {type === 'beat' ? (
                    <>
                      <p>Artist: {item.artist}</p>
                      <p>Genre: {item.genre}</p>
                      <p>Price: ${item.price}</p>
                      <p>Buy URL: {item.buyUrl}</p>
                      <audio controls src={item.audioUrl}></audio>
                    </>
                  ) : (
                    <>
                      <ReactMarkdown>
                        {item.content.length > 120
                          ? item.content.slice(0, 120) + '...'
                          : item.content}
                      </ReactMarkdown>
                      {item.imageUrl && <img src={item.imageUrl} alt="News" style={{ width: '150px' }} />}
                    </>
                  )}
                </div>
                <button className="delete-btn" onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination-controls">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
          ← Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next →
        </button>
      </div>

      <Link to="/" className="return-home-btn">← Return to Home</Link>
    </div>
  );
}
