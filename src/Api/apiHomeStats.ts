import apiClient, { cosmosApiClient } from "./apiClient";

export async function GetCountTours(): Promise<number> {
  const response = await apiClient.get<number>("browse/total-tours");
  return response.data;
}

export async function GetCountUsers(): Promise<number> {
  const response = await apiClient.get<number>("users/total-users");
  return response.data;
}

export async function GetTotalAverageRating(): Promise<number> {
  const response = await cosmosApiClient.get<number>("reviews/average-rating");
  return response.data;
}
