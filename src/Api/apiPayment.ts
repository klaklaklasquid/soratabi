import apiClient from "./apiClient";

export async function CreatePayment(
  request: CreatePaymentRequest,
): Promise<PaymentResponse> {
  const response = await apiClient.post<PaymentResponse>(
    "payment/create",
    request,
  );
  return response.data;
}

export async function GetPayment(id: string): Promise<PaymentStatusResponse> {
  const response = await apiClient.get<PaymentStatusResponse>(
    `payment/${id}/status`,
  );
  return response.data;
}
