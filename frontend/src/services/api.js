import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
  },
});

// Request interceptor to add token to headers if available
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    if (xsrfToken) {
      config.headers['X-XSRF-TOKEN'] = xsrfToken;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  response => response,
  error => {
    // You can add global error handling here, e.g., logout on 401
    if (error.response && error.response.status === 401) {
      // Optionally clear storage or redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // window.location.href = '/login'; // Uncomment if you want to redirect
    }
    return Promise.reject(error);
  }
);

export default api;
