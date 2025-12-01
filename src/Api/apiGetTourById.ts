import apiClient from "./apiClient";

export async function GetTourById(tourId: number): Promise<ToursData> {
  const response = await apiClient.get<ToursData>(`browse/${tourId}`);
  return response.data;
}
