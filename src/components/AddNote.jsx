// AddNote.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('personal');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSaveNote = () => {
    if (!title || !content) {
      setError('Title and content are required!');
      return;
    }

    const masterPassword = sessionStorage.getItem('currentPassword');
    if (!masterPassword) {
      setError('Session expired. Please login again.');
      return;
    }

    const note = {
      id: Date.now(),
      title,
      category,
      encryptedContent: CryptoJS.AES.encrypt(content, masterPassword).toString(),
      createdAt: new Date().toISOString()
    };

    const existingNotes = JSON.parse(localStorage.getItem('encryptedNotes') || '[]');
    localStorage.setItem('encryptedNotes', JSON.stringify([...existingNotes, note]));
    navigate('/view');
  };

  return (
    <div className="container">
      <h2>Add New Note</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
      />
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="ideas">Ideas</option>
      </select>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your note content..."
        rows={8}
      />
      <button onClick={handleSaveNote}>Save Note</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddNote;