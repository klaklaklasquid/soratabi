import apiClient from "./apiClient";

export const GetUser = async () => {
  const response = await apiClient.get("users/profile", {
    withCredentials: true,
  });
  return response.data;
};
