import apiClient from "./apiClient";

export async function GetAllStartDates(): Promise<StartDatesData[]> {
  const response = await apiClient.get<StartDatesData[]>("start-dates");
  return response.data;
}

export async function GetStartDateById(id: number): Promise<StartDatesData> {
  const response = await apiClient.get<StartDatesData>(`start-dates/${id}`);
  return response.data;
}

export async function CreateStartDate(
  startDateRequest: StartDateRequestData,
): Promise<StartDatesData> {
  const response = await apiClient.post<StartDatesData>(
    "start-dates",
    startDateRequest,
  );
  return response.data;
}
