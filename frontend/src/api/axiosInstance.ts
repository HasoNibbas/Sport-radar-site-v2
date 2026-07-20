// src/api/axiosInstance.ts
import axios from 'axios';
import { refreshAccessToken } from '../utils/auth';

const PUBLIC_ENDPOINTS = [
  '/api/users/register/',
  '/api/users/token/',
  '/api/users/token/refresh/',
  '/api/weather/',
  '/api/places/',
  '/api/activities/',
  '/api/companies/',
  '/api/coaches/',
];

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000';

const baseURL = API_BASE_URL;
if (!baseURL) {
  // En développement, on peut utiliser une valeur par défaut.
  // En production, cette erreur arrêtera le build si la variable manque, ce qui est une bonne chose.
  console.error("VITE_API_URL is not defined!");
}
const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
} );




// Request interceptor
axiosInstance.interceptors.request.use(async (config) => {
  const url = config.url || '';
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
  // Si l'URL commence par l'un des endpoints publics, on skippe le token
  const isPublic = PUBLIC_ENDPOINTS.some(ep => normalizedUrl.startsWith(ep));
  if (!isPublic) {
    const token = localStorage.getItem('access');
    if (token) {
      (config.headers as any)['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor pour rafraîchir automatiquement le token si 401
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    // Si 401 et qu'on n'a pas déjà retry, et qu'on a un refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh')
    ) {
      originalRequest._retry = true;
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        // Mettre à jour le header pour retry
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
