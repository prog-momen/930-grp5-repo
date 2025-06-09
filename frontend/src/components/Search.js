import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import CourseService from '../services/CourseService';
import CartService from '../services/CartService';
import WishlistService from '../services/WishlistService';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    category: '',
    min_price: '',
    max_price: '',
    sort_by: 'created_at',
    sort_order: 'desc'
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0
  });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    searchCourses();
  }, [filters, searchParams]);

  const loadCategories = async () => {
    try {
      const response = await CourseService.getCategories();
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const searchCourses = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        ...filters,
        page,
        per_page: 12
      };
      
      const response = await CourseService.getCourses(params);
      setCourses(response.data.data.data);
      setPagination({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page,
        total: response.data.data.total
      });
    } catch (error) {
      console.error('Error searching courses:', error);
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

  const addToCart = async (courseId) => {
    try {
      await CartService.addToCart(courseId);
      // Show success message or update UI
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const toggleWishlist = async (courseId) => {
    try {
      await WishlistService.toggleWishlist(courseId);
      // Show success message or update UI
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-lg-3">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Filters</h5>
            </div>
            <div className="card-body">
              {/* Search Input */}
              <div className="mb-4">
                <label className="form-label">Search</label>
                <input
                  type="text"
                  className="form-control"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search courses..."
                />
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="form-label">Category</label>
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

              {/* Price Range */}
              <div className="mb-4">
                <label className="form-label">Price Range</label>
                <div className="row">
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min"
                      value={filters.min_price}
                      onChange={(e) => handleFilterChange('min_price', e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max"
                      value={filters.max_price}
                      onChange={(e) => handleFilterChange('max_price', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div className="mb-4">
                <label className="form-label">Sort By</label>
                <select
                  className="form-select"
                  value={`${filters.sort_by}_${filters.sort_order}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('_');
                    handleFilterChange('sort_by', sortBy);
                    handleFilterChange('sort_order', sortOrder);
                  }}
                >
                  <option value="created_at_desc">Newest First</option>
                  <option value="created_at_asc">Oldest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="title_asc">Title: A to Z</option>
                  <option value="title_desc">Title: Z to A</option>
                </select>
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={() => searchCourses()}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2>Search Results</h2>
              {filters.search && (
                <p className="text-muted">
                  Showing results for "{filters.search}" ({pagination.total} courses found)
                </p>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4>No courses found</h4>
              <p className="text-muted">Try adjusting your search criteria</p>
            </div>
          ) : (
            <>
              <div className="row">
                {courses.map(course => (
                  <div key={course.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 course-card">
                      <img
                        src={course.image || '/api/placeholder/300/200'}
                        className="card-img-top"
                        alt={course.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body d-flex flex-column">
                        <div className="mb-2">
                          <span className="badge bg-primary">{course.category}</span>
                        </div>
                        <h5 className="card-title">{course.title}</h5>
                        <p className="card-text text-muted small">
                          By {course.instructor?.name}
                        </p>
                        <p className="card-text flex-grow-1">
                          {course.info?.substring(0, 100)}...
                        </p>
                        <div className="mt-auto">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="h5 text-primary mb-0">${course.price}</span>
                            <div className="btn-group">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => toggleWishlist(course.id)}
                                title="Add to Wishlist"
                              >
                                <i className="far fa-heart"></i>
                              </button>
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => addToCart(course.id)}
                                title="Add to Cart"
                              >
                                <i className="fas fa-shopping-cart"></i>
                              </button>
                            </div>
                          </div>
                          <Link
                            to={`/courses/${course.id}`}
                            className="btn btn-primary w-100"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => searchCourses(pagination.current_page - 1)}
                        disabled={pagination.current_page === 1}
                      >
                        Previous
                      </button>
                    </li>
                    
                    {[...Array(pagination.last_page)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <li
                          key={page}
                          className={`page-item ${pagination.current_page === page ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => searchCourses(page)}
                          >
                            {page}
                          </button>
                        </li>
                      );
                    })}
                    
                    <li className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => searchCourses(pagination.current_page + 1)}
                        disabled={pagination.current_page === pagination.last_page}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
