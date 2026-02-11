import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
token=localStorage.getItem('accesstoken')

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;