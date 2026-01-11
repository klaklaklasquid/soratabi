import { useMutation } from "@tanstack/react-query";
import { CreatePayment } from "@/Api/apiPayment";
import { toast } from "sonner";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: (request: CreatePaymentRequest) => CreatePayment(request),
    onSuccess: (response) => {
      sessionStorage.setItem("pendingPaymentId", response.paymentId);
      window.location.href = response.checkoutUrl;
    },
    onError: (error) => {
      console.error("Payment creation failed:", error);
      toast.error("Failed to create payment. Please try again.");
    },
  });
};
