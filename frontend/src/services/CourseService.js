import api from './api';

class CourseService {
  // Get all courses with search and filters
  getCourses(params = {}) {
    return api.get('/courses', { params });
  }

  // Get popular courses
  getPopularCourses() {
    return api.get('/courses/popular');
  }

  // Get course categories
  getCategories() {
    return api.get('/courses/categories');
  }

  // Get single course
  getCourse(id) {
    return api.get(`/courses/${id}`);
  }

  // Get enrolled courses (protected)
  getEnrolledCourses() {
    return api.get('/courses/enrolled');
  }

  // Enroll in course (protected)
  enrollInCourse(courseId) {
    return api.post(`/courses/${courseId}/enroll`);
  }

  // Create course (protected - admin/instructor)
  createCourse(courseData) {
    return api.post('/courses', courseData);
  }

  // Update course (protected - admin/instructor)
  updateCourse(id, courseData) {
    return api.put(`/courses/${id}`, courseData);
  }

  // Delete course (protected - admin/instructor)
  deleteCourse(id) {
    return api.delete(`/courses/${id}`);
  }

  // Search courses
  searchCourses(query, filters = {}) {
    const params = {
      search: query,
      ...filters
    };
    return this.getCourses(params);
  }

  // Check if course is in cart
  checkInCart(courseId) {
    return api.get(`/cart/check/${courseId}`);
  }

  // Check if course is in wishlist
  checkInWishlist(courseId) {
    return api.get(`/wishlist/check/${courseId}`);
  }

  // Get course reviews
  getCourseReviews(courseId) {
    return api.get(`/courses/${courseId}/reviews`);
  }

  // Add course review
  addReview(courseId, reviewData) {
    return api.post(`/courses/${courseId}/reviews`, reviewData);
  }
}

export default new CourseService();
