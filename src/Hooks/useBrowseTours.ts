import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetAllTours } from "@/Api/apiGetAllTours";
import { retryLogic } from "@/Utils/queryUtils";
import { useFilter } from "@/Hooks/useFilter";

export function useBrowseTours(toursPage: number, cruisesPage: number) {
  const {
    search,
    minPrice,
    maxPrice,
    minDuration,
    maxDuration,
    minRatingAverage,
    maxRatingAverage,
    minDate,
    maxDate,
  } = useFilter();

  const filters: TourFilters = useMemo(
    () => ({
      search: search || undefined,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      minRating: minRatingAverage,
      maxRating: maxRatingAverage,
      startDateFrom: minDate || undefined,
      startDateTo: maxDate || undefined,
    }),
    [
      search,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      minRatingAverage,
      maxRatingAverage,
      minDate,
      maxDate,
    ],
  );

  return useQuery<TourAndCruiseDateContract>({
    queryKey: ["tours", toursPage, cruisesPage, filters],
    queryFn: () => GetAllTours(toursPage, cruisesPage, filters),
    retry: retryLogic,
    staleTime: 5 * 60 * 1000,
  });
}
