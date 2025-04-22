// SearchNotes.jsx
import React, { useState, useEffect } from 'react';

const SearchNotes = ({ notes, setFilteredNotes }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      setFilteredNotes(notes);
      return;
    }
    
    const filtered = notes.filter((note) => 
      note.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchQuery, notes, setFilteredNotes]);

  return (
    <div style={{ margin: '10px 0' }}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search notes..."
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '1rem'
        }}
      />
    </div>
  );
};

export default SearchNotes;