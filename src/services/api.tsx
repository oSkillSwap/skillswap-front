import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getExternalUpdateToken } from '../contexts/AuthContext';

// Création de l'instance Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Planification du rafraîchissement automatique
let refreshTimeout: ReturnType<typeof setTimeout>;

export function clearScheduledTokenRefresh() {
  clearTimeout(refreshTimeout);
}

export function scheduleTokenRefresh(token: string) {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const exp = decoded.exp * 1000; // En millisecondes
    const now = Date.now();
    const delay = exp - now - 30 * 1000; // 30 secondes avant expiration

    if (delay <= 0) return;

    clearTimeout(refreshTimeout); // Nettoie tout timeout précédent

    refreshTimeout = setTimeout(async () => {
      try {
        const res = await api.post('/refresh-token');
        const newToken = res.data.token;
        localStorage.setItem('accessToken', newToken);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        scheduleTokenRefresh(newToken); // Planifie le suivant
      } catch (err) {
        console.error('Erreur pendant le refresh automatique', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }, delay);
  } catch (err) {
    console.error('Token invalide, impossible de planifier le refresh', err);
  }
}

// Ajoute le token dans chaque requête si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback en cas de 401 : tentative de refresh + re-tentative de la requête
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refresh-token')
    ) {
      originalRequest._retry = true;
      try {
        const res = await api.post('/refresh-token');
        const { token } = res.data;

        localStorage.setItem('accessToken', token);

        const updateToken = getExternalUpdateToken();
        updateToken(token);

        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        scheduleTokenRefresh(token); // Replanifie le prochain refresh
        return api(originalRequest); // Rejoue la requête initiale

      } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        console.error('Erreur pendant le refresh token (fallback 401)', err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

// Lors du chargement initial, on programme le refresh si le token existe
const token = localStorage.getItem('accessToken');
if (token) {
  scheduleTokenRefresh(token);
}

export default api;
