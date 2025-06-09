import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const LoginModal = ({ show, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await AuthService.login(email, password);
      setLoading(false);
      
      // Reset form
      setEmail('');
      setPassword('');
      setMessage('');
      
      // Close modal
      onClose();
      
      // Notify parent component about successful login
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      const resMessage =
        (error.response &&
         error.response.data &&
         error.response.data.message) ||
        error.message ||
        error.toString();

      setLoading(false);
      setMessage(resMessage);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setMessage('');
    onClose();
  };

  if (!show) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        onClick={handleClose}
        style={{ zIndex: 1040 }}
      ></div>

      {/* Modal */}
      <div 
        className="modal fade show d-block" 
        tabIndex="-1" 
        style={{ zIndex: 1050 }}
        aria-labelledby="loginModalLabel" 
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="modal-header bg-primary text-white border-0">
              <div>
                <h4 className="modal-title fw-bold" id="loginModalLabel">
                  Welcome to Learnify
                </h4>
                <p className="mb-0 opacity-75">Sign in to continue learning</p>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="modalEmail" className="form-label fw-semibold">
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="fas fa-envelope text-muted"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control border-start-0"
                      id="modalEmail"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="modalPassword" className="form-label fw-semibold">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="fas fa-lock text-muted"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control border-start-0"
                      id="modalPassword"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <button 
                    type="button"
                    className="btn btn-link p-0 text-decoration-none small text-primary"
                    onClick={() => {
                      handleClose();
                      navigate('/forgot-password');
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {message && (
                  <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <div>{message}</div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3 py-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Sign In
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="mb-0 text-muted">
                    Don't have an account? 
                    <button 
                      type="button"
                      className="btn btn-link p-0 ms-1 text-decoration-none fw-semibold"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                        navigate('/register');
                      }}
                    >
                      Sign up here
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
