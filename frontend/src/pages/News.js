import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/News.css'; // Link the styles below
import { Link } from "react-router-dom";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('/api/public/news');
        setNews(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch news.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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
    </div>
  );
  <Link to="/" className="return-home-btn">← Return to Home</Link>
}
