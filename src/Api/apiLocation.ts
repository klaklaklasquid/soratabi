import apiClient from "./apiClient";

export async function GetAllLocations(): Promise<LocationsData[]> {
  const response = await apiClient.get<LocationsData[]>("locations");
  return response.data;
}

export async function GetLocationById(id: number): Promise<LocationsData> {
  const response = await apiClient.get<LocationsData>(`locations/${id}`);
  return response.data;
}

export async function CreateLocation(
  locationRequest: LocationRequestData,
): Promise<LocationsData> {
  const formData = new FormData();

  formData.append("name", locationRequest.name);
  formData.append("description", locationRequest.description);
  formData.append("image", locationRequest.image);

  const response = await apiClient.post<LocationsData>("locations", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
