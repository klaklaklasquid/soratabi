import { GetAllReviewsByTourId, GetTourStats } from "@/Api/apiReviews";
import { useQuery } from "@tanstack/react-query";
import { retryLogic } from "@/Utils/queryUtils";

export const useReviewByTourId = (tourId: number) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["reviews", `tour id: ${tourId}`],
    queryFn: () => GetAllReviewsByTourId(tourId),
    retry: retryLogic,
    staleTime: 5 * 60 * 1000,
  });

  const { data: stats } = useQuery({
    queryKey: ["reviewsStats", `tour id: ${tourId}`],
    queryFn: () => GetTourStats(tourId),
    retry: retryLogic,
    staleTime: 5 * 60 * 1000,
  });

  return { isLoading, data, error, isError, stats };
};
