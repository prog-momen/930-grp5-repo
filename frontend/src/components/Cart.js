import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartService from '../services/CartService';
import WishlistService from '../services/WishlistService';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await CartService.getCart();
      setCartItems(response.data.data.items);
      setTotal(response.data.data.total);
    } catch (error) {
      console.error('Error loading cart:', error);
      setMessage('Error loading cart items');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (courseId) => {
    try {
      await CartService.removeFromCart(courseId);
      setMessage('Course removed from cart');
      await loadCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      setMessage('Error removing course from cart');
    }
  };

  const moveToWishlist = async (courseId) => {
    try {
      await WishlistService.addToWishlist(courseId);
      await CartService.removeFromCart(courseId);
      setMessage('Course moved to wishlist');
      await loadCart();
    } catch (error) {
      console.error('Error moving to wishlist:', error);
      setMessage('Error moving course to wishlist');
    }
  };

  const clearCart = async () => {
    try {
      await CartService.clearCart();
      setMessage('Cart cleared');
      await loadCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
      setMessage('Error clearing cart');
    }
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Shopping Cart</h2>
            {cartItems.length > 0 && (
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            )}
          </div>

          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
              {message}
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
              <h4>Your cart is empty</h4>
              <p className="text-muted mb-4">Browse our courses and add some to your cart!</p>
              <Link to="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.course.id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.course.image || '/api/placeholder/300/200'}
                        className="img-fluid rounded-start h-100"
                        alt={item.course.title}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div className="flex-grow-1">
                            <h5 className="card-title">{item.course.title}</h5>
                            <p className="text-muted mb-2">
                              By {item.course.instructor?.name}
                            </p>
                            <p className="card-text">
                              {item.course.info?.substring(0, 150)}...
                            </p>
                            <div className="d-flex align-items-center mb-2">
                              <span className="badge bg-primary me-2">
                                {item.course.category}
                              </span>
                              <small className="text-muted">
                                <i className="fas fa-clock me-1"></i>
                                Updated recently
                              </small>
                            </div>
                          </div>
                          <div className="text-end">
                            <h4 className="text-primary mb-3">${item.course.price}</h4>
                            <div className="btn-group-vertical">
                              <button
                                className="btn btn-outline-danger btn-sm mb-2"
                                onClick={() => removeFromCart(item.course.id)}
                              >
                                <i className="fas fa-trash me-1"></i>
                                Remove
                              </button>
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => moveToWishlist(item.course.id)}
                              >
                                <i className="fas fa-heart me-1"></i>
                                Move to Wishlist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="col-lg-4">
            <div className="card sticky-top" style={{ top: '20px' }}>
              <div className="card-header">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal ({cartItems.length} items):</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Discount:</span>
                  <span className="text-success">-$0.00</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong className="text-primary">${total.toFixed(2)}</strong>
                </div>
                <button 
                  className="btn btn-primary w-100 mb-3"
                  onClick={proceedToCheckout}
                >
                  Proceed to Checkout
                </button>
                <div className="text-center">
                  <small className="text-muted">
                    <i className="fas fa-lock me-1"></i>
                    Secure checkout with 256-bit SSL encryption
                  </small>
                </div>
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="card mt-4">
              <div className="card-header">
                <h6 className="mb-0">You might also like</h6>
              </div>
              <div className="card-body">
                <div className="d-flex mb-3">
                  <img
                    src="/api/placeholder/80/60"
                    className="rounded me-3"
                    alt="Course"
                    style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Advanced React Development</h6>
                    <small className="text-muted">$49.99</small>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <img
                    src="/api/placeholder/80/60"
                    className="rounded me-3"
                    alt="Course"
                    style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Node.js Masterclass</h6>
                    <small className="text-muted">$59.99</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
