import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseService from '../services/CourseService';
import CartService from '../services/CartService';
import WishlistService from '../services/WishlistService';

const Courses = ({ enrolled = false }) => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    price: '',
    sort: 'newest',
    search: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!enrolled) {
      loadCategories();
    }
    loadCourses();
  }, [filters, enrolled]);

  const loadCategories = async () => {
    try {
      const response = await CourseService.getCategories();
      const categoriesData = response.data?.data || response.data || [];
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    }
  };

  const loadCourses = async () => {
    try {
      setLoading(true);
      let response;
      if (enrolled) {
        response = await CourseService.getEnrolledCourses();
      } else {
        response = await CourseService.getCourses(filters);
      }
      
      // Ensure courses is always an array
      const coursesData = response.data?.data || response.data || [];
      setCourses(Array.isArray(coursesData) ? coursesData : []);
    } catch (error) {
      console.error('Error loading courses:', error);
      setMessage('Error loading courses. Please try again.');
      setCourses([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFilterChange('search', searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    handleFilterChange('search', searchQuery);
  };

  const addToCart = async (courseId) => {
    try {
      await CartService.addToCart(courseId);
      setMessage('Course added to cart successfully!');
    } catch (error) {
      setMessage('Error adding course to cart');
    }
  };

  const toggleWishlist = async (courseId) => {
    try {
      await WishlistService.toggleWishlist(courseId);
      setMessage('Wishlist updated successfully!');
    } catch (error) {
      setMessage('Error updating wishlist');
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-muted">Loading courses...</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header Section */}
        <div className="row align-items-center mb-4">
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold mb-2">
              {enrolled ? 'My Courses' : 'Explore Courses'}
            </h1>
            <p className="text-muted lead">
              {enrolled 
                ? 'Continue your learning journey' 
                : 'Discover the perfect course to advance your skills'
              }
            </p>
          </div>
          {!enrolled && (
            <div className="col-lg-6">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit">
                    <i className="fas fa-search me-1"></i>
                    Search
                  </button>
                </div>
              </form>
              {/* Sort Dropdown */}
              <div className="d-flex justify-content-lg-end">
                <select
                  className="form-select w-auto"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {message && (
          <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`}>
            {message}
            <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
          </div>
        )}

        <div className="row">
          {/* Filters Sidebar - Only show for public courses */}
          {!enrolled && (
            <div className="col-lg-3 mb-4">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h5 className="card-title mb-4">Filters</h5>

                  {/* Category Filter */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Category</label>
                    <select
                      className="form-select"
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Level Filter */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Level</label>
                    <div className="d-flex flex-column gap-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                        <div key={level} className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="level"
                            id={level}
                            value={level.toLowerCase()}
                            checked={filters.level === level.toLowerCase()}
                            onChange={(e) => handleFilterChange('level', e.target.value)}
                          />
                          <label className="form-check-label" htmlFor={level}>
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Price</label>
                    <div className="d-flex flex-column gap-2">
                      {[
                        { label: 'All', value: '' },
                        { label: 'Free', value: 'free' },
                        { label: 'Paid', value: 'paid' }
                      ].map(option => (
                        <div key={option.value} className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="price"
                            id={`price-${option.value}`}
                            value={option.value}
                            checked={filters.price === option.value}
                            onChange={(e) => handleFilterChange('price', e.target.value)}
                          />
                          <label className="form-check-label" htmlFor={`price-${option.value}`}>
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => {
                      setFilters({
                        category: '',
                        level: '',
                        price: '',
                        sort: 'newest',
                        search: ''
                      });
                      setSearchQuery('');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Courses Grid */}
          <div className={enrolled ? 'col-12' : 'col-lg-9'}>
            {courses.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-book-open fa-3x text-muted mb-3"></i>
                <h4>
                  {enrolled ? 'No enrolled courses yet' : 'No courses found'}
                </h4>
                <p className="text-muted">
                  {enrolled 
                    ? 'Start exploring courses to begin your learning journey' 
                    : 'Try adjusting your filters'
                  }
                </p>
                {enrolled && (
                  <Link to="/courses" className="btn btn-primary">
                    Browse Courses
                  </Link>
                )}
              </div>
            ) : (
              <div className="row g-4">
                {courses.map(course => (
                  <div key={course.id} className="col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                      <div className="position-relative">
                        <img
                          src={course.image || `https://placehold.co/300x200/007bff/ffffff?text=Course+${course.id}`}
                          className="card-img-top"
                          alt={course.title}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        {!enrolled && (
                          <div className="position-absolute top-0 end-0 p-3">
                            <button
                              className="btn btn-light rounded-circle shadow-sm"
                              onClick={() => toggleWishlist(course.id)}
                              title="Add to Wishlist"
                            >
                              <i className="far fa-heart text-danger"></i>
                            </button>
                          </div>
                        )}
                        {enrolled && (
                          <div className="position-absolute top-0 start-0 p-3">
                            <span className="badge bg-success">
                              <i className="fas fa-check me-1"></i>
                              Enrolled
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="badge bg-primary bg-opacity-10 text-primary">
                            {course.category}
                          </span>
                          <span className="badge bg-success bg-opacity-10 text-success text-capitalize">
                            {course.level}
                          </span>
                        </div>
                        <h5 className="card-title mb-3">
                          <Link to={`/courses/${course.id}`} className="text-decoration-none text-dark">
                            {course.title}
                          </Link>
                        </h5>
                        <p className="text-muted small mb-3">
                          {course.description?.substring(0, 100)}...
                        </p>
                        <div className="d-flex align-items-center mb-3">
                          <img
                            src={course.instructor?.avatar || `https://placehold.co/32x32/007bff/ffffff?text=${course.instructor?.name?.charAt(0) || 'I'}`}
                            alt={course.instructor?.name}
                            className="rounded-circle me-2"
                            width="32"
                            height="32"
                          />
                          <div>
                            <small className="text-muted">Instructor</small>
                            <div className="fw-semibold">{course.instructor?.name}</div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <div className="d-flex align-items-center text-warning mb-1">
                              <i className="fas fa-star me-1"></i>
                              <span className="fw-semibold">{course.rating || '4.5'}</span>
                              <span className="text-muted ms-1">({course.reviews_count || '0'})</span>
                            </div>
                            {!enrolled && (
                              <div className="text-primary fw-bold fs-5">
                                ${course.price}
                              </div>
                            )}
                          </div>
                          {enrolled ? (
                            <Link
                              to={`/courses/${course.id}/learn`}
                              className="btn btn-success rounded-pill px-4"
                            >
                              <i className="fas fa-play me-2"></i>
                              Continue
                            </Link>
                          ) : (
                            <button
                              className="btn btn-primary rounded-pill px-4"
                              onClick={() => addToCart(course.id)}
                            >
                              <i className="fas fa-shopping-cart me-2"></i>
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
