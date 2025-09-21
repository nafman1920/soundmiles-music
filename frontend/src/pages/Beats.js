import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Beats.css";
import { Link } from 'react-router-dom';

export default function Beats() {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const res = await axios.get('/api/public/beats');
        setBeats(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load beats.');
      } finally {
        setLoading(false);
      }
    };

    fetchBeats();
  }, []);

  if (loading) return <p>Loading beats...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="beats-page">
      <h1>🎵 Fresh Beats</h1>
      {beats.length === 0 ? (
        <p>No beats available yet.</p>
      ) : (
        beats.map(b => (
          <div key={b._id} className="beat-card">
            <h2>{b.title} <small>by {b.artist}</small></h2>
            <audio controls src={b.audioUrl}></audio>
            <div className="beat-actions">
              <button onClick={() => window.open(b.audioUrl, '_blank')}>Listen</button>
              <button onClick={() => window.open(b.buyUrl, '_blank')}>Buy</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
  <Link to="/" className="return-home-btn">← Return to Home</Link>
}
