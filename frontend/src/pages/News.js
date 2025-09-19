import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('/api/public/news').then(res => setNews(res.data));
  }, []);

  return (
    <div>
      <h1>News</h1>
      {news.map(n => (
        <div key={n._id}>
          <h2>{n.title}</h2>
          {n.imageUrl && <img src={n.imageUrl} alt={n.title} width="200" />}
          <p>{n.content}</p>
        </div>
      ))}
    </div>
  );
}
