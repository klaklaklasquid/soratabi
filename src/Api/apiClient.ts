import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from sessionStorage (set by react-oidc-context)
    const oidcStorage = sessionStorage.getItem(
      `oidc.user:https://localhost:5001:webapp-client`,
    );
    if (oidcStorage) {
      const user = JSON.parse(oidcStorage);
      if (user.access_token) {
        config.headers.Authorization = `Bearer ${user.access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const cosmosApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_COSMOS_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token for cosmos client too
cosmosApiClient.interceptors.request.use(
  (config) => {
    const oidcStorage = sessionStorage.getItem(
      `oidc.user:https://localhost:5001:webapp-client`,
    );
    if (oidcStorage) {
      const user = JSON.parse(oidcStorage);
      if (user.access_token) {
        config.headers.Authorization = `Bearer ${user.access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
