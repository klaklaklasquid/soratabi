import { cosmosApiClient } from "./apiClient";

export async function GetAllReviewsByTourId(
  tourId: number,
): Promise<ReviewResponse[]> {
  console.log(tourId);
  const response = await cosmosApiClient.get<ReviewResponse[]>(
    `reviews/tour/${tourId}`,
  );
  return response.data;
}
