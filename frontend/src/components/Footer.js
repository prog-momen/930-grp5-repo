import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-5">
        <div className="row">
          {/* Logo and Description */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="d-flex align-items-center mb-3">
              <img 
                src="/logo192.png" 
                alt="Logo" 
                width="32" 
                height="32" 
                className="me-2"
              />
              <span className="fw-bold fs-4 text-primary">LearnHub</span>
            </div>
            <p className="text-muted">
              Empowering learners worldwide with high-quality online courses and educational resources.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-muted text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/courses" className="text-muted text-decoration-none">
                  Browse Courses
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-muted text-decoration-none">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-muted text-decoration-none">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-muted text-decoration-none">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Categories</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/courses?category=programming" className="text-muted text-decoration-none">
                  Programming
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/courses?category=design" className="text-muted text-decoration-none">
                  Design
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/courses?category=business" className="text-muted text-decoration-none">
                  Business
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/courses?category=marketing" className="text-muted text-decoration-none">
                  Marketing
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/courses?category=photography" className="text-muted text-decoration-none">
                  Photography
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/help" className="text-muted text-decoration-none">
                  Help Center
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-muted text-decoration-none">
                  FAQ
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-muted text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-muted text-decoration-none">
                  Terms of Service
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/refund" className="text-muted text-decoration-none">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Stay Updated</h6>
            <p className="text-muted mb-3">
              Subscribe to our newsletter for the latest courses and updates.
            </p>
            <form className="mb-3">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
                <button className="btn btn-primary" type="submit">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
            <div className="d-flex gap-2">
              <img 
                src="https://via.placeholder.com/120x40/007bff/ffffff?text=App+Store" 
                alt="Download on App Store" 
                className="img-fluid"
                style={{ maxHeight: '40px' }}
              />
              <img 
                src="https://via.placeholder.com/120x40/28a745/ffffff?text=Google+Play" 
                alt="Get it on Google Play" 
                className="img-fluid"
                style={{ maxHeight: '40px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-top border-secondary">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-muted small">
                © 2024 LearnHub. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex justify-content-md-end gap-3">
                <img 
                  src="https://via.placeholder.com/40x25/ffffff/000000?text=VISA" 
                  alt="Visa" 
                  className="img-fluid"
                />
                <img 
                  src="https://via.placeholder.com/40x25/ffffff/000000?text=MC" 
                  alt="Mastercard" 
                  className="img-fluid"
                />
                <img 
                  src="https://via.placeholder.com/40x25/ffffff/000000?text=PP" 
                  alt="PayPal" 
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
