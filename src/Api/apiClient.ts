import axios from "axios";

// Import your oidc config to get the authority dynamically
const AUTHORITY =
  import.meta.env.VITE_IDENTITY_SERVER_URL || "https://localhost:5001";
const CLIENT_ID = "webapp-client";
const STORAGE_KEY = `oidc.user:${AUTHORITY}:${CLIENT_ID}`;

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const oidcStorage = sessionStorage.getItem(STORAGE_KEY);
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
    const oidcStorage = sessionStorage.getItem(STORAGE_KEY);
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
