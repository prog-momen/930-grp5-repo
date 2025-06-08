import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const ProtectedRoute = ({ children }) => {
  if (!AuthService.isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;