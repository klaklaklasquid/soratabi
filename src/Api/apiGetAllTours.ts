import apiClient from "./apiClient";

export async function GetAllTours(
  toursPage: number = 1,
  cruisesPage: number = 1,
  filters?: TourFilters,
): Promise<TourAndCruiseDateContract> {
  const response = await apiClient.get<TourAndCruiseDateContract>("browse", {
    params: {
      tourPage: toursPage,
      cruisePage: cruisesPage,
      search: filters?.search,
      minPrice: filters?.minPrice,
      maxPrice: filters?.maxPrice,
      minDuration: filters?.minDuration,
      maxDuration: filters?.maxDuration,
      minRating: filters?.minRating,
      maxRating: filters?.maxRating,
      startDateFrom: filters?.startDateFrom,
      startDateTo: filters?.startDateTo,
    },
  });
  return response.data;
}
