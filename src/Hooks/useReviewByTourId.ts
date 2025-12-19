import { GetAllReviewsByTourId } from "@/Api/apiReviews";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useReviewByTourId = (tourId: number) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["reviews", `tour id: ${tourId}`],
    queryFn: () => GetAllReviewsByTourId(tourId),
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { isLoading, data, error, isError };
};
