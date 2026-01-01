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

export async function CreateReview(
  tourId: number,
  tourName: string,
  rating: number,
  review: string,
): Promise<void> {
  await cosmosApiClient.post("reviews", {
    tourId,
    tourName,
    rating,
    review,
  });
}

export async function GetAllReviewsFromUser(): Promise<ReviewResponse[]> {
  const response =
    await cosmosApiClient.get<ReviewResponse[]>("reviews/my-reviews");
  return response.data;
}

export async function DeleteReview(
  reviewId: string,
  tourId: number,
): Promise<void> {
  await cosmosApiClient.delete(`reviews/${reviewId}`, {
    params: {
      tourId,
    },
  });
}

export async function UpdateReview(
  reviewId: string,
  tourId: number,
  request: ReviewUpdateRequest,
): Promise<ReviewResponse> {
  const response = await cosmosApiClient.put<ReviewResponse>(
    `reviews/${reviewId}`,
    request,
    {
      params: {
        tourId,
      },
    },
  );

  return response.data;
}
