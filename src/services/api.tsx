import axios from 'axios';

const api = axios.create({
  baseURL: 'https://skillswap-hknk.onrender.com/api',
  //baseURL: 'http://localhost:3000/api',
  //withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
