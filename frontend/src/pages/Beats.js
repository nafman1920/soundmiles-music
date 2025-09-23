import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Beats.css";
import { Link } from 'react-router-dom';

export default function Beats() {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination and filter state
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // fixed limit, can make dynamic later
  const [totalPages, setTotalPages] = useState(1);
  const [genre, setGenre] = useState(''); // empty means no filter
  
  // Unique genres for dropdown
  const [genres, setGenres] = useState([]);

  // Fetch beats with pagination and genre filter
  useEffect(() => {
    const fetchBeats = async () => {
      setLoading(true);
      setError('');
      try {
        const params = { page, limit };
        if (genre) params.genre = genre;

        const res = await axios.get('/api/public/beats', { params });
        
        setBeats(res.data.beats);
        setTotalPages(res.data.totalPages);

        // Extract unique genres from current results to fill dropdown
        const uniqueGenres = [...new Set(res.data.beats.map(b => b.genre).filter(Boolean))];
        setGenres(uniqueGenres);

      } catch (err) {
        console.error(err);
        setError('Failed to load beats.');
      } finally {
        setLoading(false);
      }
    };

    fetchBeats();
  }, [page, limit, genre]);

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setPage(1); // Reset to first page on filter change
  };

  const handlePrevPage = () => {
    setPage(p => Math.max(p - 1, 1));
  };

  const handleNextPage = () => {
    setPage(p => Math.min(p + 1, totalPages));
  };

  if (loading) return <p>Loading beats...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="beats-page">
      <h1>🎵 Fresh Beats</h1>

      {/* Genre filter dropdown */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="genre-select" style={{ marginRight: '8px', fontWeight: 'bold' }}>Filter by Genre:</label>
        <select id="genre-select" value={genre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Beat list */}
      {beats.length === 0 ? (
        <p>No beats available.</p>
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

      {/* Pagination controls */}
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <button onClick={handlePrevPage} disabled={page === 1}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>

      <Link to="/" className="return-home-btn">← Return to Home</Link>
    </div>
  );
}
