import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePayment } from "@/Api/apiPayment";
import { toast } from "sonner";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreatePaymentRequest) => CreatePayment(request),
    onSuccess: (response) => {
      sessionStorage.setItem("pendingPaymentId", response.paymentId);

      queryClient.invalidateQueries({ queryKey: ["upcoming-tours"] });
      queryClient.invalidateQueries({ queryKey: ["completed-tours"] });

      window.location.href = response.checkoutUrl;
    },
    onError: (error) => {
      console.error("Payment creation failed:", error);
      toast.error("Failed to create payment. Please try again.");
    },
  });
};
