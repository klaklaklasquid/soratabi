interface ReviewResponse {
  id: string;
  review: string;
  rating: number;
  createdAt: string;

  // Tour info
  tourId: number;
  tourName: string;

  // User info
  userId: string;
  userName: string;
  userPhoto: string;
}

type ReviewRequest = Omit<ReviewResponse, "id">;

interface ReviewUpdateRequest {
  rating: number;
  review: string;
}

interface TourStats {
  tourId: number;
  averageRating: number;
  totalReviews: number;
}
