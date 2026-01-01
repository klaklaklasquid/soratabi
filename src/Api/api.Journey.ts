import apiClient from "./apiClient";

export const GetUpcomingTours = async (): Promise<JourneyResponse[]> => {
  const response = await apiClient.get<JourneyResponse[]>("journey/upcoming");
  return response.data;
};

export const GetCompletedTours = async (): Promise<JourneyResponse[]> => {
  const response = await apiClient.get<JourneyResponse[]>("journey/completed");
  return response.data;
};
