import { AxiosError } from "axios";

// ? Reusable retry logic for React Query queries, Prevents retrying on 404 errors and limits retries to 1 attempt.
export const retryLogic = (failureCount: number, error: Error) => {
  if (error instanceof AxiosError && error.response?.status === 404) {
    return false;
  }
  return failureCount < 1;
};
