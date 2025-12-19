import { cosmosApiClient } from "./apiClient";

export async function GetAllReviewsByTourId(
  tourId: number,
): Promise<ReviewResponse[]> {
  const response = await cosmosApiClient.get<ReviewResponse[]>(
    `reviews/tour/${tourId}`,
  );
  return response.data;
}

export async function GetTourStats(tourId: number): Promise<TourStats> {
  const response = await cosmosApiClient.get<TourStats>(
    `reviews/tour/${tourId}/statistics`,
  );
  return response.data;
}
