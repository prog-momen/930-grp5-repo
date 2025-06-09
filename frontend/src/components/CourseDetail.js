import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseService from '../services/CourseService';
import CartService from '../services/CartService';
import WishlistService from '../services/WishlistService';
import AuthService from '../services/AuthService';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCourse();
    if (currentUser) {
      checkCartAndWishlist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentUser]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const response = await CourseService.getCourse(id);
      setCourse(response.data.data);
    } catch (error) {
      console.error('Error loading course:', error);
      setMessage('Error loading course details');
    } finally {
      setLoading(false);
    }
  };

  const checkCartAndWishlist = async () => {
    try {
      const [cartResponse, wishlistResponse] = await Promise.all([
        CourseService.checkInCart(id),
        CourseService.checkInWishlist(id)
      ]);
      
      setInCart(cartResponse.data.data.inCart);
      setInWishlist(wishlistResponse.data.data.inWishlist);
    } catch (error) {
      console.error('Error checking cart/wishlist status:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!currentUser) {
      // Show login modal instead of navigating
      const event = new CustomEvent('show-login-modal');
      window.dispatchEvent(event);
      return;
    }

    try {
      if (inCart) {
        await CartService.removeFromCart(id);
        setInCart(false);
        setMessage('Course removed from cart');
      } else {
        await CartService.addToCart(id);
        setInCart(true);
        setMessage('Course added to cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      setMessage(error.response?.data?.message || 'Error updating cart');
    }
  };

  const handleToggleWishlist = async () => {
    if (!currentUser) {
      // Show login modal instead of navigating
      const event = new CustomEvent('show-login-modal');
      window.dispatchEvent(event);
      return;
    }

    try {
      if (inWishlist) {
        await WishlistService.removeFromWishlist(id);
        setInWishlist(false);
        setMessage('Course removed from wishlist');
      } else {
        await WishlistService.addToWishlist(id);
        setInWishlist(true);
        setMessage('Course added to wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      setMessage(error.response?.data?.message || 'Error updating wishlist');
    }
  };

  const handleEnroll = async () => {
    if (!currentUser) {
      // Show login modal instead of navigating
      const event = new CustomEvent('show-login-modal');
      window.dispatchEvent(event);
      return;
    }

    try {
      await CourseService.enrollInCourse(id);
      setMessage('Successfully enrolled in course!');
      // Redirect to course content or dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setMessage(error.response?.data?.message || 'Error enrolling in course');
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Course not found or error loading course details.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`}>
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
        </div>
      )}

      <div className="row">
        {/* Course Content */}
        <div className="col-lg-8">
          <div className="mb-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/courses">Courses</a>
                </li>
                <li className="breadcrumb-item">
                  <a href={`/courses?category=${course.category}`}>{course.category}</a>
                </li>
                <li className="breadcrumb-item active">{course.title}</li>
              </ol>
            </nav>
          </div>

          <div className="course-header mb-4">
            <h1 className="display-5 fw-bold mb-3">{course.title}</h1>
            <p className="lead text-muted mb-3">{course.info}</p>
            
            <div className="d-flex align-items-center mb-3">
              <span className="badge bg-primary me-3">{course.category}</span>
              <div className="d-flex align-items-center text-muted">
                <i className="fas fa-user me-2"></i>
                <span>By {course.instructor?.name}</span>
              </div>
            </div>

            {/* Course Stats */}
            <div className="row text-center mb-4">
              <div className="col-md-3">
                <div className="border rounded p-3">
                  <i className="fas fa-users fa-2x text-primary mb-2"></i>
                  <h6>Students</h6>
                  <span className="text-muted">{course.enrollments_count || 0}</span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="border rounded p-3">
                  <i className="fas fa-clock fa-2x text-primary mb-2"></i>
                  <h6>Duration</h6>
                  <span className="text-muted">Self-paced</span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="border rounded p-3">
                  <i className="fas fa-star fa-2x text-primary mb-2"></i>
                  <h6>Rating</h6>
                  <span className="text-muted">
                    {course.reviews_avg_rating ? course.reviews_avg_rating.toFixed(1) : 'No ratings'}
                  </span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="border rounded p-3">
                  <i className="fas fa-certificate fa-2x text-primary mb-2"></i>
                  <h6>Certificate</h6>
                  <span className="text-muted">Yes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Image */}
          <div className="mb-4">
            <img
              src={course.image || `https://placehold.co/800x400/007bff/ffffff?text=Course+${course.id}`}
              alt={course.title}
              className="img-fluid rounded"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>

          {/* Course Description */}
          <div className="mb-4">
            <h3>About This Course</h3>
            <p>{course.info}</p>
          </div>

          {/* Course Lessons */}
          {course.lessons && course.lessons.length > 0 && (
            <div className="mb-4">
              <h3>Course Content</h3>
              <div className="accordion" id="lessonsAccordion">
                {course.lessons.map((lesson, index) => (
                  <div key={lesson.id} className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#lesson${index}`}
                      >
                        <span className="me-3">{index + 1}.</span>
                        {lesson.title}
                      </button>
                    </h2>
                    <div
                      id={`lesson${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#lessonsAccordion"
                    >
                      <div className="accordion-body">
                        {lesson.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {course.reviews && course.reviews.length > 0 && (
            <div className="mb-4">
              <h3>Student Reviews</h3>
              {course.reviews.slice(0, 5).map(review => (
                <div key={review.id} className="border-bottom py-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                         style={{ width: '40px', height: '40px' }}>
                      {review.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h6 className="mb-0">{review.user?.name}</h6>
                      <div className="text-warning">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'text-muted'}`}></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mb-0">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <div className="text-center mb-4">
                <h2 className="text-primary mb-0">${course.price}</h2>
                <small className="text-muted">One-time payment</small>
              </div>

              {currentUser ? (
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleEnroll}
                  >
                    <i className="fas fa-play me-2"></i>
                    Enroll Now
                  </button>
                  
                  <button
                    className={`btn ${inCart ? 'btn-success' : 'btn-outline-primary'}`}
                    onClick={handleAddToCart}
                  >
                    <i className={`fas ${inCart ? 'fa-check' : 'fa-shopping-cart'} me-2`}></i>
                    {inCart ? 'In Cart' : 'Add to Cart'}
                  </button>
                  
                  <button
                    className={`btn ${inWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={handleToggleWishlist}
                  >
                    <i className={`fas fa-heart me-2`}></i>
                    {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              ) : (
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                      const event = new CustomEvent('show-login-modal');
                      window.dispatchEvent(event);
                    }}
                  >
                    Login to Enroll
                  </button>
                </div>
              )}

              <hr />

              <div className="course-features">
                <h6>This course includes:</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-video text-primary me-2"></i>
                    Video lectures
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-file-alt text-primary me-2"></i>
                    Downloadable resources
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-infinity text-primary me-2"></i>
                    Lifetime access
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-mobile-alt text-primary me-2"></i>
                    Access on mobile and TV
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-certificate text-primary me-2"></i>
                    Certificate of completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
