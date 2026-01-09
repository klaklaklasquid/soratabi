import apiClient from "./apiClient";

export async function GetAllTours(
  toursPage: number = 1,
  cruisesPage: number = 1,
): Promise<TourAndCruiseDateContract> {
  const response = await apiClient.get<TourAndCruiseDateContract>("browse", {
    params: {
      tourPage: toursPage,
      cruisePage: cruisesPage,
    },
  });
  return response.data;
}
