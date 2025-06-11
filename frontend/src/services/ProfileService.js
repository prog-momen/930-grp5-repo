import api from './api';

class ProfileService {
  // Get user profile details
  getProfile(id) {
    return api.get(`/profile/${id ? id : ''}`);
  }

  // Update user profile
  updateProfile(profileData) {
    return api.put('/profile', profileData);
  }

  // Update user avatar
  updateAvatar(formData) {
    return api.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  // Change password
  changePassword(passwordData) {
    return api.post('/profile/change-password', passwordData);
  }

  // Get user stats
  getStats() {
    return api.get('/profile/stats');
  }

  // Get instructor stats
  getInstructorStats() {
    return api.get('/profile/instructor-stats');
  }

  // Delete account
  deleteAccount() {
    return api.delete('/profile');
  }

  // Get enrolled courses
  getEnrolledCourses() {
    return api.get('/profile/enrolled-courses');
  }

  // Get completed courses
  getCompletedCourses() {
    return api.get('/profile/completed-courses');
  }

  // Get earned certificates
  getCertificates() {
    return api.get('/profile/certificates');
  }

  // Get all users
  getAllUsers(token) {
    return api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export default new ProfileService();
