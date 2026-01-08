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

export const CreateUser = async (
  userCreateRequest: UserCreateRequest,
): Promise<UserInterface> => {
  const formData = new FormData();
  formData.append("username", userCreateRequest.username);
  formData.append("email", userCreateRequest.email);
  formData.append("password", userCreateRequest.password);
  formData.append("confirmPassword", userCreateRequest.confirmPassword);
  formData.append("firstname", userCreateRequest.firstname);
  formData.append("lastname", userCreateRequest.lastname);
  formData.append("photo", userCreateRequest.photo);

  const response = await apiClient.post<UserInterface>(
    "users/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
