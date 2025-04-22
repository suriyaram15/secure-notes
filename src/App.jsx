// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddNote from './components/AddNote';
import ViewNotes from './components/ViewNote';
import ResetPassword from './components/ResetPassword';
import Info from './components/Info';
import Login from './components/Login';
import './App.css';

function App() {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');

  return (
    <Router>
      <div className="app-container">
        <h1>Secure Notes Manager</h1>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/add" element={isAuthenticated ? <AddNote /> : <Navigate to="/login" />} />
          <Route path="/view" element={isAuthenticated ? <ViewNotes /> : <Navigate to="/login" />} />
          <Route path="/reset" element={isAuthenticated ? <ResetPassword /> : <Navigate to="/login" />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;