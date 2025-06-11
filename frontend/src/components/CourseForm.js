import React, { useState, useEffect } from 'react';
import ProfileService from '../services/ProfileService';

const CourseForm = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Assuming you store the token in localStorage
        const instructorsData = await ProfileService.getAllUsers(token);
        // Filter users to only include those with the "Instructor" role
        const instructorList = instructorsData.filter(user => user.role === 'Instructor');
        setInstructors(instructorList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching instructors:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  if (loading) {
    return <div>Loading instructors...</div>;
  }

  if (error) {
    return <div>Error loading instructors: {error.message}</div>;
  }

  return (
    <div>
      <h2>Create Course</h2>
      <label htmlFor="instructor">Instructor:</label>
      <select id="instructor">
        {instructors.map(instructor => (
          <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
        ))}
      </select>
      {/* Add form fields and logic here */}
    </div>
  );
};

export default CourseForm;
