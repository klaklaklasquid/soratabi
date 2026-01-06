import apiClient from "./apiClient";

export const GetUser = async (): Promise<UserInterface> => {
  const response = await apiClient.get<UserInterface>("users/profile", {
    withCredentials: true,
  });
  return response.data;
};

export const PatchUser = async (
  userPatchRequest: UserPatchRequest,
): Promise<UserInterface> => {
  const formData = new FormData();
  formData.append("ProfileImage", userPatchRequest.image);

  const response = await apiClient.patch<UserInterface>(
    "users/profile/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
