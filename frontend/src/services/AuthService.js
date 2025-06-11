import api from './api';

const API_URL = '/auth/';

class AuthService {
  login(email, password) {
    return api
      .post(API_URL + 'login', {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          this.setToken(response.data.token);
          this.setUser(response.data.user);
        }
        return response.data;
      });
  }

  logout() {
    const token = this.getToken();
    if (token) {
      return api
        .post(API_URL + 'logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .finally(() => {
          this.clearStorage();
        });
    }
    this.clearStorage();
    return Promise.resolve();
  }

  register(name, email, password) {
    return api.post(API_URL + 'register', {
      name,
      email,
      password
    });
  }

  refreshToken() {
    return api
      .post(API_URL + 'refresh', {}, {
        withCredentials: true
      })
      .then(response => {
        if (response.data.token) {
          this.setToken(response.data.token);
          return response.data;
        }
        return Promise.reject('No token in refresh response');
      })
      .catch(error => {
        this.clearStorage();
        throw error;
      });
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  clearStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();
