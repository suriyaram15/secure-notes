// src/components/ViewNotes.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import NoteCard from './NoteCard';

const ViewNotes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [decryptedNotes, setDecryptedNotes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const masterPassword = sessionStorage.getItem('currentPassword');
    if (!masterPassword) {
      navigate('/login');
      return;
    }

    const encryptedNotes = JSON.parse(localStorage.getItem('encryptedNotes') || '[]');
    const decrypted = encryptedNotes.map(note => {
      try {
        const bytes = CryptoJS.AES.decrypt(note.encryptedContent, masterPassword);
        return {
          ...note,
          content: bytes.toString(CryptoJS.enc.Utf8)
        };
      } catch (e) {
        console.error("Decryption error:", e);
        return null;
      }
    }).filter(Boolean);

    setDecryptedNotes(decrypted);
  }, [navigate]);

  const filteredNotes = decryptedNotes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteNote = (id) => {
    const updatedNotes = decryptedNotes.filter(note => note.id !== id);
    const masterPassword = sessionStorage.getItem('currentPassword');
    
    // Re-encrypt remaining notes
    const reencrypted = updatedNotes.map(note => ({
      ...note,
      encryptedContent: CryptoJS.AES.encrypt(note.content, masterPassword).toString()
    }));

    localStorage.setItem('encryptedNotes', JSON.stringify(reencrypted));
    setDecryptedNotes(updatedNotes);
  };

  return (
    <div className="container">
      <h2>Your Notes</h2>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search notes..."
        />
        <button onClick={() => navigate('/add')}>Add New</button>
      </div>
      
      <div className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note}
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))
        ) : (
          <p>No notes found. Create your first note!</p>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ViewNotes;