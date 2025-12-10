import { useQuery } from "@tanstack/react-query";
import { GetTourById } from "../Api/apiGetTourById";
import { AxiosError } from "axios";

export const useTourById = (tourId: number) => {
  const { isPending, data, error, isError } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: () => GetTourById(tourId),
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { isPending, data, error, isError };
};
