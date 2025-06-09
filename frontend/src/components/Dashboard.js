import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import DashboardService from '../services/DashboardService';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Main Content */}
      <div className="container py-5">
        <h1 className="mb-4">Dashboard</h1>

        <div className="card shadow-sm">
          <div className="card-body">
            <p className="lead">You are logged in!</p>
            {user && (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role || 'Student'}</p>
              </>
            )}

            <div className="mt-4 d-grid gap-3">
              <a href="/profile" className="btn btn-primary btn-lg">
                Edit Your Profile
              </a>

              {user && ['Student', 'Admin'].includes(user.role) && (
                <a href="/courses" className="btn btn-secondary btn-lg">
                  My Enrolled Courses
                </a>
              )}

              <a href="/wishlist" className="btn btn-info btn-lg text-white">
                My Wishlist
              </a>

              {user && ['Student', 'Admin'].includes(user.role) && (
                <a href="/payments" className="btn btn-success btn-lg">
                  My Payments
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
