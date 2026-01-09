import { useQuery } from "@tanstack/react-query";
import { GetTourById } from "../Api/apiGetTourById";
import { retryLogic } from "@/Utils/queryUtils";

export const useTourById = (tourId: number) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: () => GetTourById(tourId),
    retry: retryLogic,
    staleTime: 5 * 60 * 1000,
  });

  return { isLoading, data, error, isError };
};
