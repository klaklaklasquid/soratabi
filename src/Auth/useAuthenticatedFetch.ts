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
    const oidcStorage = sessionStorage.getItem(
      `oidc.user:https://localhost:5001:webapp-client`,
    );
    if (oidcStorage) {
      const user = JSON.parse(oidcStorage);
      return user.access_token || null;
    }
  } catch (error) {
    console.error("Error getting access token:", error);
  }
  return null;
};
