import React, { useState, useEffect } from 'react';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './CourseList.css'; // سنضيف هذا لاحقًا لتحسين الشكل

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        const coursesData = response?.data?.data?.data || [];
        setCourses(coursesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading courses...</div>;
  if (error) return <div className="text-danger mt-5 text-center">Error: {error.message}</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Available Courses</h2>
      <div className="row">
        {courses.map(course => (
          <div className="col-md-4 mb-4" key={course.id}>
            <div className="card course-card h-100 shadow-sm">
              <img
                src={`https://source.unsplash.com/400x200/?${course.category}`} // صورة عشوائية حسب الكاتيجوري
                className="card-img-top"
                alt={course.title}
              />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text text-muted">{course.info}</p>
                <p className="card-text"><strong>Category:</strong> {course.category}</p>
                <p className="card-text"><strong>Price:</strong> ${course.price}</p>
                <p className="card-text"><strong>Instructor:</strong> {course.instructor?.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
