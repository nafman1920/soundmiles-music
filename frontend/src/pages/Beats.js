import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Beats() {
  const [beats, setBeats] = useState([]);

  useEffect(() => {
    axios.get('/api/public/beats').then(res => setBeats(res.data));
  }, []);

  return (
    <div>
      <h1>Fresh Beats</h1>
      {beats.map(b => (
        <div key={b._id}>
          <h2>{b.title} - {b.artist}</h2>
          <audio controls src={b.audioUrl}></audio>
          <div>
            <button onClick={() => window.open(b.audioUrl)}>Listen</button>
            <button onClick={() => window.open(b.buyUrl)}>Buy</button>
          </div>
        </div>
      ))}
    </div>
  );
}
