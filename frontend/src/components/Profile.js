import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import ProfileService from '../services/ProfileService';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(['Admin', 'Instructor', 'Student']);
  const [stats, setStats] = useState(null);
  const [instructorStats, setInstructorStats] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    loadProfileData();
    loadUsers();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);

      // Check if user is authenticated
      if (!AuthService.isAuthenticated()) {
        setMessage('You are not authenticated. Please log in.');
        return;
      }

      // Get profile data
      const profileResponse = await ProfileService.getProfile();
      if (!profileResponse || !profileResponse.data || !profileResponse.data.data) {
        setMessage('Error loading profile data. Please try again.');
        return;
      }
      const userData = profileResponse.data.data;
      if (!userData) {
        setMessage('Error loading profile data. Please try again.');
        return;
      }
      setUser(userData);

      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Get user stats
      const statsResponse = await ProfileService.getStats();
      setStats(statsResponse.data.data);

      // Get instructor stats if user is instructor
      if (userData.role === 'Instructor') {
        const instructorStatsResponse = await ProfileService.getInstructorStats();
        setInstructorStats(instructorStatsResponse.data.data);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
      setMessage('Error loading profile data');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const token = AuthService.getToken();
      const response = await ProfileService.getAllUsers(token);
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
      setMessage('Error loading users');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Update profile
      const profileData = {
        name: formData.name,
        email: formData.email
      };

      await ProfileService.updateProfile(profileData);

      // Change password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setMessage('New passwords do not match');
          return;
        }

        await ProfileService.changePassword({
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
          new_password_confirmation: formData.confirmPassword
        });
      }

      setMessage('Profile updated successfully');
      setIsEditing(false);


      // Reload profile data
      await loadProfileData();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error updating profile';
      setMessage(errorMessage);
    }
    // Dispatch custom event to update navbar
    window.dispatchEvent(new Event('profile-updated'));
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Error loading profile data. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                    style={{ width: '120px', height: '120px', fontSize: '3rem' }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              <h5 className="mb-1">{user.name}</h5>
              <p className="text-muted mb-3">{user.role}</p>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setIsEditing(true)}
              >
                <i className="fas fa-edit me-2"></i>
                Edit Profile
              </button>
            </div>
            <hr className="my-0" />
            <div className="card-body">
              <h6 className="card-title mb-3">Account Details</h6>
              <div className="mb-2">
                <small className="text-muted d-block">Member since</small>
                <span>{new Date(user.created_at).toLocaleDateString()}</span>
              </div>
              <div className="mb-2">
                <small className="text-muted d-block">Account status</small>
                <span className="badge bg-success">Active</span>
              </div>
              <div className="mb-2">
                <small className="text-muted d-block">Role</small>
                <span className="text-capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          <div className="card shadow-sm">
            <div className="card-header bg-transparent py-3">
              <h5 className="mb-0">Profile Information</h5>
            </div>
            <div className="card-body">
              {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="mb-4">
                  <h6 className="text-primary mb-3">Personal Information</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>

                  </div>
                </div>

                {/* Change Password */}
                {isEditing && (
                  <div className="mb-4">
                    <h6 className="text-primary mb-3">Change Password</h6>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Current Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Confirm New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {isEditing && (
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>

              {/* Stats */}
              {stats && (
                <div className="row mt-4">
                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <h3 className="mb-1">{stats.enrolled_courses}</h3>
                        <p className="mb-0 text-muted">Enrolled Courses</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <h3 className="mb-1">{stats.completed_courses}</h3>
                        <p className="mb-0 text-muted">Completed Courses</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <h3 className="mb-1">{stats.certificates_earned}</h3>
                        <p className="mb-0 text-muted">Certificates Earned</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Sections for Instructors */}
          {user.role === 'instructor' && instructorStats && (
            <div className="card shadow-sm mt-4">
              <div className="card-header bg-transparent py-3">
                <h5 className="mb-0">Instructor Dashboard</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <div className="card bg-primary text-white">
                      <div className="card-body text-center">
                        <h3 className="mb-1">{instructorStats.total_students}</h3>
                        <p className="mb-0">Total Students</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card bg-success text-white">
                      <div className="card-body text-center">
                        <h3 className="mb-1">{instructorStats.published_courses}</h3>
                        <p className="mb-0">Published Courses</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card bg-info text-white">
                      <div className="card-body text-center">
                        <h3 className="mb-1">{instructorStats.average_rating.toFixed(1)}</h3>
                        <p className="mb-0">Average Rating</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card bg-warning text-white">
                      <div className="card-body text-center">
                        <h3 className="mb-1">${instructorStats.total_revenue}</h3>
                        <p className="mb-0">Total Revenue</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* List of Courses */}
                <div className="mt-4">
                  <h5>My Courses</h5>
                  <div className="list-group">
                    {instructorStats.courses && instructorStats.courses.length > 0 ? (
                      instructorStats.courses.map(course => (
                        <a
                          key={course.id}
                          href={`/course/${course.id}/edit`}
                          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        >
                          {course.title}
                          <span className="badge bg-primary rounded-pill">{course.students} Students</span>
                          <button className="btn btn-outline-secondary btn-sm">Edit</button>
                        </a>
                      ))
                    ) : (
                      <p>No courses found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Admin Dashboard */}
          {user.role === 'admin' && (
            <div className="card shadow-sm mt-4">
              <div className="card-header bg-transparent py-3">
                <h5 className="mb-0">Admin Dashboard</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <h3 className="mb-1">Reports</h3>
                        <p className="mb-0 text-muted">View all reports</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <h3 className="mb-1">Application Report</h3>
                        <p className="mb-0 text-muted">View application report</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <h3 className="mb-1">Technical Report</h3>
                        <p className="mb-0 text-muted">View technical report</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <h3 className="mb-1">Student Report</h3>
                        <p className="mb-0 text-muted">View student report</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <h3 className="mb-1">Certificate Report</h3>
                        <p className="mb-0 text-muted">View certificate report</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
