import React, { useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [buyUrl, setBuyUrl] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('beat');

  const uploadFile = async () => {
    const form = new FormData();
    form.append('file', file);
    const res = await axios.post('/api/admin/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedUrl = await uploadFile();

    if (type === 'beat') {
      await axios.post('/api/admin/beats', {
        title, artist, genre, price, audioUrl: uploadedUrl, buyUrl
      });
    } else {
      await axios.post('/api/admin/news', { title, content, imageUrl: uploadedUrl });
    }
    alert(`${type} uploaded successfully!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="beat">Beat</option>
        <option value="news">News</option>
      </select>

      <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} required />
      {type === 'beat' && (
        <>
          <input type="text" placeholder="Artist" onChange={e => setArtist(e.target.value)} required />
          <input type="text" placeholder="Genre" onChange={e => setGenre(e.target.value)} />
          <input type="number" placeholder="Price" onChange={e => setPrice(e.target.value)} />
          <input type="text" placeholder="Buy URL (WhatsApp/Gmail)" onChange={e => setBuyUrl(e.target.value)} required />
        </>
      )}
      {type === 'news' && (
        <textarea placeholder="Content" onChange={e => setContent(e.target.value)} required />
      )}
      <input type="file" onChange={e => setFile(e.target.files[0])} required />
      <button type="submit">Upload</button>
    </form>
  );
}
