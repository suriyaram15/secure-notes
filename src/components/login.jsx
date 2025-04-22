// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Verify master password (stored hashed in localStorage)
    const storedHash = localStorage.getItem('masterPasswordHash');
    const inputHash = CryptoJS.SHA256(password).toString();
    
    if (storedHash === inputHash || !storedHash) {
      // First time login or correct password
      if (!storedHash) {
        localStorage.setItem('masterPasswordHash', inputHash);
      }
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('currentPassword', password);
      navigate('/');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="container">
      <h2>Login to Secure Notes</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter master password"
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;