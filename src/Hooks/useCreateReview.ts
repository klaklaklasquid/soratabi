import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateReview } from "../Api/apiReviews";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tourId,
      tourName,
      rating,
      review,
    }: {
      tourId: number;
      tourName: string;
      rating: number;
      review: string;
    }) => CreateReview(tourId, tourName, rating, review),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", `tour id: ${variables.tourId}`],
      });
      queryClient.invalidateQueries({
        queryKey: ["reviewsStats", `tour id: ${variables.tourId}`],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-reviews"],
      });
    },
  });
}
