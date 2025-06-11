import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import WishlistService from '../services/WishlistService';
import ProfileService from '../services/ProfileService';
import CourseForm from './CourseForm';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        console.log('API response:', response.data);
        // Adjust this line based on actual response structure
        const coursesData = response.data.data.data || response.data || [];
        setCourses(Array.isArray(coursesData) ? coursesData : []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const fetchUserRole = async () => {
      try {
        const profile = await ProfileService.getProfile();
        setUserRole(profile.role);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error);
      }
    };

    fetchCourses();
    fetchUserRole();
  }, []);

  const handleAddToWishlist = async (courseId) => {
    try {
      await WishlistService.addToWishlist(courseId);
      alert('Course added to wishlist!');
      navigate('/wishlist'); // Redirect to wishlist after adding
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add course to wishlist.');
    }
  };

  const handleCreateCourseClick = () => {
    setShowCourseForm(true);
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error loading courses: {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>Course List</h1>
      {userRole === 'Admin' || userRole === 'Instructor' ? (
        <button className="btn btn-primary mb-3" onClick={handleCreateCourseClick}>Create Course</button>
      ) : null}
      {showCourseForm && <CourseForm />}
      <div className="row">
        {courses.length > 0 ? (
          courses
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(course => (
              <div className="col-md-4 mb-4" key={course.id}>
                <Link to={`/courses/${course.id}/free`} className="card">
                  <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Course" />
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">Instructor Name</p>
                  </div>
                </Link>
                <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleAddToWishlist(course.id)}
                    >
                      <i className="far fa-heart"></i>
                    </button>
              </div>
            ))
        ) : (
          <li>No courses found</li>
        )}
      </div>
    </div>
  );
};

export default CourseList;
