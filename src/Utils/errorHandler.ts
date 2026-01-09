import { AxiosError } from "axios";

export const getErrorMessage = (
  error: Error | null | undefined,
  fallbackMessage = "An unexpected error occurred",
): string => {
  if (!error) return fallbackMessage;

  const axiosError = error as AxiosError<{
    error?: string;
    details?: string;
    message?: string;
  }>;

  return (
    axiosError.response?.data?.error ||
    axiosError.response?.data?.details ||
    axiosError.response?.data?.message ||
    axiosError.message ||
    fallbackMessage
  );
};
