// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Welcome to Secure Notes</h2>
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/add')}>Add New Note</button>
        <button onClick={() => navigate('/view')}>View Notes</button>
        <button onClick={() => navigate('/reset')}>Change Password</button>
        <button onClick={() => navigate('/info')}>How It Works</button>
      </div>
    </div>
  );
};

export default Dashboard;