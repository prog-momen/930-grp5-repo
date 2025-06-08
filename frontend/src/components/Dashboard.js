import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AuthService from '../services/AuthService';

const Dashboard = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    api.get('dashboard')
      .then(response => {
        setContent(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load dashboard data');
        setLoading(false);
        console.error('Dashboard loading error:', error);
      });
  }, []);

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h3>Dashboard</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">Welcome, {currentUser.name}!</h5>
          <p className="card-text">
            {content.message || 'Welcome to your dashboard'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;