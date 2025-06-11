import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ⬅ مهم جدًا لإرسال الكوكيز مع الطلبات إذا كنت تستخدم Sanctum
});

// ✅ Interceptor لإرفاق التوكن و XSRF-TOKEN
api.interceptors.request.use(
  config => {
    // إرفاق توكن JWT إذا كان موجودًا
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // إرفاق توكن CSRF إذا كان موجودًا
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    if (xsrfToken) {
      config.headers['X-XSRF-TOKEN'] = xsrfToken;
    }

    return config;
  },
  error => Promise.reject(error)
);

// ✅ Interceptor لمعالجة الأخطاء مثل 401 Unauthorized
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // إذا انتهت صلاحية التوكن، احذف البيانات
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // يمكن توجيه المستخدم إلى صفحة تسجيل الدخول
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;