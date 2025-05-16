import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://demolution-club.onrender.com/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
