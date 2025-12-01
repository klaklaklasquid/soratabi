import apiClient from "./ApiClient";

export async function GetAllTours(): Promise<TourAndCruiseDateContract> {
  const response = await apiClient.get<TourAndCruiseDateContract>("browse");
  return response.data;
}
