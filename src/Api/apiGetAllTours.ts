import apiClient from "./apiClient";

export async function GetAllTours(): Promise<TourAndCruiseDateContract> {
  const response = await apiClient.get<TourAndCruiseDateContract>("browse");
  return response.data;
}
