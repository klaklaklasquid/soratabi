import {
  GetCountTours,
  GetCountUsers,
  GetTotalAverageRating,
} from "@/Api/apiHomeStats";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useHomeStats() {
  const {
    data: countTours,
    isLoading: isLoadingTours,
    error: errorTours,
  } = useQuery({
    queryKey: ["countTours"],
    queryFn: GetCountTours,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: countUsers,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ["countUsers"],
    queryFn: GetCountUsers,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: totalAverageRating,
    isLoading: isLoadingRating,
    error: errorRating,
  } = useQuery({
    queryKey: ["totalAverageRating"],
    queryFn: GetTotalAverageRating,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    countTours,
    isLoadingTours,
    errorTours,
    countUsers,
    isLoadingUsers,
    errorUsers,
    totalAverageRating,
    isLoadingRating,
    errorRating,
    isLoading: isLoadingTours || isLoadingUsers || isLoadingRating,
    hasError: !!errorTours || !!errorUsers || !!errorRating,
  };
}
