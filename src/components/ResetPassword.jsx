// src/components/ResetPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleReset = () => {
    // Verify current password
    const storedHash = localStorage.getItem('masterPasswordHash');
    const currentHash = CryptoJS.SHA256(currentPassword).toString();
    
    if (storedHash !== currentHash) {
      setError('Current password is incorrect');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    // Re-encrypt all notes with new password
    const encryptedNotes = JSON.parse(localStorage.getItem('encryptedNotes') || '[]');
    const reencryptedNotes = encryptedNotes.map(note => {
      const bytes = CryptoJS.AES.decrypt(note.encryptedContent, currentPassword);
      const content = bytes.toString(CryptoJS.enc.Utf8);
      return {
        ...note,
        encryptedContent: CryptoJS.AES.encrypt(content, newPassword).toString()
      };
    });

    localStorage.setItem('encryptedNotes', JSON.stringify(reencryptedNotes));
    localStorage.setItem('masterPasswordHash', CryptoJS.SHA256(newPassword).toString());
    setSuccess('Password changed successfully!');
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="container">
      <h2>Change Master Password</h2>
      <input
        type="password"
        placeholder="Current password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <PasswordStrengthMeter password={newPassword} />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleReset}>Change Password</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default ResetPassword;