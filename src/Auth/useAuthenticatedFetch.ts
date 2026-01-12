import { oidcConfig } from "./authConfig";
import useAuth from "./useAuth";

export const useAuthenticatedFetch = () => {
  const auth = useAuth();

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = auth.user?.access_token;

    const headers = {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return fetchWithAuth;
};

// * Get the current access token
export const getAccessToken = (): string | null => {
  try {
    const storageKey = `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`;
    const oidcStorage = sessionStorage.getItem(storageKey);
    if (oidcStorage) {
      const user = JSON.parse(oidcStorage);
      return user.access_token || null;
    }
  } catch (error) {
    console.error("Error getting access token:", error);
  }
  return null;
};
