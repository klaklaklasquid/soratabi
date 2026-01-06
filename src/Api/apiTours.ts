import apiClient from "./apiClient";

export async function CreateTour(
  tourRequest: ToursRequestData,
): Promise<ToursData> {
  const formData = new FormData();

  formData.append("name", tourRequest.name);
  formData.append("duration", tourRequest.duration.toString());
  formData.append("price", tourRequest.price.toString());
  formData.append("summary", tourRequest.summary);
  formData.append("description", tourRequest.description);
  formData.append("type", tourRequest.type);
  formData.append("maxCustomers", tourRequest.maxCustomers.toString());
  formData.append("coverImage", tourRequest.coverImage);
  tourRequest.locationIds.forEach((id) => {
    formData.append("locationIds", id.toString());
  });
  tourRequest.startDateIds.forEach((id) => {
    formData.append("startDateIds", id.toString());
  });
  tourRequest.tagIds.forEach((id) => {
    formData.append("tagIds", id.toString());
  });

  const response = await apiClient.post<ToursData>("browse", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function UpdateTour(
  id: number,
  tourRequest: TourUpdateRequestData,
): Promise<ToursData> {
  const formData = new FormData();

  formData.append("name", tourRequest.name);
  formData.append("duration", tourRequest.duration.toString());
  formData.append("price", tourRequest.price.toString());
  formData.append("summary", tourRequest.summary);
  formData.append("description", tourRequest.description);
  formData.append("type", tourRequest.type);
  formData.append("maxCustomers", tourRequest.maxCustomers.toString());
  if (tourRequest.coverImage) {
    formData.append("coverImage", tourRequest.coverImage);
  }
  tourRequest.locationIds.forEach((id) => {
    formData.append("locationIds", id.toString());
  });
  tourRequest.startDateIds.forEach((id) => {
    formData.append("startDateIds", id.toString());
  });
  tourRequest.tagIds.forEach((id) => {
    formData.append("tagIds", id.toString());
  });

  const response = await apiClient.put<ToursData>(`browse/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
