import apiClient from "./apiClient";

export async function CreatePdf(
  tourId: number,
  startDateId: number,
): Promise<Blob> {
  const response = await apiClient.post<Blob>(
    "pdf/booking-confirmation",
    {
      tourId,
      startDateId,
    },
    {
      responseType: "blob",
    },
  );

  return response.data;
}
