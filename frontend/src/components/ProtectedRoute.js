import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import LoginModal from './LoginModal';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = AuthService.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (!authenticated) {
        setShowLoginModal(true);
      }
    };

    checkAuth();
    
    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <>
        <LoginModal 
          show={showLoginModal}
          onClose={handleCloseModal}
          onLoginSuccess={handleLoginSuccess}
        />
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="text-center">
            <i className="fas fa-lock fa-3x text-muted mb-3"></i>
            <h4>Authentication Required</h4>
            <p className="text-muted">Please log in to access this page</p>
          </div>
        </div>
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
