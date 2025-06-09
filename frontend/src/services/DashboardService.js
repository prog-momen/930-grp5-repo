import api from './api';

class DashboardService {
  getDashboard() {
    return api.get('dashboard')
      .then(response => response.data)
      .catch(error => {
        console.error('Dashboard fetch error:', error);
        throw error;
      });
  }

  // Add other dashboard-related API calls here
}

export default new DashboardService();
