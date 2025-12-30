import { GetCompletedTours, GetUpcomingTours } from "@/Api/api.Journey";
import { GetAllReviewsFromUser } from "@/Api/apiReviews";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useMyJourneyQueries = () => {
  const {
    data: upcomingTours,
    isLoading: isLoadingUpcoming,
    isError: isErrorUpcoming,
    error: upcomingError,
  } = useQuery({
    queryKey: ["upcoming tours"],
    queryFn: GetUpcomingTours,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: completedTours,
    isLoading: isLoadingCompleted,
    isError: isErrorCompleted,
    error: completedError,
  } = useQuery({
    queryKey: ["completed tours"],
    queryFn: GetCompletedTours,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  const {
    isLoading: myReviewLoading,
    data: myReviewData,
    error: myReviewError,
    isError: myReviewIsError,
  } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: GetAllReviewsFromUser,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    upcomingTours,
    isLoadingUpcoming,
    isErrorUpcoming,
    upcomingError,
    completedTours,
    isLoadingCompleted,
    isErrorCompleted,
    completedError,
    myReviewData,
    myReviewLoading,
    myReviewError,
    myReviewIsError,
  };
};
