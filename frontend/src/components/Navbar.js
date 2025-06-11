import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../services/AuthService';
import CartService from '../services/CartService';
import WishlistService from '../services/WishlistService';
import LoginModal from './LoginModal';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [showLoginModal, setShowLoginModal] = useState(false);
 
  useEffect(() => {
    const handleProfileUpdate = () => {
      setCurrentUser(AuthService.getCurrentUser());
    };

    window.addEventListener('profile-updated', handleProfileUpdate);

    return () => {
      window.removeEventListener('profile-updated', handleProfileUpdate);
    };
  }, []);

  useEffect(() => {
    const handleShowLoginModal = () => {
      setShowLoginModal(true);
    };

    window.addEventListener('show-login-modal', handleShowLoginModal);
    return () => window.removeEventListener('show-login-modal', handleShowLoginModal);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (currentUser) {
      loadCounts();
    }
  }, [currentUser]);

  const loadCounts = async () => {
    try {
      const [cartResponse, wishlistResponse] = await Promise.all([
        CartService.getCartCount(),
        WishlistService.getWishlistCount()
      ]);
      
      setCartCount(cartResponse.data.data.count);
      setWishlistCount(wishlistResponse.data.data.count);
    } catch (error) {
      console.error('Error loading counts:', error);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setCartCount(0);
    setWishlistCount(0);
    navigate('/');
  };

  const handleLoginSuccess = () => {
    setCurrentUser(AuthService.getCurrentUser());
    loadCounts();
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" 
                 style={{ width: '40px', height: '40px' }}>
              <i className="fas fa-graduation-cap text-white fs-5"></i>
            </div>
            <span className="fw-bold text-primary fs-4">Learnify</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Search Bar */}
            <div className="mx-auto d-none d-lg-block" style={{ maxWidth: '500px', width: '100%' }}>
              <form onSubmit={handleSearch} className="d-flex">
                <div className="input-group shadow-sm">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0"
                    placeholder="What do you want to learn today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-primary px-4" type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Navigation Links */}
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-3">
                <Link 
                  to="/courses" 
                  className={`nav-link fw-semibold ${isActive('/courses')} position-relative`}
                >
                  <i className="fas fa-book me-2"></i>
                  Courses
                  {isActive('/courses') && (
                    <span className="position-absolute bottom-0 start-50 translate-middle-x bg-primary rounded-pill" 
                          style={{ width: '6px', height: '6px' }}></span>
                  )}
                </Link>
              </li>

              {currentUser ? (
                <>
                  {/* Wishlist */}
                  <li className="nav-item me-3">
                    <Link 
                      to="/wishlist" 
                      className="nav-link position-relative p-2"
                      title="Wishlist"
                    >
                      <div className="position-relative">
                        <i className="far fa-heart fs-5 text-muted"></i>
                        {wishlistCount > 0 && (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                                style={{ fontSize: '0.7rem' }}>
                            {wishlistCount > 99 ? '99+' : wishlistCount}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>

                  {/* Cart */}
                  <li className="nav-item me-3">
                    <Link 
                      to="/cart" 
                      className="nav-link position-relative p-2"
                      title="Shopping Cart"
                    >
                      <div className="position-relative">
                        <i className="fas fa-shopping-cart fs-5 text-muted"></i>
                        {cartCount > 0 && (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" 
                                style={{ fontSize: '0.7rem' }}>
                            {cartCount > 99 ? '99+' : cartCount}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>

                  {/* Notifications */}
                  <li className="nav-item me-3">
                    <button className="nav-link btn btn-link position-relative p-2" title="Notifications">
                      <i className="far fa-bell fs-5 text-muted"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning" 
                            style={{ fontSize: '0.7rem' }}>
                        3
                      </span>
                    </button>
                  </li>

                  {/* User Dropdown */}
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle d-flex align-items-center btn btn-link text-decoration-none"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="position-relative me-2">
                        {currentUser.avatar ? (
                          <img
                            src={currentUser.avatar}
                            alt="Profile"
                            className="rounded-circle"
                            style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="rounded-circle bg-gradient text-white d-flex align-items-center justify-content-center" 
                               style={{ 
                                 width: '36px', 
                                 height: '36px',
                                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                               }}>
                            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                        )}
                        <span className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white" 
                              style={{ width: '12px', height: '12px' }}></span>
                      </div>
                      <div className="d-none d-md-block text-start">
                        <div className="fw-semibold text-dark">{currentUser.name}</div>
                        <small className="text-muted text-capitalize">{currentUser.role}</small>
                      </div>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2" style={{ minWidth: '220px' }}>
                      <li className="px-3 py-2 border-bottom">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-gradient text-white d-flex align-items-center justify-content-center me-3" 
                               style={{ 
                                 width: '40px', 
                                 height: '40px',
                                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                               }}>
                            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="fw-semibold">{currentUser.name}</div>
                            <small className="text-muted">{currentUser.email}</small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2" to="/dashboard">
                          <i className="fas fa-tachometer-alt me-3 text-primary"></i>Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2" to="/profile">
                          <i className="fas fa-user me-3 text-success"></i>My Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2" to="/my-courses">
                          <i className="fas fa-book me-3 text-info"></i>My Courses
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2" to="/payments">
                          <i className="fas fa-credit-card me-3 text-warning"></i>Payments
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider my-2" /></li>
                      <li>
                        <button className="dropdown-item py-2 text-danger" onClick={handleLogout}>
                          <i className="fas fa-sign-out-alt me-3"></i>Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item me-2">
                    <button 
                      className="btn btn-outline-primary rounded-pill px-4"
                      onClick={openLoginModal}
                    >
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="btn btn-primary rounded-pill px-4">
                      <i className="fas fa-user-plus me-2"></i>
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Mobile Search */}
          <div className="d-lg-none w-100 mt-3">
            <form onSubmit={handleSearch} className="d-flex">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="fas fa-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal 
        show={showLoginModal} 
        onClose={closeLoginModal} 
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;
