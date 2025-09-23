import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/News.css';
import { Link } from "react-router-dom";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('/api/public/news', { params: { page, limit } });
        setNews(res.data.news);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch news.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, limit]);

  const handlePrevPage = () => {
    setPage(p => Math.max(p - 1, 1));
  };

  const handleNextPage = () => {
    setPage(p => Math.min(p + 1, totalPages));
  };

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="news-page">
      <h1>📰 Studio News</h1>

      {news.length === 0 ? (
        <p>No news available.</p>
      ) : (
        news.map((n) => (
          <div key={n._id} className="news-card">
            <h2>{n.title}</h2>
            {n.imageUrl && <img src={n.imageUrl} alt={n.title} />}
            <p>{n.content}</p>
          </div>
        ))
      )}

      {/* Pagination Controls */}
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <button onClick={handlePrevPage} disabled={page === 1}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>

      <Link to="/" className="return-home-btn">← Return to Home</Link>
    </div>
  );
}
