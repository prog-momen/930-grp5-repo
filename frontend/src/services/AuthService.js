import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + 'login', {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(name, email, password) {
    return axios.post(API_URL + 'register', {
      name,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getToken() {
    const user = this.getCurrentUser();
    return user?.token;
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();