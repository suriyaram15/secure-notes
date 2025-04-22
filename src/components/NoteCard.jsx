// src/components/NoteCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate();
  
  return (
    <div className="note-card">
      <div className="note-header">
        <span className={`category ${note.category}`}>{note.category}</span>
        <h3>{note.title}</h3>
      </div>
      <div className="note-content">
        {note.content.length > 100 
          ? `${note.content.substring(0, 100)}...` 
          : note.content}
      </div>
      <div className="note-footer">
        <small>{new Date(note.createdAt).toLocaleString()}</small>
      </div>
      <div className="note-actions">
        <button onClick={() => navigate(`/edit/${note.id}`)}>View</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;