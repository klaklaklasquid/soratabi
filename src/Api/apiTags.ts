import apiClient from "./apiClient";

export async function GetAllTags(): Promise<TagsData[]> {
  const response = await apiClient.get<TagsData[]>("tags");
  return response.data;
}

export async function GetTagById(id: number): Promise<TagsData> {
  const response = await apiClient.get<TagsData>(`tags/${id}`);
  return response.data;
}

export async function CreateTag(
  tagRequest: TagsRequestData,
): Promise<TagsData> {
  const response = await apiClient.post<TagsData>("tags", tagRequest);
  return response.data;
}
